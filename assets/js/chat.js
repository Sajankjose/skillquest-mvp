const chatWindow = document.getElementById('chatWindow');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const delay = ms => new Promise(r => setTimeout(r, ms));
function addMsg(sender, text){ const div=document.createElement('div'); div.className='msg '+sender; div.textContent=text; chatWindow.appendChild(div); chatWindow.scrollTop=chatWindow.scrollHeight; }

const script = [
  { bot: "Great! What role are you focusing on today — RM or Branch Ops?" },
  { user: /rm|relationship/i, bot: "Nice. Here are your focus skills: Communication (L5), Problem Solving (L4). Ready for a 2-question quiz?" },
  { user: /ops|branch/i, bot: "Awesome. Focus skills: Process Accuracy (L5), Compliance Mindset (L4). Want a quick 2-question quiz?" },
];

async function respond(text){
  const last = script.find(s => s.user && s.user.test(text));
  if(last){ await delay(350); addMsg('bot', last.bot); return; }
  await delay(350); addMsg('bot', "Got it! Type ‘RM’ or ‘OPS’ to tailor your quest.");
}

sendBtn?.addEventListener('click', async () => {
  const text = input.value.trim(); if(!text) return;
  addMsg('user', text); input.value = '';
  await respond(text);
});
input?.addEventListener('keydown', e => { if(e.key==='Enter') sendBtn.click(); });

// seed intro if empty
if(chatWindow && !chatWindow.children.length){
  addMsg('bot', "Hi! I’m Milo 👋 Ready for your 5-minute skill quest?");
}
