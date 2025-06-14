const playButton = document.getElementById('playButton');
const serverInfo = document.getElementById('serverInfo');
const statusSpan = document.getElementById('status');
const playersSpan = document.getElementById('players');
const playerListSpan = document.getElementById('playerList');

// Minecraft sunucu API (örnek)
// Bu API'yi kendi sunucuna göre değiştirebilirsin veya Aternos vb. kullanıyorsan API'yi ona göre.
// Örnek public API: https://api.mcsrvstat.us/2/mc.gamaz179.com

async function fetchServerStatus() {
  try {
    const response = await fetch('https://api.mcsrvstat.us/2/mc.gamaz179.com');
    const data = await response.json();

    if (data.online) {
      statusSpan.textContent = "Açık";
      playersSpan.textContent = data.players.online;
      if(data.players.online > 0 && data.players.list){
        playerListSpan.textContent = data.players.list.join(', ');
      } else {
        playerListSpan.textContent = "Oyuncu Yok";
      }
    } else {
      statusSpan.textContent = "Kapalı";
      playersSpan.textContent = "0";
      playerListSpan.textContent = "Sunucu Kapalı";
    }
  } catch (error) {
    statusSpan.textContent = "Durum alınamadı";
    playersSpan.textContent = "-";
    playerListSpan.textContent = "-";
    console.error("Sunucu durumu alınamadı:", error);
  }
}

playButton.addEventListener('click', () => {
  if(serverInfo.classList.contains('hidden')){
    serverInfo.classList.remove('hidden');
    fetchServerStatus();
  } else {
    // Bilgiler zaten görünür, yeniden çekme veya istersen yenileyebilirsin
    fetchServerStatus();
  }
});
