const CONFIG = {
  yourName: "มูฮัมหมัดซาฟีอี",
  partnerName: "ฟาดีละห์",

  // รูปแบบวันที่:
  // ปี-เดือน-วันTเวลา
  anniversaryDate: "2024-09-01T20:00:00"
};

const intro = document.getElementById("intro");
const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openButton");
const bgMusic = document.getElementById("bgMusic");

const coupleName = document.getElementById("coupleName");
const letterName = document.getElementById("letterName");
const signatureName = document.getElementById("signatureName");

coupleName.textContent =
  `${CONFIG.yourName} & ${CONFIG.partnerName}`;

letterName.textContent = CONFIG.partnerName;
signatureName.textContent = CONFIG.yourName;

/*
  เปิดซองจดหมาย
*/
openButton.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    intro.classList.add("hide");

    bgMusic.play().catch(() => {
      console.log("เบราว์เซอร์ไม่อนุญาตให้เปิดเพลงอัตโนมัติ");
    });

    createHearts(18);
  }, 850);
});

/*
  ตัวนับเวลาที่คบกัน
*/
function updateCounter() {
  const startDate = new Date(CONFIG.anniversaryDate).getTime();
  const currentDate = new Date().getTime();

  const difference = Math.max(0, currentDate - startDate);

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

/*
  การ์ดเหตุผลที่รัก
*/
const reasonCards = document.querySelectorAll(".reason-card");

reasonCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

/*
  สร้างหัวใจลอย
*/
function createHeart() {
  const heart = document.createElement("div");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

function createHearts(amount = 1) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 180);
  }
}

setInterval(createHeart, 1800);
/*
  ควบคุมการเปิด - ปิดเพลง
*/
const musicButton = document.getElementById("musicButton");

// อัปเดตสถานะปุ่มเมื่อเพลงเริ่มเล่นจากการเปิดจดหมาย
openButton.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    intro.classList.add("hide");

    bgMusic.play().then(() => {
      musicButton.textContent = "🔇 ปิดเพลง";
    }).catch(() => {
      console.log("เบราว์เซอร์ไม่อนุญาตให้เปิดเพลงอัตโนมัติ");
      musicButton.textContent = "🔊 เปิดเพลง";
    });

    createHearts(18);
  }, 850);
});

// ฟังก์ชันสลับการเล่น/หยุดเพลงเมื่อกดปุ่ม
musicButton.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicButton.textContent = "🔇 ปิดเพลง";
  } else {
    bgMusic.pause();
    musicButton.textContent = "🔊 เปิดเพลง";
  }
});
