const API = {
  key: "123",
  baseUrl: "https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p="
};

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
    const res = await fetch(API.baseUrl + encodeURIComponent(query));
    const data = await res.json();

    if (!data.player || data.player.length === 0) {
      countP.textContent = "No players found.";
      return;
    }

    countP.textContent = `Found ${data.player.length} players`;

    data.player.forEach(player => {
      resultsDiv.appendChild(createPlayerCard(player));
    });

  } catch (error) {
    countP.textContent = "Error fetching players.";
    console.error(error);
  }
}


function createPlayerCard(player) {
  const div = document.createElement("div");
  div.className = "card player-card";
  div.dataset.id = player.idPlayer;

  div.innerHTML = `
    <h2 class="card-header">${player.strPlayer}</h2>

    <ul class="options">
      <li><strong>Team:</strong> ${player.strTeam || "N/A"}</li>
      <li><strong>Sport:</strong> ${player.strSport || "N/A"}</li>
      <li><strong>Nationality:</strong> ${player.strNationality || "N/A"}</li>
    </ul>

    <div class="feedback"></div>
  `;

  return div;
}
