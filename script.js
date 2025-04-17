// Loading builds from the JSON file
async function loadBuilds() {
  const sourceSelect = document.getElementById("source-select");
  const selectedSource = sourceSelect.value;

  if (selectedSource === "tourney") {
    alert("Builds not implemented yet");
    return [];
  }

  const res = await fetch("./builds.json");
  const data = await res.json();
  return data;
}

// Updating the DOM with the selected build
function updateDOMWithBuild(finalBuild) {
  document.getElementById("career").textContent = finalBuild.career;
  document.getElementById("portrait").src = `./img/${finalBuild.image}`;
  document.getElementById("melee-name").textContent = finalBuild.melee;
  document.getElementById("melee-proper").textContent = finalBuild.meleeProps;
  document.getElementById("range-name").textContent = finalBuild.range;
  document.getElementById("range-proper").textContent = finalBuild.rangeProps;
  document.getElementById("talents").textContent = finalBuild.talents;
  document.getElementById("charm").textContent = finalBuild.charm;
}

// Utility functions to manage localStorage
function getBlockedBuilds() {
  return JSON.parse(localStorage.getItem("blockedBuilds") || "[]");
}

function saveBlockedBuilds(blockedBuilds) {
  localStorage.setItem("blockedBuilds", JSON.stringify(blockedBuilds));
}

function isBuildBlocked(build, blockedBuilds) {
  return blockedBuilds.some(
    (b) =>
      b.career === build.career &&
      b.melee === build.melee &&
      b.range === build.range &&
      b.talents === build.talents
  );
}

// Selecting DOM elements
const rollBuild = document.getElementById("mybtn");
const heroSelect = document.getElementById("hero-select"); // HERO select
const sourceSelect = document.getElementById("source-select"); // SOURCE select
const checkbox = document.getElementById("block-build-checkbox");
const resetButton = document.getElementById("reset-blocked");

let firstClick = true;
let currentBuild = null;

// Event to roll a random build
rollBuild.addEventListener("click", () => {
  loadBuilds().then((data) => {
    if (data.length === 0) {
      // No builds loaded (e.g. tourney not implemented)
      return;
    }

    const selectedHero = heroSelect.value;
    const blockedBuilds = getBlockedBuilds();

    // Filter out blocked builds
    let filteredData = data.filter(
      (build) => !isBuildBlocked(build, blockedBuilds)
    );

    // Filter by selected hero, if any
    if (selectedHero) {
      filteredData = filteredData.filter(
        (build) => build.hero === selectedHero
      );
    }

    if (filteredData.length === 0) {
      alert("No builds availables for this hero (or they are all blocked)");
      return;
    }

    // Random selection
    const rng = Math.floor(Math.random() * filteredData.length);
    const finalBuild = filteredData[rng];
    currentBuild = finalBuild;

    // Animation + display
    if (firstClick) {
      rollBuild.classList.add("slide-in");
      firstClick = false;
    }

    document.querySelector(".itsRolled").classList.add("visible");

    // Reset the checkbox
    checkbox.checked = false;

    updateDOMWithBuild(finalBuild);
  });
});

// Event to block a build
checkbox.addEventListener("change", () => {
  if (!currentBuild) return;

  const blockedBuilds = getBlockedBuilds();

  if (checkbox.checked) {
    // Add the current build to the blocked builds list
    blockedBuilds.push(currentBuild);
    saveBlockedBuilds(blockedBuilds);
  }
});

// Reset blocked builds
resetButton.addEventListener("click", () => {
  localStorage.removeItem("blockedBuilds");
  alert("Builds list reseted");
});

// Save and restore selected source in localStorage (optional)
document.addEventListener("DOMContentLoaded", () => {
  const savedSource = localStorage.getItem("buildSource");
  if (savedSource) {
    sourceSelect.value = savedSource;
  }
});

sourceSelect.addEventListener("change", (e) => {
  localStorage.setItem("buildSource", e.target.value);
});
