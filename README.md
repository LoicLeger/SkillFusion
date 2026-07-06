# SkillFusion

Un projet full-stack avec API (Node.js/Express) et client (SvelteKit), utilisant Docker pour le développement.

## Prérequis

- Docker et Docker Compose installés
- Node.js et npm (pour développement local optionnel)
- Git

## Installation et Lancement

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd cda-skillfusion
```

### 2. Lancer avec Docker

```bash
docker compose up --build
```

Cela construit et lance les conteneurs pour la base de données PostgreSQL, l'API et le client.

- API : http://localhost:3000
- Client : http://localhost:5173
- Base de données : localhost:5433

### 3. Corriger les permissions (si nécessaire)

Après le premier lancement Docker, les permissions des dossiers peuvent être modifiées. Pour permettre l'installation manuelle de dépendances sur l'hôte :

```bash
sudo chown -R $USER:$USER api/ client/
```

### 4. Installation des dépendances pour développement local (optionnel)

Si vous souhaitez développer sur votre machine hôte (sans Docker) :

```bash
cd api
npm install

cd ../client
npm install
```

### 5. Deploiment de prisma et seeding de la base de donnée


```bash
cd api
npm run db:reset

```

## Commandes utiles

- `docker compose up` : Lancer les conteneurs
- `docker compose down` : Arrêter les conteneurs
- `docker compose down -v` : Arrêter et supprimer les volumes
- `npm run db:seed` (dans api/) : Seeder la base de données

