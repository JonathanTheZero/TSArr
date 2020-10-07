import { Arr } from "./";

const a = new Arr<number | { a: number }>({ a: 7 }, { a: 6 }, 2, 3);
console.log(a);
console.log(a.reverse())