# Codex Context — Futura

## 1. Obiettivo del progetto

Stiamo sviluppando **Futura**, una webapp di finanza personale.

Il progetto parte da zero e deve essere costruito con standard professionali, come progetto portfolio/interview-ready per dimostrare competenze full-stack moderne.

L’obiettivo non è creare una semplice app per registrare spese, ma un **financial command center personale** capace di aiutare l’utente a:

- registrare conti, transazioni, categorie, budget e obiettivi;
- visualizzare saldo attuale e saldo previsto;
- analizzare spese fisse, variabili, discrezionali, abbonamenti e anomalie;
- simulare scenari finanziari;
- rispondere a domande pratiche come “posso permettermi questa spesa?”;
- integrare in futuro open banking, investimenti e AI controllata.

Il focus principale è:

> Prevedere, decidere e prevenire problemi, non solo mostrare grafici sul passato.

Payoff:

> La tua finanza personale, prima che accada.

---

## 2. Contesto colloqui

Il progetto deve aiutare a dimostrare competenze richieste da candidature frontend/full-stack moderne.

Skill tecniche da coprire progressivamente:

- conoscenza avanzata di React.js v18+;
- lifecycle React;
- built-in hooks;
- composition patterns;
- layout CSS complessi;
- Tailwind CSS;
- Styled Components come conoscenza teorica o eventuale confronto tecnico;
- JavaScript ES6+;
- TypeScript v5+;
- API REST;
- WebSocket;
- SSG;
- SSR;
- Node package manager avanzati, soprattutto pnpm;
- Git;
- branching strategy;
- commit convention;
- Node.js;
- SQL;
- PostgreSQL;
- Docker.

Il progetto deve quindi essere sviluppato con attenzione sia alla qualità reale del codice sia alla spendibilità in colloquio.

Ogni scelta tecnica dovrebbe essere spiegabile rispondendo a domande come:

- perché questa architettura;
- perché questo stack;
- come viene gestita la sicurezza;
- come si evita accesso cross-user;
- come si valida l’input;
- come si gestiscono errori e stati inattesi;
- come si testa;
- come si organizza il codice;
- come si mantiene il progetto scalabile.

---

## 3. Stato attuale del progetto

La repository è nella fase iniziale di bootstrap, ma la base monorepo è già stata avviata.

Stato attuale:

- monorepo pnpm configurato;
- workspace `apps/api` creato;
- workspace `apps/web` creato;
- workspace `packages/shared` creato;
- configurazione TypeScript condivisa tramite `tsconfig.base.json`;
- API foundation con NestJS e Fastify adapter in `apps/api`;
- configurazione API minima tramite `API_PORT`;
- endpoint `GET /health`;
- PostgreSQL locale configurato via Docker Compose;
- Docker Compose project name: `futura`;
- Prisma foundation configurata in `apps/api`;
- DatabaseModule e PrismaService presenti in `apps/api`;
- foundation TypeScript minima per `packages/shared`;
- money value object condiviso in `@futura/shared`;
- frontend scaffoldato con Next.js in `apps/web`;
- Prettier configurato a livello root;
- README aggiornato con setup locale e stato del progetto.

Non assumere che database, Prisma o auth siano già implementati.

Prima di modificare qualsiasi cosa:

1. leggere questo file;
2. analizzare lo stato reale della repository;
3. verificare i file presenti;
4. proporre un piano breve;
5. applicare modifiche piccole e verificabili.

File principali attuali:

```txt
README.md
package.json
pnpm-workspace.yaml
pnpm-lock.yaml
.gitignore
.prettierrc
.prettierignore
.env.example
Docker/docker-compose.yml
apps/api/prisma/schema.prisma
apps/api/prisma.config.ts
tsconfig.base.json
docs/codex-context.md
```

Struttura monorepo target:

```txt
futura/
  apps/
    api/
      prisma/
      src/
      package.json
      tsconfig.json
      tsconfig.build.json

    web/
      src/
      package.json
      tsconfig.json

  packages/
    shared/
      src/
      package.json
      tsconfig.json

  docs/

  Docker/
    docker-compose.yml

  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  README.md
```

---

## 4. Stack tecnico target

### Monorepo

- pnpm workspace
- struttura `apps/*`
- struttura `packages/*`
- script root coerenti
- Conventional Commits
- branch strategy ordinata
- workspace filtering con pnpm

### Backend

- Node.js
- NestJS
- Fastify
- TypeScript
- PostgreSQL
- Prisma
- JWT
- Cookie httpOnly
- Argon2
- `@nestjs/config`
- `@nestjs/jwt`
- `@fastify/cookie`
- DTO validation
- struttura modulare/domain-based

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- `@hookform/resolvers`
- TanStack Query
- Fetch API con `credentials: 'include'`

### Database

- PostgreSQL locale via Docker Compose
- porta host preferita: `5433`
- database locale previsto: `personal_finance`
- database test previsto: `personal_finance_test`

### CI

- GitHub Actions
- PostgreSQL service
- pnpm install
- Prisma generate
- Prisma migrate deploy
- lint
- build
- test

---

## 5. Principi non negoziabili

### Sicurezza

- Non salvare token in `localStorage`.
- Usare cookie httpOnly.
- Validare sempre lato backend.
- Non fidarsi mai dei dati ricevuti dal client.
- Non accettare `userId` dal body per operazioni utente.
- Ogni risorsa finanziaria deve essere filtrata per `userId`.
- Nessun accesso cross-user deve essere possibile.
- Non committare `.env`, password, token, cookie o segreti.
- Gli errori non devono esporre informazioni sensibili.
- Le password devono essere hashate con Argon2.
- Il refresh token deve essere hashato nel database.
- Il logout deve revocare il refresh token ed essere idempotente.
- Non generare query SQL libere da input utente.
- Usare prepared statement o ORM sicuro.
- Evitare XSS, CSRF e data leakage.

### Denaro

Evitare `float` per importi monetari, salvo decisione esplicita e documentata per MVP.

Preferenza tecnica:

```txt
amountMinor: BigInt
currency: EUR | GBP | USD
```

Esempio:

```txt
12,34 EUR -> 1234
```

Motivazione:

- evitare errori floating point;
- mantenere coerenza nei calcoli;
- semplificare aggregazioni e report.

Regole attuali:

- il runtime TypeScript usa `bigint`;
- i payload JSON usano stringhe per `amountMinor`, perché JSON non supporta `bigint`;
- backend e frontend devono condividere la stessa rappresentazione tramite `@futura/shared`;
- `parseMoney` deve validare i dati JSON esterni prima di usarli come dati di dominio;
- non fare conversioni tra valute senza un tasso di cambio esplicito.

Ogni eventuale semplificazione con `number`/`Float` deve essere esplicitamente motivata e documentata.

### Qualità codice

Il codice deve essere:

- semplice;
- leggibile;
- tipizzato;
- testabile;
- modulare;
- coerente;
- privo di duplicazioni inutili;
- resiliente agli stati inattesi;
- comprensibile da un futuro sviluppatore.

Evitare:

- `any` non necessario;
- logica duplicata;
- validazioni solo frontend;
- dipendenze implicite;
- side effect nascosti;
- funzioni troppo grandi;
- accessi cross-user;
- gestione superficiale degli errori;
- codice “furbo” ma poco chiaro.

### Frontend

- Separare componenti presentazionali, hook e chiamate API.
- Usare React Hook Form + Zod per i form.
- Usare TanStack Query per server state.
- Usare `credentials: 'include'` per chiamate che coinvolgono cookie.
- Non memorizzare access token nel frontend.
- Gestire loading, error e empty state.
- Preferire composition patterns chiari.
- Evitare componenti monolitici.
- Creare componenti riusabili solo quando serve davvero.
- Non astrarre prematuramente.
- Mantenere layout responsivi e accessibili.

### Backend

- Usare DTO per input.
- Validare input lato backend.
- Usare service separati.
- Il controller deve rimanere sottile.
- Ogni query su risorse utente deve filtrare per `userId`.
- Preferire transazioni DB per operazioni che modificano più entità correlate.
- Gestire errori con eccezioni controllate.
- Non esporre password, token hash o campi sensibili nelle response.
- Non duplicare logica di dominio nei controller.
- Mantenere i moduli focalizzati.

---

## 6. Branching strategy

Branch principale:

```txt
main
```

Branch di lavoro:

```txt
feature/<nome-feature>
fix/<nome-fix>
chore/<nome-task>
docs/<nome-documentazione>
refactor/<nome-refactor>
```

Esempi:

```txt
chore/bootstrap-monorepo
feature/auth-backend
feature/auth-frontend
feature/accounts
feature/transactions
feature/csv-import
docs/project-context
```

Regole:

- non lavorare direttamente su `main`, salvo inizializzazione minima;
- aprire branch piccoli;
- una feature per branch;
- commit leggibili;
- PR piccole e verificabili;
- merge solo con pipeline verde quando la CI sarà attiva.

---

## 7. Commit convention

Usare Conventional Commits.

Esempi:

```txt
chore: initialize repository
docs: add project context for codex
chore: bootstrap pnpm workspace
feat: add api application
feat: add web application
feat: add authentication module
fix: prevent cross-user account access
refactor: extract api client
test: add account service tests
ci: add api pipeline
```

Tipi principali:

```txt
feat
fix
docs
style
refactor
test
chore
ci
build
```

Linee guida:

- usare messaggi brevi ma chiari;
- non mischiare troppi cambiamenti nello stesso commit;
- evitare commit generici tipo `update`, `fix stuff`, `changes`;
- preferire commit atomici.

---

## 8. Roadmap tecnica iniziale

### Milestone 1 — Bootstrap repository

Obiettivo: creare una base monorepo pulita.

Stato: completata.

Task completati:

- verificare `package.json`;
- verificare `pnpm-workspace.yaml`;
- verificare `.gitignore`;
- creare cartelle `apps/api`, `apps/web`, `packages/shared`, `docs`;
- aggiungere script root minimi;
- aggiungere README;
- aggiungere contesto Codex;
- configurare Prettier;
- aggiungere `.next` agli ignore.

Criteri:

- struttura coerente;
- nessuna dipendenza inutile;
- nessun file sensibile;
- repository pronta per backend/frontend.

---

### Milestone 2 — Workspace foundations

Obiettivo: rendere reali i workspace senza introdurre dominio.

Stato: completata.

Task:

- creare `package.json` per `apps/api`;
- creare `package.json` per `apps/web`;
- creare `package.json` per `packages/shared`;
- aggiungere `tsconfig.json` minimi per ogni workspace;
- rendere `apps/api` compilabile con TypeScript;
- rendere `packages/shared` compilabile con TypeScript;
- rendere `apps/web` compilabile con Next.js;
- allineare script `build`, `lint`, `dev`, `test`, `format`.

Criteri:

- `pnpm build` funzionante;
- `pnpm lint` funzionante;
- `pnpm format:check` funzionante;
- nessuna feature di dominio;
- nessun database;
- nessuna auth.

---

### Milestone 3 — Backend foundation

Obiettivo: creare backend NestJS + Fastify.

Stato: in corso.

Task completati:

- creare app NestJS in `apps/api`;
- configurare Fastify;
- configurare TypeScript;
- aggiungere config API minima tramite `API_PORT`;
- aggiungere `.env.example` senza segreti;
- aggiungere endpoint health;
- configurare build;
- configurare test;

Task ancora da fare:

- aggiungere endpoint root, se utile;
- configurare lint dedicato API;
- esporre script root per avvio API.

Criteri:

- app avviabile;
- build funzionante;
- lint funzionante;
- struttura modulare;
- endpoint health funzionante.

---

### Milestone 4 — Database foundation

Obiettivo: collegare PostgreSQL e Prisma.

Stato: in corso.

Task completati:

- creare `Docker/docker-compose.yml`;
- configurare PostgreSQL locale;
- usare porta host `5433`;
- usare database locale `futura`;
- impostare Docker Compose project name `futura`;
- aggiungere `.env.example`;
- configurare Prisma foundation;
- creare `DatabaseModule`;
- creare `PrismaService`;

Task ancora da fare:

- definire i modelli Prisma di dominio;
- preparare prima migration.

Criteri:

- database avviabile via Docker;
- Prisma configurato;
- client generabile;
- connessione testata quando l'API avrà un layer database;
- `.env` non committato.

---

### Milestone 5 — Frontend foundation

Obiettivo: stabilizzare frontend Next.js + React + TypeScript.

Task:

- mantenere `apps/web` come app Next.js;
- usare App Router;
- mantenere Tailwind CSS;
- impostare struttura feature-based;
- aggiungere layout base;
- creare pagine iniziali.

Criteri:

- app avviabile;
- build funzionante;
- lint funzionante;
- routing Next.js funzionante.

---

### Milestone 6 — Authentication

Obiettivo: implementare auth sicura.

Backend:

- `POST /auth/register`;
- `POST /auth/login`;
- `POST /auth/refresh`;
- `GET /auth/me`;
- `POST /auth/logout`.

Frontend:

- `/login`;
- `/register`;
- `/dashboard`;
- protected route;
- session restore tramite `/auth/me`.

Regole:

- cookie httpOnly;
- refresh token rotation;
- password hash Argon2;
- nessun token in localStorage;
- response utente pubblica senza campi sensibili.

---

### Milestone 7 — Dominio finanziario base

Obiettivo: implementare conti e transazioni.

Account:

- create;
- list;
- detail;
- update;
- archive;
- restore;
- delete controllata.

Transazioni:

- create income;
- create expense;
- list;
- detail;
- update;
- delete;
- aggiornamento saldo atomico.

---

### Milestone 7 — Categorie, filtri e import

Obiettivo: rendere il dominio finanziario utile.

Task:

- categorie predefinite;
- CRUD categorie;
- collegamento transazioni-categorie;
- filtri transazioni;
- import CSV;
- preview import;
- validazione righe;
- batch import;
- deduplicazione futura.

---

### Milestone 8 — Analytics

Obiettivo: mostrare valore prodotto.

Task:

- dashboard principale;
- entrate mese;
- uscite mese;
- saving rate;
- saldo totale;
- analisi categorie;
- analisi merchant;
- report mensile iniziale.

---

## 9. User stories

Legenda stati:

```txt
[DA FARE] non ancora implementata
[PARZIALE] iniziata ma incompleta
[COMPLETATA] implementata e verificata
```

Dato che il progetto parte da zero, tutte le user stories sono attualmente da fare, salvo diversa verifica nel repository.

---

# EPIC 1 — Bootstrap progetto

## US-001 — Creazione monorepo

Stato: [DA FARE]

Come sviluppatore voglio un monorepo pnpm per gestire backend, frontend e package condivisi in modo ordinato.

Criteri:

- repository Git inizializzata;
- workspace pnpm configurato;
- `apps/api`;
- `apps/web`;
- `packages/shared`;
- `docs`;
- script root per dev/build/lint/test;
- `.gitignore` corretto;
- README presente;
- contesto Codex presente.

---

## US-002 — Package metadata root

Stato: [DA FARE]

Come sviluppatore voglio un `package.json` root pulito per descrivere il progetto e orchestrare il workspace.

Criteri:

- `name` coerente;
- `version` iniziale;
- `private: true`;
- `license: UNLICENSED`;
- `packageManager` configurato;
- `description` professionale;
- `keywords` coerenti;
- script root minimi.

---

## US-003 — Documentazione iniziale

Stato: [DA FARE]

Come sviluppatore voglio una documentazione iniziale per rendere chiari obiettivi, stack e roadmap.

Criteri:

- `README.md`;
- `docs/codex-context.md`;
- descrizione prodotto;
- stack target;
- roadmap;
- principi tecnici;
- user stories.

---

# EPIC 2 — Backend foundation

## US-004 — Backend NestJS + Fastify

Stato: [DA FARE]

Come sviluppatore voglio un backend NestJS con Fastify per avere API modulari e performanti.

Criteri:

- backend NestJS in `apps/api`;
- Fastify adapter configurato;
- endpoint root funzionante;
- endpoint health funzionante;
- app avviabile con script pnpm;
- build funzionante;
- lint funzionante.

---

## US-005 — Configurazione backend

Stato: [DA FARE]

Come sviluppatore voglio una configurazione backend robusta basata su variabili ambiente.

Criteri:

- `@nestjs/config`;
- `.env.example`;
- validazione variabili ambiente;
- nessun secret committato;
- configurazione centralizzata;
- errore chiaro se mancano variabili obbligatorie.

---

## US-006 — PostgreSQL locale

Stato: [DA FARE]

Come sviluppatore voglio PostgreSQL locale via Docker per sviluppare con un database reale.

Criteri:

- `docker-compose.yml`;
- PostgreSQL container;
- porta locale `5433`;
- database `personal_finance`;
- utente dedicato;
- volume persistente;
- healthcheck;
- connessione verificabile.

---

## US-007 — Prisma setup

Stato: [DA FARE]

Come sviluppatore voglio Prisma collegato a PostgreSQL per gestire schema, migration e client DB.

Criteri:

- Prisma configurato;
- schema iniziale;
- client generabile;
- prima migration;
- `PrismaService`;
- connessione tramite variabili ambiente;
- script per generate/migrate.

---

# EPIC 3 — Frontend foundation

## US-008 — Frontend React base

Stato: [DA FARE]

Come utente voglio una UI web base per accedere all’applicazione.

Criteri:

- React + Vite;
- TypeScript;
- React Router;
- struttura `apps/web`;
- app avviabile;
- build funzionante;
- lint funzionante.

---

## US-009 — Tailwind CSS

Stato: [DA FARE]

Come sviluppatore voglio Tailwind CSS per costruire layout moderni e coerenti.

Criteri:

- Tailwind configurato;
- file CSS base;
- classi utility funzionanti;
- layout responsive iniziale;
- nessuna duplicazione CSS inutile.

---

## US-010 — Struttura frontend feature-based

Stato: [DA FARE]

Come sviluppatore voglio una struttura frontend chiara e scalabile.

Criteri:

- cartella `app`;
- cartella `features`;
- cartella `pages`;
- cartella `lib`;
- routing centralizzato;
- API client centralizzato;
- providers centralizzati.

---

# EPIC 4 — Authentication backend

## US-011 — Entità minime auth

Stato: [DA FARE]

Come sistema voglio modellare utenti, credenziali, identità esterne e refresh token.

Criteri:

- `User`;
- `PasswordCredential`;
- `AuthIdentity`;
- `RefreshToken`;
- enum `AuthProvider`;
- relazioni corrette;
- refresh token salvabili e revocabili;
- campi sensibili non esposti.

---

## US-012 — Register email/password

Stato: [DA FARE]

Come utente voglio registrarmi con email e password.

Criteri:

- endpoint `POST /auth/register`;
- validazione DTO;
- email normalizzata;
- password hashata con Argon2;
- creazione utente;
- creazione credenziale password;
- creazione identità LOCAL;
- errore 409 su email duplicata;
- cookie sessione impostati;
- nessuna password in chiaro nel DB.

---

## US-013 — Login email/password

Stato: [DA FARE]

Come utente voglio accedere con email e password.

Criteri:

- endpoint `POST /auth/login`;
- verifica email/password;
- errore generico su credenziali errate;
- access token;
- refresh token;
- cookie httpOnly;
- refresh token hashato nel DB.

---

## US-014 — Sessione autenticata `/auth/me`

Stato: [DA FARE]

Come utente voglio recuperare la sessione corrente.

Criteri:

- endpoint `GET /auth/me`;
- lettura `access_token`;
- validazione JWT;
- restituzione utente pubblico;
- 401 se token assente/invalido.

---

## US-015 — Logout

Stato: [DA FARE]

Come utente voglio uscire dalla sessione.

Criteri:

- endpoint `POST /auth/logout`;
- pulizia cookie;
- revoca refresh token se presente;
- comportamento idempotente.

---

## US-016 — Refresh token rotation

Stato: [DA FARE]

Come sistema voglio ruotare i refresh token per ridurre rischio in caso di furto token.

Criteri:

- endpoint `POST /auth/refresh`;
- refresh token contiene `jti`;
- record `RefreshToken`;
- verifica hash Argon2;
- controllo scadenza;
- controllo revoca;
- revoca vecchio token;
- creazione nuova coppia token.

---

## US-017 — Google OAuth

Stato: [DA FARE]

Come utente voglio accedere tramite Google.

Criteri:

- endpoint `GET /auth/google`;
- endpoint callback Google;
- creazione/collegamento `AuthIdentity GOOGLE`;
- linking automatico solo con email verificata;
- cookie applicativi dopo login;
- nessun token Google usato come sessione interna;
- gestione errori provider.

---

# EPIC 5 — Authentication frontend

## US-018 — Form login

Stato: [DA FARE]

Come utente voglio compilare un form login.

Criteri:

- pagina `/login`;
- form email/password;
- validazione React Hook Form + Zod;
- submit verso `/auth/login`;
- gestione loading;
- gestione errori;
- redirect a `/dashboard`.

---

## US-019 — Form register

Stato: [DA FARE]

Come utente voglio compilare un form registrazione.

Criteri:

- pagina `/register`;
- form displayName/email/password;
- validazione React Hook Form + Zod;
- submit verso `/auth/register`;
- gestione errore email duplicata;
- gestione loading;
- redirect a `/dashboard`.

---

## US-020 — Protected route

Stato: [DA FARE]

Come sistema voglio proteggere le route private.

Criteri:

- `ProtectedRoute`;
- chiamata `/auth/me`;
- stato sessione centralizzato;
- redirect a `/login` se non autenticato;
- dashboard accessibile solo con sessione valida.

---

## US-021 — Logout frontend

Stato: [DA FARE]

Come utente voglio fare logout dalla UI.

Criteri:

- chiamata `/auth/logout`;
- reset stato utente;
- redirect o blocco accesso dashboard;
- cookie puliti lato backend;
- gestione errore controllata.

---

# EPIC 6 — CI/CD

## US-022 — Pipeline GitHub Actions

Stato: [DA FARE]

Come sviluppatore voglio una pipeline GitHub Actions per validare il progetto prima del merge.

Criteri:

- workflow `.github/workflows/ci.yml`;
- trigger su push e pull request;
- install pnpm;
- install dipendenze;
- lint;
- build;
- test.

---

## US-023 — Pipeline backend con PostgreSQL

Stato: [DA FARE]

Come sviluppatore voglio testare il backend in CI con PostgreSQL reale.

Criteri:

- PostgreSQL service;
- database test;
- healthcheck;
- Prisma generate;
- Prisma migrate deploy;
- test backend;
- secret per password DB;
- nessun secret dentro `services.options`.

---

## US-024 — Branch protection

Stato: [DA FARE]

Come maintainer voglio impedire merge su main se la pipeline fallisce.

Criteri:

- branch protection su `main`;
- required pull request;
- required status checks;
- blocco push diretto su `main`;
- merge consentito solo con CI verde.

---

# EPIC 7 — Account finanziari manuali

## US-025 — Modello Account

Stato: [DA FARE]

Come sistema voglio modellare i conti finanziari dell’utente.

Criteri:

- modello `Account`;
- relazione con `User`;
- enum `AccountType`;
- valuta;
- saldo iniziale;
- saldo attuale;
- flag `includeInNetWorth`;
- `archivedAt`;
- vincolo nome univoco per utente;
- query sempre filtrate per `userId`.

Tipi account previsti:

```txt
CHECKING
SAVINGS
CREDIT_CARD
PREPAID_CARD
CASH
PAYPAL
INVESTMENT
LOAN
MORTGAGE
OTHER
```

---

## US-026 — Creazione account

Stato: [DA FARE]

Come utente voglio creare un conto manuale.

Criteri:

- endpoint `POST /accounts`;
- auth obbligatoria;
- nome obbligatorio;
- tipo conto valido;
- valuta valida;
- saldo iniziale valido;
- saldo attuale inizializzato allo stesso valore del saldo iniziale;
- ownership su `userId`;
- nessun cross-user.

---

## US-027 — Lista account

Stato: [DA FARE]

Come utente voglio vedere i miei conti.

Criteri:

- endpoint `GET /accounts`;
- restituisce solo account dell’utente autenticato;
- default esclude archiviati;
- parametro opzionale per includere archiviati;
- ordinamento stabile.

---

## US-028 — Dettaglio account

Stato: [DA FARE]

Come utente voglio vedere il dettaglio di un conto.

Criteri:

- endpoint `GET /accounts/:id`;
- solo owner può accedere;
- 404 se non esiste o non appartiene all’utente.

---

## US-029 — Modifica account

Stato: [DA FARE]

Come utente voglio modificare un conto.

Criteri:

- endpoint `PATCH /accounts/:id`;
- solo owner;
- modifica nome/tipo/includeInNetWorth;
- validazione input;
- gestione nome duplicato per utente.

---

## US-030 — Archivia account

Stato: [DA FARE]

Come utente voglio archiviare un conto che non uso più.

Criteri:

- endpoint `POST /accounts/:id/archive`;
- imposta `archivedAt`;
- account escluso dalla lista default;
- dati storici preservati;
- solo owner.

---

## US-031 — Ripristina account

Stato: [DA FARE]

Come utente voglio ripristinare un conto archiviato.

Criteri:

- endpoint `POST /accounts/:id/restore`;
- reset `archivedAt`;
- solo owner.

---

## US-032 — Elimina account

Stato: [DA FARE]

Come utente voglio eliminare un conto creato per errore.

Criteri:

- endpoint `DELETE /accounts/:id`;
- consentito se non ci sono dipendenze;
- in futuro bloccare se esistono transazioni;
- solo owner.

---

## US-033 — UI account frontend

Stato: [DA FARE]

Come utente voglio gestire i miei conti dalla UI.

Criteri:

- pagina `/accounts`;
- lista account;
- card account;
- form creazione account;
- form modifica account;
- archivia/ripristina;
- validazione React Hook Form + Zod;
- loading/error/empty state;
- TanStack Query.

---

# EPIC 8 — Categorie e tag

## US-034 — Categorie predefinite

Stato: [DA FARE]

Come utente voglio avere categorie già pronte dopo la registrazione.

Criteri:

- modello `Category`;
- categorie seeded per utente;
- categorie entrata;
- categorie uscita;
- categorie trasferimento;
- categorie di sistema;
- categoria “Non categorizzata”.

---

## US-035 — CRUD categorie

Stato: [DA FARE]

Come utente voglio creare e modificare categorie personalizzate.

Criteri:

- create;
- list;
- update;
- archive;
- gerarchia parent/child;
- nome unico per utente;
- no cicli gerarchici;
- solo owner.

---

## US-036 — Tag transazioni

Stato: [DA FARE]

Come utente voglio assegnare tag alle transazioni.

Criteri:

- modello `Tag`;
- relazione many-to-many con transazioni;
- nome unico per utente;
- filtri per tag;
- solo owner.

---

# EPIC 9 — Transazioni

## US-037 — Modello transazione

Stato: [DA FARE]

Come sistema voglio modellare entrate e uscite.

Criteri:

- modello `Transaction`;
- tipo `INCOME`;
- tipo `EXPENSE`;
- importo positivo;
- valuta;
- data transazione;
- account;
- categoria opzionale;
- descrizione;
- merchant;
- note;
- ownership;
- indici utili.

---

## US-038 — Inserimento uscita

Stato: [DA FARE]

Come utente voglio registrare una spesa.

Criteri:

- endpoint `POST /transactions`;
- tipo `EXPENSE`;
- account obbligatorio;
- importo positivo;
- solo owner;
- decremento saldo account;
- creazione transazione e aggiornamento saldo nella stessa transazione DB.

---

## US-039 — Inserimento entrata

Stato: [DA FARE]

Come utente voglio registrare un’entrata.

Criteri:

- endpoint `POST /transactions`;
- tipo `INCOME`;
- account obbligatorio;
- importo positivo;
- solo owner;
- incremento saldo account;
- creazione transazione e aggiornamento saldo nella stessa transazione DB.

---

## US-040 — Trasferimento tra conti

Stato: [DA FARE]

Come utente voglio spostare denaro tra conti senza alterare entrate/uscite reali.

Criteri:

- conto origine;
- conto destinazione;
- importo positivo;
- esclusione dai report spese/entrate;
- transfer group;
- aggiornamento atomico dei due saldi.

---

## US-041 — Lista transazioni

Stato: [DA FARE]

Come utente voglio vedere e filtrare le transazioni.

Criteri:

- endpoint `GET /transactions`;
- filtri per data;
- filtro per account;
- filtro per categoria;
- filtro per tipo;
- filtro testo;
- filtro tag;
- paginazione;
- ordinamento;
- solo transazioni dell’utente.

---

## US-042 — Dettaglio transazione

Stato: [DA FARE]

Come utente voglio vedere il dettaglio di una transazione.

Criteri:

- endpoint `GET /transactions/:id`;
- ownership tramite `id + userId`;
- 404 se inesistente o non owner.

---

## US-043 — Modifica transazione

Stato: [DA FARE]

Come utente voglio correggere una transazione.

Criteri:

- endpoint `PATCH /transactions/:id`;
- update controllato;
- solo owner;
- ricalcolo saldo se cambia tipo/importo;
- operazione atomica;
- audit futuro.

---

## US-044 — Eliminazione transazione

Stato: [DA FARE]

Come utente voglio eliminare una transazione errata.

Criteri:

- endpoint `DELETE /transactions/:id`;
- solo owner;
- annullamento impatto sul saldo;
- operazione atomica;
- soft delete da valutare in futuro.

---

## US-045 — UI transazioni frontend

Stato: [DA FARE]

Come utente voglio gestire le transazioni dalla UI.

Criteri:

- lista transazioni;
- form creazione;
- form modifica;
- eliminazione con conferma;
- filtri base;
- loading/error/empty state;
- invalidazione cache;
- aggiornamento saldo visibile.

---

# EPIC 10 — Import dati

## US-046 — Import CSV

Stato: [DA FARE]

Come utente voglio importare transazioni da CSV bancario.

Criteri:

- upload CSV;
- preview;
- mapping colonne;
- parsing date/importi;
- separatori italiani;
- validazione righe;
- batch import;
- solo owner;
- nessuna riga importata se l’operazione fallisce in modo critico.

---

## US-047 — Deduplicazione import

Stato: [DA FARE]

Come utente voglio evitare duplicati durante import.

Criteri:

- fingerprint transazione;
- duplicati esatti;
- duplicati probabili;
- review utente;
- nessun duplicato importato senza conferma.

---

## US-048 — Conferma import

Stato: [DA FARE]

Come utente voglio confermare solo righe valide.

Criteri:

- import atomico;
- rollback su errore;
- riepilogo importate;
- riepilogo scartate;
- riepilogo duplicate.

---

# EPIC 11 — Budget e obiettivi

## US-049 — Budget mensile per categoria

Stato: [DA FARE]

Come utente voglio impostare budget per categoria.

Criteri:

- modello `Budget`;
- categoria;
- periodo;
- importo in minor units;
- calcolo consumato;
- calcolo residuo;
- solo owner.

---

## US-050 — Alert budget

Stato: [DA FARE]

Come utente voglio essere avvisato quando supero soglie budget.

Criteri:

- soglia 80%;
- soglia 100%;
- no duplicati inutili;
- alert in-app;
- stato letto/non letto.

---

## US-051 — Obiettivi di risparmio

Stato: [DA FARE]

Come utente voglio creare obiettivi finanziari.

Criteri:

- target amount;
- target date;
- progresso;
- contributo mensile suggerito;
- solo owner.

---

## US-052 — Fondo emergenza

Stato: [DA FARE]

Come utente voglio calcolare il fondo emergenza ideale.

Criteri:

- spese essenziali;
- target 3/6/12 mesi;
- copertura attuale in mesi;
- suggerimento gap da colmare.

---

# EPIC 12 — Analytics

## US-053 — Dashboard principale

Stato: [DA FARE]

Come utente voglio vedere riepilogo finanziario.

Criteri:

- saldi account;
- entrate mese;
- uscite mese;
- risparmio netto;
- saving rate;
- budget residuo;
- dati solo dell’utente.

---

## US-054 — Analisi per categoria

Stato: [DA FARE]

Come utente voglio capire dove spendo.

Criteri:

- spese per categoria;
- trend;
- confronto con periodo precedente;
- parent/child;
- filtri temporali.

---

## US-055 — Analisi merchant

Stato: [DA FARE]

Come utente voglio vedere i merchant principali.

Criteri:

- top merchant;
- frequenza;
- spesa media;
- normalizzazione merchant.

---

## US-056 — Spese fisse/variabili/discrezionali

Stato: [DA FARE]

Come utente voglio capire la rigidità della mia spesa.

Criteri:

- natura categoria;
- percentuali su entrate;
- indice rigidità finanziaria;
- confronto mese su mese.

---

## US-057 — Anomaly detection

Stato: [DA FARE]

Come utente voglio rilevare spese anomale.

Criteri:

- confronto storico;
- soglia;
- insight;
- feedback utile/non utile;
- nessun falso dato inventato.

---

# EPIC 13 — Abbonamenti

## US-058 — Rilevamento abbonamenti

Stato: [DA FARE]

Come utente voglio identificare abbonamenti ricorrenti.

Criteri:

- pattern ricorrenti;
- tolleranza importo;
- tolleranza data;
- conferma o ignora;
- merchant normalizzato.

---

## US-059 — Dashboard abbonamenti

Stato: [DA FARE]

Come utente voglio vedere costo mensile/annuale abbonamenti.

Criteri:

- costo mensile equivalente;
- costo annuale;
- prossimo rinnovo;
- stato attivo/ignorato.

---

## US-060 — Alert rinnovo

Stato: [DA FARE]

Come utente voglio essere avvisato prima del rinnovo.

Criteri:

- alert prima della data;
- no duplicati;
- notifica in-app;
- futura notifica email opzionale.

---

# EPIC 14 — Cash flow e forecast

## US-061 — Cash flow 30 giorni

Stato: [DA FARE]

Come utente voglio sapere come evolverà il saldo nei prossimi 30 giorni.

Criteri:

- saldo attuale;
- transazioni ricorrenti;
- planned transactions;
- saldo minimo previsto;
- distinzione dati certi/stimati.

---

## US-062 — Forecast 90/365 giorni

Stato: [DA FARE]

Come utente voglio simulare saldo su orizzonte lungo.

Criteri:

- 90 giorni;
- 365 giorni;
- spese variabili stimate;
- dati certi vs stimati;
- scenario baseline.

---

# EPIC 15 — Scenari

## US-063 — Simulatore acquisto

Stato: [DA FARE]

Come utente voglio sapere se posso permettermi una spesa importante.

Criteri:

- importo;
- data;
- confronto baseline/scenario;
- impatto su saldo minimo;
- impatto su obiettivi;
- risposta motivata.

---

## US-064 — Simulatore spesa ricorrente

Stato: [DA FARE]

Come utente voglio valutare una nuova rata/abbonamento.

Criteri:

- importo;
- frequenza;
- durata;
- impatto mensile;
- impatto annuale;
- impatto forecast.

---

## US-065 — Simulatore cambio reddito

Stato: [DA FARE]

Come utente voglio simulare aumento, riduzione o perdita reddito.

Criteri:

- nuovo reddito;
- data inizio;
- forecast aggiornato;
- saving rate aggiornato;
- rischio liquidità.

---

# EPIC 16 — AI

## US-066 — Categorizzazione intelligente

Stato: [DA FARE]

Come utente voglio suggerimenti automatici per categorie.

Criteri:

- rule-based iniziale;
- confidence;
- feedback utente;
- apprendimento da correzioni;
- nessuna decisione irreversibile senza conferma.

---

## US-067 — Assistant domande sui dati

Stato: [DA FARE]

Come utente voglio fare domande in linguaggio naturale sui miei dati.

Criteri:

- intent controllati;
- query predefinite;
- no SQL libero generato da AI;
- risposte basate su dati reali;
- nessuna invenzione di valori.

---

## US-068 — Assistant “posso permettermelo?”

Stato: [DA FARE]

Come utente voglio chiedere se posso permettermi una spesa.

Criteri:

- parsing richiesta;
- scenario engine;
- risposta con impatto;
- nessun calcolo inventato dal modello;
- spiegazione chiara.

---

## US-069 — AI report mensile

Stato: [DA FARE]

Come utente voglio una spiegazione leggibile del mese.

Criteri:

- usa aggregati reali;
- spiega variazioni;
- non inventa dati;
- disattivabile.

---

## US-070 — Disattivazione AI

Stato: [DA FARE]

Come utente voglio poter disattivare l’AI.

Criteri:

- setting `ai_enabled`;
- blocco chiamate AI;
- regole locali ancora funzionanti;
- UI chiara.

---

# EPIC 17 — Open banking e connessioni esterne

## US-071 — Astrazione provider esterni

Stato: [DA FARE]

Come sviluppatore voglio astrarre provider esterni.

Criteri:

- interfaccia provider;
- DTO normalizzati;
- adapter mock;
- sync log;
- gestione errori provider.

---

## US-072 — Collegamento banca PSD2

Stato: [DA FARE]

Come utente voglio collegare una banca.

Criteri:

- provider open banking;
- consenso;
- lista account;
- revoca;
- token cifrati;
- audit.

---

## US-073 — Sync transazioni bancarie

Stato: [DA FARE]

Come utente voglio import automatico transazioni.

Criteri:

- sync periodico;
- deduplica;
- log errori;
- mapping account esterno/interno;
- retry controllato.

---

# EPIC 18 — Patrimonio netto

## US-074 — Net worth

Stato: [DA FARE]

Come utente voglio vedere il patrimonio netto.

Criteri:

- attività;
- passività;
- andamento nel tempo;
- inclusione/esclusione account;
- storico valorizzazioni.

---

## US-075 — Asset manuali

Stato: [DA FARE]

Come utente voglio registrare asset non bancari.

Criteri:

- casa;
- auto/moto;
- oggetti valore;
- storico valutazioni;
- inclusione net worth.

---

## US-076 — Debiti/passività

Stato: [DA FARE]

Come utente voglio tracciare mutui e prestiti.

Criteri:

- saldo residuo;
- rata;
- tasso;
- scadenza;
- impatto net worth;
- impatto cash flow.

---

# EPIC 19 — Privacy, audit e dati utente

## US-077 — Audit log

Stato: [DA FARE]

Come sistema voglio tracciare operazioni critiche.

Criteri:

- login;
- logout;
- export;
- import;
- modifiche critiche;
- connessioni esterne;
- dati minimizzati.

---

## US-078 — Export dati

Stato: [DA FARE]

Come utente voglio esportare tutti i miei dati.

Criteri:

- export completo;
- formato JSON;
- formato CSV;
- download protetto;
- audit.

---

## US-079 — Cancellazione account

Stato: [DA FARE]

Come utente voglio cancellare account e dati.

Criteri:

- revoca connessioni esterne;
- cancellazione/anonymization;
- policy chiara;
- audit;
- conferma forte.

---

# EPIC 20 — Reportistica

## US-080 — Report mensile

Stato: [DA FARE]

Come utente voglio un report mensile.

Criteri:

- entrate;
- uscite;
- saving rate;
- categorie principali;
- insight;
- export PDF futuro.

---

## US-081 — Export CSV transazioni

Stato: [DA FARE]

Come utente voglio esportare transazioni.

Criteri:

- filtro date;
- filtro account;
- CSV scaricabile;
- solo dati utente;
- audit export.

---

# EPIC 21 — Notifiche

## US-082 — Centro notifiche

Stato: [DA FARE]

Come utente voglio vedere alert in-app.

Criteri:

- lista notifiche;
- mark as read;
- dismiss;
- priorità;
- solo notifiche dell’utente.

---

## US-083 — Notifiche email

Stato: [DA FARE]

Come utente voglio ricevere solo alert importanti via email.

Criteri:

- opt-in/out;
- throttling;
- template email;
- no spam;
- unsubscribe o preferenze.

---

# EPIC 22 — WebSocket e realtime

## US-084 — WebSocket foundation

Stato: [DA FARE]

Come sistema voglio supportare comunicazioni realtime controllate.

Criteri:

- setup WebSocket backend;
- autenticazione connessione;
- canale per utente;
- nessun evento cross-user;
- gestione disconnessione.

---

## US-085 — Notifiche realtime

Stato: [DA FARE]

Come utente voglio ricevere notifiche in tempo reale.

Criteri:

- evento nuova notifica;
- update centro notifiche;
- fallback tramite polling;
- gestione riconnessione.

---

## US-086 — Stato import realtime

Stato: [DA FARE]

Come utente voglio vedere avanzamento import CSV in tempo reale.

Criteri:

- evento import started;
- evento import progress;
- evento import completed;
- evento import failed;
- visibilità solo owner.

---

# EPIC 23 — SSG/SSR e architettura frontend avanzata

## US-087 — Valutazione SSR/SSG

Stato: [DA FARE]

Come sviluppatore voglio documentare quando usare SPA, SSR o SSG nel progetto.

Criteri:

- documento ADR;
- confronto SPA Vite;
- confronto SSR;
- confronto SSG;
- motivazione scelta iniziale;
- possibili evoluzioni future.

---

## US-088 — Landing pubblica ottimizzata

Stato: [DA FARE]

Come visitatore voglio una landing pubblica veloce e indicizzabile.

Criteri:

- pagina pubblica;
- contenuto statico;
- SEO base;
- performance;
- possibilità futura SSG.

---

## US-089 — Area privata SPA

Stato: [DA FARE]

Come utente autenticato voglio un’app privata dinamica.

Criteri:

- dashboard privata;
- dati caricati client-side;
- cookie httpOnly;
- protected route;
- server state con TanStack Query.

---

## 10. Modelli Prisma target auth

Quando verrà implementata l’autenticazione, usare un modello simile a questo, adattandolo allo stato reale del progetto.

```prisma
enum AuthProvider {
  LOCAL
  GOOGLE
}

model User {
  id            String               @id @default(uuid())
  email         String               @unique
  emailVerified Boolean              @default(false)
  displayName   String?
  avatarUrl     String?
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt

  password      PasswordCredential?
  identities    AuthIdentity[]
  refreshTokens RefreshToken[]

  @@index([email])
}

model PasswordCredential {
  id        String   @id @default(uuid())
  userId    String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model AuthIdentity {
  id                    String       @id @default(uuid())
  userId                String
  provider              AuthProvider
  providerUserId         String
  providerEmail          String?
  providerEmailVerified  Boolean      @default(false)
  createdAt              DateTime     @default(now())
  updatedAt              DateTime     @updatedAt

  user                  User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerUserId])
  @@index([userId])
}

model RefreshToken {
  id        String    @id @default(uuid())
  userId    String
  tokenHash String
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

Nota:

- Il campo `PasswordCredential.password` contiene l’hash Argon2, non la password in chiaro.
- In futuro si può rinominare in `passwordHash`, ma non farlo senza richiesta esplicita.

---

## 11. API target auth

Endpoint previsti:

```txt
POST /auth/register
POST /auth/login
POST /auth/refresh
GET  /auth/me
POST /auth/logout
```

Cookie previsti:

```txt
access_token
refresh_token
```

Entrambi devono essere httpOnly.

---

## 12. Struttura frontend target

Quando verrà creato il frontend, preferire una struttura simile:

```txt
apps/web/src/
  app/
    router.tsx
    providers.tsx
    routes.ts

  features/
    auth/
      api.ts
      auth-context.tsx
      LoginPage.tsx
      RegisterPage.tsx
      ProtectedRoute.tsx
      schemas.ts

  pages/
    DashboardPage.tsx

  lib/
    api-client.ts
```

Le chiamate fetch autenticate devono usare:

```ts
credentials: 'include';
```

---

## 13. Comportamento richiesto a Codex

Quando lavori su questo progetto:

1. Leggi sempre questo file prima di intervenire.
2. Analizza lo stato corrente della repo.
3. Non assumere che una feature sia già implementata.
4. Proponi modifiche piccole e verificabili.
5. Mantieni coerenza con la roadmap.
6. Non introdurre dipendenze inutili.
7. Non cambiare stack senza richiesta esplicita.
8. Non mostrare grandi blocchi di codice se non necessario.
9. Prima di implementare, spiega brevemente il piano.
10. Dopo ogni modifica, indica i comandi di verifica.
11. Preferisci soluzioni robuste, semplici e tipizzate.
12. Non usare scorciatoie che compromettono sicurezza o manutenibilità.
13. Non committare segreti.
14. Non accettare `userId` dal client.
15. Non creare astrazioni premature.
16. Non modificare decisioni architetturali senza motivarle.

---

## 14. Primo task consigliato

Continuare da qui:

```txt
Bootstrap monorepo pnpm.
```

Task operativo:

1. verificare file iniziali;
2. verificare `package.json`;
3. verificare `pnpm-workspace.yaml`;
4. verificare `.gitignore`;
5. aggiungere script root minimi;
6. preparare cartelle `apps/api`, `apps/web`, `packages/shared`, `docs`;
7. verificare che il workspace sia coerente;
8. suggerire il commit.

Prompt consigliato da usare in Codex:

```txt
Leggi docs/codex-context.md.

Siamo all’inizio del progetto Futura.

Analizza lo stato corrente della repository e continua dal bootstrap del monorepo pnpm.

Obiettivo:
- verificare la struttura iniziale;
- sistemare package.json root;
- verificare pnpm-workspace.yaml;
- verificare .gitignore;
- preparare gli script root minimi;
- non creare ancora backend o frontend se prima la base monorepo non è pulita.

Mostrami il piano prima di modificare i file.
```

---

## 15. Note finali

Questo progetto deve essere sviluppato come se fosse destinato a produzione, anche quando le feature sono ancora MVP.

Ogni scelta tecnica deve essere giustificabile in un colloquio senior.

La priorità non è correre sulle feature.

La priorità è costruire una base solida, coerente, sicura e leggibile.

Ordine consigliato:

1. repository;
2. monorepo;
3. backend foundation;
4. database foundation;
5. frontend foundation;
6. auth;
7. accounts;
8. transactions;
9. categories;
10. import CSV;
11. analytics;
12. realtime;
13. forecast;
14. AI controllata.
