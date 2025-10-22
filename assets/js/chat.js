document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  function addMsg(sender, text) {
    const div = document.createElement("div");
    div.className = "msg " + sender;
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  let state = { step: 0, role: "", score: 0 };

  async function respond(text) {
    const lower = text.toLowerCase();

    if (state.step === 0) {
      addMsg("bot", "Great! Are you a Relationship Manager or Branch Ops?");
      state.step = 1;
      return;
    }

    if (state.step === 1) {
      if (lower.includes("rm")) {
        state.role = "RM";
        addMsg("bot", "Welcome, Relationship Manager! 🎯 Your first quest: Communication Skills");
      } else if (lower.includes("ops")) {
        state.role = "OPS";
        addMsg("bot", "Welcome, Branch Ops! 🧾 Your first quest: Compliance Mindset");
      } else {
        addMsg("bot", "Please type RM or OPS to continue.");
        return;
      }
      await delay(700);
      addMsg("bot", "Question 1️⃣: What’s most important when talking to a client?");
      addMsg("bot", "A) Talking fast  B) Active listening  C) Giving advice immediately");
      state.step = 2;
      return;
    }

    if (state.step === 2) {
      if (lower.includes("b")) {
        state.score++;
        addMsg("bot", "✅ Correct! Active listening builds trust.");
      } else {
        addMsg("bot", "❌ Not quite. The answer is Active listening.");
      }
      await delay(700);
      addMsg("bot", "Question 2️⃣: When a client raises an objection, you should…");
      addMsg("bot", "A) Defend immediately  B) Pause & reframe  C) Ignore");
      state.step = 3;
      return;
    }

    if (state.step === 3) {
      if (lower.includes("b")) {
        state.score++;
        addMsg("bot", "✅ Great! That’s the right approach.");
      } else {
        addMsg("bot", "❌ Almost. The best approach is to pause & reframe.");
      }
      await delay(500);
      const xp = state.score * 10;
      addMsg("bot", `🎉 You finished your quest with ${xp} XP!`);
      if (state.score === 2)
        addMsg("bot", "🏅 Badge Unlocked: Communication Pro!");
      else addMsg("bot", "👏 Good start! Try again to earn your badge.");
      await delay(800);
      addMsg("bot", "Ready for your next quest? Type ‘Next Quest’ or ‘Dashboard’.");
      state.step = 4;
      return;
    }

    if (state.step === 4) {
      if (lower.includes("next")) {
        addMsg("bot", "Coming soon: Negotiation Ninja Quest 🤝");
      } else if (lower.includes("dashboard")) {
        addMsg("bot", "Switching to your Dashboard → Scroll down 📊");
      } else {
        addMsg("bot", "Type ‘Next Quest’ or ‘Dashboard’ to continue.");
      }
    }
  }

  sendBtn?.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;
    addMsg("user", text);
    input.value = "";
    await respond(text);
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

  addMsg("bot", "Hi! I’m Milo 👋 Ready to start your SkillQuest?");
});
