const API_KEY = "123";
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchplayers.php?p=`;

document.getElementById("searchBtn").addEventListener("click", searchPlayers);

async function searchPlayers() {
  const query = document.getElementById("playerInput").value.trim();
  const resultsDiv = document.getElementById("results");
  const countP = document.getElementById("count");

  resultsDiv.innerHTML = "";
  countP.textContent = "";

  if (!query) {
    countP.textContent = "Please enter a player name.";
    return;
  }

  countP.textContent = "Searching...";

  try {
    const res = await fetch(BASE_URL + encodeURIComponent(query));
    const data = await res.json();

    if (!data.player || data.player.length === 0) {
      countP.textContent = "No players found.";
      return;
    }

    countP.textContent = `Found ${data.player.length} players`;

    data.player.forEach(player => {
      const div = document.createElement("div");
      div.className = "player-card";

      div.innerHTML = `
        <strong>${player.strPlayer}</strong><br>
        Team: ${player.strTeam || "N/A"}<br>
        Sport: ${player.strSport || "N/A"}<br>
        Nationality: ${player.strNationality || "N/A"}<br>
        <hr>
      `;

      resultsDiv.appendChild(div);
    });

  } catch (error) {
    countP.textContent = "Error fetching players.";
    console.error(error);
  }
}
