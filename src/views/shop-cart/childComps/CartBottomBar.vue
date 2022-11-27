<template>
  <div class="bottom-bar">
    <div class="button">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="checkAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{counted}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components:{CheckButton},
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((previousValue,item) => {
        return previousValue + item.price * item.count
      },0).toFixed(2)
    },
    counted(){
      return this.cartList.filter(item => {return item.checked}).length
    },
    isSelectAll(){
      return this.cartList.length ? !this.cartList.find(item => !item.checked) : false
    }
  },
  methods:{
    checkAll(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  position: relative;
  z-index: 99;
  display: flex;
  text-align: center;
  font-size: 14px;
}
.button {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 60px;
}
.check-button {
  width: 18px;
  height: 18px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: orangered;
  color: #fff;
}
</style>
