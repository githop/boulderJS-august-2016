/**
 * Created by githop on 7/30/16.
 */

/*
First class functions are typically defined as 'first class' in the sense that they are like
the other data types available in JS; e.g. string, Boolean, etc..

In short, functions are expressions, just like strings, numbers or booleans.
Each of the following is a valid expression in JS:

'string';
0;
true;
[];
{};
() => 0;

Unlike strings, numbers, and booleans, functions are value by reference, just like arrays or objects.
To get the value out of a function you have to invoke it with parens ().

to convert a function into a statement, you can wrap it with parens, then you can
invoke it, also with parens.

One-lining a function by turning it into a statement is known as an IIFE, aka
Immediately Invoked Function Expression:
(() => 1)(); -> 1

(() => 1) === (() => 1) === false

(() => 1)() === (() => 1)() === true

we can see that functions, even if they represent the same value type,
are unique.

For all of the talk about the 'bad parts' in js, functions being first class is certainly one of the 'good parts'
Functions are essential computations that represent a value,
and being able to treat a computation like any other data type is a very powerful concept.

For starters, we can bind them to variables:
*/

const helloBoulderJS = (greeting) => `Hey BoulderJS: ${greeting}`;
console.log(helloBoulderJS('My first function Binding!'));
//-> Hey BoulderJS: My first function Binding!

//Kinda contrived, here's an example of a pattern where you can see it in action:
//the revealing module pattern:

// export const aModule = (prefix:string = 'Hey BoulderJS:') => {
//   const _followUp:string = 'Private Prop!';
//   //exported or 'public' function
//   const helloBoulderJS = (greeting:string) => console.log(prefix, greeting, _followUp);
//
//   return {helloBoulderJS}
// };
//
// //Somewhere else...
//
// import {aModule} from './firstClass'
// aModule().helloBoulderJS('Revealing Module Pattern!');
//-> Hey BoulderJS: Revealing Module Pattern! Private Prop!

//Pro tip: don't ever do this:
// const aPointlessWrapper = (aVal) => {
//   aModule().helloBoulderJS(aVal);
// };

// aPointlessWrapper('Lame!');
//-> Hey BoulderJS: Lame! Private Prop!

//Do this instead:
// const aWrapper = aModule().helloBoulderJS;
// aWrapper('Awesome!');
//-> Hey BoulderJS: Awesome! Private Prop!


//Might not seem like a big deal, but it is fundamental

// const greetFolks = helloBoulderJS;
//
// //we can call pass them arguments when calling them...
// helloBoulderJS('I hope you enjoy the show!');
// greetFolks('Welcome everyone!');
// //greetFolks is pretty redundant, but i set it up like this to show delayed execution and arguments
// //const greetFolks = helloBoulderJS; notice no parens?
// //A lot of times you will see code like this:
// const sayHi = (greeting:string) => greetFolks(greeting);
// sayHi('HI!!');
//
// //sayHi and greetFolks are identical, except sayHi will be harder to maintain.
// //example, say we change helloBoulderJS to take a second arg
// const hiBoulderJS = (greeting:string, followUp:string) => console.log('Hey BoulderJS: ', greeting, followUp);
// const greetWithFollowUp = hiBoulderJS;
// const sayHello = (greeting:string, followUp:string) => greetWithFollowUp(greeting, followUp);
//
// hiBoulderJS('Welcome Everyone!', 'I hope you enjoy the show!');
// //we can use greetWithFollowUp no matter how many more args we add and not have to
// //change anything
// greetWithFollowUp('Thanks for coming tonight.', 'We have a good night planned');
// //we would have to change the function signature to sayHello each time we add a new parameter.
// sayHello('THis one is not so much.', 'Fun to maintain');
//
// //a lot of times we'll find ourselves wrapping functions with other functions, sometimes it
// //may not be necessary and just increases effort, like with sayHello above.

// export {hiBoulderJS};