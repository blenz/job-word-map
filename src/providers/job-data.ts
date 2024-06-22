const base_url = 'https://jsearch.p.rapidapi.com'

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
  },
}

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

async function getDetails(job: string): Promise<string[]> {
  try {
    const url = process.env.RAPIDAPI_KEY
      ? `${base_url}/search?query=${encodeURI(job)}&num_pages=5`
      : 'http://localhost:3000/data.json'

    const resp = await fetch(url, options)
    const { data } = (await resp.json()) as Response

    return Object.values(data).flatMap(({ job_highlights }) => [
      ...(job_highlights?.Qualifications || []),
      ...(job_highlights?.Responsibilities || []),
    ])
  } catch (error) {
    throw new Error(error as string)
  }
}

export const jobData = {
  getDetails,
}
