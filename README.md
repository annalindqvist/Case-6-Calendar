# CASE 6 - Calendar

Case Kalender-app

I detta caset ska ni arbeta individuellt. Scenariot är att ni vill lämna Google/Apples grepp från er dagsplanering och skapa er egen kalender applikation!

## Moment
1. Välj Teknisk kravspecifikation (Lätt/Svårare/Svårast)
###### Lätt
En användare ska kunna:
- Se en veckovy med aktuella events
- Lägga till/ta bort events
- Uppdatera ett event
- Bläddra fram och tillbaka veckovis
- Ett event ska innehålla: title, date
Applikationen ska kunna:
- Spara/läsa eventen till fil(er)
- Visa minst två olika sidor, varav en sida är kalendern
- Visa samma header, footer och navbar på varje sida

###### Svårare
Alla krav från Lätt och även:

En användare ska kunna:
- registrera flera events på samma dag
- Responsive Design (Ska fungera även fungera i mobil vy)
- See mer information om ett event om vid klick
- Ett event ska även innehålla: description, StartTime, EndTime
Applikationen ska kunna:
- Spara/läsa eventen till databas (mongoDB)

###### Svårast
Alla krav från Lätt, Svårare och även:

En användare ska kunna:
- Ska behöva logga in med username och password för att få åtkomst.
- Filtrera på event tag
- Söka på events
- Ett event ska innehålla: Tags (School, Work, Home, None)
Applikationen ska kunna:
- Registrera användare
- Spara lösenorden krypterat

2. Utforma en designskiss
Genom papper eller annat medium beskriv hur hemsidan ska se ut. Desginvalen ska motiveras. Frågor som ni bör kunna svara så är följande:

Hur har jag separerat på vardagar och helger?
Hur har jag separerat på olika vyer?
Hur har du resonerad för val av font?
Hur har du resonerad för val av färgtema?
Visa upp er designskiss för Mattias innan ni börjar implementationen.

3. Utveckla appen
- Använd er av Node.js (med express)
- Om ni ska använda databas, MongoDB
- Arbetet ska successivt updateras mot ett gitrepo.

Er redovisning förväntas belysa:

- Vilken kravspecifikation ni har siktat på (lätt, svårare, svårast)
- Presentation av designskiss
- Demonstration av applikation och dess funktioner
- Presentation av kodstruktur
- Model
- Views
- Controller
- Belysning av vad ni är mest nöjda med
- Lärdomar från caset
- Feedback
Veckan efter presentation kommer feedback ges under följande rubriker:

- Git commits dokumentering
- Användarupplevelse
- Allmän kodstil
- Kodstruktur i relation till Model-View-Controller design mönster
- Design-feedback tillkommer eventuellt från Mattias