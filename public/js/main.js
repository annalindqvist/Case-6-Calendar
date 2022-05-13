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

const removeBtn = document.getElementById("removeEvent");

removeBtn.onclick = function() {
    console.log(removeBtn.id);
}