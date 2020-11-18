type Nullable<T> = T | null | undefined;

export class Arr<T> {
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

    /**
     * Appends new elements to an Arr, and returns the new length of the Arr.
     * @param items New elements of the Arr.
     * @returns The new length of the Arr
     */
    push(...el: Nullable<T>[]) {
        let i = Object.keys(this).length;
        for (let a of el)
            this[i++] = a;
        this.#length += el.length;
        return this.#length;
    }

    get length() {
        if (Object.keys(this).length != this.#length)
            this.#length = Object.keys(this).length;
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
        this.#length = l;
    }

    /**
     * Performs the specified action for each element in an Arr.
     * @param callback  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the Arr.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callback: (value: Nullable<T>, index: number, arr: this) => any, thisArg: any = undefined): void {
        let i = 0;
        for (let p in this)
            callback.call(thisArg, this[p], i++, this);
    }

    /**
     * Calls a defined callback function on each element of an arr, and returns an arr that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the arr.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     * @returns an arr of the mapped result
     */
    map<U>(callback: (value: Nullable<T>, index: number, arr: Arr<T>) => U, thisArg: any = undefined): Arr<U> {
        const ret = new Arr<U>();
        let i = 0;
        for (let p in this)
            ret.push(callback.call(thisArg, this[p], i++, this));
        return ret;
    }

    /**
     * Returns the elements of an arr that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the arr.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     * @returns the filtered arr
     */
    filter(predicate: (value?: T, index?: number, arr?: Arr<T>) => unknown, thisArg?: any): Arr<T>;
    /**
     * Returns the elements of an arr that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the arr.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     * @returns the filtered arr
     */
    filter<S extends T>(predicate: (value?: Nullable<T>, index?: number, arr?: Arr<T>) => value is S, thisArg: any = undefined): Arr<S> {
        const ret = new Arr<S>();
        let i = 0;
        for (let p in this)
            if (predicate.call(thisArg, this[p], i++, this))
                ret.push(<S>this[p]);
        return ret;
    }

    //would be nicer to define without [] but that's not possible
    /**
     * Combines two or more Arrs.
     * @param items Additional items to add to the end of the Arr
     * @returns the merged Arr
     */
    concat(...items: Arr<T>[]): Arr<T> {
        for (let a of items)
            if (a)
                for (let e of a) this.push(e);
        return this;
    }

    /**
     * Removes the last element from an Arr and returns it.
     * @returns the last Arrs element
     */
    pop(): Nullable<T> {
        if (this.#length == 0)
            return undefined;
        let a: Nullable<T> = this[this.#length - 1];
        delete this[this.#length - 1];
        this.#length -= 1;
        return a;
    }

    /**
     * Adds all the elements of an Arr separated by the specified separator string.
     * @param separator A string used to separate one element of an Arr from the next in the resulting String. If omitted, the Arr elements are separated with a comma.
     * @returns the joined string
     */
    join(seperator = ",") {
        let str = "";
        for (let i in this)
            str += seperator + this[i];
        return str;
    }

    /**
     * Reverses the elements in an Arr
     * @returns the reversed Arr
     */
    reverse(): Arr<T> {
        for (let i = 0; i < this.#length; ++i)
            this.unshift(this.pop());
        return this;
    }

    /**
     * Removes the first element from an Arr and returns it.
     * @returns the first element from the Arr
     */
    shift(): Nullable<T> {
        let ret = this[0];
        for (let i = 0; i < this.#length; ++i)
            this[i] = this[i + 1];
        delete this[--this.#length];
        return ret;
    }

    /**
     * Inserts a new element at the start of an Arr.
     * @param el element to insert at the start of the Arr.
     * @returns the new length of the Arr
     */
    unshift(el: Nullable<T>): number {
        for (let i = this.#length++; i >= 0; --i)
            this[i] = this[i - 1];
        this[0] = el;
        return this.#length;
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

    /**
    * Returns a string representation of an Arr.
    * @returns a string representation of an Arr.
    */
    toString(): string {
        let str = "";
        for (let i in this)
            str += `, ${this[i]}`;
        return str.slice(2, str.length);
    }

    /**
     * Returns a number representation of an Arr (it's length).
     * @returns a number representation of an Arr (it's length).
     */
    valueOf(): number {
        return this.#length;
    }

    static isArr(el: any): el is Arr<any> {
        return el instanceof Arr;
    }
}