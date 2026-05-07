<script>
    import "../../normalize.css";
    import "../../app.css";
    import Footer from "$lib/assets/components/Footer.svelte";
    import Header from "$lib/assets/components/Header.svelte";
    import App from "$lib/assets/components/App.svelte";
	import Main from "$lib/assets/components/Main.svelte";
</script>
<App>
<Header />

<Main>


	<!-- Hero -->
	<div class="hero">
		<div class="hero__tag">À propos</div>
		<h1 class="hero__title">
			Apprendre <br /><em>ensemble</em>
		</h1>
		<p class="hero__sub">
			SkillFusion est une plateforme d'apprentissage en ligne conçue pour faciliter l'accès à des
			contenus pédagogiques variés et de qualité.
		</p>
	</div>

	<div class="divider"></div>

	<!-- Histoire -->
	<section class="section">
		<div class="section__label">Notre histoire</div>
		<div class="section__content">
			<p>
				Créée en 2026 par une équipe de développeurs en reconversion professionnelle, SkillFusion
				est née de la volonté de rendre l'apprentissage plus <strong>accessible</strong>,
				<strong>structuré</strong> et <strong>interactif</strong>.
			</p>
			<p>
				Le site propose un catalogue de cours organisés par catégories, offrant une navigation
				simple et intuitive. Chaque cours présente un aperçu détaillé avec ses objectifs,
				permettant aux utilisateurs de comprendre les compétences qu'ils pourront acquérir avant de
				s'inscrire.
			</p>
		</div>
	</section>

	<div class="divider"></div>

	<!-- Pour qui -->
	<section class="section">
		<div class="section__label">Pour qui ?</div>
		<div class="cards">
			<div class="card">
				<div class="card__icon">🎓</div>
				<h3 class="card__title">Apprenants</h3>
				<p class="card__text">
					Suivez des cours à votre rythme et progressez dans les domaines qui vous passionnent.
				</p>
			</div>
			<div class="card">
				<div class="card__icon">✏️</div>
				<h3 class="card__title">Instructeurs</h3>
				<p class="card__text">
					Créez et gérez vos propres contenus pédagogiques pour partager votre expertise.
				</p>
			</div>
			<div class="card">
				<div class="card__icon">⚙️</div>
				<h3 class="card__title">Administrateurs</h3>
				<p class="card__text">
					Supervisez la plateforme, gérez les utilisateurs, les rôles et les contenus.
				</p>
			</div>
		</div>
	</section>

	<div class="divider"></div>

	<!-- Fonctionnalités -->
	<section class="section">
		<div class="section__label">Fonctionnalités</div>
		<div class="features">
			<div class="feature">
				<div class="feature__dot"></div>
				<span>Suivi de progression personnalisé</span>
			</div>
			<div class="feature">
				<div class="feature__dot"></div>
				<span>Gestion des comptes utilisateurs</span>
			</div>
			<div class="feature">
				<div class="feature__dot"></div>
				<span>Système d'avis sur les cours</span>
			</div>
			<div class="feature">
				<div class="feature__dot"></div>
				<span>Catalogue organisé par catégories</span>
			</div>
			<div class="feature">
				<div class="feature__dot"></div>
				<span>Interface simple et intuitive</span>
			</div>
			<div class="feature">
				<div class="feature__dot"></div>
				<span>Contenus structurés et progressifs</span>
			</div>
		</div>
	</section>

	<div class="divider"></div>

	<!-- Équipe -->
	<section class="section section--team">
		<div class="section__label">L'équipe</div>
		<div class="team__intro">
			<p class="team__headline">Les créateurs de SkillFusion</p>
			<p class="team__desc">
				Quatre développeurs passionnés, réunis par une même envie : rendre l'apprentissage plus
				humain, plus accessible et plus engageant.
			</p>
		</div>
	</section>

	<div class="team">
		<div class="team__member">
			<div class="team__avatar">
				<img src="/images/membre1.jpg" alt="Membre 1" />
			</div>
			<h3 class="team__name">Adrien PONCET</h3>
			<p class="team__role">Développeur Full Stack</p>
		</div>
		<div class="team__member">
			<div class="team__avatar">
				<img src="/images/membre2.jpg" alt="Membre 2" />
			</div>
			<h3 class="team__name">Samed CELIK</h3>
			<p class="team__role">Développeur Full Stack</p>
		</div>
		<div class="team__member">
			<div class="team__avatar">
				<img src="/images/membre3.jpg" alt="Membre 3" />
			</div>
			<h3 class="team__name">Loïc LEGER</h3>
			<p class="team__role">Développeur Full Stack</p>
		</div>
		<div class="team__member">
			<div class="team__avatar">
				<img src="/images/membre4.jpg" alt="Membre 4" />
			</div>
			<h3 class="team__name">Jacques DUCHAMPLECHEVAL</h3>
			<p class="team__role">Développeur Full Stack</p>
		</div>
	</div>

	<!-- Mission -->
	<section class="mission">
		<blockquote>
			"L'objectif de SkillFusion est de proposer une expérience d'apprentissage fluide, accessible
			et évolutive, en mettant l'accent sur la simplicité d'utilisation et la qualité des contenus."
		</blockquote>
	</section>

</Main>

<Footer />
</App>


<style>
	/* ── Variables & base ── */
	.page {
		--blue: #1d4e89;
		--blue-l: #ebf2fa;
		--amber: #f5a623;
		--bg: #f7f4ef;
		--white: #ffffff;
		--dark: #1a1a2e;
		--gray: #6b7280;
		--border: rgba(44, 62, 80, 0.1);

		font-family: 'DM Sans', 'Segoe UI', sans-serif;
		background: var(--bg);
		color: var(--dark);
		min-height: 100vh;
	}

	/* ── Hero ── */
	.hero {
		max-width: 760px;
		margin: 0 auto;
		padding: 80px 24px 60px;
		text-align: center;
	}

	.hero__tag {
		display: inline-block;
		background: var(--blue-l);
		color: var(--blue);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 5px 14px;
		border-radius: 100px;
		margin-bottom: 24px;
		border: 1px solid rgba(29, 78, 137, 0.15);
	}

	.hero__title {
		font-family: 'DM Serif Display', Georgia, serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 400;
		line-height: 1.1;
		color: var(--h1-color);
		margin: 0 0 24px;
		letter-spacing: -0.02em;
	}

	.hero__title em {
		font-style: italic;
		color: var(--h2-color);
	}

	.hero__sub {
		font-size: 1.05rem;
		color: var(--gray);
		line-height: 1.7;
		max-width: 540px;
		margin: 0 auto;
	}

	/* ── Divider ── */
	.divider {
		max-width: 760px;
		margin: 0 auto;
		height: 1px;
		background: linear-gradient(to right, transparent, var(--border), transparent);
	}

	/* ── Sections ── */
	.section {
		max-width: 760px;
		margin: 0 auto;
		padding: 60px 24px;
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 40px;
		align-items: start;
	}

	.section__label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--amber);
		padding-top: 4px;
	}

	.section__content p {
		font-size: 0.95rem;
		line-height: 1.75;
		color: #374151;
		margin-bottom: 16px;
	}

	.section__content p:last-child {
		margin-bottom: 0;
	}

	.section__content strong {
		color: var(--blue);
		font-weight: 600;
	}

	/* ── Cards utilisateurs ── */
	.cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.card {
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 20px;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
	}

	.card__icon {
		font-size: 1.5rem;
		margin-bottom: 12px;
	}

	.card__title {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--blue);
		margin: 0 0 8px;
	}

	.card__text {
		font-size: 0.8rem;
		color: var(--gray);
		line-height: 1.6;
		margin: 0;
	}

	/* ── Features ── */
	.features {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.875rem;
		color: #374151;
	}

	.feature__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--amber);
		flex-shrink: 0;
	}

	/* ── Équipe ── */
	.section--team {
		padding-bottom: 32px;
	}

	.team__intro {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.team__headline {
		font-family: 'DM Serif Display', Georgia, serif;
		font-size: 1.5rem;
		font-weight: 400;
		color: var(--dark);
		margin: 0;
	}

	.team__desc {
		font-size: 0.9rem;
		color: var(--gray);
		line-height: 1.65;
		margin: 0;
	}

	.team {
		max-width: 760px;
		margin: 0 auto;
		padding: 0 24px 60px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
	}

	.team__member {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		text-align: center;
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 24px 16px;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.team__member:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
	}

	.team__avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		border: 3px solid var(--blue-l);
		box-shadow: 0 4px 12px rgba(29, 78, 137, 0.15);
		background: var(--blue-l);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.team__avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.team__name {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--dark);
		margin: 0;
	}

	.team__role {
		font-size: 0.75rem;
		color: var(--gray);
		margin: 0;
	}

	/* ── Mission ── */
	.mission {
		background: var(--button-backgroung-color);
		padding: 60px 24px;
        border-radius: 10px;
	}

	.mission blockquote {
		max-width: 680px;
		margin: 0 auto;
		font-family: 'DM Serif Display', Georgia, serif;
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		font-style: italic;
		color: rgba(255, 255, 255, 0.92);
		line-height: 1.65;
		text-align: center;
		border: none;
		padding: 0;
	}

	/* ── Responsive ── */
	@media (max-width: 640px) {
		.section {
			grid-template-columns: 1fr;
			gap: 16px;
			padding: 40px 20px;
		}

		.cards {
			grid-template-columns: 1fr;
		}

		.features {
			grid-template-columns: 1fr;
		}

		.hero {
			padding: 60px 20px 40px;
		}

		.team {
			grid-template-columns: repeat(2, 1fr);
			padding: 0 20px 40px;
		}
	}
</style>