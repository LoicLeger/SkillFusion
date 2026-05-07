<script>
	import Footer from '$lib/assets/components/Footer.svelte';
	import Header from '$lib/assets/components/Header.svelte';
</script>

<Header />

<main class="mentions-legales">
	<h1>Mentions légales</h1>

	<h2>Éditeur du site</h2>
	<p>
		<strong>SkillFusion</strong><br />
		Plateforme éducative dédiée à l’apprentissage du bricolage et du Do It Yourself (DIY)<br />
		Adresse : 123 Rue de l'Innovation, 75001 Paris, France<br />
		Téléphone : 01 23 45 67 89<br />
		Email : contact@skillfusion.fr<br />
		Numéro SIRET : 123 456 789 00012<br />
		Directeur de la publication : Jean Dupont
	</p>

	<h2>Hébergement</h2>
	<p>
		<strong>Hébergeur :</strong><br />
		OVHcloud<br />
		Adresse : 2 rue Kellermann, 59100 Roubaix, France<br />
		Téléphone : 1007<br />
		Site web : <a href="https://www.ovhcloud.com">www.ovhcloud.com</a>
	</p>

	<h2>Propriété intellectuelle</h2>
	<p>
		L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit
		d'auteur. Toute reproduction, distribution, modification ou exploitation commerciale est
		interdite sans autorisation préalable.
	</p>

	<h2>Données personnelles</h2>
	<p>
		Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au RGPD, vous
		disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
		Pour exercer ces droits, contactez-nous à l'adresse email ci-dessus.
	</p>

	<h2>Cookies</h2>
	<p>
		Le site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez gérer vos
		préférences de cookies via les paramètres de votre navigateur.
	</p>

	<h2>Responsabilité</h2>
	<p>
		SkillFusion s'efforce d'assurer l'exactitude des informations diffusées sur le site, mais ne
		peut être tenu responsable d'erreurs ou d'omissions. L'utilisation du site se fait sous la
		responsabilité exclusive de l'utilisateur.
	</p>

	<h2>Droit applicable</h2>
	<p>
		Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
		français seront seuls compétents.
	</p>
</main>

<Footer />

<style>
	.mentions-legales {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		line-height: 1.6;
	}

	h1 {
		text-align: center;
		margin-bottom: 30px;
	}

	h2 {
		margin-top: 30px;
		margin-bottom: 10px;
		color: #333;
	}

	p {
		margin-bottom: 15px;
	}

	a {
		color: #007bff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
