# AI講故事睡前陪伴

## 📘 專案簡介  
**SleepyMate** 是一款結合 AI 故事生成、語音播放與燈光互動的創新入睡輔助裝置，專為需要情感陪伴與睡前放鬆的使用者設計。此裝置會透過 Google Gemini API 根據使用者需求即時生成客製化的睡前小故事，搭配文字轉語音（TTS）技術將故事以自然語音播放，同時驅動 LED 進入柔和、規律的「呼吸燈」模式，營造一個舒緩、安心的入眠環境。

SleepyMate 不僅是單純的 AI 裝置，更是一位溫柔的數位說書人，幫助使用者從緊繃的日常中抽離，進入放鬆的夜晚儀式。其設計注重互動性與溫度感，使用者可透過按鈕、語音等方式啟動流程，系統則會智慧地串接語音輸出與燈光節奏，創造出節拍一致的「聲光共感」體驗，幫助大腦和情緒進入睡眠狀態。

該專案也可保留高度擴充性，未來可加入不同語音語調風格、睡前音樂、香氛模組、情緒偵測等功能，成為居家助眠的一站式解決方案。

---

## 🎯 設計動機  
現代人面對龐大的生活與工作壓力，導致失眠、焦慮與入睡困難等問題愈發普遍。根據研究，穩定的入眠過程需要一段緩衝期，包含放鬆情緒、遠離螢幕與進入儀式感。傳統的睡前儀式如閱讀、冥想或聽音樂，雖然有效，但無法針對孤獨感與心理壓力提供主動的情緒支持。

SleepyMate 的設計靈感源於這樣的需求——希望打造一個「有溫度的科技陪伴者」，讓使用者在夜深人靜時，仍能透過一段量身定制的睡前故事與溫柔的語音，感受到陪伴與放鬆。透過結合 AI 語言模型與硬體互動（語音＋燈光），SleepyMate 模擬出一種熟悉又平靜的入眠氛圍，如同父母講故事哄孩子入睡的安心感，回應人們對「情緒性陪伴」的深層需求。

我們希望 SleepyMate 不只是工具，更是一位「能與你一起靜靜入睡的朋友」。

---

## 👤 使用對象  
- 獨居者與青年租屋族群
    獨自生活者常在深夜缺乏陪伴與心理慰藉，SleepyMate 能成為他們日常中的「情感緩衝器」，幫助安心入睡。
- 兒童與父母共用族群
   忙碌家長無法時時陪伴孩子入眠，SleepyMate 可作為「數位說故事夥伴」，在孩子睡前建立規律的安心儀式，輔助睡眠習慣建立。 
- 長期壓力工作者 / 學生
  白天高壓學習與工作者，在入睡前經常無法快速放鬆，透過故事與燈光的引導進入節奏平穩的休息狀態，有助紓壓與睡眠品質提升。
- 情緒障礙或輕度焦慮患者
  柔和語音與一致節奏的呼吸燈光節奏，對焦慮者具有一定的鎮靜作用，是輔助睡前情緒穩定的自然工具。
---


## 🛏️ 應用情境  
1. 使用者觸發裝置（按鍵 / 語音）  
2. 系統自動生成睡前故事  
3. 播放語音故事並啟動 LED 呼吸燈  
4. 故事播放結束，燈光逐漸熄滅，協助自然入睡  
## 模擬情境

SleepyMate 設計為一款簡單易用的入睡陪伴裝置，能夠自然融入各種睡前場景，幫助使用者放鬆心情，平靜入眠：

### 🌙 情境一：獨自入睡的青年  
下班後的小雨回到租屋處，感到身心疲憊。她輕觸裝置按鈕，SleepyMate 透過 Gemini API 生成一段溫暖的睡前故事，同時 LED 燈光開始柔和呼吸節奏。語音緩緩講述故事，小雨隨著故事與燈光節奏漸漸放鬆，安心入睡。

### 🧸 情境二：親子共眠的睡前時光  
忙碌的爸爸阿哲回到家，陪伴孩子準備上床睡覺。他們一起啟動 SleepyMate，選擇有趣的動物冒險故事。故事語音播放時，燈光模擬森林場景的溫暖色調，孩子專注聽著，慢慢被故事催眠進入夢鄉。

### 🎧 情境三：壓力大的學生放鬆助眠  
期末考將至，大學生小明感到緊張焦慮。晚間，他用語音啟動 SleepyMate，請求一個放鬆的睡前故事。系統即刻生成一段與海洋與自然呼吸節奏相關的故事，搭配緩慢變化的藍色呼吸燈，幫助他放鬆心情，順利入睡。

---

## 🌟 核心功能  
- 使用 **Gemini API** 生成即時故事  
- 故事透過 **TTS（Text-to-Speech）** 技術語音播放  
- **Arduino** 控制 LED 進入節奏化的呼吸燈模式  
- 整合感應按鈕或語音觸發機制  

---

## 🛠️ 系統架構流程  
<pre>
[使用者觸發]
      ↓
[Gemini API 請求故事]
      ↓
[TTS 模組語音播放]
      ↓
[Arduino 控制 LED 呼吸燈]
      ↓
[故事結束 → 燈光漸暗 → 系統休眠]
</pre>pre>
## 🔧 使用材料（簡單版）  
- Arduino Uno / Nano  
- LED（暖白燈條或 RGB 模組）  
- Wi-Fi 模組（如 ESP32）  
- 喇叭與播放裝置（TTS 播放）  
- 按鍵模組或語音感應器  

## 💻 開發工具  
- Arduino IDE  
- Python / Node.js（處理 API 與語音播放）  
- Gemini API  
- Google TTS / Coqui TTS / Amazon Polly  
- Fritzing（電路繪圖）

## ✨ 專案特色  
- 整合 AI + 硬體，創造沉浸式入睡體驗  
- 燈光與語音同步，節奏平穩，具情境感  
- 可擴充故事主題、播放語氣、語速等細節  
- 模組化設計，未來可加裝香氛或溫度模組

## 📈 預期成果  
- 製作一款能語音播放故事並控制燈光的原型裝置  
- 測試 AI 故事生成與播放流程順暢性  
- 收集使用者回饋優化故事風格與語音互動體驗

## 🚀 未來應用  
- 擴充為智慧家庭助眠模組  
- 整合情緒偵測、自動切換故事風格  
- 加入親子共讀、互動選擇故事分支功能  
- 製作療癒陪伴型 AI 應用裝置
