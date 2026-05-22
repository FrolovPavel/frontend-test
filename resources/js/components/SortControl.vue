<template>
    <div class="sort-control">
        <label class="sort-control__label">
            Сортировать по
            <select
                class="sort-control__select"
                :value="sortBy"
                @change="$emit('change', { sortBy: $event.target.value, sortDir })"
            >
                <option value="id">id</option>
                <option value="date">дате</option>
            </select>
        </label>

        <label class="sort-control__label">
            Направление
            <select
                class="sort-control__select"
                :value="sortDir"
                @change="$emit('change', { sortBy, sortDir: $event.target.value })"
            >
                <option value="asc">по возрастанию</option>
                <option value="desc">по убыванию</option>
            </select>
        </label>
    </div>
</template>

<script>
export default {
    name: 'SortControl',
    props: {
        sortBy: {
            type: String,
            required: true,
            validator: v => ['id', 'date'].includes(v),
        },
        sortDir: {
            type: String,
            required: true,
            validator: v => ['asc', 'desc'].includes(v),
        },
    },
}
</script>

<style scoped>
.sort-control {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background-color: var(--color-bg);
    border-radius: 8px;
    box-shadow: var(--shadow-base);
}

.sort-control__label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
}

.sort-control__select {
    height: 34px;
    padding: 6px 10px;
    font-size: 14px;
    color: var(--color-black);
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.25s ease;
}

.sort-control__select:hover,
.sort-control__select:focus {
    border-color: var(--color-primary-hover);
}

@media (min-width: 567px) {
    .sort-control {
        flex-direction: row;
    }
}
</style>
