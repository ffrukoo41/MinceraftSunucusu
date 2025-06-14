const playBtn = document.getElementById("playBtn");
const refreshBtn = document.getElementById("refreshBtn");
const infoBox = document.getElementById("infoBox");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

const SERVER_IP = "OyunNetwork.aternos.me";
let lastData = null;

// OYNA butonuna basınca kutuyu göster/gizle
playBtn.addEventListener("click", () => {
  if (infoBox.style.display === "none" || infoBox.style.display === "") {
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
});

// GÜNCELLE butonuna basınca API verisi değişene kadar bekle
refreshBtn.addEventListener("click", async () => {
  serverStatusEl.textContent = "Güncelleniyor...";
  playerCountEl.textContent = "-";
  playerListEl.innerHTML = "<li>Bekleniyor...</li>";

  let fresh = false;

  for (let i = 0; i < 10; i++) { // max 10 deneme, 30 saniye
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`);
    const data = await response.json();

    if (JSON.stringify(data.players) !== JSON.stringify(lastData?.players)) {
      lastData = data;
      updateUI(data);
      fresh = true;
      break;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  if (!fresh) {
    serverStatusEl.textContent = "Aynı veri, değişiklik yok.";
    playerListEl.innerHTML = "<li>Oyuncu verisi değişmedi</li>";
  }
});

// UI'yi güncelleyen fonksiyon
function updateUI(data) {
  if (data.online) {
    serverStatusEl.textContent = "Açık";
    playerCountEl.textContent = data.players.online || 0;

    playerListEl.innerHTML = "";
    if (data.players.list && data.players.list.length > 0) {
      data.players.list.forEach(player => {
        const li = document.createElement("li");
        li.textContent = player.name_clean || player.name_raw;
        playerListEl.appendChild(li);
      });
    } else {
      playerListEl.innerHTML = "<li>Oyuncu yok</li>";
    }
  } else {
    serverStatusEl.textContent = "Kapalı";
    playerCountEl.textContent = "0";
    playerListEl.innerHTML = "<li>Sunucu kapalı</li>";
  }
}

// Başlangıçta ilk veriyi çek
(async () => {
  const response = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`);
  const data = await response.json();
  lastData = data;
  updateUI(data);
})();

// Otomatik 30 saniyede bir güncelleme
setInterval(async () => {
  const response = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`);
  const data = await response.json();
  lastData = data;
  updateUI(data);
}, 30000);
