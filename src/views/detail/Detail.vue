<template>
 <div class="detail">
   <DetailNavBar />
   <detail-swiper :top-images="topImages"/>
   <detail-base-info :goods="goods"/>
 </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";

import {getDetails,Goods} from "@/network/detail";
export default {
  name: "Detail",
  components:{DetailNavBar,DetailSwiper,DetailBaseInfo},
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{}
    }
  },
  created() {
    //保存传入的商品id
    this.iid = this.$route.query.iid

    //根据传入的商品id请求详情数据
    getDetails(this.iid).then(res => {
      //获取顶部轮播图数据
      this.topImages = res.result.itemInfo.topImages

      //获取商品数据
      this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
    })

  },
  methods:{
  }

}
</script>

<style scoped>

</style>
