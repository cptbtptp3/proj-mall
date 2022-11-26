<template>
  <div class="shop-cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list class="cart-list"/>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar";
import CartList from "@/views/shop-cart/childComps/CartList";
import CartBottomBar from "@/views/shop-cart/childComps/CartBottomBar";
import {mapGetters} from 'vuex'
export default {
  name: "ShopCart",
  components:{NavBar,CartList,CartBottomBar},
  computed:{
    // ...mapGetters(['cartLength']) 另一种写法
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
.shop-cart{
  height: 100vh;
}
.cart-nav{
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
