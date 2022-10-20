import { jobListingJSON } from "./data.js";

const jobOffertsContainer = document.querySelector(".list-of-jobs")

function renderList(data) {
    // renderuje job-containery oraz lewą część każdego wiersza
    data.forEach((elem, i) => {
        let createDiv = document.createElement("div")
        createDiv.dataset.role=elem.role
        createDiv.dataset.level=elem.level
        createDiv.dataset.languages=elem.languages
        createDiv.dataset.tools=elem.tools
        createDiv.classList.add("job-offert")
        createDiv.innerHTML =  
                `<div class="job-offert-left-section">
                <img src="${elem.logo}" alt="company-logo">
                <h2 class="company-name">${elem.company}</h2>
                <h1 class="job-title">${elem.position}</h1>
                <ul id="job-info-list">
                <li>${elem.postedAt}</li>
                <li>${elem.contract}</li>
                <li>${elem.location}</li>
                </ul>
            </div>
            <div class="job-offert-right-section">
            <ul>
              <button class="btn">${elem.level}</button>
              <button class="btn">${elem.role}</button>
              ${createLangs(elem.languages)}
              ${createTools(elem.tools)}
            </ul>
          </div>
          `

    jobOffertsContainer.appendChild(createDiv)
    })
}

const createLangs = (langs)=>{
    let langsList=""
    langs.forEach((lang)=>{
        langsList += `<button class="btn">${lang}</button>`
    });
    return langsList
}

const createTools = (tool)=>{
    let toolsList=""
    tool.forEach((lang)=>{
        toolsList += `<button class="btn">${lang}</button>`
    });
    return toolsList
}

renderList(jobListingJSON)

let listOfFIlters = []

const filterOptions = () => {
    let listOfJobs = document.querySelector(".list-of-jobs")
    listOfJobs.addEventListener("click", (e) => {
        if((e.target.classList=="btn") && (!listOfFIlters.includes(e.target.innerText))) {
            listOfFIlters.push(e.target.innerText)
            searchBar()
            showFiltered()
        }
    })
    return listOfFIlters
}
const searchBar = () => {
    let createButton = document.createElement("button")
    let searchBar = document.querySelector(".search-bar")

    filterOptions().forEach(elem => {
        createButton
        createButton.innerText = elem
        createButton.classList = "btn-remove"
        searchBar.appendChild(createButton)
    })
}

const deleteFilterOption = () => {
    let jobsContainer = document.querySelector(".list-of-jobs")
    let searchBar = document.querySelector(".search-bar")
    searchBar.addEventListener("click", e => {
    let listOfJobs = document.querySelectorAll(".job-offert")
        if(e.target.classList == "btn-remove") {
        listOfFIlters = listOfFIlters.filter(elem => elem !== e.target.innerText)
        e.target.remove()
        if(listOfFIlters.length === 0) {
            jobsContainer.innerHTML = ""
            renderList(jobListingJSON)
        }
        else {
        listOfJobs.forEach((job, i) => {
            let datas = [job.dataset.role, job.dataset.level, ...job.dataset.languages.split(","), ...job.dataset.tools.split(",")]
            datas = datas.filter(v => v != '')
            datas.sort()
            listOfFIlters.sort()
            let redc = []
            redc = listOfFIlters.filter(element => datas.includes(element))
            redc.sort()
            console.log(redc)
            console.log(listOfFIlters)
            console.log(i)
            if(redc.length === listOfFIlters.length) {
                console.log("true")
                job.classList.remove("hidden")
            }
            })
    }
}
    }
    )
    }

const showFiltered = () => {
    let listOfJobs = document.querySelectorAll(".job-offert")
       listOfJobs.forEach(job => {
        let datas = [job.dataset.role, job.dataset.level, ...job.dataset.languages.split(","), ...job.dataset.tools.split(",")]
        datas = datas.filter(v => v != '')
        listOfFIlters
        if(listOfFIlters.length > 0) {
            for(let i = 0; i < listOfFIlters.length; i++){
                if(!datas.includes(listOfFIlters[i])) {
                    job.classList.add("hidden")
                }
            }
        }
})
}
 filterOptions()
 deleteFilterOption()
