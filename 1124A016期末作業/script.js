const API_KEY = 'AIzaSyCtrJBzaksitOSPgrORhbbhJqryC5pCUk8';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

let speechSynth = window.speechSynthesis;
let speechUtterance = null;

let port = null;
let reader = null;
let isArduinoConnected = false;

function updateStoryOutput(story) {
    const storyOutput = document.getElementById('storyOutput');
    const playButton = document.getElementById('playButton');
    const stopButton = document.getElementById('stopButton');
    const pauseButton = document.getElementById('pauseButton');
    
    storyOutput.innerText = story;
    playButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    pauseButton.style.display = 'none';
}

async function generateStory() {
    const prompt = document.getElementById('storyPrompt').value;
    const loadingMessage = document.getElementById('loadingMessage');
    const storyOutput = document.getElementById('storyOutput');

    if (!prompt) {
        alert('請輸入故事主題或關鍵字！');
        return;
    }

    loadingMessage.style.display = 'block';
    storyOutput.innerText = '';

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `請以下列主題生成一個適合睡前閱讀的溫馨短故事，長度約300字：${prompt}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const story = data.candidates[0].content.parts[0].text;
            updateStoryOutput(story);
        } else {
            storyOutput.innerText = '抱歉，故事生成失敗，請稍後再試。';
        }
    } catch (error) {
        console.error('Error:', error);
        storyOutput.innerText = '發生錯誤，請稍後再試。';
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function startVoiceInput() {
    const voiceStatus = document.getElementById('voiceStatus');
    const storyPrompt = document.getElementById('storyPrompt');

    // 檢查瀏覽器是否支援語音辨識
    if (!('webkitSpeechRecognition' in window)) {
        alert('抱歉，您的瀏覽器不支援語音輸入功能');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'zh-TW';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        voiceStatus.textContent = '正在聆聽...請說出故事主題';
        voiceStatus.style.color = 'green';
    };

    recognition.onend = () => {
        voiceStatus.textContent = '語音輸入結束';
        setTimeout(() => {
            voiceStatus.textContent = '';
        }, 2000);
    };

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        storyPrompt.value = result;
    };

    recognition.onerror = (event) => {
        voiceStatus.textContent = '語音輸入錯誤，請重試';
        voiceStatus.style.color = 'red';
        setTimeout(() => {
            voiceStatus.textContent = '';
        }, 2000);
    };

    recognition.start();
}

async function connectArduino() {
    try {
        if (port) {
            await port.close();
            port = null;
        }

        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        
        // 等待 Arduino 重置
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        isArduinoConnected = true;
        console.log('已連接 Arduino');
        
        // 發送初始測試命令
        const writer = port.writable.getWriter();
        await writer.write(new TextEncoder().encode('S'));
        writer.releaseLock();
        
        // 開始監聽 Arduino 回應
        startSerialRead();
        
    } catch (error) {
        console.error('Arduino 連接失敗:', error);
        alert('無法連接 Arduino，請檢查:\n1. LED 接線是否正確\n2. 是否已上傳程式\n3. 選擇正確的 COM 埠');
        isArduinoConnected = false;
    }
}

async function startSerialRead() {
    if (!port) return;
    
    const textDecoder = new TextDecoder();
    while (port.readable) {
        try {
            const reader = port.readable.getReader();
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const text = textDecoder.decode(value);
                console.log('Arduino 回應:', text);
            }
            reader.releaseLock();
        } catch (error) {
            console.error('讀取 Arduino 資料錯誤:', error);
            break;
        }
    }
}

async function sendToArduino(command) {
    if (!port || !isArduinoConnected) {
        console.log('嘗試連接 Arduino...');
        const shouldConnect = confirm('需要連接 Arduino 來控制 LED，是否連接？');
        if (shouldConnect) {
            await connectArduino();
            if (!isArduinoConnected) return;
        } else {
            return;
        }
    }

    try {
        const writer = port.writable.getWriter();
        console.log('發送指令到 Arduino:', command);
        await writer.write(new TextEncoder().encode(command));
        writer.releaseLock();
    } catch (error) {
        console.error('發送指令失敗:', error);
        isArduinoConnected = false;
        port = null;
    }
}

// 修改 playStory 函數
async function playStory() {
    const storyText = document.getElementById('storyOutput').innerText;
    if (storyText && !speechSynth.speaking) {
        if (!isArduinoConnected) {
            const shouldConnect = confirm('需要連接 Arduino 來控制 LED，是否現在連接？');
            if (shouldConnect) {
                await connectArduino();
            }
        }

        speechUtterance = new SpeechSynthesisUtterance(storyText);
        speechUtterance.lang = 'zh-TW';
        speechUtterance.rate = 0.9;
        speechUtterance.pitch = 1;

        speechUtterance.onend = async () => {
            document.getElementById('playButton').style.display = 'inline-block';
            document.getElementById('pauseButton').style.display = 'none';
            document.getElementById('stopButton').style.display = 'none';
            await sendToArduino('S');
        };

        await sendToArduino('P');
        speechSynth.speak(speechUtterance);
        document.getElementById('playButton').style.display = 'none';
        document.getElementById('pauseButton').style.display = 'inline-block';
        document.getElementById('stopButton').style.display = 'inline-block';
    }
}

// 修改 stopStory 函數
async function stopStory() {
    speechSynth.cancel();
    await sendToArduino('S');
    document.getElementById('playButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'none';
}

// 修改 pauseStory 函數
async function pauseStory() {
    if (speechSynth.speaking) {
        if (speechSynth.paused) {
            speechSynth.resume();
            await sendToArduino('P');
            document.getElementById('pauseButton').innerHTML = '<i class="fas fa-pause"></i> 暫停';
        } else {
            speechSynth.pause();
            await sendToArduino('S');
            document.getElementById('pauseButton').innerHTML = '<i class="fas fa-play"></i> 繼續';
        }
    }
}

// 頁面載入完成後自動連接 Arduino
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await connectArduino();
    } catch (error) {
        console.error('自動連接 Arduino 失敗:', error);
    }
});
