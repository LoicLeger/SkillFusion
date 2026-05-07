<script>
    const currentYear = new Date().getFullYear();

    const links = [
        { label: 'Mention légale', href: '/mentions-legales' },
        { label: 'Plan du site', href: '/plan-du-site' },
        { label: 'Contact', href: '/contact' },
        { label: 'Conditions', href: '/conditions' },
        { label: 'Protection des données', href: '/protection-donnees' },
        { label: 'Accessibilité', href: '/accessibilite' }
    ];
</script>

<footer class="footer">
    <div class="footer__inner">
        <!-- Liens légaux -->
        <nav class="footer__nav" aria-label="Liens légaux">
            {#each links as link}
                <a href={link.href} class="footer__link">{link.label}</a>
            {/each}
        </nav>

        <!-- Copyright -->
        <p class="footer__copy">© {currentYear} SkillFusion. Tous droits réservés.</p>
    </div>
</footer>

<style>
    .footer {
        background-color: white;
        --blue: #1d4e89;
        --blue-light: #ebf2fa;
        --amber: #f5a623;
        --dark: #2c3e50;
        --gray: #6b7280;
        --border: rgba(44, 62, 80, 0.1);
        --white: #ffffff;
        --font: 'DM Sans', sans-serif;

        background: var(--white);
        border-top: 1px solid var(--border);
        font-family: var(--font);
        bottom: 0;
        position: relative;
    }

    .footer__inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 28px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
    }

    /* ── Nav ── */
    .footer__nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px 16px;
        justify-content: center;
        flex: 1;
    }

    .footer__link {
        font-size: 12px;
        color: var(--gray);
        text-decoration: none;
        transition: color 0.15s;
        white-space: nowrap;
    }

    .footer__link:hover {
        color: var(--blue);
    }

    /* ── Copyright ── */
    .footer__copy {
        font-size: 11px;
        color: var(--gray);
        flex-shrink: 0;
        white-space: nowrap;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
        .footer__inner {
            padding: 20px 16px;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
        }

        .footer__nav {
            justify-content: center;
            gap: 6px 12px;
        }

        .footer__link + .footer__link::before {
            display: none;
        }

        .footer__copy {
            white-space: normal;
        }
    }
</style>
