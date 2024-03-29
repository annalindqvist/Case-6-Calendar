// Variables

const dateDiv = document.getElementById("date");
const weekTag = document.getElementById("weekNumber");
const monthDiv = document.getElementById("month");
const previousWeek = document.getElementById("previousWeek");
const nextWeek = document.getElementById("nextWeek");
const formDate = document.getElementById("formDate");
const openFormBtn = document.getElementById("openForm");
const submitBtn = document.getElementById("submitBtn");
const menuBtn = document.getElementById("menuBtnLink");

let current = new Date();
let pressToChangeWeek = 0;
let datesOnWeek = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[current.getMonth()];

// Todays date in date-input
formDate.value = current.toISOString().slice(0, 10);

// Prints correct weeks dates
function getWeekDays(chosenDate = new Date()) {

    datesOnWeek = [];
    dateDiv.innerHTML = "";

    for (let i = 0; i < 7; i++) {

        let firstWeekDay = chosenDate.getDate() - chosenDate.getDay() + i;
        let date = new Date(chosenDate.setDate(firstWeekDay + 1)).toString().slice(8, 10);

        datesOnWeek.push(date);

        dateDiv.innerHTML += `<p> ${datesOnWeek[i]}</p>`;
    }
    month = months[chosenDate.getMonth()];
    monthDiv.innerText = month;

    thisWeeksEvent(chosenDate.toISOString());

}

getWeekDays();

// Gets this weeks number
function getWeek() {
    Date.prototype.getWeek = function () {
        const onejan = new Date(this.getFullYear(), 0, 1);
        return Math.floor((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    let weekNumber = (new Date()).getWeek();
    weekTag.innerText = weekNumber;

    return weekNumber;
}

getWeek();

// Gets previous week/weeks dates and weeknumber
previousWeek.onclick = function () {

    pressToChangeWeek = pressToChangeWeek - 7;

    let currentWeek = Number(weekTag.innerText);
    let previousWeekNumber = Math.max(currentWeek - 1, 1);
    weekTag.innerText = previousWeekNumber;

    const d = new Date();
    d.setDate(d.getDate() + pressToChangeWeek)
    getWeekDays(d);
}

// Gets next week/weeks dates and weeknumber
nextWeek.onclick = function () {

    pressToChangeWeek = pressToChangeWeek + 7;

    let currentWeek = Number(weekTag.innerText);
    let nextWeekNumber = Math.min(currentWeek + 1, 52);
    weekTag.innerText = nextWeekNumber;

    const d = new Date();
    d.setDate(d.getDate() + pressToChangeWeek)
    getWeekDays(d);
}

// Remove event
async function removeEvent(id) {
    const response = await fetch(`/mainPage/${id}`, {
        method: "delete"
    });
   
    if (response.redirected) {
        window.location.href = response.url; 
    }
}

// Render correct weeks events and sort by date
function renderEvents(events) {

    document.getElementById("eventList").innerHTML = "";

    const sortedEvents = events.sort( function (a, b) {
        
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);

        return date1 - date2;
    
    });


    events.forEach(event => {

        const eventListDiv = document.createElement("div");
        eventListDiv.classList = "eventListDiv";

        const eventTime = document.createElement("p");
        eventTime.classList = "eventTime";
        eventTime.innerText = event.time;

        const eventTitle = document.createElement("p");
        eventTitle.classList = "eventTitle";
        eventTitle.innerText = event.title;

        const eventDate = document.createElement("p");
        eventDate.classList = "eventDate";
        eventDate.innerText = event.date;

        const removeEventDiv = document.createElement("div");
        const removeEventX = document.createElement("i");
        removeEventX.classList = "fa fa-times removeEvent";
        removeEventX.onclick= () =>removeEvent(event.id);
        removeEventDiv.appendChild(removeEventX);

        const editEventDiv = document.createElement("div");
        const editEventPen = document.createElement("i");
        editEventPen.classList = "fa fa-pencil editEvent";
        editEventPen.setAttribute("data-id", event.id)
        editEventPen.onclick= (e) => editEvent(e);
        editEventDiv.appendChild(editEventPen);

        eventListDiv.appendChild(eventTime);
        eventListDiv.appendChild(eventTitle);
        eventListDiv.appendChild(eventDate);
        eventListDiv.appendChild(removeEventDiv);
        eventListDiv.appendChild(editEventDiv);

        const eventList = document.getElementById("eventList");
        eventList.appendChild(eventListDiv);
       
    });
}

// Gets correct weeks events
async function thisWeeksEvent(date) {

    const response = await fetch(`/mainPage/${date}`, {
        method: "get"
    });
    const responseData = await response.json();

    renderEvents(responseData.events)
}

// Edit event funtion
async function editEvent(e) {

    const id = Number(e.target.dataset.id); 
    const eventContainer = e.target.parentElement.parentElement;
    const eventTime = eventContainer.children[0];
    const eventTitle = eventContainer.children[1];
    const eventDate = eventContainer.children[2];

    // if not editable make them editable
    if (!eventTime.isContentEditable && !eventTitle.isContentEditable) {
        eventTime.contentEditable = true;
        eventTitle.contentEditable = true;

        e.target.classList.remove("fa-pencil");
        e.target.classList.add("fa-check");
    } else {

        eventTime.contentEditable = false;
        eventTitle.contentEditable = false;

        e.target.classList.remove("fa-check");
        e.target.classList.add("fa-pencil");

        const newEvent = {
            time: eventTime.innerText,
            title: eventTitle.innerText,
            date: eventDate.innerText,
        };
        const response = await fetch(`/mainPage/${id}`, {
            method: "put",
            body: JSON.stringify(newEvent),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.redirected) {
            window.location.href = response.url;
        }
    }
}

// Form popup onclick function
document.getElementById("formPopUp").style.display = "none";
openFormBtn.onclick = function () {

    if (document.getElementById("formPopUp").style.display === "none") {
        document.getElementById("formPopUp").style.display = "block";
        document.getElementById("eventListContainer").style.display = "none";
        openFormBtn.children[0].classList.add("rotated")

    } else {
        document.getElementById("formPopUp").style.display = "none"
        document.getElementById("eventListContainer").style.display = "block";
        openFormBtn.children[0].classList.remove("rotated")
    }
}

// Menu btn onclick function
menuBtn.onclick = function () {

    if (menuBtn.href = "/mainPage") {
        menuBtn.href = "/";

    } else {
        menuBtn.href = "/mainPage";
    }
}