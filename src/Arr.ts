type Nullable<T> = T | null | undefined;

export default class Arr<T> {
    [x: number]: Nullable<T>;
    #length: number = 0;

    constructor(el: number);
    constructor(...el: T[]);
    constructor() {
        if (arguments.length == 1 && typeof arguments[0] === "number") {
            for (let i = 0; i < arguments[0]; ++i)
                this.push(undefined);
        } else for (let a of arguments) this.push(a);
    }

    push(...el: Nullable<T>[]) {
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
        } else if (l > this.#length)
            for (let i = this.#length; i < l; ++i)
                this[i] = undefined;
    }

    toString(): string {
        let str = "";
        for (let i in this) str += `, ${this[i]}`;
        return str.slice(2, str.length);
    }

    [Symbol.iterator]() {
        let step = 0,
            length = this.#length;
        const getVal = (index: number) => this[index];
        return {
            next() {
                if (step < length)
                    return { value: getVal(step++), done: false };
                return { value: null, done: true };
            }
        }
    }

    forEach(callback: (value: Nullable<T>, index: number, arr: this) => any): void {
        let i = 0;
        for (let p in this) callback(this[p], i++, this);
    }

    concat(a: Arr<T>): number {
        for (let e of a) this.push(e);
        return this.#length;
    }

    pop(): Nullable<T> {
        if (this.#length == 0) return undefined;
        let a: Nullable<T> = this[this.#length - 1];
        delete this[this.#length - 1];
        this.#length -= 1;
        return a;
    }

    static isArr = (el: any) => el instanceof Arr;
}