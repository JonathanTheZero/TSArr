"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const a = new _1.Arr({ a: 7 }, { a: 6 }, 2, 3);
const b = [1, 2, 3, { a: 5 }];
console.log(a.filter(el => !isNaN(Number(el))));
