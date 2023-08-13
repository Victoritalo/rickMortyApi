const url = "https://rickandmortyapi.com/api/";
const main = document.querySelector("main");
const footer = document.querySelector("footer")
const statusView = document.querySelector(".statusView");
async function characters() {
  const char = await axios.get(url + "character");
  const characters = char.data.results;
  let character = "";

  for (const x of characters) {
    let statusStyle = ""
    if (x.status === "Alive") {
        statusStyle = "background-color: green"
    } else if (x.status === "Dead") {
          statusStyle = "background-color: red"
        } else {
          statusStyle = "background-color: orange"
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
if(x.status === "Alive") {
    statusView.setAttribute("style", "background-color: green")
}  
}
  main.innerHTML = character;
}

async function apiInfo() {
    const info = await axios.get(url + "character")
    const loc = await axios.get("https://rickandmortyapi.com/api/location")
    console.log(loc)
    const location = loc.data.info
    const setInfo = info.data.info
    console.log(setInfo)
    footer.innerHTML = `
    <div class="listFooter">
    <ul>
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
</div>`
}
characters();
apiInfo()