fetch("https://api.mcstatus.io/v2/status/java/Gamaz179-MCgS.aternos.me")
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById("sunucuDurumu");

    if (!data.online || !data.players || data.players.online === 0) {
      el.innerHTML = "🔴 Sunucu Kapalı (veya Oyuncu Yok)";
    } else {
      const isimler = data.players.list?.join(", ") || "Oyuncu listesi alınamadı";
      el.innerHTML = `🟢 Sunucu Açık<br>Oyuncu Sayısı: ${data.players.online}<br>Oyuncular: ${isimler}`;
    }
  })
  .catch((error) => {
    document.getElementById("sunucuDurumu").innerHTML = "⚠️ Bilgi alınamadı. Bağlantı sorunu.";
    console.error("Hata:", error);
  });
