type Nullable<T> = T | null;

export default class Arr<T> {
    [x: number]: Nullable<T>;
    #length: number = 0;

    constructor(...el: T[]) {
        for (let a of el) this.push(a);
    }

    push(...el: T[]) {
        let i = Object.keys(this).length;
        for (let a of el) this[i++] = a;
        this.#length += el.length;
    }

    get length() {
        return this.#length;
    }

    set length(l: number) {
        if (l < this.#length) {
            for (let i in this)
                if (!isNaN(Number(i)) && Number(i) >= l)
                    delete this[i];
        } else if (l > this.#length) {
            for (let i = this.#length; i < l; ++i) {
                this[i] = null;
            }
        }
    }

    toString(): string {
        let str = "";
        for (let i in this) str += `, ${this[i]}`;
        return str.slice(2, str.length);
    }

    [Symbol.iterator]() {
        return {
            next() {
            }
        }
    }

    forEach(callback: (value: Nullable<T>, index: number, arr: this) => any): void {
        let i = 0;
        for (let p in this) callback(this[p], i++, this);
    }

    concat(a: Arr<T>): number {
        //for(let e of a) this.push(e);
        return this.#length;
    }
}