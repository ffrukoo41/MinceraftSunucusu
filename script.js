const playBtn = document.getElementById("playBtn");
const serverInfo = document.getElementById("serverInfo");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

// Minecraft sunucu bilgileri (örnek)
const SERVER_IP = "play.yoursite.com";
const SERVER_PORT = "25565";
const SERVER_VERSION = "1.20.1";

// Oyna butonuna tıklayınca sunucu bilgilerini göster
playBtn.addEventListener("click", () => {
  if (serverInfo.classList.contains("hidden")) {
    serverInfo.classList.remove("hidden");
  } else {
    serverInfo.classList.add("hidden");
  }
});

// Sunucu durumunu ve oyuncuları çekmek için API çağrısı (örnek Aternos veya başka API kullanabilirsin)
async function fetchServerStatus() {
  try {
    // Örnek API: https://api.mcsrvstat.us/2/play.yoursite.com
    const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    if (!response.ok) throw new Error("API isteği başarısız");

    const data = await response.json();

    if (data.online) {
      serverStatusEl.textContent = "Açık";
      playerCountEl.textContent = data.players.online || 0;
      playerListEl.innerHTML = "";

      if (data.players.list && data.players.list.length > 0) {
        data.players.list.forEach((player) => {
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

// Sayfa yüklendiğinde durumu hemen çek
fetchServerStatus();

// 30 saniyede bir güncelle
setInterval(fetchServerStatus, 30000);
