const playBtn = document.getElementById("playBtn");
const infoBox = document.getElementById("infoBox");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

// Minecraft sunucu bilgileri
const SERVER_IP = "OyunNetwork.aternos.me";
const SERVER_PORT = "18968";

// OYNA butonuna tıklandığında bilgi kutusunu aç/kapat yapar
playBtn.addEventListener("click", () => {
  infoBox.style.display = (infoBox.style.display === "block") ? "none" : "block";
});

// Sunucu durumunu ve oyuncuları çekmek için API çağrısı
async function fetchServerStatus() {
  try {
    const response = await fetch(`https://api.minetools.eu/ping/${SERVER_IP}/${SERVER_PORT}`);
    if (!response.ok) throw new Error("API isteği başarısız");

    const data = await response.json();

    if (data.online) {
      serverStatusEl.textContent = "Açık";
      playerCountEl.textContent = data.players.online || 0;

      // Oyuncu listesi varsa göster (minetools API bazen oyuncu isimlerini vermez)
      playerListEl.innerHTML = "";
      if (data.players.sample && data.players.sample.length > 0) {
        data.players.sample.forEach(player => {
          const li = document.createElement("li");
          li.textContent = player.name;
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
