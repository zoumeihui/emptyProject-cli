import {
  Show_Delete,
  Hide_Delete,
  HIDE_LOADING,
  SHOW_LOADING
} from "./type";

const state = {
  isAdmin:false,
  loading:0
};

const mutations = {
  [Show_Delete](state){
    state.isAdmin = true;
  },
  [Hide_Delete](state){
    state.isAdmin = false;
  },
  /*loading*/
  [HIDE_LOADING](state){
    setTimeout(function () {
      state.loading=0;
    },600)
  },
  [SHOW_LOADING](state,id){
    state.loading = id;
  },
};

const getters = {
  isAdmin(state){
    return state.isAdmin;
  },
  loading(state){
    return state.loading;
  }
};

export default {
  state,
  mutations,
  getters
}
