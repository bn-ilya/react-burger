export const sliceArraySection = <T>(arr: Array<T>, section: number): Array<Array<T>> => {
  const result = [];
  for (let i = 0; i < arr.length; i += section) {
    result.push(arr.slice(i, i + section));
  }

  return result;
};
