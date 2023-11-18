const apiKey = 'EN20l0Elyu5VVeoBSXsvwHRDyIqqEiOj';

export default async function getImage() {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=cloudy_weather`,
    { mode: 'cors' }
  );
  const data = await response.json();

  return data.data.images.original.url;
}

//  `https://api.giphy.com/v1/gifs/translate?api_key=EN20l0Elyu5VVeoBSXsvwHRDyIqqEiOj&s=${searchItem}`,
