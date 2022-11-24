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

import Scroll from "@/components/common/scroll/Scroll";

import GoodsList from "@/components/content/goods/GoodsList";

import {getDetails,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";

import {itemListenerMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  components:{DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailGoodsInfo,DetailParamInfo,DetailCommentInfo,Scroll,GoodsList},
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
  mixins:[itemListenerMixin],
  created() {
    //保存传入的商品id
    this.iid = this.$route.query.iid

    //根据传入的商品id请求详情数据
    getDetails(this.iid).then(res => {
      //获取顶部轮播图数据
      this.topImages = res.result.itemInfo.topImages

      //获取商品数据
      this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(res.result.shopInfo)

      //获取商品详情数据
      this.detailInfo = res.result.detailInfo

      //获取参数数据
      this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)

      //获取评论数据
      if(res.result.rate.cRate !== 0){
        this.commentInfo = res.result.rate.list[0]
      }
    })

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    //获取对应组件的offsetTop值 保存并进行防抖
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
.detail-nav{
  position: relative;
  z-index: 9 ;
  background-color: #fff;
}
.content{
  position: relative;
  /*height: 1000px;*/
  height: calc(100% - 44px);
}
</style>
