import axios from 'axios';

const state = {
  products: [],
  product: {},
  categories: [],
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
};

const actions = {
  async getCategories({ commit }) {
    try {
      const resp = await axios.get('/categories/');
      commit('SET_CATEGORIES', resp.data);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
