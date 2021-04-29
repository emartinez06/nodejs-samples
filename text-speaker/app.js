// Import dependencies
const say = require("say");

// Use default system voice and speed
say.speak("NodeJS is awesome");

// Set speech velocity
// say.speak("Hello!", "", 0.5);

// Stop the text speech
// say.stop();

// Exporting speech to file
const filename = "speech.wav";
say.export("Hello!", "", 0.75, filename, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log(`Text has been saved to ${filename}`);
});