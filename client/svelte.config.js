// import adapter from '@sveltejs/adapter-static';

// Passage a cet import de node pour que cela fonctionne avec Railway
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
            filename.split(/[/\\]/).includes('node_modules') ? undefined : true
    },
    kit: {
        adapter: adapter(),
        csp: {
            // mode 'nonce' : à chaque requête, SvelteKit génère un identifiant aléatoire unique (ex: "aZ3kP9")
            // Il l'injecte automatiquement dans ses scripts inline ET dans le header CSP
            // Le navigateur n'autorise que les scripts qui portent ce nonce → un script injecté par un attaquant
            // ne le connaît pas et sera bloqué, même s'il est inline
            mode: 'nonce',

            directives: {
                // Règle par défaut : toute ressource doit venir de ton propre domaine
                'default-src': ['self'],

                // Scripts JS : uniquement depuis ton domaine
                // SvelteKit complète automatiquement avec le nonce pour ses scripts inline
                'script-src': ['self'],

                // Styles CSS :
                // - 'self' → tes fichiers CSS locaux
                // - 'unsafe-inline' → nécessaire pour les <style> inline que SvelteKit génère
                // - fonts.googleapis.com → le CSS de Google Fonts
                'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],

                // Fichiers de polices :
                // - 'self' → tes polices locales éventuelles
                // - fonts.gstatic.com → où Google héberge les fichiers .woff2
                'font-src': ['self', 'https://fonts.gstatic.com'],

                // Images :
                // - 'self' → tes images locales
                // - 'data:' → images encodées en base64
                // - 'https:' → images hébergées sur n'importe quel domaine HTTPS
                'img-src': ['self', 'data:', 'https:'],

                // Requêtes HTTP (fetch, XHR) :
                // - 'self' → appels vers ton propre domaine
                // - URL Railway → ton API en production
                'connect-src': [
                    'self',
                    'http://localhost:3000',
                    'https://skillfusion-production.up.railway.app',
                    "https://formspree.io"
                ]
            }
        }
    }
};

export default config;
