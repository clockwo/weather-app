const apiKey = 'EN20l0Elyu5VVeoBSXsvwHRDyIqqEiOj';

// TODO: Make file for fetch data Giphy or Weather
// TODO: Get data from WeatherApi -> Get str of current weather -> Get img by str from giphy
async function fetchGiphyImage(searchTerm) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchTerm}`,
      { mode: 'cors' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error Giphy API:', error);
    return null;
  }
}

export default async function getImage(searchTerm) {
  const data = await fetchGiphyImage(searchTerm);
  return data ? data.data.images.original.url : null;
}
