/**
 * Created by githop on 7/30/16.
 */

/*
now that we have covered currying, we can proceed to the
main part of my talk, functional composition

A lot of folks bring up the analogy of an assembly line
when talking about functional programming. It's a nice
analogy that encapsulates several aspects of functional
programming.

Each step in the assembly line can be thought of as a
function. The thing being produced in the factory being
sent down the assembly line is the data that the machines
a.k.a. the functions are acting on.
*/

/*
Here is a nice helper function called compose which I think
helps visualize the assembly line analogy.

It takes two functions, returns a function which asks for a
value, and will apply each function, from right to left
with the value passed in.
 */
const compose = (f, g) => {
  return (x) => f(g(x));
};

//a few functions to compose with ;)
// const toUpper = (s:string) => s.toUpperCase();
const joinUnder = (s:string) => s.split(' ').join('_');

const constify = compose(joinUnder, toUpper);

var boulderJs = constify('Boulder JS is awesome');

console.log(boulderJs);
//-> BOULDER_JS_IS_AWESOME

/*
If you start to dig into FP, you may come across the assembly line analogy.
As a product is carried down the assembly line, at each stop, the product is
slowly built up until it is fully assembled.

In FP, data is transformed with a series of functions, with the data being applied
by the current function, and the result passed to the next function to repeat the process
until the final result is reached.

you can read:
 const constify = compose(joinUnder, toUpper);

from right to left and see that data piping
through the functions.
 */

/*
I'm going to write a few helper functions in order
to help us on our path to composition ;)

a curry function which will allow us to write other helper functions that are auto-curried
iteratee first, data last. this way we can write a map function with the following signature:

map(fn, list);
map(fn)(list);

it also will work with functions of any arity.we can call it either way above, we typically will
curry map when we are using it with compose.
 */

const curry = (fn) => {
  return function _curry(...args:any[]) {
    return args.length >= fn.length ?
        fn.call(this, ...args) :
        (...rest:any[]) => _curry.call(this, ...args, ...rest);
  }
};

/*
The example I have picked out is to show some data transformations that are a little more complex
than the constify example above.

Have you guys heard of a slug, as it pertains to urls? They are a url friendly representation of a title.
it basically means removing whitespace from the string and replacing it withdashes '-',
also usually URLs are lowercase.

I'm going to write two functions, slugify and deslugify which are
themselves composed of several other functions, namely:
map, split, join, concat, toLower, head, tail, and a function called
titleize, which is basically a capitalized word for each word in a string.
 */


//join:: a -> [a] -> String
const join = curry((separator:string, list:any[]) => list.join(separator));
// concat:: a -> a -> a | [a] -> [a] -> [a]
const concat = curry((a, b) => a.concat(b));
//map:: (a -> b) -> [a] -> [b]
const map = curry((fn, list:any[]) => list.map(fn));
//split:: String -> String -> [String]
const split = curry((separator:string, s:string) => s.split(separator));
const toUpper = (s:string) => s.toUpperCase();
const toLower = (s:string) => s.toLowerCase();
const head = (x:any[] | string) => x.slice(0, 1)[0];
const tail = (x:any[] | string) => x.slice(1);

const titleize = (s:string) => {
  const _cap = (lowerCase:string) => concat(toUpper(head(lowerCase)), tail(toLower(lowerCase)));
  const composeTitles = compose(join(' '), compose(map(_cap) ,split(' ')));
  return composeTitles(s);
};

const slugify = compose(toLower, compose(join('-'), split(' ')));
const deSlugify = compose(titleize, compose(join(' '), split('-')));

const url = slugify('My First Blog Post');
const title = deSlugify(url);
const expectation = url === 'my-first-blog-post' && title === 'My First Blog Post';
console.log('TITLEIZE TEST:', expectation);
console.log('Url Slug:', url, 'Blog Title:', title);
//Url Slug: my-first-blog-post Blog Title: My First Blog Post


//join:: a -> [a] -> String
const join = curry((separator:string, list:any[]) => list.join(separator));
//split:: String -> String -> [String]
const split = curry((separator:string, s:string) => s.split(separator));
//toLower:: String -> String
const toLower = (s:string) => s.toLowerCase();
//head,tail:: String -> String | [a] -> [a]
const head = (x:any[] | string) => x.slice(0, 1)[0];
const tail = (x:any[] | string) => x.slice(1);

const slugify = compose(toLower, compose(join('-'), split(' ')));

slugify('My First Blog Post');
//-> my-first-blog-post;

//map:: (a -> b) -> [a] -> [b]
const map = curry((fn, list:any[]) => list.map(fn));
// concat:: a -> a -> a | [a] -> [a] -> [a]
const concat = curry((a, b) => a.concat(b));
//head,tail:: String -> String | [a] -> [a]
const head = (x:any[] | string) => x.slice(0, 1)[0];
const tail = (x:any[] | string) => x.slice(1);

const titleize = (s:string) => {
  const _cap = (word:string) => concat(toUpper(head(word)), tail(toLower(word)));
  const composeTitles = compose(join(' '), compose(map(_cap) ,split(' ')));
  return composeTitles(s);
};

const deSlugify = compose(titleize, compose(join(' '), split('-')));

deSlugify('my-first-blog-post');
//-> My First Blog Post

slugify('My First Blog Post');
//-> my-first-blog-post;
deSlugify('my-first-blog-post');
// -> My First Blog Post


