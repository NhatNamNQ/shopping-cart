const API_URL = 'https://api.pokemontcg.io/v2';

export const getCards = async () => {
    try {
        const response = await fetch(`${API_URL}/cards?pageSize=50`);

        if (!response.ok) {
            throw new Error('Failed to fetch cards');
        }

        const data = await response.json();

        return data.data
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}