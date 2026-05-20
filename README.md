# Futura

**Futura** è una webapp di finanza personale progettata per aiutare l'utente a capire, prevedere e migliorare la propria situazione economica.

L'obiettivo non è costruire una semplice applicazione per registrare spese, ma un **financial command center personale**, capace di trasformare dati finanziari grezzi in decisioni pratiche.

> La tua finanza personale, prima che accada.

## Stato attuale

Il progetto è nella fase iniziale di bootstrap.

Al momento la repository contiene:

- monorepo pnpm;
- workspace `apps/api`;
- workspace `apps/web`;
- workspace `packages/shared`;
- configurazione TypeScript condivisa;
- money value object condiviso in `@futura/shared`;
- API foundation con NestJS e Fastify adapter;
- configurazione API minima tramite `API_PORT`;
- endpoint `GET /health`;
- frontend scaffoldato con Next.js;
- Prettier configurato a livello root.

Non sono ancora presenti:

- funzionalità applicative di dominio;
- autenticazione;
- database;
- Prisma;
- Docker;
- integrazione tra frontend e backend.

## Stack attuale

- pnpm workspace
- TypeScript
- NestJS con Fastify adapter per `apps/api`
- Next.js per `apps/web`
- React
- Tailwind CSS
- Prettier

## Dominio condiviso

Il package `@futura/shared` contiene le primitive di dominio che devono restare coerenti tra backend e frontend.

La prima primitiva disponibile è `Money`:

- gli importi sono rappresentati in minor units, ad esempio `12,34 EUR -> 1234`;
- il runtime TypeScript usa `bigint` per evitare errori floating point;
- i payload JSON usano stringhe per `amountMinor`, perché JSON non supporta `bigint`;
- le valute attualmente supportate sono `EUR`, `GBP` e `USD`;
- non sono previste conversioni tra valute senza un tasso esplicito.

## Stack previsto

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query
- Fetch API con cookie httpOnly

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

### Qualità e delivery

- lint
- build
- test
- Docker Compose
- GitHub Actions
- Conventional Commits

## Struttura repository

```txt
futura/
  apps/
    api/
      src/
      package.json
      tsconfig.json

    web/
      src/

  packages/
    shared/
      src/

  docs/

  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  README.md
```

## Prerequisiti

- Node.js
- pnpm

La versione pnpm attesa è indicata nel `package.json` root tramite `packageManager`.

## Setup locale

Installa le dipendenze:

```bash
pnpm install
```

Avvia i workspace in modalità sviluppo, dove disponibile:

```bash
pnpm dev
```

Avvia solo il frontend:

```bash
pnpm --filter @futura/web dev
```

Avvia solo l'API:

```bash
pnpm --filter @futura/api dev
```

Configurazione locale minima:

```bash
cp .env.example .env
```

Variabile disponibile:

```env
API_PORT=3000
```

## Comandi principali

Build di tutti i workspace:

```bash
pnpm build
```

Lint di tutti i workspace:

```bash
pnpm lint
```

Formatta la repository:

```bash
pnpm format
```

Controlla la formattazione:

```bash
pnpm format:check
```

Test di tutti i workspace, quando presenti:

```bash
pnpm test
```

Controllo completo locale:

```bash
pnpm check
```

## Principi tecnici

- modifiche piccole e verificabili;
- nessun secret committato;
- nessun file `.env` committato;
- niente astrazioni premature;
- niente dominio prima di avere una base stabile;
- import da package condivisi tramite workspace, ad esempio `@futura/shared`;
- Conventional Commits.

## Visione prodotto

Futura dovrà evolvere progressivamente in una piattaforma capace di:

- registrare conti finanziari manuali;
- registrare entrate, uscite e trasferimenti;
- categorizzare transazioni;
- gestire budget mensili;
- tracciare obiettivi di risparmio;
- analizzare saldo attuale e saldo previsto;
- importare transazioni da CSV;
- rilevare abbonamenti e ricorrenze;
- individuare anomalie nelle spese;
- simulare scenari finanziari;
- esportare dati e report;
- integrare in futuro open banking;
- introdurre funzionalità AI controllate e verificabili.

Il focus principale è:

**prevedere, decidere e prevenire problemi**, non solo mostrare grafici sul passato.
