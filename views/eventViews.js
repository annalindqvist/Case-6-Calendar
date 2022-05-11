export default {
    allEvents: (events) => 
    events.map(event => ` ${event.dateTime}: '${event.title}'`).join('\n')
}