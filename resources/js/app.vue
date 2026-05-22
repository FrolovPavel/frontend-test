<template>
    <div class="container">
        <div
            v-if="loading"
            class="loader"
        >
            <Spinner />
        </div>
        <template v-else>
            <SortControl
                :sort-by="sortBy"
                :sort-dir="sortDir"
                @change="onSortChange"
            />
            <CommentsList
                :items="pagedItems"
                :pendingIds="pendingIds"
                :isEditing="isEditing"
                @edit="onEdit($event)"
                @delete="deleteComment($event)"
            />
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @change="onPageChange"
            />
        </template>

        <CommentForm
            :submitting="submitting"
            :isEditing="isEditing"
            :editingComment="editingComment"
            @cancelEdit="cancelEdit"
        />
    </div>
</template>
<script>
import CommentForm from "./components/CommentForm.vue";
import Pagination from "./components/ui/Pagination.vue";
import Spinner from "./components/ui/Spinner.vue";
import CommentsList from "./components/CommentsList.vue";
import SortControl from "./components/SortControl.vue";
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        CommentsList,
        Pagination,
        CommentForm,
        Spinner,
        SortControl
    },
    data() {
        return {
            editingComment: null,
        }
    },
    computed: {
        isEditing() {
            return this.editingComment !== null;
        },
        ...mapState([
            'items',
            'loading',
            'pendingIds',
            'submitting',
            'currentPage',
            'sortBy',
            'sortDir'
        ]),
        ...mapGetters([
            'pagedItems',
            'totalPages'
        ]),
    },
    methods: {
        ...mapActions([
            'getAllComments',
            'deleteComment'
        ]),
        ...mapMutations({ setPage: 'SET_PAGE', setSort: 'SET_SORT' }),
        onPageChange(page) {
            this.setPage(page)
        },
        onSortChange(payload) {
            this.setSort(payload)
        },
        onEdit(comment) {
            this.editingComment = comment;
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        },
        cancelEdit() {
            this.editingComment = null;
        }
    },
    mounted() {
        this.getAllComments()
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1180px;
    margin-inline: auto;
    padding: 20px;
}

.loader {
    display: flex;
    justify-content: center;
    padding: 60px 0;
    min-height: 200px;
}
</style>
