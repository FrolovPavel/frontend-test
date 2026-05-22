<template>
    <div class="comments">
        <ul
            v-if="items.length"
            class="comments__list"
        >
            <li
                v-for="item in items"
                :key="item.id"
                class="comment-item"
            >
                <CommentItem
                    :item="item"
                    :pending="pendingIds.includes(item.id)"
                    :isEditing="isEditing"
                    @edit="$emit('edit', item)"
                    @delete="$emit('delete', item.id)"
                />
            </li>
        </ul>
        <p
            v-else
            class="comments__empty"
        >
            Комментариев нет...
        </p>
    </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";

export default {
    name: "CommentsList",
    components: {CommentItem},
    props: {
        items: {
            type: Array,
            required: true,
        },
        pendingIds: {
            type: Array,
            default: () => [],
        },
        isEditing: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
.comments__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.comments__empty {
    text-align: center;
    padding-block: 91px;
}
</style>
