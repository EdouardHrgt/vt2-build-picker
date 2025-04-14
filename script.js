console.log("Hey you have nothing to see here :-3");
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
let firstClick = true;

rollBuild.addEventListener("click", () => {
  loadBuilds().then((data) => {
    const rng = Math.floor(Math.random() * data.length);
    const finalBuild = data[rng];
    if (firstClick) {
      rollBuild.classList.add("slide-in");
      firstClick = false;
    }
    const rolledSection = document.querySelector(".itsRolled");
    rolledSection.classList.add("visible");

    updateDOMWithBuild(finalBuild);
  });
});
