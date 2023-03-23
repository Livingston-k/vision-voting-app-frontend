import router from '../../router/index'
import axios from "axios"

const token = localStorage.getItem('token');

export const state = {
    user: null,
    token: token ? token : null,
    user_data: null,
    status: { loggeduser: false },
    loggedIn: false,
    Spinerstatus: false,
    login_errors: null,
    lock_screen: !!localStorage.getItem('lockscreen')
}


export const getters = {
    user: state => state.user,
    Type: state => state.user ? state.user.type:1,
    loggedIn: state => state.status.loggeduser,
    token: state => state.status.token,
}

export const mutations = {
    SET_STATUS(state, newValue) {
        state.Spinerstatus = newValue;
    },
    SET_AUTH_USER(state, user) {
        state.status = { loggingIn: true };
        state.user = user.user;
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.user = user.user;
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
            state.token = localStorage.getItem('token')
        } else {
            state.user = null
            state.status = { loggeduser: false };
            state.token = null
        }
    }
};

export const actions = {
      // Registers in the user.
    // eslint-disable-next-line no-unused-vars
    register({commit, dispatch },user_data){
    commit('SET_STATUS', true)
        axios
            .post("auth/register",user_data)
            .then(() => {
                commit('SET_STATUS', false)
                dispatch('login',{email:user_data.email,password:user_data.password});
            }).catch((error) => {
                commit('SET_STATUS', false)
                dispatch('notification/error', error, { root: true });
            })
    },
    // Logs in the user.
    // eslint-disable-next-line no-unused-vars
    login({ commit, dispatch }, user_data) {
        commit('SET_STATUS', true)
        axios
            .post("auth/login",user_data)
            .then((res) => {
                commit('SET_STATUS', false)
                    commit('loginSuccess', res.data);
                        localStorage.setItem("token", res.data.token)
                        const token = res.data.token
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        if(res.data.user.type){
                          dispatch('layout/changeLayoutType', {layoutType:'horizontal'}, { root: true });
                          router.push('/');
                        
                        }else{
                        dispatch('layout/changeLayoutType',{layoutType:'vertical'}, { root: true });
                         router.push('/home');
                        }
                        
            }).catch((error) => {
                commit('SET_STATUS', false)
                commit('loginFailure', error);
                dispatch('notification/error', error, { root: true });
            })
    },
    Authenticated_user({ commit, dispatch }) {
        axios
            .get("auth/authenticated")
            .then((res) => {
                commit('SET_AUTH_USER', res.data);
                 if(res.data.user.type){
                          dispatch('layout/changeLayoutType', {layoutType:'horizontal'}, { root: true });
                        }else{ 
                           dispatch('layout/changeLayoutType',{layoutType:'vertical'}, { root: true });
                        }
            }).catch((eror) => {
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