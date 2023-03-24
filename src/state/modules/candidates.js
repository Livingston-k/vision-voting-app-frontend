import axios from "axios";

export const state = {
    candidates: [],
    spinner: false
};

export const getters = {
    Candidates: state => state.candidates,
    Spinner: state => state.spinner,
};

export const mutations = {
    setCandidate: (state, newValue) => state.candidates = newValue.data,
    setSpinner: (state, newValue) => state.spinner = newValue,
};

export const actions = {
    fetchCandidate({ commit, dispatch }) {
        commit('setSpinner', true)
        axios
            .get("candidates?page=1&limit=30")
            .then((res) => {
                commit('setSpinner', false)
                commit('setCandidate', res.data)
            }).catch((error) => {
                commit('setSpinner', false)
                dispatch('notification/error', error, { root: true });
            })
    },

    creatCandidate({ commit, dispatch }, payload) {
        commit('setSpinner', true)
        axios
            .post("candidates", payload)
            .then(() => {
                commit('setSpinner', false)
                dispatch('fetchCandidate');
                let message = { 'msg': "Candidate created successfully" }
                dispatch('notification/success', message, { root: true })

            }).catch((error) => {
                commit('setSpinner', false)
                dispatch('notification/error', error, { root: true });
            })
    },
};
