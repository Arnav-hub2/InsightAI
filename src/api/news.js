const API_KEY = '3b0627ba307b8417eb62b781669697c5';

const URL =
  `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=20&apikey=${API_KEY}`;

export const fetchNews = async () => {
  try {
    const response = await fetch(URL);

    const result = await response.json();

    return result?.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);

    return [];
  }
};