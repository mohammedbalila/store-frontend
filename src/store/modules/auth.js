import axios from 'axios';

const state = {
  currentUser: getSavedState('auth.currentUser'),
  errors: [],
};

const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },
};

const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState('auth.currentUser', newValue);
    setDefaultAuthHeaders(state);
  },
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
};

const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state }) {
    setDefaultAuthHeaders(state);
  },

  async signup({ commit }, user) {
    try {
      const resp = await axios.post('/auth/registration/', user);
      commit('SET_CURRENT_USER', resp.data);
    } catch (error) {
      const errors = formatError(error.response);
      commit('SET_ERRORS', errors);
      return error;
    }
  },
};

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

function formatError(error) {
  const { data } = error;
  const errors = Object.values(data).map((err) => err[0]);
  return errors;
}

function setDefaultAuthHeaders(state) {
  axios.defaults.baseURL = 'https://store-beta.herokuapp.com/api';
  axios.defaults.headers.common.Authorization = state.currentUser
    ? state.currentUser.token
    : '';
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
