//=========HTML Elements=========
const displayStatus = document.getElementById('display-status');
//=========Form=========
const ttsForm = document.getElementById('tts-form');
// Text
const textInput = document.getElementById('text-input');
let text = textInput.value;
// Buttons
const speakBtn = document.getElementById('speak-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
// Voice Selection
const voiceSelect = document.getElementById('voiceSelect');
// Check web browser if speechSynthesis supported
if ("speechSynthesis" in window) {
    displayStatus.innerText = 'Supported';
}
else {
    displayStatus.innerText = 'Not Supported';
}
// Event Listeners
ttsForm.addEventListener('submit', handleSubmit);
textInput.addEventListener('change', handleChange);
// TTS
function speak() {
    const utterThis = new SpeechSynthesisUtterance(text);
    const synth = window.speechSynthesis;
    // Get voices
    const voices = speechSynthesis.getVoices();
    // get selected option
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    if (selectedOption === 'default show') {
        return;
    }
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }
    synth.speak(utterThis);
    return utterThis;
}
function handleSubmit(event) {
    event.preventDefault();
    speak();
    textInput.blur();
}
function handleChange(event) {
    const newText = textInput.value;
    text = newText;
}
// Get all voices
function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
        console.log('undefined');
        return;
    }
    // Get voices
    const voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement('option');
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
}
;
function onvoiceschanged() {
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
}
;
populateVoiceList();
onvoiceschanged();
//# sourceMappingURL=main.js.map