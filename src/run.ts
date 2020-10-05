import Arr from "./Arr";

const a = new Arr<number>(2, 4, 3, 53, 1);
a.push(1, 2, 3);
a.length = 2;
console.log(a)
a.length = 5;
console.log(a);