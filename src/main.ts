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
const defaultOption = document.getElementById('default-option') as HTMLOptionElement;

// Check web browser if speechSynthesis supported
if ("speechSynthesis" in window) {
     displayStatus.innerText = 'Text-To-Speech';
} else {
     displayStatus.innerText = 'Your browser does not support TexToSpeech';
}

// Event Listeners
ttsForm.addEventListener('submit', handleSubmit);
textInput.addEventListener('change', handleChange);
pauseBtn.addEventListener('click', handlePause);
resumeBtn.addEventListener('click', handleResume);
// TTS
function speak(): SpeechSynthesisUtterance {
     const utterThis = new SpeechSynthesisUtterance(text);
     const synth: SpeechSynthesis = window.speechSynthesis;

     // Get voices
     const voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

     // get selected option
     let selectedOption: string = voiceSelect.selectedOptions[0].getAttribute("data-name");
     
     if (selectedOption === 'default') {
          return;
     } else {
          defaultOption.classList.remove('show');
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
     pauseBtn.classList.add('show');
     resumeBtn.classList.remove('show');
}
function handleChange(): void {
     const newText: string = textInput.value;
     text = newText;
}
function handlePause(event: MouseEvent): void {
     event.preventDefault();
     speechSynthesis.pause();
     pauseBtn.classList.remove('show');
     resumeBtn.classList.add('show');
}
function handleResume(event: MouseEvent): void {
     event.preventDefault();
     speechSynthesis.resume();
     pauseBtn.classList.add('show');
     resumeBtn.classList.remove('show');
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