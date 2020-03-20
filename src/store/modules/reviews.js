import axios from 'axios';

const state = {
  reviews: [],
};

const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
};

const actions = {
  async getReviews({ commit }, productId) {
    try {
      const resp = await axios.get(`/products/${productId}/reviews/`);
      commit('SET_REVIEWS', resp.data);
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
