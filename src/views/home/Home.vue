<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">T-mall</div>
    </nav-bar>

    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl" v-show="tabCtrlFixed"/>

    <scroll class="content" ref="scroll" :probeType="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @imageLoad="imageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
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
import Scroll from "@/components/common/scroll/Scroll";

import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {getMultidata,getHomeGoods} from "@/network/home";

import {itemListenerMixin} from "@/common/mixin";

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
      iconShow:false,
      tabCtrlOffsetTop:0,
      tabCtrlFixed:false,
      scrollY:0
    }
  },
  mixins:[itemListenerMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.scrollY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存不活跃时滚动的距离
    this.scrollY = this.$refs.scroll.getScrollY()

    //离开时取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
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
    //在mixin混入 已经合并
    // const refresh = this.debounce(this.$refs.scroll.refresh,200) //如果传入的是this.$refs.scroll.refresh() 相当于把这个函数的返回值传入
    // //监听goodsListItem图片加载完成时 进行一次刷新
    // this.$bus.$on('itemImageLoad',() => {
    //   refresh()
    // })
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
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop(){
      //this.$refs.scroll拿到scroll组件 .scroll拿到组件中的scroll对象 在调用scrollTo方法  (x,y,time)
      // this.$refs.scroll.scroll.scrollTo(0,0,500)

      //调用scroll组件中的方法实现  等同与上面
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      //判断滚动的距离 决定backTop是否显示
      this.iconShow = (-position.y) > 1000

      //决定tab-control是否吸顶
      this.tabCtrlFixed= (-position.y) > this.tabCtrlOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    imageLoad(){
      //所有的组件都有一个属性$el 用于获取组件中的元素
      this.tabCtrlOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动时  为了不让导航栏跟随滚动*/
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/
}
.tab-control{
  position: relative;
  z-index: 9; /*只对定位的元素起效果*/
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
