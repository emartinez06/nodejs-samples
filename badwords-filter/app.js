//Dependencies
const Filter = require("bad-words");

//Instantiate filter
const filter = new Filter();

// https://www.cs.cmu.edu/~biglou/resources/
// Add extra words to the bad words list
const words = require("./dictionary/badwords.json");
filter.addWords(...words);

//Remove words
//filter.removeWords('hells', 'hell','sadist');

//Test filters
console.log(filter.clean("Don't be an ash0le"));
console.log(filter.clean("Hello people of Mars"));
console.log(filter.clean("Curse you mother fucker"));
console.log(filter.clean("Whats up shit ass"));
console.log(filter.clean("This fucking product is unbelievable"));
console.log(filter.clean("Yo bitch"));
console.log(filter.clean("Hello people of Earth"));