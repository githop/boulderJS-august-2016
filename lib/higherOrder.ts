/**
 * Created by githop on 7/30/16.
 */
/*
since functions are first class, we can pass them to functions
like we would with any other value.

call greeter simply accepts a function and returns a function which will apply the arguments
to the initial function
*/
const hiBoulderJS = (greeting:string, followUp:string) => console.log('Hey BoulderJS: ', greeting, followUp);
// const callGreeter = (fn) => (greeting:string, followUp:string) => fn(greeting, followUp);
// const HelloMeetup = callGreeter(hiBoulderJS);

// HelloMeetup('Howdy!', 'Having Fun?');
//-> Hey BoulderJS: Howdy! Having Fun?

/*
callGreeter also returns a function
Higher-order functions are defined as functions that either accept a function as an argument or
return a function
*/