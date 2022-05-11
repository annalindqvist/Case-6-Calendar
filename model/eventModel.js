import fs from "fs";
import ejs from "ejs";

const dbPath = "./eventDB.json";

const eventModel = {
    getEvents: function () {
        return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      }
}

export default eventModel;