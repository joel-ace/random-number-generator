const generateNumbers = (quantity) => {
  const randomNumbers = new Set();
  while (randomNumbers.size < quantity) {
    randomNumbers.add(`0${Math.floor(100000000 + Math.random() * 900000000)}`);
  }
  return [...randomNumbers];
};

const noop = () => {};

export {
  generateNumbers,
  noop,
};
