async function loadBuilds() {
  const res = await fetch("./builds.json");
  const data = await res.json();
  return data;
}

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

const rollBuild = document.getElementById("mybtn");
const careerSelect = document.getElementById("career-select");
let firstClick = true;

rollBuild.addEventListener("click", () => {
  loadBuilds().then((data) => {
    const selectedCareer = careerSelect.value;

    let filteredData = data;

    if (selectedCareer) {
      filteredData = data.filter((build) => build.career === selectedCareer);
    }

    if (filteredData.length === 0) {
      alert("no build available for this career.");
      return;
    }

    const rng = Math.floor(Math.random() * filteredData.length);
    const finalBuild = filteredData[rng];

    if (firstClick) {
      rollBuild.classList.add("slide-in");
      firstClick = false;
    }

    const rolledSection = document.querySelector(".itsRolled");
    rolledSection.classList.add("visible");

    updateDOMWithBuild(finalBuild);
  });
});
