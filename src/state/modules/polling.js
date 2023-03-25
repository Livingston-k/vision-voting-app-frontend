import axios from "axios";

export const state = {
    votepollings: [],
    spinner:false
};

export const getters = {
    Votecandidates: state => state.votepollings,
    Spinner: state => state.spinner,
};

export const mutations = {
    setVotePollings: (state, newValue) => state.votepollings = newValue,
    setSpinner: (state, newValue) => state.spinner = newValue,
};

export const actions = {
    fetchsVotePolling({ commit, dispatch },id) {
          commit('setSpinner',true)
          commit('setVotePollings', [])
        axios
            .get(`polling/${id}`)
            .then((res) => {
                commit('setSpinner',false)
                commit('setVotePollings', res.data)
            }).catch((error) => {
                 commit('setSpinner',false)
                dispatch('notification/error', error, { root: true });
            })
    },

  
};
