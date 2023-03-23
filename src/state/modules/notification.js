export const state = {
    notificationtype: null,
    notification_message: null,
    notification_show: false,
};

export const mutations = {
    success(state, message) {
        state.notificationtype = 'success';
        state.notification_message = message;
        state.notification_show = true;
    },
    error(state, message) {
        state.notificationtype = 'danger';
        state.notification_message = message;
        state.notification_show = true;
    },

    clear(state) {
        state.notificationtype = null;
        state.notification_message = null;
        state.notification_show = false;
    }
};

export const actions = {
    success({ commit, dispatch }, message) {
        commit('success', message);

        setTimeout(() => {
            dispatch('clear');
        }, 4000);
    },
    error({ commit, dispatch }, message) {
        commit('error', message);
        setTimeout(() => {
            dispatch('clear');
        }, 4000);
    },
    clear({ commit }) {
        commit('clear');
    }
};