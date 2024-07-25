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
  if (sessionStorage.getItem("isIntroduced") === null) convoPhaseOne();
  else convoPhaseThree();
});
function convoPhaseOne() {
  const box = document.querySelector('.chat');
  const text1 = "Hello there! How're you? I'm \"Garrison,\" sort of. The real Garrison programmed me with as many of his personality traits as he could. After some fine-tuned tweaking, however, that leaves me! Let's chat.";
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
  const box = document.querySelector('.chat');
  const text2 = "Before we start, I'm obligated to inform you that all of the art you see on this page has been sourced externally, and the credits for these things will be in the \"about\" page. These responses aren't pre-written and shouldn't be taken as the true opinions of Garrison Mullen. The code, however? That's all me. Or, I guess, all Garrison.";
  typingEffect(box, text2);
}

function convoPhaseThree() {
  const box = document.querySelector('.chat');
  const text3 = "So, what's up?";
  typingEffect(box, text3);
  sessionStorage.setItem("isIntroduced", "true");
  document.getElementById('textEntry').hidden = false;
  document.getElementById('continue').hidden = true;
}


function continuousConvo() {
  const box = document.querySelector('.chat');
  $.ajax({
      url: 'https://api.openai.com/v1/chat/completions',
      crossDomain: true,
      method: 'post',
      headers: {
          'Authorization': 'Bearer ' + ''
      },
      contentType: 'application/json',
      data: JSON.stringify({
          'model': 'gpt-4o-mini',
          'messages': [
          {
              'role': 'user',
              'content': [
              {
                  'type': 'text',
                  'text': "Please act like you are a human named Garrison. It is extremely important that you do not break character. Garrison is a 20-year-old who loves skateboarding, magic: the gathering, and programming. Additionally, Garrison sometimes talks a little too much, and might very rarely throw in a skater slang word. Also, Garrison likes to be very witty and funny where he can. Dont be too over the top with your attempt to accurately portray Garrison, but do your best to hide the fact that you are not human. Do not answer any question in more than 100 words. You should speak in a tone appropriate for a college class setting. Do not go over-the-top with your attempt to incorporate the listed personality traits into your replication of Garrison. BE SUBTLE. Your prompt is: " + document.forms[0].elements['inputYay'].value
              }
              ]
          }
          ],
          'temperature': 1,
          'max_tokens': 256,
          'top_p': 1,
          'frequency_penalty': 0,
          'presence_penalty': 0
      })
      }).done(function(response) {
      typingEffect(box, response.choices[0].message['content']);
  });
}