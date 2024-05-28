export function insertIntoArray<T>(array: T[], index: number, item: T): T[] {
	return [...array.splice(0, index), item, ...array];
}
