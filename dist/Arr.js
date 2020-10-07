"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _length;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arr = void 0;
class Arr {
    constructor() {
        _length.set(this, 0);
        if (arguments.length == 1 && typeof arguments[0] === "number") {
            for (let i = 0; i < arguments[0]; ++i)
                this.push(undefined);
        }
        else
            for (let a of arguments)
                this.push(a);
    }
    /**
     * Appends new elements to an Arr, and returns the new length of the Arr.
     * @param items New elements of the Arr.
     * @returns The new length of the Arr
     */
    push(...el) {
        let i = Object.keys(this).length;
        for (let a of el)
            this[i++] = a;
        __classPrivateFieldSet(this, _length, __classPrivateFieldGet(this, _length) + el.length);
        return __classPrivateFieldGet(this, _length);
    }
    get length() {
        if (Object.keys(this).length != __classPrivateFieldGet(this, _length))
            __classPrivateFieldSet(this, _length, Object.keys(this).length);
        return __classPrivateFieldGet(this, _length);
    }
    set length(l) {
        if (l < __classPrivateFieldGet(this, _length)) {
            for (let i in this)
                if (!isNaN(Number(i)) && Number(i) >= l)
                    delete this[i];
        }
        else if (l > __classPrivateFieldGet(this, _length))
            for (let i = __classPrivateFieldGet(this, _length); i < l; ++i)
                this[i] = undefined;
        __classPrivateFieldSet(this, _length, l);
    }
    /**
     * Performs the specified action for each element in an Arr.
     * @param callback  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the Arr.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callback, thisArg = undefined) {
        let i = 0;
        for (let p in this)
            callback.call(thisArg, this[p], i++, this);
    }
    //would be nicer to define without [] but that's not possible
    /**
     * Combines two or more Arrs.
     * @param items Additional items to add to the end of the Arr
     * @returns the merged Arr
     */
    concat(...items) {
        for (let a of items)
            if (a)
                for (let e of a)
                    this.push(e);
        return this;
    }
    /**
     * Removes the last element from an Arr and returns it.
     * @returns the last Arrs element
     */
    pop() {
        if (__classPrivateFieldGet(this, _length) == 0)
            return undefined;
        let a = this[__classPrivateFieldGet(this, _length) - 1];
        delete this[__classPrivateFieldGet(this, _length) - 1];
        __classPrivateFieldSet(this, _length, __classPrivateFieldGet(this, _length) - 1);
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
    reverse() {
        for (let i = 0; i < __classPrivateFieldGet(this, _length); ++i)
            this.unshift(this.pop());
        return this;
    }
    /**
     * Removes the first element from an Arr and returns it.
     * @returns the first element from the Arr
     */
    shift() {
        let ret = this[0];
        for (let i = 0; i < __classPrivateFieldGet(this, _length); ++i)
            this[i] = this[i + 1];
        delete this[__classPrivateFieldSet(this, _length, +__classPrivateFieldGet(this, _length) - 1)];
        return ret;
    }
    /**
     * Inserts a new element at the start of an Arr.
     * @param el element to insert at the start of the Arr.
     * @returns the new length of the Arr
     */
    unshift(el) {
        var _a;
        for (let i = (__classPrivateFieldSet(this, _length, (_a = +__classPrivateFieldGet(this, _length)) + 1), _a); i >= 0; --i)
            this[i] = this[i - 1];
        this[0] = el;
        return __classPrivateFieldGet(this, _length);
    }
    [(_length = new WeakMap(), Symbol.iterator)]() {
        let step = 0, length = __classPrivateFieldGet(this, _length);
        const getVal = (index) => this[index];
        return {
            next() {
                if (step < length)
                    return { value: getVal(step++), done: false };
                return { value: null, done: true };
            }
        };
    }
    [Symbol.toStringTag]() {
        return "Arr";
    }
    /**
    * Returns a string representation of an Arr.
    * @returns a string representation of an Arr.
    */
    toString() {
        let str = "";
        for (let i in this)
            str += `, ${this[i]}`;
        return str.slice(2, str.length);
    }
    /**
     * Returns a number representation of an Arr (it's length).
     * @returns a number representation of an Arr (it's length).
     */
    valueOf() {
        return __classPrivateFieldGet(this, _length);
    }
    static isArr(el) {
        return el instanceof Arr;
    }
}
exports.Arr = Arr;
