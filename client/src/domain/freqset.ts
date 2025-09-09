export class FrequencySet<T> {
    private map = new Map<T, number>();

    add(value: T) : void {
        this.map.set(value, (this.map.get(value) ?? 0) + 1)
    }

    delete(value: T): boolean {
        const count = this.map.get(value);
        if (count === undefined) return false;
        if (count > 1) {
            this.map.set(value, count - 1);
        } else {
            this.map.delete(value);
        }
        return true;
    }

    get size(): number {
        return this.map.size;
    }

    count(value: T) : number {
        return this.map.get(value) ?? 0
    }

    values() : T[] {
        return [...this.map.keys()];
    }
}

export const ListToFrequencySet = <T>(arr: T[]) : FrequencySet<T> => {
    const freqSet = new FrequencySet<T>();
    for (const element of arr) {
        freqSet.add(element);
    }
    return freqSet;
}