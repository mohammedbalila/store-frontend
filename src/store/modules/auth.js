import axios from 'axios';

const state = {
  currentUser: getSavedState('auth.currentUser'),
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
};

const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state }) {
    setDefaultAuthHeaders(state);
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
