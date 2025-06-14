fetch("https://api.mcstatus.io/v2/status/java/Gamaz179-MCgS.aternos.me")
  .then(response => response.json())
  .then(data => {
    const durum = document.getElementById("durum");
    
    if (!data.online || data.players.online === 0) {
      durum.innerHTML = "🔴 Sunucu Kapalı veya Oyuncu Yok";
      durum.classList.add("kapali");
    } else {
      const oyuncular = data.players.list?.join(", ") || "Bilinmiyor";
      durum.innerHTML = `🟢 Sunucu Açık<br>Oyuncu Sayısı: ${data.players.online}<br>Oyuncular: ${oyuncular}`;
      durum.classList.add("acik");
    }
  })
  .catch(error => {
    console.error("Hata:", error);
    const durum = document.getElementById("durum");
    durum.innerHTML = "⚠️ Sunucuya erişilemedi.";
    durum.classList.add("hata");
  });
