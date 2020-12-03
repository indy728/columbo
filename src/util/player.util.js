export const findFirstEmptyCardSlot = (hand) => {
  let slot = null;

  hand.some((col, i) => {
    return col.some((card, j) => {
      if (!card) {
        slot = [i, j];
        return true;
      }
      return false;
    });
  });

  return slot;
};

const columnIsEmpty = (column) => {
  return column[0] === null && column[1] === null;
};

export const cleanUpHand = (hand, isFront) => {
  if (isFront) {
    let column = hand[0];
    while (hand.length > 1 && columnIsEmpty(column)) {
      hand.shift();
      column = hand[0];
    }
  } else {
    while (hand.length > 1 && columnIsEmpty(hand[hand.length - 1])) {
      hand.pop();
    }
  }
};

export const getHandValue = (hand) => {
  return hand.flat().reduce((p, card) => {
    if (!card) {
      return p;
    }
    return p + +card.points;
  }, 0);
};
