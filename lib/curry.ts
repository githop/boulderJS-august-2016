/**
 * Created by githop on 7/31/16.
 */

/*
Higher-order + first class functions unlock several powerful techniques
one being currying

currying may be intimidating when first learning, but by simply
playing around one can quickly absorb the essence.
rather than first trying to understand currying from an academic perspecitive (which i would encourage)
i'm going to jump into some code example to show how it can be useful
I used callGreeter previously to showcase higher-order fns
*/
const callGreeter = (fn) => (greeting:string, followUp:string) => fn(greeting, followUp);
//callGreeter is close to currying and i'm going to change it to make it 'curried' then i'll explain
const callGreeterCurried = (fn) => (greeting:string) => (followUp:string) => fn(greeting, followUp);

callGreeter((a, b) => console.log('Welcome to %s! %s', a, b))('BoulderJS', 'We have much in store!');
callGreeterCurried((a, b) => console.log('Welcome to %s! %s', a, b))('boulder')('We have much in store!');
//-> Welcome to boulder! We have much in store!

/*
the only change is that we now use a closure for each argument. This is important as,
currying requires returning a unary function for each argument until there are none left.
*/

//The classic example typically seen with currying is a curried add function:
const addCurried = (a) => (b) => a + b;
const add = (a, b) => a + b;

addCurried(4)(6);
add(4, 6);
//-> 10

/*
At first this looks to be more trouble than its actually worth, some may argue that curried add
is harder to use/reason about than the non-curried version. Getting value from curried functions somewhat
depends on function composition and curried functions are a lot easier to compose:
 */
const add4 = addCurried(4);
const ten = add4(6);
//-> 10

console.log(ten);

/*
Here we made used our addCurried with only half its arguments applied (4). Now we can
call add4 with the final argument and receive the computed value in return.

It may not seem very obvious how this can come in handy, but the concept of being able to
seed values for a function to use later is very powerful as we will see next.
 */

/*
here's what a curried map function would look like:
we take our iterator fn first, and our data last ;)
seems backwards but very important for what comes next
*/
// const cmap = (fn) => (list) => list.map(fn);
// const map = (fn, list) => list.map(fn);
// const log = (x) => console.log(x);
// const list = ['hello', 'boulder', 'js'];
//
// cmap(log)(list);
// map(log, list);


/*
as we can see, we call the curried map,
first with the log fn, then we pass the list next.
*/
