import axios from 'axios';

const state = {
  products: [],
  product: {},
  categories: [],
  category: {},
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
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
  async getCategory({ commit }, id) {
    try {
      const resp = await axios.get(`/categories/${id}`);
      commit('SET_CATEGORY', resp.data);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
  async getProductsByCategory({ commit }, id) {
    try {
      const resp = await axios.get(`/products/?category=${id}&limit=15`);
      commit('SET_PRODUCTS', resp.data.results);
      return resp.data.results;
    } catch (error) {
      return error;
    }
  },
  async getProductById({ commit }, id) {
    try {
      const resp = await axios.get(`/products/${id}/`);
      commit('SET_PRODUCT', resp.data);
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
