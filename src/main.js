// HTML Elements
const textInput = document.getElementById('text-input');
let displayStatus = document.getElementById('display-status');
const ttsForm = document.getElementById('tts-form');
const synth = window.speechSynthesis;
const voiceSelect = document.getElementById('voiceSelect');

const speakBtn = document.getElementById('speak-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
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
pauseBtn.addEventListener('click', (event) => {
     event.preventDefault();
     synth.pause();
})
resumeBtn.addEventListener('click', (event) => {
     event.preventDefault();
     synth.resume();
})

// Functions
function handleOnSubmit(event) {
     event.preventDefault(event);
     const text = textInput.value;
     speak(text);
     return;
}

function speak(text) {
     const utterance = new SpeechSynthesisUtterance(text);
     synth.speak(utterance);
     return;
}


function populateVoiceList() {
     if (typeof speechSynthesis === "undefined") {
          return;
     }

     const voices = speechSynthesis.getVoices();

     for (let i = 0; i < voices.length; i++) {
          const option = document.createElement('option');
          option.textContent = `${voices[i].name} - ${voices[i].lang}`;

          if (voices[i].default) {
               option.textContent += ' (Default)';
          }

          option.setAttribute('data-lang', voices[i].lang);
          option.setAttribute('data-name', voices[i].name);
          document.getElementById("voiceSelect").appendChild(option);
     }
}

function onVoicesChanged() {
     if (speechSynthesis.onvoiceschanged !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = populateVoiceList;
     }
}

populateVoiceList();
onVoicesChanged();