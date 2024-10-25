# Instruktion til opsætning og kørsel af "Den Glade Skorpe"-applikationen

## Trin til installation og kørsel af applikationen

Følg nedenstående trin for at installere og køre applikationen lokalt på din enhed.

### 1. Installation af afhængigheder

Før du kan køre applikationen, skal du installere alle nødvendige afhængigheder.

```
npm install
```

### 2. Opsætning af variabler

For at applikationen kan fungere korrekt, skal du oprette en fil `.env.local` i roden af projektet og tilføje variablerne.

#### Eksempel på indhold af `.env.local`:

```
NEXT_PUBLIC_SERVER_PATH=http://localhost:3042
NEXT_PUBLIC_MAX_SELECTED_EXTRA=5
```

### 3. Start projektet

`npm run dev`