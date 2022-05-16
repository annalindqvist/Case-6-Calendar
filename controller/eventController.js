import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../model/eventModel.js";
import ejs from "ejs";


export default {
    getAllEvents: function (req, res) {
        // const allEvents = eventModel.getEvents();
        // const eventThisWeek = allEvents.filter(event => event.include(thisWeekEvents))
        // console.log(eventThisWeek);
        //const view = eventViews.allEvents(allEvents);

        //console.log("hej");

        res.render("mainPage", { events: eventModel.getEvents() });
    },
    thisWeeksEvents: function(req, res) {

        const date = req.params.date;
        console.log("date", date)

        if (!date) {
            console.log("something went wrong");
            return;
        }
        console.log("händer detta")
        console.log(typeof eventModel.thisWeeksEvents(date));
        res.render("mainPage", { events: eventModel.thisWeeksEvents(date) });

    },
    createEvent: (req, res) => {
        const date = req.body.date;
        const time = req.body.time;
        const title = req.body.title;

        console.log(date, time, title);

        const isOK = eventModel.addEvent(date, time, title);

        // Check if something went wrong
        if (!isOK) {
            res.render("error", { message: "Could not save event" });
            return;
        }

        res.render("mainPage", { events: eventModel.getEvents() });
    },
    removeEvent: (req, res) => {
        const id = Number(req.params.id);

        if (id < 0) {
            console.log(eventViews.errorInvalidId);
            return;
        }

        const eventToBeRemoved = eventModel.getEvent(id);
        const isOK = eventModel.removeEvent(eventToBeRemoved.id);

        if (!isOK) {
            console.log(eventViews.errorEventNotRemoved);
            return;
        }

        console.log(eventViews.eventRemoved(eventToBeRemoved));

        res.redirect('/');
    },
    updateEvent: (req, res) => {
        const id = Number(req.params.id);
        const date = req.body.date;
        const time = req.body.time;
        const title = req.body.title;
        
        if (id < 0) {
            console.log(eventViews.errorInvalidId);
            return;
        }

        if (!time || !title) {
            console.log("Date, time or title is not defined", date, time, title);
            return;
        }

        const isOK = eventModel.updateEvent(id, date, time, title);

        if (!isOK) {
            console.log("Event not Updated");
            return;
        }

        console.log("Event Updated");

        res.redirect('/');
    }

}