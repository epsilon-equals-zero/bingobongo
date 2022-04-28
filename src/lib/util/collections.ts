export function range(from: number, to: number): number[] {
    return Array.from(Array(to - from).keys()).map((i) => i + from);
}
