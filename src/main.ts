//=========HTML Elements=========
const displayStatus = document.getElementById('display-status') as HTMLHeadingElement;
//=========Form=========
const ttsForm = document.getElementById('tts-form') as HTMLFormElement;
// Text
const textInput = document.getElementById('text-input') as HTMLInputElement;
let text: string = textInput.value;
// Buttons
const speakBtn = document.getElementById('speak-btn') as HTMLInputElement;
const pauseBtn = document.getElementById('pause-btn') as HTMLInputElement;
const resumeBtn = document.getElementById('resume-btn') as HTMLInputElement;
// Voice Selection
const voiceSelect = document.getElementById('voiceSelect') as HTMLSelectElement;

// Check web browser if speechSynthesis supported
if ("speechSynthesis" in window) {
     displayStatus.innerText = 'Supported';
} else {
     displayStatus.innerText = 'Not Supported';
}

// Event Listeners
ttsForm.addEventListener('submit', handleSubmit);
textInput.addEventListener('change', handleChange);
// TTS
function speak(): SpeechSynthesisUtterance {
     const utterThis = new SpeechSynthesisUtterance(text);
     const synth: SpeechSynthesis = window.speechSynthesis;

     // Get voices
     const voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

     // get selected option
     let selectedOption: string = voiceSelect.selectedOptions[0].getAttribute("data-name");
     if (selectedOption === 'default show') {
          return;
     }

     for (let i: number = 0; i < voices.length; i++) {
          if (voices[i].name === selectedOption) {
               utterThis.voice = voices[i];
          }
     }

     synth.speak(utterThis);
     return utterThis;
}

function handleSubmit(event: MouseEvent): void {
     event.preventDefault();
     speak();
     textInput.blur();
}
function handleChange(event: Event): void {
     const newText: string = textInput.value;
     text = newText;
}

// Get all voices
function populateVoiceList(): void {
     if (typeof speechSynthesis === "undefined") {
          console.log('undefined');
          return;
     }

     // Get voices
     const voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

     for (let i: number = 0; i < voices.length; i++) {
          const option = document.createElement('option') as HTMLOptionElement;
          option.textContent = `${voices[i].name} - ${voices[i].lang}`;
          
          // Default Voice
          if (voices[i].default) {
               option.textContent += ' (Default)';
          }
          
          option.setAttribute('data-lang', voices[i].lang);
          option.setAttribute('data-name', voices[i].name);
          // Display voices
          document.getElementById("voiceSelect").appendChild(option);
     }
};

function onvoiceschanged(): void {
     if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = populateVoiceList;
     }
};
populateVoiceList();
onvoiceschanged();