export default {
    allEvents: (events) => 
    events.map(event => ` ${event.date}: '${event.title}' '${event.time}'`).join('\n'),
    errorInvalidId: "Error, Invalid id specified",
    errorEventNotRemoved: "Error, quote was not removed successfully",
}