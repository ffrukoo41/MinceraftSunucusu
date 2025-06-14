fetch("https://api.mcsrvstat.us/2/Gamaz179-MCgS.aternos.me")
  .then(res => res.json())
  .then(data => {
    const status = data.online ? "Açık ✅" : "Kapalı ❌";
    document.getElementById("serverStatus").textContent = status;

    if (data.online) {
      document.getElementById("playerCount").textContent = data.players.online;
      const playerList = data.players.list ? data.players.list.join(", ") : "Kimse yok";
      document.getElementById("playerList").textContent = playerList;
    }
  })
  .catch(err => {
    document.getElementById("serverStatus").textContent = "Hata";
  });
