const API = {
  key: "123",
  baseUrl: "https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p="
};

document.getElementById("searchBtn").addEventListener("click", searchPlayers);
document.getElementById("searchTeamBtn").addEventListener("click", searchTeams);


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

async function searchTeams() {
  const query = document.getElementById("teamInput").value.trim();
  const resultsDiv = document.getElementById("teamResults");
  const countP = document.getElementById("teamCount");

  resultsDiv.innerHTML = "";
  countP.textContent = "";

  if (!query) {
    countP.textContent = "Please enter a team name.";
    return;
  }

  countP.textContent = "Searching...";

  try {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/${API.key}/searchteams.php?t=` + encodeURIComponent(query));
    const data = await res.json();

    if (!data.teams || data.teams.length === 0) {
      countP.textContent = "No teams found.";
      return;
    }

    countP.textContent = `Found ${data.teams.length} teams`;

    data.teams.forEach(team => {
      resultsDiv.appendChild(createTeamCard(team));
    });

  } catch (error) {
    countP.textContent = "Error fetching teams.";
    console.error(error);
  }
}

function createTeamCard(team) {
  const div = document.createElement("div");
  div.className =
    "bg-white rounded-lg shadow-md p-4 w-full sm:w-[48%] lg:w-[30%]";

  div.innerHTML = `
    <h2 class="text-xl font-semibold mb-2 text-center">
      ${team.strTeam}
    </h2>

    <ul class="space-y-1 text-sm">
      <li><strong>Sport:</strong> ${team.strSport || "N/A"}</li>
      <li><strong>League:</strong> ${team.strLeague || "N/A"}</li>
      <li><strong>Country:</strong> ${team.strCountry || "N/A"}</li>
    </ul>
  `;

  return div;
}
