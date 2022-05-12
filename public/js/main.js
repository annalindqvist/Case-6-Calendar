// DATE/DAYS/MONTH/WEEK

const dateDiv = document.getElementById("date");
const weekTag = document.getElementById("weekNumber");
const monthDiv = document.getElementById("month");
const previousWeek = document.getElementById("previousWeek");
const nextWeek = document.getElementById("nextWeek");

let current = new Date();

let datesOnWeek = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[current.getMonth()];

//console.log("currentDay", current.getDay());
//console.log("currentDate", current.getDate());


// function getWeekDays() {

//     for (let i = 0 ; i < 7 ; i++) {

//         let firstWeekDay = current.getDate() - current.getDay() + i;
//         let date = new Date(current.setDate(firstWeekDay + 1)).toString().slice(8, 10);

//         datesOnWeek.push(date);

//         // Skriver ut rätt månad
//         monthDiv.innerText = month;
//         dateDiv.innerHTML += `<p> ${datesOnWeek[i]}</p>`;
//     }
// }

function getWeekDays(chosenDate = new Date()) {

    for (let i = 0; i < 7; i++) {

        let firstWeekDay = chosenDate.getDate() - chosenDate.getDay() + i;

        let date = new Date(chosenDate.setDate(firstWeekDay + 1)).toString().slice(8, 10);

        datesOnWeek.push(date);

        // Skriver ut rätt månad 
        monthDiv.innerText = month;
        dateDiv.innerHTML += `<p> ${datesOnWeek[i]}</p>`;

        console.log(datesOnWeek)
    }

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
    console.log("previousWeek onclick");

    // Previous week ---------
    let currentWeek = Number(weekTag.innerText);
    //console.log(currentWeek);
    let previousWeekNumber = Math.max(currentWeek - 1, 1);
    //console.log(previousWeekNumber);

    weekTag.innerText = previousWeekNumber;

    //----------------
    // previous weeks dates
    // for each innertext in p tag siffran - 7...

    const d = new Date();
    d.setDate(d.getDate() - 7)
    getWeekDays(d);

    // lägger till förra veckans datum i arrayen men går alltid om från början när man klickar på pilen..
    // datesOnWeek.forEach(date => {
    //     console.log("date", date + 1);

    //     datesOnWeek.push(Number(date - 7));

    //  });


    // for (i = 0 ; i < datesOnWeek.length; i++){
    //      console.log(datesOnWeek);

    // }
    // console.log(datesOnWeek);

}

nextWeek.onclick = function () {
    console.log("next onclick");

    let currentWeek = Number(weekTag.innerText);
    console.log(currentWeek);
    let nextWeekNumber = Math.min(currentWeek + 1, 52);
    console.log(nextWeekNumber);

    weekTag.innerText = nextWeekNumber;
}