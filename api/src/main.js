const API = {
  playerUrl: "https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p="
};

document.getElementById("searchBtn").addEventListener("click", searchPlayers);
window.addEventListener("load", loadRandomPlayers);


async function loadRandomPlayers() {
  const resultsDiv = document.getElementById("results");
  const countP = document.getElementById("count");

  try {
    const res = await fetch(API.playerUrl + "a");
    const data = await res.json();

    if (!data.player) return;

    const players = data.player.sort(() => 0.5 - Math.random()).slice(0, 2);

    countP.textContent = "Featured Players";

    players.forEach(player => {
      resultsDiv.appendChild(createPlayerCard(player));
    });

  } catch (err) {
    console.error(err);
  }
}


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

  countP.textContent = "Searching";

  try {
    const res = await fetch(API.playerUrl + encodeURIComponent(query));
    const data = await res.json();

    if (!data.player) {
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
  div.className =
    "bg-white rounded-lg shadow-md p-4 w-full sm:w-[48%] lg:w-[30%]";

  div.innerHTML = `
    <h2 class="text-xl font-semibold mb-2 text-center">
      ${player.strPlayer}
    </h2>
    <ul class="space-y-1 text-sm">
      <li><strong>Team:</strong> ${player.strTeam || "N/A"}</li>
      <li><strong>Sport:</strong> ${player.strSport || "N/A"}</li>
      <li><strong>Nationality:</strong> ${player.strNationality || "N/A"}</li>
    </ul>
  `;

  return div;
}
