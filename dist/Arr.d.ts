declare type Nullable<T> = T | null | undefined;
export declare class Arr<T> {
    #private;
    [x: number]: Nullable<T>;
    constructor(el: number);
    constructor(...el: T[]);
    /**
     * Appends new elements to an Arr, and returns the new length of the Arr.
     * @param items New elements of the Arr.
     * @returns The new length of the Arr
     */
    push(...el: Nullable<T>[]): number;
    get length(): number;
    set length(l: number);
    /**
     * Performs the specified action for each element in an Arr.
     * @param callback  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the Arr.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callback: (value: Nullable<T>, index: number, arr: this) => any, thisArg?: any): void;
    /**
     * Calls a defined callback function on each element of an arr, and returns an arr that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the arr.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     * @returns an arr of the mapped result
     */
    map<U>(callback: (value: Nullable<T>, index: number, arr: Arr<T>) => U, thisArg?: any): Arr<U>;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(predicate: (value?: T, index?: number, array?: Arr<T>) => unknown, thisArg?: any): Arr<T>;
    /**
     * Combines two or more Arrs.
     * @param items Additional items to add to the end of the Arr
     * @returns the merged Arr
     */
    concat(...items: Arr<T>[]): Arr<T>;
    /**
     * Removes the last element from an Arr and returns it.
     * @returns the last Arrs element
     */
    pop(): Nullable<T>;
    /**
     * Adds all the elements of an Arr separated by the specified separator string.
     * @param separator A string used to separate one element of an Arr from the next in the resulting String. If omitted, the Arr elements are separated with a comma.
     * @returns the joined string
     */
    join(seperator?: string): string;
    /**
     * Reverses the elements in an Arr
     * @returns the reversed Arr
     */
    reverse(): Arr<T>;
    /**
     * Removes the first element from an Arr and returns it.
     * @returns the first element from the Arr
     */
    shift(): Nullable<T>;
    /**
     * Inserts a new element at the start of an Arr.
     * @param el element to insert at the start of the Arr.
     * @returns the new length of the Arr
     */
    unshift(el: Nullable<T>): number;
    [Symbol.iterator](): {
        next(): {
            value: Nullable<T>;
            done: boolean;
        };
    };
    [Symbol.toStringTag](): string;
    /**
    * Returns a string representation of an Arr.
    * @returns a string representation of an Arr.
    */
    toString(): string;
    /**
     * Returns a number representation of an Arr (it's length).
     * @returns a number representation of an Arr (it's length).
     */
    valueOf(): number;
    static isArr(el: any): el is Arr<any>;
}
export {};
