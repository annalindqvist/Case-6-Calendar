// DATE/DAYS/MONTH/WEEK

const dateDiv = document.getElementById("date");
const weekTag = document.getElementById("weekNumber");
const monthDiv = document.getElementById("month");
const previousWeek = document.getElementById("previousWeek");
const nextWeek = document.getElementById("nextWeek");

let current = new Date();
let pressToChangeWeek = 0;

let datesOnWeek = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[current.getMonth()];

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

    return chosenDate;
}

getWeekDays();

function getWeek() {
    // Kolla på denna sen, borde kanske bytas till någon bättre funktion för att få vecka
    Date.prototype.getWeek = function () {
        const onejan = new Date(this.getFullYear(), 0, 1);
        return Math.floor((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    let weekNumber = (new Date()).getWeek();
    weekTag.innerText = weekNumber;

    return weekNumber;
}

getWeek();

previousWeek.onclick = function () {

    pressToChangeWeek = pressToChangeWeek - 7;

    let currentWeek = Number(weekTag.innerText);
    let previousWeekNumber = Math.max(currentWeek - 1, 1);
    weekTag.innerText = previousWeekNumber;

    const d = new Date();
    d.setDate(d.getDate() + pressToChangeWeek)
    getWeekDays(d);
}

nextWeek.onclick = function () {

    pressToChangeWeek = pressToChangeWeek + 7;

    let currentWeek = Number(weekTag.innerText);
    let nextWeekNumber = Math.min(currentWeek + 1, 52);
    weekTag.innerText = nextWeekNumber;

    const d = new Date();
    d.setDate(d.getDate() + pressToChangeWeek)
    getWeekDays(d);
}

async function removeEvent(id) {
    console.log("removeEvent was called with id", id);
    const response = await fetch(`/mainPage/${id}`, {
        method: "delete"
    });
    //let event = document.querySelector('[data-id="id"]');
    //console.log(event);
    //id.parentElement.styles.display = "none";
    if (response.redirected) {
        window.location.href = response.url; // '/'
    }
}

function renderEvents(events) {

    document.getElementById("eventList").innerHTML = "";

    events.forEach(event => {

        console.log(event.time, event.title, event.date);
        const eventListDiv = document.createElement("div");
        eventListDiv.classList = "eventListDiv";

        const eventTime = document.createElement("p");
        eventTime.classList = "eventTime";
        eventTime.innerText = event.time;
        console.log(eventTime);

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

        console.log(eventListDiv)

        const eventList = document.getElementById("eventList");
        eventList.appendChild(eventListDiv);
       
    });
}

async function thisWeeksEvent(date) {
    console.log("thisWeeksEvent was called with: ", date);

    const response = await fetch(`/mainPage/${date}`, {
        method: "get"
    });
    const responseData = await response.json();
    console.log("response", responseData)

    renderEvents(responseData.events)
}

//document.querySelectorAll(".editEvent").forEach((btn) => (btn.onclick = editEvent));
//const editEvent = document.getElementsByClassName("editEvent");

async function editEvent(e) {
    const id = Number(e.target.dataset.id); 
    console.log(e.target.parentElement.parentElement);
    const eventContainer = e.target.parentElement.parentElement;

    //const eventDate = document.getElementsByClassName("eventDate");
    const eventTime = eventContainer.children[0];
    const eventTitle = eventContainer.children[1];
    const eventDate = eventContainer.children[2];
    console.log("eventDate", eventDate.innerText);

    console.log(eventContainer.children[1])

    // if not editable make them editable
    //!eventDate.isContentEditable &&
    if (!eventTime.isContentEditable && !eventTitle.isContentEditable) {
        //eventDate.contentEditable = true;
        eventTime.contentEditable = true;
        eventTitle.contentEditable = true;

        e.target.innerHTML = '<i class="fa fa-check"></i>';
    } else {
        // Second time clicked it should save changes

        eventTime.contentEditable = false;
        eventTitle.contentEditable = false;

        e.target.innerHTML = '<i class="fa fa-pencil"></i>';

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

        // Check if there is a redirect to follow the new url
        if (response.redirected) {
            window.location.href = response.url;
        }
    }
}

//document.querySelectorAll(".editEvent").forEach((btn) => (btn.onclick = editEvent));


const openFormBtn = document.getElementById("openForm");
const submitBtn = document.getElementById("submitBtn");

openFormBtn.onclick = function () {
    document.getElementById("formPopUp").style.display = "block";
    document.getElementById("eventListContainer").style.display = "none";
}
submitBtn.onclick = function () {
    document.getElementById("formPopUp").style.display = "none";
    document.getElementById("eventListContainer").style.display = "block";

}