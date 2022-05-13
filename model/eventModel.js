import fs from "fs";
import ejs from "ejs";

const dbPath = "./eventDB.json";

const eventModel = {
    getEvents: function () {
        return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
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
      }
}

export default eventModel;