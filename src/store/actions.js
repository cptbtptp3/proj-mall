import {ADD_COUNT,PUSH_CART} from "@/store/mutation-types";

export default {
  addToCart(context,payload){
    return new Promise((resolve, reject) => {
      //查找cartList数组中是否已经存在该商品
      let existProduction = context.state.cartList.find(item => item.iid === payload.iid)
      if(existProduction){
        // existProduction.count += 1
        context.commit(ADD_COUNT,existProduction)
        resolve('商品数量+1')
      }else {
        // payload.count = 1
        // state.cartList.push(payload)
        context.commit(PUSH_CART,payload)
        resolve('商品已经添加至购物车')
      }
    })
  }
}
