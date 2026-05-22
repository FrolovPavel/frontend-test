<template>
    <div class="spinner" :style="{width: `${size}px`, height: `${size}px`}"></div>
</template>

<script>
export default {
    name: "Spinner",
    props: {
        size: {
            type: String,
            default: '32'
        }
    }
}
</script>



<style scoped>
.spinner {
    border: 3px solid #e0e0e0;
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
