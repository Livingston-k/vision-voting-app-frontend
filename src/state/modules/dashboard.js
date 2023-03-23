import axios from "axios";

export const state = {
    cards: [],
    spinner: false
};

export const getters = {
    Cards: state => state.cards,
    Spinner: state => state.spinner,
};

export const mutations = {
    setCards: (state, newValue) => state.cards = newValue,
    setSpinner: (state, newValue) => state.spinner = newValue,
};

export const actions = {
    fetchDashboardCards({ commit, dispatch }) {
        commit('setSpinner', true)
        axios
            .get("dashboard/cards")
            .then((res) => {
                commit('setSpinner', false)
                commit('setCards', res.data)
            }).catch((error) => {
                commit('setSpinner', false)
                dispatch('notification/error', error, { root: true });
            })
    },


};
