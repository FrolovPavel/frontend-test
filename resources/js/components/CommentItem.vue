<template>
    <article
        class="comment"
        :class="{ 'comment--loading': pending || isEditing }"
    >
        <header class="comment__head">
            <div class="comment__info">
                <h3 class="comment__name">{{ item.name }}</h3>
                <time
                    class="comment__date"
                    :datetime="item.date"
                >
                    {{ item.date }}
                </time>
            </div>
            <div class="comment__actions">
                <ButtonBase
                    @click="$emit('edit')"
                >
                    <IconEdit />
                    Редактировать
                </ButtonBase>
                <ButtonBase
                    type="danger"
                    :loading="pending"
                    @click="$emit('delete')"
                >
                    <IconTrash />
                    Удалить
                </ButtonBase>
            </div>
        </header>
        <p class="comment__text">{{ item.text }}</p>
    </article>
</template>

<script>
import ButtonBase from "./ui/ButtonBase.vue";
import IconTrash from "./ui/icons/IconTrash.vue";
import IconEdit from "./ui/icons/IconEdit.vue";

export default {
    name: "CommentItem",
    components: {IconEdit, IconTrash, ButtonBase},
    props: {
        item: {
            type: Object,
            required: true,
        },
        pending: {
            type: Boolean,
            default: false,
        },
        isEditing: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
.comment {
    padding: 20px;
    border-radius: 8px;
    background-color: var(--color-bg);
    box-shadow: var(--shadow-base);
}

.comment--loading {
    opacity: 0.6;
    pointer-events: none;
}

.comment__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.comment__actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
}

.comment__actions button {
    width: 100%;
}

.comment__text {
    word-break: break-all;
}

@media (min-width: 567px) {
    .comment__actions {
        width: auto;
    }
    .comment__actions button {
        width: auto;
    }
}
</style>
