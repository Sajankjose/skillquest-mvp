const chatWindow = document.getElementById('chatWindow');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const delay = ms => new Promise(r => setTimeout(r, ms));
function addMsg(sender, text) {
  const div = document.createElement('div');
  div.className = 'msg ' + sender;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

let state = { step: 0, role: '', score: 0 };

async function respond(text) {
  const lower = text.toLowerCase();

  // Step 1: Greeting
  if (state.step === 0) {
    addMsg('bot', "Great! Let’s start. Are you a Relationship Manager or Branch Ops?");
    state.step = 1;
    return;
  }

  // Step 2: Role selection
  if (state.step === 1) {
    if (lower.includes('rm')) {
      state.role = 'RM';
      addMsg('bot', "Welcome, Relationship Manager! Your first quest: Communication Skills 🗣️");
    } else if (lower.includes('ops')) {
      state.role = 'OPS';
      addMsg('bot', "Welcome, Branch Ops! Your first quest: Compliance Mindset 🧾");
    } else {
      addMsg('bot', "Please type RM or OPS to continue.");
      return;
    }
    await delay(700);
    addMsg('bot', "Question 1️⃣: What’s most important when talking to a client?");
    addMsg('bot', "A) Talking fast  B) Active listening  C) Giving advice immediately");
    state.step = 2;
    return;
  }

  // Step 3: Question 1
  if (state.step === 2) {
    if (lower.includes('b')) {
      state.score++;
      addMsg('bot', "✅ Correct! Active listening builds trust.");
    } else {
      addMsg('bot', "❌ Not quite. Active listening builds trust.");
    }
    await delay(700);
    addMsg('bot', "Question 2️⃣: When a client raises an objection, you should…");
    addMsg('bot', "A) Defend immediately  B) Pause, understand, and reframe  C) Ignore");
    state.step = 3;
    return;
  }

  // Step 4: Question 2
  if (state.step === 3) {
    if (lower.includes('b')) {
      state.score++;
      addMsg('bot', "✅ Great! That’s the right approach.");
    } else {
      addMsg('bot', "❌ Almost. The best approach is to pause and reframe.");
    }
    await delay(700);
    const xp = state.score * 10;
    addMsg('bot', `🎉 You finished your quest with ${xp} XP!`);
    await delay(500);
    if (state.score === 2) addMsg('bot', "🏅 Badge Unlocked: Communication Pro!");
    else addMsg('bot', "👏 Good start! Next time, you’ll earn a badge.");

    await delay(800);
    addMsg('bot', "Ready for your next skill quest?");
    addMsg('bot', "Type ‘Next Quest’ to continue or ‘Dashboard’ to see your progress.");
    state.step = 4;
    return;
  }

  // Step 5: Next or Dashboard
  if (state.step === 4) {
    if (lower.includes('next')) {
      addMsg('bot', "Coming soon: Negotiation Ninja Quest 🤝");
      return;
    } else if (lower.includes('dashboard')) {
      addMsg('bot', "Switching to your Manager Dashboard → Scroll down to view progress 📊");
      return;
    } else {
      addMsg('bot', "Type ‘Next Quest’ or ‘Dashboard’ to proceed.");
    }
  }
}

sendBtn?.addEventListener('click', async () => {
  const text = input.value.trim();
  if (!text) return;
  addMsg('user', text);
  input.value = '';
  await respond(text);
});

input?.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendBtn.click();
});

// Seed intro message
if (chatWindow && !chatWindow.children.length) {
  addMsg('bot', "Hi! I’m Milo 👋 Ready to start your SkillQuest?");
}
