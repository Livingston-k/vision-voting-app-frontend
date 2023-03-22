import router from '../../router/index'
import axios from "axios"

const token = localStorage.getItem('token');

export const state = {
    user: null,
    token: token ? token : null,
    user_data: null,
    status: { loggeduser: false },
    loggedIn: false,
    loginstatus: false,
    login_errors: null,
    lock_screen: !!localStorage.getItem('lockscreen')
}


export const getters = {
    loggedIn: state => state.status.loggeduser,
    token: state => state.status.token,
}

export const mutations = {
    SET_LOGIN_STATUS(state, newValue) {
        state.loginstatus = newValue;
    },
    SET_AUTH_USER(state, user) {
        state.status = { loggingIn: true };
        state.user = { 'user': user.data };
        state.user_data = { 'user': user.data };
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.user = user;
        state.token = user.token;

    },
    loginFailure(state, errors) {
        state.status = {};
        state.user = null;
        state.login_errors = errors;
    },
    logout(state) {
        state.status = {};
        state.user = null;
        state.token = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    },
    initializeStore(state) {
        if (localStorage.getItem('token')) {
            state.status = { loggeduser: true };
            // state.user = localStorage.getItem('user')
            state.token = localStorage.getItem('token')
        } else {
            state.user = null
            state.status = { loggeduser: false };
            state.token = null
        }
    }
};

export const actions = {
    // Logs in the user.
    // eslint-disable-next-line no-unused-vars
    login({ commit, dispatch }, user_data) {
        commit('SET_LOGIN_STATUS', true)
        axios
            .post("auth/login",user_data)
            .then((res) => {
                commit('SET_LOGIN_STATUS', true)
                    commit('loginSuccess', res.data);
                        localStorage.setItem("token", res.data.token)
                        const token = res.data.token
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        router.push('/');
                    
                
            }).catch((error) => {
                commit('SET_LOGIN_STATUS', false)
                commit('loginFailure', error);
                dispatch('notification/error', error, { root: true });

            })
    },
    Authenticated_user({ commit, dispatch }) {
        axios
            .get("authenticated")
            .then((res) => {
                commit('SET_AUTH_USER', res.data);
            }).catch((eror) => {
                if (eror.response.status == 401) {
                    dispatch('logout')
                }
            })
    },
    UnclockScreen({ commit, dispatch }, payload) {
        axios
            .post("unlockscreen", payload)
            .then(() => {
                localStorage.setItem("lockscreen", false);
                commit('SET_UNLOCK', false);
                router.push('/');

            }).catch((eror) => {
                commit('SET_UNLOCK', true);
                if (eror.response.status == 401) {
                    dispatch('logout')
                }
            })
    },
    // Logout the user
    logOut({ commit }) {
        commit('logout');
        localStorage.removeItem('token');
        location.reload(true);

    },

};