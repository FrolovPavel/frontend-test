import Vue from 'vue'
import Vuex from 'vuex'
import commentsApi from '../api/comments'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [],
        loading: false,
        pendingIds: [],
        submitting: false,
        currentPage: 1,
        perPage: 3,
        sortBy: 'id',
        sortDir: 'desc',
        error: null

    },
    getters: {
        sortedItems(state) {
            const parseDate = (v) => {
                const m = String(v || '').match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
                return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0
            }

            const items = state.items.slice()
            const dir = state.sortDir === 'asc' ? 1 : -1

            items.sort((a, b) => {
                const diff = state.sortBy === 'date'
                    ? parseDate(a.date) - parseDate(b.date)
                    : a.id - b.id
                return diff !== 0 ? diff * dir : a.id - b.id
            })

            return items
        },
        totalPages(state) {
            return Math.max(1, Math.ceil(state.items.length / state.perPage))
        },
        pagedItems(state, getters) {
            const start = (state.currentPage - 1) * state.perPage
            return getters.sortedItems.slice(start, start + state.perPage)
        },
    },
    mutations: {
        SET_ITEMS(state, items) { state.items = items },
        ADD_ITEM(state, item) { state.items.unshift(item) },
        REMOVE_ITEM(state, id) {
            state.items = state.items.filter(c => c.id !== id)
        },
        SET_LOADING(state, value) { state.loading = value },
        SET_SUBMITTING(state, value) { state.submitting = value },
        SET_ERROR(state, error) { state.error = error },
        ADD_PENDING(state, id) {
            if (!state.pendingIds.includes(id)) state.pendingIds.push(id)
        },
        UPDATE_ITEM(state, updated) {
            state.items = state.items.map(c => c.id === updated.id ? updated : c)
        },
        REMOVE_PENDING(state, id) {
            state.pendingIds = state.pendingIds.filter(i => i !== id)
        },
        SET_PAGE(state, page) {
            state.currentPage = page
        },
        SET_SORT(state, { sortBy, sortDir }) {
            if (sortBy !== undefined) state.sortBy = sortBy
            if (sortDir !== undefined) state.sortDir = sortDir
            state.currentPage = 1
        },
    },
    actions: {
        async getAllComments({ commit }) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const { data } = await commentsApi.getAllComments()
                commit('SET_ITEMS', data)
            } catch (e) {
                commit('SET_ERROR', e.message)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async createComment({ commit }, payload) {
            commit('SET_ERROR', null)
            commit('SET_SUBMITTING', true)
            try {
                const { data } = await commentsApi.createComment(payload)
                commit('ADD_ITEM', data)
            } catch (e) {
                commit('SET_ERROR', e.message)
                throw e
            } finally {
                commit('SET_SUBMITTING', false)
            }
        },
        async updateComment({ commit }, {id, payload}) {
            commit('SET_ERROR', null)
            commit('SET_SUBMITTING', true)
            try {
                await commentsApi.updateComment(id, payload)
                commit('UPDATE_ITEM', { id, ...payload })
            } catch (e) {
                commit('SET_ERROR', e.message)
                throw e
            } finally {
                commit('SET_SUBMITTING', false)
            }
        },
        async deleteComment({ commit, state, getters }, id) {
            commit('SET_ERROR', null)
            commit('ADD_PENDING', id)
            try {
                await commentsApi.deleteComment(id)
                commit('REMOVE_ITEM', id)
                if (state.currentPage > getters.totalPages) {
                    commit('SET_PAGE', getters.totalPages)
                }
            } catch (e) {
                commit('SET_ERROR', e.message)
            } finally {
                commit('REMOVE_PENDING', id)
            }
        },
    },
})
