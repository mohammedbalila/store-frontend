import axios from 'axios';

const state = {
  discounts: [],
  products: [],
};

const mutations = {
  SET_DISCOUNTS(state, discounts) {
    state.discounts = discounts;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
};

const actions = {
  async getDiscounts({ commit }) {
    try {
      const resp = await axios.get('/discounts/?limit=5');
      commit('SET_DISCOUNTS', resp.data.results);
      return resp.data;
    } catch (error) {
      return error;
    }
  },
  async getDiscountProducts({ commit }, discountId) {
    try {
      const resp = await axios.get(`/discounts/${discountId}/`);
      commit('SET_PRODUCTS', resp.data.results);
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
