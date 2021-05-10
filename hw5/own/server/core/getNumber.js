let number;

function getRandomInt(max=100) {
  return Math.floor(Math.random() * max);
}

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (number==null || forceRestart) {
    number = getRandomInt();
  }
  return number
}

export default getNumber
