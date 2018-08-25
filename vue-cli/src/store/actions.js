import  * as types from "./type"

export default {
  /*显示删除按钮*/
  Show_Delete:({commit}) => {
    commit(types.Show_Delete);
  },
  /*隐藏删除按钮*/
  Hide_Delete:({commit}) => {
    commit(types.Hide_Delete);
  },
  /*loading*/
  hideLoading:({commit})=>{
    commit(types.HIDE_LOADING)
  },
  showLoading:({commit},id)=>{
    commit(types.SHOW_LOADING,id)
  },
}
