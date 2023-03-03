const fs = require('fs');
const FFT = require('fft.js');
 
// read audio data from a file
const audioData = fs.readFileSync('audio.wav');
 
// create a new `FFT` instance, passing in the audio data
const fft = new FFT(audioData);
 
// calculate the FFT
const fftData = fft.calculateFFT();
 
// extract text from audio
const text = fftData.map(freq => {
  // some logic to convert frequency data to text
});

console.log(text); // output the extracted text