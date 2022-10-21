import { jobListingJSON } from "./data.js";

const jobOffertsContainer = document.querySelector(".list-of-jobs");
const searchBar = document.querySelector(".search-bar");
const clearButton = document.querySelector(".clear");
let listOfFIlters = [];

function renderList(data) {
  data.forEach((elem) => {
    let createDiv = document.createElement("div");
    createDiv.dataset.role = elem.role;
    createDiv.dataset.level = elem.level;
    createDiv.dataset.languages = elem.languages;
    createDiv.dataset.tools = elem.tools;
    createDiv.classList.add("job-offert");
    createDiv.innerHTML = `
            <div class="job-offert-left-section">
                <img src="${elem.logo}" alt="company-logo">
                <h2 class="company-name">${elem.company}</h2>
                <h1 class="job-title">${elem.position}</h1>
                <ul id="job-info-list">
                    <li>${elem.postedAt}</li>
                    <li>${elem.contract}</li>
                    <li>${elem.location}</li>
                </ul>
            </div>
            <hr class="line">
            <div class="job-offert-right-section">
                <ul>
                <button class="btn">${elem.level}</button>
                <button class="btn">${elem.role}</button>
                ${createLangs(elem.languages)}
                ${createTools(elem.tools)}
                </ul>
            </div>
        `;

    jobOffertsContainer.appendChild(createDiv);
  });
}

const createLangs = (langs) => {
  let langsList = "";
  langs.forEach((lang) => {
    langsList += `<button class="btn">${lang}</button>`;
  });
  return langsList;
};

const createTools = (tools) => {
  let toolsList = "";
  tools.forEach((tool) => {
    toolsList += `<button class="btn">${tool}</button>`;
  });
  return toolsList;
};

const createFilterList = () => {
  jobOffertsContainer.addEventListener("click", (e) => {
    if (
      e.target.classList == "btn" &&
      !listOfFIlters.includes(e.target.innerText)
    ) {
      listOfFIlters.push(e.target.innerText);
      createSearchMenuButtons();
      showFiltered();
    }
  });
  return listOfFIlters;
};
const createSearchMenuButtons = () => {
  let createButton = document.createElement("button");
  createFilterList().forEach((elem) => {
    createButton.innerHTML = `${elem}<svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path class="delete-icon" fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>`;
    createButton.classList = "btn-remove";
    searchBar.appendChild(createButton);
  });
};

const deleteFilter = () => {
  searchBar.addEventListener("click", (e) => {
    let listOfJobs = document.querySelectorAll(".job-offert");
    if (e.target.classList == "delete-icon") {
      listOfFIlters = listOfFIlters.filter(
        (elem) => elem !== e.target.closest("button").innerText
      );
      e.target.closest("button").remove();

      showHideSearchBar();
      if (listOfFIlters.length === 0) {
        jobOffertsContainer.innerHTML = "";
        renderList(jobListingJSON);
      } else {
        listOfJobs.forEach((job) => {
          let datas = [
            job.dataset.role,
            job.dataset.level,
            ...job.dataset.languages.split(","),
            ...job.dataset.tools.split(","),
          ];
          datas = datas.filter((v) => v != "");
          let redc = listOfFIlters.filter((element) => datas.includes(element));
          if (redc.length === listOfFIlters.length) {
            job.classList.remove("hidden");
          }
        });
      }
    }
  });
};

const showFiltered = () => {
  showHideSearchBar();
  let listOfJobs = document.querySelectorAll(".job-offert");
  listOfJobs.forEach((job) => {
    let datas = [
      job.dataset.role,
      job.dataset.level,
      ...job.dataset.languages.split(","),
      ...job.dataset.tools.split(","),
    ];

    datas = datas.filter((v) => v != "");

    if (listOfFIlters.length > 0) {
      for (let i = 0; i < listOfFIlters.length; i++) {
        !datas.includes(listOfFIlters[i]) ? job.classList.add("hidden") : "";
      }
    }
  });
};

const showHideSearchBar = () => {
  searchBar.childElementCount === 1
    ? searchBar.classList.add("hidden")
    : searchBar.classList.remove("hidden");
};
const reset = () => {
  jobOffertsContainer.innerHTML = "";
  renderList(jobListingJSON);
  listOfFIlters = [];
  let deleteButtons = searchBar.querySelectorAll(".btn-remove");
  deleteButtons.forEach((btn) => btn.remove());
  showHideSearchBar();
};

clearButton.addEventListener("click", reset);

renderList(jobListingJSON);
createFilterList();
deleteFilter();
showHideSearchBar();
