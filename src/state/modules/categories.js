import axios from "axios";

export const state = {
    category: [],
    spinner:false
};

export const getters = {
    Category: state => state.category,
    Spinner: state => state.spinner,
};

export const mutations = {
    setCategory: (state, newValue) => state.category = newValue.data,
    setSpinner: (state, newValue) => state.spinner = newValue,
};

export const actions = {
    fetchCategory({ commit, dispatch }) {
          commit('setSpinner',true)
        axios
            .get("categories?page=1&limit=30")
            .then((res) => {
                commit('setSpinner',false)
                commit('setCategory', res.data)
            }).catch((error) => {
                 commit('setSpinner',false)
                dispatch('notification/error', error, { root: true });
            })
    },

      creatCategory({ commit, dispatch },payload) {
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
