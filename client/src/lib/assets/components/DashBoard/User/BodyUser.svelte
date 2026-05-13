<script>
    const { user } = $props();
</script>

<div class="cours_item">
    <span class="cell cell--hide-mobile">{user.lastname}</span>
    <span class="cell cell--hide-mobile">{user.firstname}</span>
    <span class="cell cell--pseudo">{user.pseudo}</span>
</div>

<style>
    .cours_item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 0;
        gap: 10px;
        width: 100%;
    }

    .cell {
        min-width: 33%;
        word-break: break-word;
    }

    .cell--pseudo {
        flex: 1;
        min-width: 0;
        font-weight: 600;
    }

    @media (max-width: 767px) {
        .cours_item {
            justify-content: space-between;
        }

        .cell--hide-mobile {
            display: none;
        }

        .cell--pseudo {
            min-width: 100%;
        }
    }
</style>
