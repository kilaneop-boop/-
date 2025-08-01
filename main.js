const app = document.getElementById("app");

let step = 0;
let score = 0;
let currentQuestion = 0;
let name = "", classRoom = "", number = "";

let userData = JSON.parse(localStorage.getItem("leaderboard") || "[]");

function saveScore() {
  // บันทึกคะแนนของผู้เล่นคนนี้
  userData.push({ name, classRoom, number, score });
  // เรียงจากคะแนนสูงไปต่ำ
  userData.sort((a, b) => b.score - a.score);
  // เก็บกลับ localStorage
  localStorage.setItem("leaderboard", JSON.stringify(userData));
}

function render() {
  app.innerHTML = "";
  const div = document.createElement("div");
  div.className = "container";

  if (step === 0) {
    div.innerHTML = `
      <h1>พอลิเมอร์ชายสี่</h1>
      <p>ครูโยนความรู้มา ดีที่ผมหลบทัน🔥🔥</p>
      <button onclick="step++; render()">ถัดไป</button>
    `;
  } else if (step === 1) {
    div.innerHTML = `
      <p>ชื่อ: <input id="name" value="ชินบุตร สุทธิทรัพย์" /></p>
      <p>ชั้น: <input id="class" value="6/2" /></p>
      <p>เลขที่: <input id="no" value="8" /></p>
      <button onclick="
        name=document.getElementById('name').value;
        classRoom=document.getElementById('class').value;
        number=document.getElementById('no').value;
        step++; render();
      ">ถัดไป</button>
    `;
  } else if (step === 2) {
    div.innerHTML = `
      <p>มีความรู้แค่ไหนกันเชียววะ มาแข่งกันหน่อย</p>
      <button onclick="step++; render()">เริ่มเกม</button>
    `;
  } else if (step === 3) {
    if (currentQuestion >= questions.length) {
      step++;
      saveScore();
      render();
      return;
    }
    let q = questions[currentQuestion];
    div.innerHTML = `<div class="card"><p>${currentQuestion + 1}. ${q.question}</p></div>`;
    q.choices.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        if (i === q.answer) score++;
        currentQuestion++;
        if (currentQuestion === 15) {
          alert("อยากได้ตัวช่วยรึป่าว?\n\nไม่ให้อะถามไปงั้นๆ 😎");
        }
        render();
      };
      div.appendChild(btn);
    });
  } else {
    div.innerHTML = `
      <h2>คุณได้ ${score} คะแนน</h2>
      <div class="leader">
        <h3>🏆 อันดับสูงสุด</h3>
    `;
    userData.slice(0, 3).forEach((u, i) => {
      const rank = ["🥇", "🥈", "🥉"][i] || "";
      div.innerHTML += `<p>${rank} ${u.name} (${u.classRoom}/${u.number}) - ${u.score} คะแนน</p>`;
    });
    div.innerHTML += `</div>`;
  }

  app.appendChild(div);
}

render();
