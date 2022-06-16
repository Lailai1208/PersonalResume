const text = document.querySelectorAll(".thepath");

// 計算動畫 字元長度大小
for (let i = 0; i < text.length; i++) {
  console.log(`text number ${i} length is ${text[i].getTotalLength()}`);
}

// 設計動畫執行完，顯示其內容
const lastWord = document.querySelector("#twenty-fifth");
const animation = document.querySelector("div.animation");
lastWord.addEventListener("animationend", () => {
  animation.style = "tansiton: all 1s ease; opacity:0; pointer-events:none;";
});
