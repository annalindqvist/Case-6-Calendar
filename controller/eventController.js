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
    }
}