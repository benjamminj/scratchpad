import clone from 'ramda/src/clone';

export const shuffle = arr => {
  const copy = clone(arr);

  for (let i = copy.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);

    const temp = copy[j];
    copy[j] = copy[i];
    copy[i] = temp;
  }
  return copy;
};
