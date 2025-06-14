fetch("https://api.mcstatus.io/v2/status/java/Gamaz179-MCgS.aternos.me")
  .then(res => res.json())
  .then(data => {
    const durumDiv = document.getElementById("sunucuDurumu");
    if (data.online) {
      const oyuncular = data.players.list?.join(", ") || "Oyuncu yok.";
      durumDiv.innerHTML = `
        <strong>🟢 Sunucu Açık</strong><br>
        👥 Oyuncu Sayısı: ${data.players.online}<br>
        🎮 Oyundakiler: ${oyuncular}
      `;
    } else {
      durumDiv.innerHTML = "<strong>🔴 Sunucu Kapalı</strong>";
    }
  })
  .catch(err => {
    document.getElementById("sunucuDurumu").innerText = "⚠️ Durum alınamadı. Bağlantı hatası.";
    console.error("Sunucu durumu alınamadı:", err);
  });
