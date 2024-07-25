function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function typingEffect(element, text, i=0) {
  if (i === 0) {
      element.textContent = "";
      document.getElementById('character').src = "characterTalking.gif";
  }
  element.textContent += text[i];
  if (i === text.length - 1) {
      document.getElementById('character').src = "characterStatic.gif";
      chatPhase++;
      return;
  }
  setTimeout(() => typingEffect(element, text, i + 1), 35);
}

var chatPhase = 1;

addEventListener("DOMContentLoaded", event => {
  document.getElementById('textEntry').hidden = true;
  document.getElementById('continue').hidden = true;
  aboutConvo();
});
function aboutConvo() {
  const box = document.querySelector('.chat');
  const text1 = "Some info about this program, since you're curious. All code used was independantly developed with occasional references to common public-access sources. The background image was sourced from SmokyJack on DeviantArt, and is titled \"Animated Pixel Scene Commission.\" The character that you see before you talking is a piece done by Reddit user PityAction in the r/PixelArt subreddit, titled \"Talking Sprite.\""
  typingEffect(box, text1);
}

function advance() {
  switch(chatPhase) {
      case 2:
          convoPhaseTwo();
          break;
      case 3:
          convoPhaseThree();
          break;
  }
}

function convoPhaseTwo() {
  
}

function convoPhaseThree() {
  
}