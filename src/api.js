import { fetchData } from "./ultils";

const API_URL = 'https://api.pokemontcg.io/v2';

export const getCards = async () => {
    try {
        const res = await fetchData(`${API_URL}/cards?pageSize=50`);
        return res.data
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

export const getSets = async () => {
    try {
        const res = await fetchData(`https://api.pokemontcg.io/v2/sets/`);
        return res.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

export const getCard = async (cardId) => {
    try {
        const res = await fetchData(`https://api.pokemontcg.io/v2/cards/${cardId}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error; // Propagate error to component
    }
}