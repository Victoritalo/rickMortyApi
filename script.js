const url = "https://rickandmortyapi.com/api/";
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const statusView = document.querySelector(".statusView");
const previousBtn = document.querySelector("#previousBtn");
const nextBtn = document.querySelector("#nextBtn");
let randomPage = Math.floor(Math.random() * 42) + 1;
let currentPage = randomPage;
let totalOfPages = "";

async function characters() {
  try {
    const char = await axios.get(url + `character/?page=${currentPage}`);
    const characters = char.data.results;
    totalOfPages = char.data.info.pages;
    let character = "";
    for (const x of characters) {
      let statusStyle = "";
      if (x.status === "Alive") {
        statusStyle = "background-color: green";
      } else if (x.status === "Dead") {
        statusStyle = "background-color: red";
      } else {
        statusStyle = "background-color: orange";
      }

      character += `<div class="character">
        <img
          src="${x.image}"
          alt=""
        />
        <div class="characterInfo">
          <h2>${x.name}</h2>
          <div class="status">
            <div class="statusView" style="${statusStyle}"></div>
            <p>${x.status} - ${x.species}</p>
          </div>
          <p class="known_seen">Last known location:</p>
          <p>${x.location.name}</p>
          <p class="known_seen">First time seen in:</p>
          <p>${x.origin.name}</p>
        </div>
      </div>
    </main>`;
      if (x.status === "Alive") {
        statusView.setAttribute("style", "background-color: green");
      }
      main.innerHTML = character;
    }
  } catch (err) {
      currentPage = totalOfPages;
      alert(
          `An issue occurred: ${err.response.status} ${err.response.data.error} `
          );
          console.clear();
          return;
  }
  footerInfo();
  previousBtn.disabled = currentPage === 1;
  nextBtn.disabled = (currentPage === totalOfPages);
}

async function footerInfo() {
  const info = await axios.get(url + "character");
  const loc = await axios.get("https://rickandmortyapi.com/api/location");
  const location = loc.data.info;
  const setInfo = info.data.info;
  footer.innerHTML = `
    <div class="listFooter">
    <ul>
        <li>
            <p href="#">
                Current Page: ${currentPage}
            </p>
        </li>
        <li>
            <a href="#">
                Characters: ${setInfo.count}
            </a>
        </li>
        <li>
            <a href="#">
                Pages: ${setInfo.pages}
            </a>
        </li>
        <li>
            <a href="#">
                Location: ${location.count}
            </a>
        </li>
    </ul>
</div>`;
}

function nextPage() {
  currentPage++;
  characters();
}
function previousPage() {
  currentPage--;
  characters();
}
characters();
