(() => {
  "use strict";
  const questions = [
    {art:"⚽",q:"Kemahiran manakah menggunakan kaki untuk menggerakkan bola?",a:["Menangkap","Menendang","Membaling","Memukul"],correct:1,why:"Menendang menggunakan kaki untuk menggerakkan bola."},
    {art:"🎳",q:"Apakah maksud menggolek bola?",a:["Melantunkan bola tinggi","Menyepak bola ke udara","Menggerakkan bola supaya bergolek di atas lantai","Menangkap bola dengan dua tangan"],correct:2,why:"Menggolek bermaksud bola bergerak bergolek di atas lantai."},
    {art:"👐",q:"Apabila menangkap bola, apakah yang membantu menyerap daya?",a:["Mengunci siku dengan keras","Melembutkan siku dan membawa tangan mengikut bola","Memejamkan mata","Membelakangkan bola"],correct:1,why:"Lembutkan siku dan ikut pergerakan bola untuk menyerap daya."},
    {art:"🤾",q:"Kemahiran yang menghantar bola ke arah sasaran menggunakan tangan ialah…",a:["Membaling","Menendang","Menggolek","Mengelecek dengan kaki"],correct:0,why:"Membaling menggunakan tangan untuk menghantar objek ke arah sasaran."},
    {art:"🛡️",q:"Sebelum membaling bola, apakah perkara paling penting?",a:["Baling sekuat hati tanpa melihat","Pastikan rakan berada di hadapan sasaran","Pastikan kawasan dan arah balingan selamat","Baling ketika rakan sedang mengambil bola"],correct:2,why:"Semak kawasan dan arah balingan supaya semua orang selamat."},
    {art:"🏀",q:"Apakah alat yang sesuai untuk latihan membaling dan menangkap bagi murid Tahun 2?",a:["Bola lembut yang sesuai","Batu kecil","Botol kaca","Objek tajam"],correct:0,why:"Gunakan bola lembut yang sesuai dengan arahan guru."},
    {art:"👀",q:"Semasa menangkap bola, kita patut…",a:["Melihat ke arah lain","Fokus melihat bola","Menutup mata","Berlari membelakangkan bola"],correct:1,why:"Mata perlu mengikuti pergerakan bola."},
    {art:"🧺",q:"Apakah yang perlu dilakukan selepas aktiviti menggunakan alatan?",a:["Meninggalkan bola di tengah laluan","Menendang bola ke tepi","Menyimpan alatan di tempat yang selamat","Melempar alatan kepada rakan"],correct:2,why:"Simpan alatan di tempat yang selamat selepas digunakan."}
  ];
  const $ = id => document.getElementById(id);
  const soundToggle = $("soundToggle"), studentName = $("studentName");
  let soundOn = false, index = 0, stars = 0, answered = false, correctCount = 0;
  let audioContext = null;
  const savedName = sessionStorage.getItem("pj2-name");
  if (savedName) studentName.value = savedName;
  studentName.addEventListener("input", () => sessionStorage.setItem("pj2-name", studentName.value.trim()));

  function speak(text) {
    if (!soundOn) return;
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ms-MY";
        utterance.rate = 0.92;
        const voices = window.speechSynthesis.getVoices();
        const msVoice = voices.find(v => /ms[-_]/i.test(v.lang) || /Malay|Bahasa Melayu/i.test(v.name));
        if (msVoice) utterance.voice = msVoice;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) { /* Audio suara bergantung pada sokongan peranti. */ }
  }
  function tone(kind) {
    if (!soundOn) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      audioContext = audioContext || new AudioCtx();
      if (audioContext.state === "suspended") audioContext.resume();
      const osc = audioContext.createOscillator(), gain = audioContext.createGain();
      osc.connect(gain); gain.connect(audioContext.destination);
      const now = audioContext.currentTime;
      osc.type = kind === "good" ? "sine" : "triangle";
      osc.frequency.setValueAtTime(kind === "good" ? 660 : 220, now);
      if (kind === "good") osc.frequency.setValueAtTime(880, now + .12);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(.18, now + .025);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .28);
      osc.start(now); osc.stop(now + .3);
    } catch (e) { /* Audio mungkin disekat sehingga interaksi pengguna. */ }
  }
  soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? "🔊 Bunyi: ON" : "🔇 Bunyi: OFF";
    soundToggle.setAttribute("aria-pressed", String(soundOn));
    if (soundOn) { tone("good"); speak("Hai juara! Jom belajar manipulasi alatan."); }
    else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  });
  $("readIntro").addEventListener("click", () => {
    if (!soundOn) { soundOn = true; soundToggle.textContent = "🔊 Bunyi: ON"; soundToggle.setAttribute("aria-pressed","true"); }
    speak("Manipulasi alatan ialah kemahiran menggunakan alatan seperti bola. Kita belajar membaling, menggolek, menendang dan menangkap. Ingat, keselamatan nombor satu!");
  });
  document.querySelectorAll(".skill-card").forEach(card => card.addEventListener("click", () => {
    if (!soundOn) {
      soundOn = true; soundToggle.textContent = "🔊 Bunyi: ON"; soundToggle.setAttribute("aria-pressed","true");
    }
    speak(card.dataset.say);
  }));

  function renderQuestion() {
    answered = false;
    const q = questions[index];
    $("questionCounter").textContent = `SOALAN ${index + 1} DARIPADA ${questions.length}`;
    $("questionArt").textContent = q.art;
    $("questionText").textContent = q.q;
    $("feedback").textContent = "Pilih satu jawapan. Kamu boleh buat!";
    $("feedback").className = "feedback";
    $("nextQuestion").disabled = true;
    $("nextQuestion").textContent = index === questions.length - 1 ? "Lihat keputusan 🏆" : "Soalan seterusnya ➜";
    $("progressBar").style.width = `${(index / questions.length) * 100}%`;
    const answers = $("answers");
    answers.replaceChildren();
    q.a.forEach((answer, i) => {
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "answer-button"; btn.textContent = `${String.fromCharCode(65+i)}. ${answer}`;
      btn.addEventListener("click", () => chooseAnswer(i));
      answers.appendChild(btn);
    });
    $("quizContent").hidden = false;
    $("winScreen").hidden = true;
  }
  function chooseAnswer(choice) {
    if (answered) return;
    answered = true;
    const q = questions[index], buttons = [...$("answers").querySelectorAll("button")];
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === q.correct) b.classList.add("correct");
      else if (i === choice) b.classList.add("wrong");
    });
    const feedback = $("feedback");
    if (choice === q.correct) {
      stars++; correctCount++;
      feedback.textContent = "✅ Betul! Syabas! ⭐ Kamu dapat 1 bintang!";
      feedback.className = "feedback good";
      tone("good"); speak("Betul! Syabas!");
      confetti(12);
    } else {
      feedback.textContent = `❌ Belum tepat. Cuba lagi! ${q.why}`;
      feedback.className = "feedback bad";
      tone("bad"); speak("Belum tepat. Cuba lagi!");
    }
    $("starCount").textContent = stars;
    $("quizStars").textContent = stars;
    $("progressText").textContent = `${index + 1}/${questions.length}`;
    $("progressBar").style.width = `${((index + 1) / questions.length) * 100}%`;
    $("nextQuestion").disabled = false;
  }
  $("nextQuestion").addEventListener("click", () => {
    if (!answered) return;
    if (index < questions.length - 1) { index++; renderQuestion(); }
    else showWin();
  });
  function showWin() {
    $("quizContent").hidden = true;
    $("winScreen").hidden = false;
    $("questionCounter").textContent = "CABARAN SELESAI";
    $("progressBar").style.width = "100%";
    const name = studentName.value.trim();
    $("winTitle").textContent = name ? `Syabas, ${name}!` : "Syabas, Juara!";
    $("winMessage").textContent = `Kamu menjawab ${correctCount} daripada ${questions.length} soalan dengan betul.`;
    $("finalStars").textContent = `${stars}/${questions.length}`;
    $("finalAdvice").textContent = correctCount === questions.length ? "Hebat! Semua jawapan tepat. Teruskan menjadi contoh rakan yang mengutamakan keselamatan!" : correctCount >= 5 ? "Bagus! Ulang kaji nota dan cuba lagi untuk mengumpul semua bintang." : "Teruskan berlatih. Baca nota sekali lagi dan cuba cabaran ini semula!";
    speak(correctCount === questions.length ? "Tahniah! Semua jawapan betul. Kamu juara manipulasi alatan!" : "Tahniah kerana menyelesaikan cabaran. Teruskan berlatih!");
    confetti(38);
  }
  $("restartQuiz").addEventListener("click", () => {
    index = 0; stars = 0; correctCount = 0;
    $("starCount").textContent = "0"; $("quizStars").textContent = "0"; $("progressText").textContent = `0/${questions.length}`;
    renderQuestion();
    $("cabaran").scrollIntoView({behavior:"smooth",block:"start"});
  });
  function confetti(count) {
    const layer = $("celebration"), emojis = ["⭐","✨","🎉","💜","🌈","🏆"];
    for (let i=0; i<count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece"; piece.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      piece.style.left = `${Math.random()*100}%`;
      piece.style.animationDelay = `${Math.random()*.7}s`;
      piece.style.fontSize = `${.8 + Math.random()*1.2}rem`;
      layer.appendChild(piece);
      window.setTimeout(() => piece.remove(), 3500);
    }
  }
  renderQuestion();
})();