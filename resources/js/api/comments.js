import axios from 'axios'

axios.defaults.baseURL = '/api/comments';

const getAllComments = async () => {
    return await axios.get('/')
}

const getCommentById = async (id) => {
    return await axios.get(`/${id}`)
}

const createComment = async (payload) => {
    return await axios.post('/', payload)
}

const updateComment = async (id, payload) => {
    return axios.patch(`/${id}`, payload)
}

const deleteComment = async (id) => {
    return await axios.delete(`/${id}`)
}

export default {
    getAllComments,
    getCommentById,
    updateComment,
    createComment,
    deleteComment
}
