import { Arr } from "./";

const a = new Arr<number>(1, 2, 3);
a.length = 10;
console.log(a);
console.log(a.length);
a.unshift(3);
console.log(a);
console.log(a.length);