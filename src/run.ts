import Arr from "./Arr";

/*const a = new Arr<number>(2, 4, 3, 53, 1);
a.push(1, 2, 3);
console.log(a);
for(let b of a){
    console.log(b);
}

console.log(...a);

a.concat(new Arr<number>(1, 2, 3));
console.log(a.length);
console.log(a);
console.log(a.pop());
console.log(a);*/

const b = new Arr({ a: 7 }, { a: 8});
console.log(b);
console.log(b.pop());
console.log(b);