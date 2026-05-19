# Futura

**Futura** è una webapp di finanza personale progettata per aiutare l’utente a capire, prevedere e migliorare la propria situazione economica.

L’obiettivo non è costruire una semplice applicazione per registrare spese, ma un vero **financial command center personale**, capace di trasformare dati finanziari grezzi in decisioni pratiche.

> La tua finanza personale, prima che accada.

---

## Obiettivo del progetto

Futura nasce per rispondere a domande concrete come:

- Quanto sto spendendo realmente ogni mese?
- Quali spese sono fisse, variabili o discrezionali?
- Quanto riuscirò a risparmiare nei prossimi mesi?
- Posso permettermi una determinata spesa?
- Quali abbonamenti o costi ricorrenti stanno pesando sul mio budget?
- Sto andando nella direzione giusta rispetto ai miei obiettivi finanziari?

Il focus principale è:

**prevedere, decidere e prevenire problemi**, non solo mostrare grafici sul passato.

---

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

---

## Stack tecnico previsto

### Frontend

- React
- Vite
- TypeScript
- React Router
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

### Monorepo

- pnpm workspace
- struttura `apps/*` e `packages/*`

### DevOps e qualità

- Docker
- Docker Compose
- GitHub Actions
- lint
- build
- test
- branch protection
- Conventional Commits

---

## Struttura prevista della repository

```txt
futura/
  apps/
    api/
      prisma/
      src/

    web/
      src/

  packages/
    shared/

  docs/

  .github/
    workflows/

  docker-compose.yml
  package.json
  pnpm-workspace.yaml
  README.md
```
