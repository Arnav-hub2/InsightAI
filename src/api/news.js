const API_KEY = '183e509362e7493d9abdb8d83f3f280b';

const URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`;

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