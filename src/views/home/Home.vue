<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">T-mall</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probeType="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="iconShow"/>

  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/nav-bar/NavBar";
import TabControl from "@/components/common/tab-control/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import BackTop from "@/components/content/backTop/BackTop";

import {getMultidata,getHomeGoods} from "@/network/home";
export default {
  name: "Home",
  components:{NavBar,HomeSwiper,RecommendView,FeatureView,TabControl,GoodsList,Scroll,BackTop},
  data(){
    return {
      banners:null,
      recommends:null,
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      iconShow:false
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求轮播图 推荐相关数据
    this.getMultidata();

    //请求商品相关数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh,200) //如果传入的是this.$refs.scroll.refresh() 相当于把这个函数的返回值传入
    //监听goodsListItem图片加载完成时 进行一次刷新
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
  },
  methods:{
    /**
     * 防抖函数
     * */
    debounce(func,delay){
      let timer =null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    },
    /**
     * 事件监听
     * */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backTop(){
      //this.$refs.scroll拿到scroll组件 .scroll拿到组件中的scroll对象 在调用scrollTo方法  (x,y,time)
      // this.$refs.scroll.scroll.scrollTo(0,0,500)

      //调用scroll组件中的方法实现  等同与上面
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      this.iconShow = (-position.y) > 1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络请求
     * */
    getMultidata(){
      // getMultidata()发送网络请求 .then()拿到数据
      getMultidata().then(res => {
        // 将数据进行保存
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //调用scroll组件中的finishPullUp()方法
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
