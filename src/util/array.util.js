export const shuffleArray = (inputArray) => {
  const array = [...inputArray];
  const shuffledArray = [];
  for (let i = array.length; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    shuffledArray.push(array[j]);
    array.splice(j, 1);
  }
  return shuffledArray;
};

export const doArraysMatch = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const matchArrayInArray = (bigArray, littleArray) => {
  const littleLength = littleArray.length;
  let i = 0;

  while (i < bigArray.length) {
    // if (bigArray.length = littleLength) {
    //     let subArray = bigArray[i]
    //     let j = 0

    //     while (j < littleLength) {
    //         if (bigArray[i])
    //     }
    // }
    if (doArraysMatch(bigArray[i], littleArray)) {
      return i;
    }
    i++;
  }
  return -1;
};

export const arrayImmutableAdd = (array, idx, item) => {
  return [...array.slice(0, idx), item, ...array.slice(idx)];
};

export const arrayImmutableRemove = (array, idx) => {
  return [...array.slice(0, idx), ...array.slice(idx + 1)];
};

export const arrayImmutableReplace = (array, idx, item) => {
  return [...array.slice(0, idx), item, ...array.slice(idx + 1)];
};

export const arrayImmutablePush = (array, item) => {
  return [...array, item];
};
