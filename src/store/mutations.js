import {ADD_COUNT,PUSH_CART} from "@/store/mutation-types";

export default {
  //mutations唯一的目的就是修改state中数据
  //mutations中做的事情 尽可能单一
  [ADD_COUNT](state,payload){
    payload.count += 1
  },
  [PUSH_CART](state,payload){
    payload.count = 1
    payload.checked = false
    state.cartList.push(payload)
  }
}
