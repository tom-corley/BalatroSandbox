// Bucketed Frequency Map allowing for efficient x of a kind detection
export class FrequencySet<T> {
    private map = new Map<T, number>();
    private buckets = new Map<number, Set<T>>()
    private maxFreq = 0;

    // Add a single occurence of a key
    add(value: T) : void {
        // Increment frequency
        let oldFreq : number = this.map.get(value) ?? 0;
        let newFreq : number = oldFreq + 1;
        this.map.set(value, oldFreq + 1)

        // Remove from old bucket 
        if (oldFreq > 0) {
            this.buckets.get(oldFreq)!.delete(value);
            // Delete bucket entirely if empty
            if (this.buckets.get(oldFreq)!.size === 0) {
                this.buckets.delete(oldFreq);
            }
        }

        // Add to new bucket
        if (!this.buckets.has(newFreq)) {
            this.buckets.set(newFreq, new Set())
        }
        this.buckets.get(newFreq)!.add(value)

        // Update pointer to biggest
        if (newFreq > this.maxFreq) this.maxFreq = newFreq;
    }

    // Delete an occurence of a key
    delete(value: T): boolean {
        const oldFreq : (number | undefined) = this.map.get(value);
        if (oldFreq === undefined) return false;

        // Delete from old bucket
        this.buckets.get(oldFreq)!.delete(value);
        // Delete bucket entirely if empty and possibly shrink max Freq
        if (this.buckets.get(oldFreq)!.size === 0) {
            this.buckets.delete(oldFreq);
            if (oldFreq === this.maxFreq) this.maxFreq--;
        }

        // Update frequency and add to new bucket if frequency positive
        const newFreq : number = oldFreq - 1;
        if (newFreq > 0) {
            this.map.set(value, newFreq);
            if (!this.buckets.has(newFreq)) {
                this.buckets.set(newFreq, new Set())
            }
        this.buckets.get(newFreq)!.add(value)
        } else {
            this.map.delete(value);
        }
        return true;
    }

    // Number of unique values
    get size(): number {
        return this.map.size;
    }

    // Frequency of a given value
    count(value: T) : number {
        return this.map.get(value) ?? 0
    }

    // Array of unique values
    values() : T[] {
        return [...this.map.keys()];
    }

    // Highest frequency a key has
    get biggestKind() : number {
        return this.maxFreq
    }

    // Returns keys of a given frequency or empty array if none
    keysWithFreq(freq: number) : T[] {
        if (this.buckets.has(freq)) {
            return [...this.buckets.get(freq)!]
        } else {
            return []
        }
    }
}

export const ListToFrequencySet = <T>(arr: T[]) : FrequencySet<T> => {
    const freqSet = new FrequencySet<T>();
    for (const element of arr) {
        freqSet.add(element);
    }
    return freqSet;
}