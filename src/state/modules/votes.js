import axios from "axios";

export const state = {
    votecandidates: [],
    spinner:false
};

export const getters = {
    Votecandidates: state => state.votecandidates,
    Spinner: state => state.spinner,
};

export const mutations = {
    setVoteCandidates: (state, newValue) => state.votecandidates = newValue,
    setSpinner: (state, newValue) => state.spinner = newValue,
};

export const actions = {
    fetchsVoteCandidates({ commit, dispatch }) {
          commit('setSpinner',true)
        axios
            .get("vote?page=1&limit=10")
            .then((res) => {
                commit('setSpinner',false)
                commit('setVoteCandidates', res.data)
            }).catch((error) => {
                 commit('setSpinner',false)
                dispatch('notification/error', error, { root: true });
            })
    },

      creatVote({ commit, dispatch },payload) {
          commit('setSpinner',true)
        axios
            .post("categories",payload)
            .then(() => {
               commit('setSpinner',false)
               dispatch('fetchCategory');
            let message = { 'msg': "Position created successfully" }
            dispatch('notification/success', message, { root: true })

            }).catch((error) => {
                 commit('setSpinner',false)
                dispatch('notification/error', error, { root: true });
            })
    },
};
