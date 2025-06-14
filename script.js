const playBtn = document.getElementById("playBtn");
const infoBox = document.getElementById("infoBox");

const serverStatusEl = document.getElementById("serverStatus");
const playerCountEl = document.getElementById("playerCount");
const playerListEl = document.getElementById("playerList");

// Minecraft sunucu bilgileri
const SERVER_IP = "Gamaz179-MCgS.aternos.me";  // senin IP'ni yazdım
//const SERVER_PORT = "25565"; // port gerekirse kullanılabilir

// OYNA butonuna tıklandığında bilgi kutusunu aç/kapat yapar
playBtn.addEventListener("click", () => {
  if (infoBox.style.display === "none" || infoBox.style.display === "") {
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
});

// Sunucu durumunu ve oyuncuları çekmek için API çağrısı
async function fetchServerStatus() {
  try {
    // Aternos için standart API olmadığından, örnek olarak mcsrvstat.us kullanıyoruz
    const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    if (!response.ok) throw new Error("API isteği başarısız");

    const data = await response.json();

    if (data.online) {
      serverStatusEl.textContent = "Açık";
      playerCountEl.textContent = data.players.online || 0;

      // Oyuncu listesi varsa göster
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

// Sayfa yüklendiğinde durumu hemen çek
fetchServerStatus();

// 30 saniyede bir güncelle
setInterval(fetchServerStatus, 30000);
