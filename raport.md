# Rapport om udvikling af webapplikationen "Den Glade Skorpe"

Til udvikling af denne applikation valgte jeg **Next.js**, da det er et af de mest populære og brugervenlige frameworks for mig. Det tilbyder indbyggede værktøjer til server-side rendering og gør det lettere at bygge moderne webapplikationer.

Til tilstandsadministration i applikationen brugte jeg **Zustand**, da det tilbyder en letvægts og nem API til at arbejde med global tilstand. Til API-interaktion brugte jeg **Axios**, som gjorde det muligt at implementere et fleksibelt og brugervenligt system til serverforespørgsler. Til styling brugte jeg **Tailwind CSS**, hvilket markant accelererede udviklingsprocessen ved at tilbyde værktøjer til at skabe responsive interfaces.

## Udviklingsstrategi

I design- og udviklingsprocessen fulgte jeg princippet "fra det simple til det komplekse". Dette tillod mig at dele arbejdet op i trin og støt bevæge mig mod afslutning af opgaven:

1. **Udvikling af statiske sider**:
   Jeg begyndte med at udvikle simple statiske sider såsom kontaktsiden og medarbejdersiden. Disse sider leverer grundlæggende information og funktionalitet, men kræver ikke kompleks logik.

2. **Forside og produktside**:
   Efter afslutningen af de statiske sider gik jeg videre med at udvikle forsiden, hvor alle retter vises, samt produktsiden, som giver brugerne mulighed for at se detaljer om hver ret og tilføje dem til kurven.

3. **Indkøbskurv**:
   Det næste trin var at implementere funktionaliteten for indkøbskurven, som giver brugerne mulighed for at tilføje, ændre antal og fjerne retter. For at gemme kurvens data blev `localStorage` brugt, hvilket sikrer, at kurvens tilstand bevares mellem sessioner.

4. **Administrationspanel**:
   Efter at have afsluttet den brugervendte del af applikationen, gik jeg videre med at udvikle administrationspanelet. I administrationspanelet blev følgende funktioner implementeret:
   - Håndtering af retter: oprettelse, redigering og sletning.
   - Håndtering af medarbejdere: tilføjelse, redigering og sletning af medarbejdere.
   - Håndtering af kategorier og ingredienser til retter.
   - Håndtering af brugere: tilføjelse og redigering af brugere.
   - Håndtering af beskeder: visning af beskeder fra kontaktsiden, ændring af deres status (læst/ulæst) og mulighed for at slette dem.
   - Håndtering af ordrer: ændring af ordrestatus (f.eks. fuldført/afsendt) og mulighed for at slette en ordre.

## Konklusion

Opgaven var meget interessant i forhold til implementering. Jeg skulle tænke over applikationens arkitektur, arbejde med serverinteraktioner samt implementere varieret funktionalitet både til den brugervendte del af hjemmesiden og til administrationspanelet. Som resultat har jeg udviklet en fuldt fungerende applikation med omfattende funktioner til at interagere med kunder og håndtere interne data i pizzeriaet.
