const playBtn = document.getElementById("playBtn");
const serverInfo = document.getElementById("infoBox");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

// Minecraft sunucu IP adresin
const SERVER_IP = "Gamaz179-MCgS.aternos.me";

playBtn.addEventListener("click", () => {
  // Aç kapa için display stilini değiştir
  if (serverInfo.style.display === "block") {
    serverInfo.style.display = "none";
  } else {
    serverInfo.style.display = "block";
  }
});

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
      playerListEl.innerHTML = "<li>Sunucu kapalı</li>";
    }
  } catch (error) {
    serverStatusEl.textContent = "Hata!";
    playerCountEl.textContent = "-";
    playerListEl.innerHTML = "<li>Sunucu bilgisi alınamadı</li>";
    console.error(error);
  }
}

// Sayfa yüklendiğinde durum bilgisini hemen getir
fetchServerStatus();

// 30 saniyede bir güncelle
setInterval(fetchServerStatus, 30000);
