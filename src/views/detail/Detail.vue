<template>
 <div id="detail">
   <DetailNavBar class="detail-nav" @titlesClick="titlesClick" ref="detailNav"/>
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
     <detail-swiper :top-images="topImages"/>
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"/>
     <detail-param-info :param-info="paramInfo" ref="params"/>
     <detail-comment-info :comment-info="commentInfo" ref="comment"/>
     <goods-list :goods="recommends" ref="recommend"/>
   </scroll>

   <detail-bottom-bar @addCart="addToCart"/>
   <back-top @click.native="backTop" v-show="iconShow"/>

 </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";

import GoodsList from "@/components/content/goods/GoodsList";

import {getDetails,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";

import {itemListenerMixin,backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components:{DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailGoodsInfo,DetailParamInfo,DetailCommentInfo,DetailBottomBar,Scroll,GoodsList},
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      topY:[],
      getTopY:null,
      currentIndex:0
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  created() {
    //?????????????????????id
    this.iid = this.$route.query.iid

    //?????????????????????id??????????????????
    getDetails(this.iid).then(res => {
      //???????????????????????????
      this.topImages = res.result.itemInfo.topImages

      //??????????????????
      this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)

      //??????????????????
      this.shop = new Shop(res.result.shopInfo)

      //????????????????????????
      this.detailInfo = res.result.detailInfo

      //??????????????????
      this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)

      //??????????????????
      if(res.result.rate.cRate !== 0){
        this.commentInfo = res.result.rate.list[0]
      }
    })

    //??????????????????
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //?????????????????????offsetTop??? ?????????????????????
    this.getTopY = debounce(() => {
      this.topY = []
      this.topY.push(0,this.$refs.params.$el.offsetTop,
        this.$refs.comment.$el.offsetTop,this.$refs.recommend.$el.offsetTop,Number.MAX_VALUE)
    },100)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addToCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getTopY()
    },
    titlesClick(index){
      this.$refs.scroll.scrollTo(0,-this.topY[index],1000)
    },
    contentScroll(position){
      // console.log(position);
      const positionY = -position.y
      let length = this.topY.length
      for(let i = 0;i < length - 1;i++){
        if(this.currentIndex !== i && positionY >= this.topY[i] && positionY < this.topY[i+1]){
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
      //???????????????
      this.iconShow = (-position.y) > 1000
    },
    addToCart(){
      //?????????????????????????????????
      const production = {}
      production.image = this.topImages[0];
      production.title = this.goods.title;
      production.desc = this.goods.desc;
      production.price = this.goods.realPrice;
      production.iid = this.iid;

      this.$store.dispatch('addToCart',production).then(res => {
        this.$toast.show()
      })
      // this.addToCart(production).then(res => {}) ????????????????????????  ????????????mapActions??????
    }
  }

}
</script>

<style scoped>
#detail{
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}
/*.detail-nav{*/
/*  position: relative;*/
/*  z-index: 9 ;*/
/*  background-color: #fff;*/
/*}*/
.content{
  position: relative;
  /*height: 1000px;*/
  height: calc(100% - 44px - 44px);
  overflow: hidden;
}
</style>
