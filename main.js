import { jobListingJSON } from "./data.js";

const jobOffertsContainer = document.querySelector(".list-of-jobs")

function connectFilterButtons(elem) {
    let tools = elem.tools
    let languages = elem.languages
    let role = [elem.role]
    let level = elem.level
    let toolsWithLanguages = role.concat(level,languages,tools);
    return toolsWithLanguages
}
let allJobs = []
let filtered = []
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
            </div>`

    jobOffertsContainer.appendChild(createDiv)

    // łączę ze sobą toolsy,laguages,role,level aby wyświetlić je w całości po prawej stronie job-containera
    // let tools = elem.tools
    // let languages = elem.languages
    // let role = [elem.role]
    // let level = elem.level
    // let toolsWithLanguages = role.concat(level,languages,tools);
    // tworzę liste     
    let createRightSection = document.createElement("div")
    let createRightList = document.createElement("ul")
    connectFilterButtons(elem).forEach(elem => {
        let createListItems = document.createElement("li")
        let createButton = document.createElement("button")
        createButton.classList.add("btn-item")
        
        createButton.innerHTML = elem
        createListItems.appendChild(createButton)
        createRightList.appendChild(createListItems)
    })

    createRightSection.classList.add("job-offert-right-section")
    createRightSection.appendChild(createRightList)
    createDiv.appendChild(createRightSection)
    })
    return allJobs = document.querySelectorAll(".job-offert")
    
}
const deleteList = () => {
    jobOffertsContainer.innerHTML = ""
    
}


const makeFilteredList = () => {
    let filterOptions = document.querySelector(".list-of-jobs")
    // Array.from(allJobs)
    allJobs = Array.from(allJobs)
    filterOptions.addEventListener("click", (e) => {
        let target = e.target
        if((e.target.classList == "btn-item") && !filtered.includes(e.target.innerText)) {
             filtered.push(e.target.innerText)
             filter()
             
             
        }
        else if (e.target.classList == "btn-item" || filtered.includes(e.target.innerText)) {
            filtered = filtered.filter(e => e !== target.innerText )
            
            
        }
    })
    return filtered
}


const filter = () => {
    let filteredData = []
    let jobListing = Array.from(jobListingJSON)
    jobListing.forEach(elem => {
        if(filtered.includes(elem.role))  {
        deleteList()
        filteredData.push(elem)
        }
    })
    return renderList(filteredData)
}

renderList(jobListingJSON)
makeFilteredList()