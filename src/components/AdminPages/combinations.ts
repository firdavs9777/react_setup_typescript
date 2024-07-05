export function* getCombinations<T>(array: T[], combinationLength: number): Generator<T[]> {
  function* doCombination(offset: number, combo: T[]): Generator<T[]> {
    if (combo.length === combinationLength) {
      yield combo;
      return;
    }
    for (let i = offset; i < array.length; i++) {
      yield* doCombination(i + 1, combo.concat(array[i]));
    }
  }

  yield* doCombination(0, []);
}