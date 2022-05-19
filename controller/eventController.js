import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../model/eventModel.js";
import ejs from "ejs";


export default {
    getAllEvents: function (req, res) {
        res.render("mainPage", { events: eventModel.getEvents() });
    },
    thisWeeksEvents: function(req, res) {

        const date = req.params.date;

        if (!date) {
            console.log("something went wrong");
            return;
        }
        
        res.json( { events: eventModel.thisWeeksEvents(date) });

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
        console.log(id);
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

        
        //res.json( {message: "Event removed"});
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
        console.log(date, time, title, id)

        if (!isOK) {
            console.log("Event not Updated");
            return;
        }

        console.log("Event Updated");

        res.json( {message: "Event updated"});
        //res.redirect('/');
    }

}