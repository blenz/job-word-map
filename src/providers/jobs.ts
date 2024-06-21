const base_url = 'https://jsearch.p.rapidapi.com'

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
};

type Response = {
    data: {
        [key: number]: { job_description: string }
    }
}

export async function getJobDescriptions(query: string): Promise<string[]> {
    try {
        const url = process.env.RAPIDAPI_KEY
            ? `${base_url}/search?query=${encodeURI(query)}`
            : 'http://localhost:3000/data.json'

        const resp = await fetch(url, options);
        const { data } = await resp.json() as Response;

        return Object.values(data).map(v => v.job_description)
    } catch (error) {
        throw new Error(`error fetching data: ${error}`)
    }
}