<template>
  <div class="cart-list">
<!--    ul>li{列表$}*100-->
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in list" :key="index" :itemInfo="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/shop-cart/childComps/CartListItem";
import {mapGetters} from "vuex";

export default {
  name: "CartList",
  components:{Scroll,CartListItem},
  computed:{
    ...mapGetters({
      list:'cartList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  /*position: relative;*/
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
.content {
  height: 100%;
}
</style>
