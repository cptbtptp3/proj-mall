import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addToCart(state,payload){
      //查找cartList数组中是否已经存在该商品
      let existProduction = state.cartList.find(item => item.iid === payload.iid)
      if(existProduction){
        existProduction.count += 1
      }else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  actions:{},
  getters:{}
})
