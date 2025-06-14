const playBtn = document.getElementById("playBtn");
const infoBox = document.getElementById("infoBox");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

// Sunucu IP'si
const SERVER_IP = "OyunNetwork.aternos.me";

// OYNA butonuna tıklanınca bilgi kutusu aç/kapa
playBtn.addEventListener("click", () => {
  if (infoBox.style.display === "none" || infoBox.style.display === "") {
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
});

// mcstatus.io API'den bilgi çek
async function fetchServerStatus() {
  try {
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}`);
    if (!response.ok) throw new Error("API isteği başarısız");

    const data = await response.json();

    if (data.online) {
      serverStatusEl.textContent = "Açık";
      playerCountEl.textContent = data.players.online || 0;

      // Oyuncu listesi
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
  } catch (error) {
    serverStatusEl.textContent = "Hata!";
    playerCountEl.textContent = "-";
    playerListEl.innerHTML = "<li>Sunucu bilgisi alınamadı</li>";
    console.error(error);
  }
}

// Sayfa açıldığında başlat
fetchServerStatus();

// Her 30 saniyede bir yenile
setInterval(fetchServerStatus, 30000);
