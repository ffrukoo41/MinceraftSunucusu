// Buton ve info kutusu elementleri
const playBtn = document.getElementById("playBtn");
const serverInfo = document.getElementById("infoBox");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

// Sunucu IP adresi (kendi Aternos IP'n ile değiştir)
const SERVER_IP = "Gamaz179-MCgS.aternos.me";

// Oyna butonuna tıklayınca bilgi kutusunu aç/kapa yap
playBtn.addEventListener("click", () => {
  serverInfo.classList.toggle("hidden");
});

// Minecraft sunucu durumunu çeken API (mcsrvstat.us)
async function fetchServerStatus() {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    if (!response.ok) throw new Error("API isteği başarısız");

    const data = await response.json();

    if (data.online) {
      serverStatusEl.textContent = "Açık";
      playerCountEl.textContent = data.players.online || 0;

      playerListEl.innerHTML = "";

      if (data.players.list && data.players.list.length > 0) {
        data.players.list.forEach(player => {
          const li = document.createElement("li");
          li.textContent = player;
          playerListEl.appendChild(li);
        });
      } else {
        playerListEl.innerHTML = "<li>Oyuncu yok</li>";
      }
    } else {
      serverStatusEl.textContent = "Kapalı";
      playerCountEl.textContent = "0";
