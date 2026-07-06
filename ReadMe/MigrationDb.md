# 🚀 Guide de migration — Base de données SkillFusion

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et démarré
- Node.js installé
- Être dans le dossier `api/` pour les commandes Prisma

> ⚠️ **Si tu as PostgreSQL installé localement sur ta machine**, le port `5432` est probablement déjà utilisé. Pas de panique, on utilise le port `5433` pour Docker.

---

## Étape 1 — Configurer le fichier `.env`

Dans le dossier `api/`, crée un fichier `.env` en te basant sur `.env.example` :

```bash
cp .env.example .env
```

Vérifie que la `DATABASE_URL` est bien configurée :

```env
DATABASE_URL="postgresql://usersf:usersf@localhost:5433/usersf"
```

---

## Étape 2 — Démarrer la base de données

Depuis la **racine du projet** :

```bash
docker-compose up -d db
```

Vérifie que le conteneur est bien démarré :

```bash
docker ps
```

Tu dois voir `skillfusion_db` avec le statut `Up` et le port `0.0.0.0:5433->5432/tcp`.

---

## Étape 3 — Installer les dépendances

Depuis le dossier `api/` :

```bash
cd api
npm install
```

---

## Étape 4 — Lancer la migration

Depuis le dossier `api/` :

```bash
npx prisma migrate dev --name init
```

Si tout se passe bien, tu verras :

```
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma\schema.prisma.
Datasource "db": PostgreSQL database "usersf", schema "public" at "localhost:5433"
✔ Generated Prisma Client
```

---

## Étape 5 (optionnel) — Vérifier la base de données

Tu peux ouvrir Prisma Studio pour visualiser les tables :

```bash
npx prisma studio
```

Ou te connecter directement au conteneur :

```bash
docker exec -it skillfusion_db psql -U usersf -d usersf
```

---

## ❌ Problèmes fréquents

### `Can't reach database server at localhost:5433`
Le conteneur Docker n'est pas démarré. Lance :
```bash
docker-compose up -d db
```

### `Authentication failed`
Vérifie que ta `DATABASE_URL` dans `api/.env` correspond bien à :
```env
DATABASE_URL="postgresql://usersf:usersf@localhost:5433/usersf"
```

### `Could not find Prisma Schema`
Assure-toi de lancer les commandes Prisma depuis le dossier `api/` :
```bash
cd api
npx prisma migrate dev --name init
```

### `Port 5433 already in use`
Un autre service utilise le port 5433. Arrête-le ou change le port dans `docker-compose.yml`.