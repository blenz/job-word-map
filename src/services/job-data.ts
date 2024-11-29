type Job = {
  job_highlights: {
    Qualifications?: string[]
    Responsibilities?: string[]
  }
}

type Response = {
  data: {
    [key: number]: Job
  }
}

export interface JobDataService {
  getDetails(job: string): Promise<string[]>
}

class Provider implements JobDataService {
  private options: RequestInit

  constructor(private api_key?: string) {
    this.options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': api_key || '',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    }
  }

  async getDetails(job: string): Promise<string[]> {
    try {
      const url = this.api_key
        ? `https://jsearch.p.rapidapi.com/search?query=${encodeURI(job)}&num_pages=5`
        : 'http://localhost:3000/data.json'

      const resp = await fetch(url, this.options)
      const { data } = (await resp.json()) as Response

      return Object.values(data).flatMap(({ job_highlights }) => [
        ...(job_highlights?.Qualifications || []),
        ...(job_highlights?.Responsibilities || []),
      ])
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export const jobDataService = new Provider(process.env.RAPIDAPI_KEY)
