import axios from "axios";

export const state = {
    countries: [],
};

export const getters = {
    all_countries: state => state.countries.data,
};

export const mutations = {
    SET_COUNTIES: (state, newValue) => state.countries = newValue
};

export const actions = {
    fetchCountries({ commit }) {
        axios.get('countries').then(pres => {
            commit('SET_COUNTIES', pres.data)
        })
    },

};