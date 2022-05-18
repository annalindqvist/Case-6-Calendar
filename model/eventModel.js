import fs from "fs";
import ejs from "ejs";

const dbPath = "./eventDB.json";

function getFirstDateOfWeek(date) {

    const lastDayOfWeek = new Date(date);
    
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() - 6 );
    const firstDateOfWeek = lastDayOfWeek.toLocaleDateString();

    return firstDateOfWeek;
}

function getLastDateOfWeek (date) {
    const lastDateOfWeek = new Date(date);
    const sunday = lastDateOfWeek.toLocaleDateString();
    //console.log("lastDayOfWeek", lastDayOfWeek);
    console.log("lastDateOfWeek UNIX: ", sunday);
    //return new Date(lastDateOfWeek).getTime() / 1000;
    return sunday;
}



const eventModel = {
    getEvents: function () {
        return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    },
    thisWeeksEvents: function (date){
        console.log("eventmodel, TEST date : ", date);
        //const dateToUnix = new Date(date).getTime() / 1000;
        const firstDateOfWeek = getFirstDateOfWeek(date);
        const lastDateOfWeek = getLastDateOfWeek(date);

        //console.log(firstDateOfWeek, lastDateOfWeek);

        //return this.getEvents().filter((event) => event.date >= firstDateOfWeek && event.date <= lastDateOfWeek)
        const newArray = this.getEvents().filter((event) => event.date >= firstDateOfWeek && event.date <= lastDateOfWeek)
       return newArray;
        //return this.getEvents().filter((event) => event.date === date);
    },
    getEvent: function (id) {
        return this.getEvents().find((event) => event.id === id);
      },
    saveEvents: function (events) {
        return fs.writeFileSync(dbPath, JSON.stringify(events));
    },
    addEvent: function (date, time, title) {
        const allEvents = this.getEvents();

        if (!allEvents) {
            console.log("allEvents not defined");
            return false;
        }
        if (!date || !time || !title) {
            console.log("date, time or title is not defined");
            return false;
        }
        const lastEvents = allEvents[allEvents.length - 1];
        const newId = (lastEvents?.id || 0) + 1;

        const newEvent = { id: newId, date, time, title };
        allEvents.push(newEvent);

        this.saveEvents(allEvents);

        return true;
    },
    removeEvent: function (id) {
        const allEvents = this.getEvents();
    
        if (!allEvents) {
          return false;
        }

        const filteredEvents = allEvents.filter((event) => event.id !== id);
    
        this.saveEvents(filteredEvents);
    
        return true;
    },
    updateEvent: function (id, newDate, newTime, newTitle) {
        const allEvents = this.getEvents();
    
        if (!allEvents) {
          return false;
        }

        const idx = allEvents.findIndex((event) => event.id === id);
    
        if (idx < 0) {
          return false;
        }
    
        allEvents[idx].date = newDate;
        allEvents[idx].time = newTime;
        allEvents[idx].title = newTitle;
    
        this.saveEvents(allEvents);
    
        return true;
      }
}

export default eventModel;