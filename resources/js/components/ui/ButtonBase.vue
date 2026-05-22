<template>
    <button
        :class="['btn', `btn--${type}`]"
        :disabled="loading"
        @click="$emit('click')"
    >
        <Spinner v-if="loading" size="18" />
        <slot v-else />
    </button>
</template>

<script>
import Spinner from "./Spinner.vue";

export default {
    name: "ButtonBase",
    components: {Spinner},
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped>
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition-duration:  0.25s;
    transition-property: background-color, width;
}

.btn--primary {
    color: var(--color-white);
    background-color: var(--color-primary);
}

.btn--primary:hover {
    background-color: var(--color-primary-hover);
}

.btn--danger {
    color: var(--color-white);
    background-color: #FF4D4F;
}

.btn--danger:hover {
    background-color: #ff8081;
}

.btn:disabled {
    background-color: var(--color-border);
}
</style>
