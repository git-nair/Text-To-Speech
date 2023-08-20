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
const defaultOption = document.getElementById('default-option');
// Check web browser if speechSynthesis supported
if ("speechSynthesis" in window) {
    displayStatus.innerText = 'Text-To-Speech';
}
else {
    displayStatus.innerText = 'Your browser does not support TexToSpeech';
}
// Event Listeners
ttsForm.addEventListener('submit', handleSubmit);
textInput.addEventListener('change', handleChange);
pauseBtn.addEventListener('click', handlePause);
resumeBtn.addEventListener('click', handleResume);
// TTS
function speak() {
    const utterThis = new SpeechSynthesisUtterance(text);
    const synth = window.speechSynthesis;
    // Get voices
    const voices = speechSynthesis.getVoices();
    // get selected option
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    if (selectedOption === 'default') {
        return;
    }
    else {
        defaultOption.classList.remove('show');
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
    pauseBtn.classList.add('show');
    resumeBtn.classList.remove('show');
}
function handleChange() {
    const newText = textInput.value;
    text = newText;
}
function handlePause(event) {
    event.preventDefault();
    speechSynthesis.pause();
    pauseBtn.classList.remove('show');
    resumeBtn.classList.add('show');
}
function handleResume(event) {
    event.preventDefault();
    speechSynthesis.resume();
    pauseBtn.classList.add('show');
    resumeBtn.classList.remove('show');
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