<script>
	import '../../normalize.css';
	import '../../app.css';
	import Footer from '$lib/assets/components/Footer.svelte';
	import Header from '$lib/assets/components/Header.svelte';
	import App from '$lib/assets/components/App.svelte';
	import Main from '$lib/assets/components/Main.svelte';
    import photoCS from '$lib/assets/img/CELIK-Samed.png';
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
					permettant aux utilisateurs de comprendre les compétences qu'ils pourront acquérir avant
					de s'inscrire.
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
				<div class="team__avatar-2">
					<img src={photoCS} alt="Samed CELIK" />
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
				et évolutive, en mettant l'accent sur la simplicité d'utilisation et la qualité des
				contenus."
			</blockquote>
		</section>
	</Main>

	<Footer />
</App>

<style>
.hero,
.section,
.team,
.divider,
.mission {
	max-width: 760px;
	margin: 0 auto;
}

/* ── HERO ── */
.hero {
	padding: 80px 24px 60px;
	text-align: center;
}

.hero__tag {
	display: inline-block;
	background: var(--color-background-modify-button);
	color: var(--color-font-modify-button);
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	padding: 5px 14px;
	border-radius: var(--border-radius);
	margin-bottom: 24px;
	border: 1px solid var(--color-font-modify-button);
}

.hero__title {
	font-family: 'DM Serif Display', serif;
	font-size: 40px;
	font-weight: 400;
	color: var(--h1-color);
	margin-bottom: 20px;
}

.hero__title em {
	font-style: italic;
	color: var(--h2-color);
}

.hero__sub {
	color: #57534e;
	font-size: 16px;
	line-height: 1.6;
	max-width: 540px;
	margin: 0 auto;
}

/* ── SECTIONS ── */
.section {
	padding: 30px 24px;
	background: var(--background-white);
	border-radius: 10px;
	margin-bottom: 30px;
}

.section__label {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--h2-color);
	margin-bottom: 20px;
}

.section__content p {
	font-size: 16px;
	line-height: 1.7;
	color: #57534e;
	margin-bottom: 16px;
}

.section__content strong {
	color: var(--h1-color);
}

/* ── DIVIDER ── */
.divider {
	height: 1px;
	background: rgba(44, 62, 80, 0.1);
	margin: 40px auto;
}

/* ── CARDS ── */
.cards {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
}

.card {
	background: var(--background-white);
	border: 1px solid rgba(44, 62, 80, 0.1);
	border-radius: var(--border-radius);
	padding: 20px;
	transition: 0.2s;
}

.card:hover {
	transform: translateY(-3px);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
}

.card__icon {
	font-size: 22px;
	margin-bottom: 10px;
}

.card__title {
	font-size: 16px;
	font-weight: 600;
	color: var(--h1-color);
}

.card__text {
	font-size: 14px;
	color: #57534e;
}

/* ── FEATURES ── */
.features {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12px;
}

.feature {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 14px;
	color: #57534e;
}

.feature__dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: var(--h2-color);
}

/* ── TEAM ── */
.section--team {
	padding-bottom: 30px;
}

.team__headline {
	font-family: 'DM Serif Display', serif;
	font-size: 24px;
	color: var(--h3-color);
}

.team__desc {
	font-size: 14px;
	color: #57534e;
}

.team {
	padding: 0 24px 60px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24px;
}

.team__member {
	background: var(--background-white);
	border: 1px solid rgba(44, 62, 80, 0.1);
	border-radius: var(--border-radius);
	padding: 20px;
	text-align: center;
	transition: 0.2s;
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
	margin: 0 auto 10px;
	border: 2px solid var(--color-background-modify-button);
}

.team__avatar-2 {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 10px;
    border: 2px solid var(--color-background-modify-button);
}

.team__avatar-2 img {
    width: 100%;
    object-fit: cover;
}

.team__avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.team__name {
	font-size: 14px;
	font-weight: 600;
	color: var(--h3-color);
}

.team__role {
	font-size: 13px;
	color: #6b7280;
}

/* ── MISSION ── */
.mission {
	background: var(--button-backgroung-color);
	padding: 60px 24px;
	border-radius: var(--border-radius);
}

.mission blockquote {
	font-family: 'DM Serif Display', serif;
	font-size: 20px;
	color: white;
	text-align: center;
	line-height: 1.6;
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
	.section {
		grid-template-columns: 1fr;
	}

	.cards {
		grid-template-columns: 1fr;
	}

	.features {
		grid-template-columns: 1fr;
	}

	.team {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>