import getImage from './giphy';

const bodyElement = document.querySelector('body');

export default async function setBackground() {
  const imgUrl = await getImage();

  if (imgUrl) {
    bodyElement.style.backgroundImage = `url("${imgUrl}")`;
  }
}
