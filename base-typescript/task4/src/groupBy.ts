export function groupBy<T>(
  items: readonly T[],
  getKey: (item: T) => string,
): Record<string, T[]> {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return Object.fromEntries(groups);
}
