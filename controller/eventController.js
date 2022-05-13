import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../model/eventModel.js";
import ejs from "ejs";

export default {
    getAllEvents: function (req, res) {
        // const allEvents = eventModel.getEvents();

        // const view = eventViews.allEvents(allEvents);

        //console.log("hej");

        res.render("mainPage", { events: eventModel.getEvents() });
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

        const eventToBeRemoved = eventModel.getEvents(id);
        const isOK = eventModel.removeEvent(eventToBeRemoved.id);

        if (!isOK) {
            console.log(eventViews.errorEventNotRemoved);
            return;
        }

        console.log(eventViews.eventRemoved(eventToBeRemoved));

        res.redirect('/');
    }

}