<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="blue">
      <img src="~assets/img/tab-bar/home.svg" alt="" slot="item-icon">
      <img src="~assets/img/tab-bar/home-selected.svg" alt="" slot="item-icon-selected">
      <div slot="item-text">主页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" active-color="blue">
      <img src="~assets/img/tab-bar/category.svg" alt="" slot="item-icon">
      <img src="~assets/img/tab-bar/category-selected.svg" alt="" slot="item-icon-selected">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shop-cart" active-color="blue">
      <img src="~assets/img/tab-bar/shopcart.svg" alt="" slot="item-icon">
      <img src="~assets/img/tab-bar/shopcart-selected.svg" alt="" slot="item-icon-selected">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" active-color="blue">
      <img src="~assets/img/tab-bar/profile.svg" alt="" slot="item-icon">
      <img src="~assets/img/tab-bar/profile-selected.svg" alt="" slot="item-icon-selected">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tab-bar/TabBar";
import TabBarItem from "components/common/tab-bar/TabBarItem";
export default {
  name: "MainTabBar",
  components:{TabBar,TabBarItem}
}
</script>

<style scoped>

</style>
