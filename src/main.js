// HTML Elements
const textInput = document.getElementById('text-input');
const speakBtn = document.getElementById('speak-btn');
let displayStatus = document.getElementById('display-status');
const ttsForm = document.getElementById('tts-form');

// Check web browser if speechSynthesis supported
if ("speechSynthesis" in window) {
     displayStatus.innerText = 'Supported';
} else {
     displayStatus.innerText = 'Not Supported';
}

// Event Listeners
ttsForm.addEventListener('submit', (event) => {
     handleOnSubmit(event);
});

// Functions
function speak(text) {
     const synth = window.speechSynthesis;
     const utterance = new SpeechSynthesisUtterance(text);
     synth.speak(utterance);
     return;
}
function handleOnSubmit(event) {
     event.preventDefault();
     const text = textInput.value;
     speak(text);
     return;
}