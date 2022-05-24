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
            return;
        }
        
        res.json( { events: eventModel.thisWeeksEvents(date) });

    },
    createEvent: (req, res) => {
        const date = req.body.date;
        const time = req.body.time;
        const title = req.body.title;

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
            return;
        }

        res.redirect('/mainPage');
    },
    updateEvent: (req, res) => {
        const id = Number(req.params.id);
        const date = req.body.date;
        const time = req.body.time;
        const title = req.body.title;
        
        if (id < 0) {
            return;
        }

        if (!time || !title) {
            return;
        }

        const isOK = eventModel.updateEvent(id, date, time, title);

        if (!isOK) {
            console.log("Event not Updated");
            return;
        }

        res.json( {message: "Event updated"});
        //res.redirect('/');
    }

}