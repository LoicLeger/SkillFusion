<script lang="ts">
    import '../../../../app.css';
    const { notification, seenNotification, deleteNotification } = $props();

    let datetime = $derived(
        new Date(notification.createdAt).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    );
</script>

<div class="notif {notification.seen ? 'seen' : 'unseen'}">
    <a
        href={'/cours/' + notification.cours.slug + '/cours'}
        onclick={() => seenNotification(notification.id)}
        class="notif__content-wrapper"
    >
        <div class="notif__header">
            <h3 class="notif__title">{notification.cours.title}</h3>
            <div class="notif__meta">
                <span class="notif__pseudo">{notification.user.pseudo}</span>
                <span class="notif__date">{datetime}</span>
            </div>
        </div>
        <p class="notif__body">{notification.content}</p>
    </a>
    <button
        class="notif__close"
        onclick={(event) => deleteNotification(event, notification.id)}
        title="Supprimer">✕</button
    >
</div>

<style>
    .notif {
        display: flex;
        align-items: stretch;
        gap: 12px;
        padding: 14px 16px;
        border-radius: var(--r-md);
        background: var(--bg);
        border: 1px solid rgba(0, 0, 0, 0.08);
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .notif:hover {
        background-color: rgba(255, 255, 255, 0.8);
        border-color: rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .notif.unseen {
        background-color: var(--color-notification-not-seen);
        border-color: rgba(0, 0, 0, 0.12);
    }

    .notif.unseen:hover {
        background-color: var(--color-notification-not-seen);
        filter: brightness(0.98);
    }

    .notif__content-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-decoration: none;
        color: inherit;
        min-width: 0;
    }

    .notif__header {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .notif__title {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--dark);
        word-break: break-word;
        line-height: 1.3;
    }

    .notif__meta {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }

    .notif__pseudo {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
    }

    .notif__date {
        font-size: 11px;
        color: var(--gray);
        margin-left: auto;
    }

    .notif__body {
        margin: 0;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.75);
        line-height: 1.4;
        word-break: break-word;
    }

    .notif__close {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        padding: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        background: rgba(255, 0, 0, 0.05);
        color: #dc2626;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .notif__close:hover {
        background: rgba(255, 0, 0, 0.1);
        border-color: rgba(220, 38, 38, 0.3);
        color: #b91c1c;
    }

    .notif__close:active {
        background: rgba(255, 0, 0, 0.15);
        transform: scale(0.95);
    }
</style>
