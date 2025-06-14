fetch("https://api.mcstatus.io/v2/status/java/Gamaz179-MCgS.aternos.me")
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById("sunucuDurumu");
    if (!data.online) {
      el.innerHTML = "🔴 Sunucu Kapalı";
    } else if (data.players.online === 0) {
      el.innerHTML = "🔴 Sunucu Kapalı (oyuncu yok)";
    } else {
      const list = data.players.list?.join(", ") || "Bilgi yok";
      el.innerHTML = `🔵 Sunucu Açık<br>Oyuncu: ${data.players.online}<br>İsimler: ${list}`;
    }
  })
  .catch(() => {
    document.getElementById("sunucuDurumu").innerText = "⚠️ Durum alınamadı.";
  });
