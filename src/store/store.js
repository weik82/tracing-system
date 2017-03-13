import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import axios from '../http/http'
import api from '../http/api'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    book_list: []
  },
  mutations: {
    [types.USER_LOGIN]: (state, data) => {
      localStorage.setItem('user_token', data.token);
      state.token = data.token;
      state.user = data.user;
    },
    [types.USER_LOGOUT]: (state) => {
      localStorage.removeItem('user_token');
      state.token = null;
      state.user = {}
    },
    [types.GET_BOOK_LIST]: (state, data) => {
      state.book_list = data.data;
    }
  },
  actions: {
    get_book_list: ({commit}, items) => {
      axios.get(api.get_image_list, {
        params: items
      }).then(function (response) {
        console.log(response);
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})
