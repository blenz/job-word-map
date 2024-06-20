const url = 'https://jsearch.p.rapidapi.com';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
};

type response = {
    data: {
        [key: number]: { job_description: string }
    }
}

export async function getJobData(query: string): Promise<string[]> {
    try {
        const resp = await fetch(`${url}/search?query=${encodeURI(query)}`, options);
        const { data } = await resp.json() as response;
        return Object.values(data).map(v => v.job_description)
    } catch (error) {
        throw new Error(`error fetching data: ${error}`)
    }
}