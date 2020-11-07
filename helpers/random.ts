export function sample<T>(arr: T[]): T {
    return arr[int(arr.length - 1)];
}

export function int(range: number|[number, number]): number {
    let min = 0;
    let max = 0;
    if(Array.isArray(range)) {
        [min, max] = range;
    } else {
        max = range;
    } 

    return min + Math.floor(Math.random() * (max - min + 1));
}