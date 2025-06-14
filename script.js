const serverIp = "Gamaz179-MCgS.aternos.me"; // örnek: ffrukoo41.aternos.me

fetch(`https://api.mcsrvstat.us/2/${serverIp}`)
  .then(response => response.json())
  .then(data => {
    const statusEl = document.getElementById("status");
    const playersEl = document.getElementById("players");
    const playerListEl = document.getElementById("playerList");

    if (data.online) {
      statusEl.textContent = "🟢 Sunucu Açık";
      playersEl.textContent = `👥 Oyuncu Sayısı: ${data.players.online} / ${data.players.max}`;

      // Oyuncu isimlerini listele
      if (data.players.list) {
        playerListEl.innerHTML = data.players.list.map(p => `<li>${p}</li>`).join("");
      } else {
        playerListEl.innerHTML = "<li>Kimse yok 😴</li>";
      }
    } else {
      statusEl.textContent = "🔴 Sunucu Kapalı";
      playersEl.textContent = "👥 Oyuncu Sayısı: 0";
      playerListEl.innerHTML = "<li>Sunucu kapalı</li>";
    }
  })
  .catch(err => {
    console.error(err);
  });
