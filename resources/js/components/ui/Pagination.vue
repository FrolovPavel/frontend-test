<template>
    <nav v-if="totalPages > 1" class="pagination">
        <button
            type="button"
            class="pagination__btn"
            :disabled="currentPage === 1"
            @click="change(currentPage - 1)"
        >
            ‹
        </button>

        <button
            v-for="page in pages"
            :key="page"
            type="button"
            class="pagination__btn"
            :class="{ 'pagination__btn--active': page === currentPage }"
            @click="change(page)"
        >
            {{ page }}
        </button>

        <button
            type="button"
            class="pagination__btn"
            :disabled="currentPage === totalPages"
            @click="change(currentPage + 1)"
        >
            ›
        </button>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: { type: Number, required: true },
        totalPages: { type: Number, required: true },
    },
    computed: {
        pages() {
            const result = []
            for (let i = 1; i <= this.totalPages; i++) result.push(i)
            return result
        },
    },
    methods: {
        change(page) {
            if (page < 1 || page > this.totalPages || page === this.currentPage) return
            this.$emit('change', page)
        },
    },
}
</script>

<style scoped>
.pagination {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.pagination__btn {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    border-radius: 8px;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    color: var(--color-black);
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.pagination__btn:hover:not(:disabled):not(.pagination__btn--active) {
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.pagination__btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination__btn--active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
    cursor: default;
}

@media (min-width: 768px) {
    .pagination {
        gap: 8px;
    }
}
</style>
