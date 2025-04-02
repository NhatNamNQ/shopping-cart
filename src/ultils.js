export async function fetchData(url) {
    try {
        const res = await fetch(url);
        const data = res.json();

        if (!res.ok) {
            throw new Error('Failed to fetch cards');
        }
        return data;
    } catch (error) {
        console.error(error.message);
    }
}