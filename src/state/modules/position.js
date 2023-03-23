import axios from "axios";

export const state = {
    positions: [],
    spinner:false
};

export const getters = {
    Positions: state => state.positions,
    Spinner: state => state.spinner,
};

export const mutations = {
    setPositions: (state, newValue) => state.positions = newValue.data,
    setSpinner: (state, newValue) => state.spinner = newValue,
};

export const actions = {
    fetchPositions({ commit, dispatch }) {
          commit('setSpinner',true)
        axios
            .get("positions?page=1&limit=30")
            .then((res) => {
                commit('setSpinner',false)
                commit('setPositions', res.data)
            }).catch((error) => {
                 commit('setSpinner',false)
                dispatch('notification/error', error, { root: true });
            })
    },

      creatPositions({ commit, dispatch },payload) {
          commit('setSpinner',true)
        axios
            .post("positions",payload)
            .then(() => {
               commit('setSpinner',false)
               dispatch('fetchPositions');
            let message = { 'msg': "Position created successfully" }
            dispatch('notification/success', message, { root: true })

            }).catch((error) => {
                 commit('setSpinner',false)
                dispatch('notification/error', error, { root: true });
            })
    },
};
