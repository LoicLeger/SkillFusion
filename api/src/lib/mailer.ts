import { config } from '../config';
import { Resend } from 'resend';

const resend = new Resend(config.resendApiKey);

export async function sendVerificationEmail(email: string, token: string) {
    const frontendUrl = config.corsOriginUrl || 'http://localhost:5173';
    await resend.emails.send({
        from: config.resendEmail,
        to: email,
        subject: 'Confirme ton inscription sur SkillFusion',
        html: `
            <h2>Bienvenue sur SkillFusion !</h2>
            <p>Clique sur ce lien pour confirmer ton compte :</p>
            <a href="${frontendUrl}/verify?token=${token}">
                Confirmer mon compte
            </a>
            <p>Ce lien est valable 24h.</p>
        `,
    });
}

export async function sendResetPasswordEmail(email: string, token: string) {
    const frontendUrl = config.corsOriginUrl || 'http://localhost:5173';
    await resend.emails.send({
        from: config.resendEmail,
        to: email,
        subject: 'Réinitialisation de ton mot de passe SkillFusion',
        html: `
            <h2>Réinitialisation de mot de passe</h2>
            <p>Clique sur ce lien pour réinitialiser ton mot de passe :</p>
            <a href="${frontendUrl}/page-reset-mdp?token=${token}">
                Réinitialiser mon mot de passe
            </a>
            <p>Ce lien est valable 1 heure.</p>
            <p>Si tu n'as pas demandé cette réinitialisation, ignore cet email.</p>
        `,
    });
}

export async function sendReportEmail(
    reason: string,
    commentId: number,
    reporterId: number | null,
    commentContent: string,
    reporterPseudo: string,
    commentAuthorPseudo: string
) {
    await resend.emails.send({
        from: config.resendEmail,
        to: config.resendEmail,
        subject: '🚨 Nouveau signalement de commentaire',
        html: `
			<h2>🚨 Signalement de commentaire</h2>

			<p><strong>Signalé par :</strong> ${reporterPseudo} (ID: ${reporterId ?? '?'})</p>

			<p><strong>Auteur du commentaire :</strong> ${commentAuthorPseudo}</p>


			<p><strong>Raison :</strong> ${reason}</p>

			<p><strong>Commentaire :</strong></p>
			<div style="padding:10px;background:#f4f4f4;border-radius:6px;">
				${commentContent}
			</div>


		`,
    });
}
