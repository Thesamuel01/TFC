type ArrayPriorityValues = Array<number>;

export default function sortByPriority(A: ArrayPriorityValues, B: ArrayPriorityValues): number {
  if (A.length !== B.length) {
    throw new Error('Priority arrays lenght must be equals');
  }

  const valueA = A.shift();
  const valueB = B.shift();
  const isValid = valueA !== undefined && valueB !== undefined;
  const result = isValid ? valueA - valueB : 1;

  return result !== 0 ? result : sortByPriority(A, B);
}
