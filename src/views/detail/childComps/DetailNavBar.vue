<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" class="titles-item"
             :class="{active:currentIndex === index}" @click="titlesClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar";
export default {
  name: "DetailNavBar",
  components:{NavBar},
  data(){
    return {titles:['商品','参数','评论','推荐'],currentIndex:0}
  },
  methods:{
    titlesClick(index){
      this.currentIndex = index
      this.$emit('titlesClick',index)
    },
    backClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.titles{
  display: flex;
  text-align: center;

}
.titles-item{
  flex: 1;
  font-size: 15px;
}
.active{
  color: var(--color-tint);
}
.left{
  text-align: center;
}
.left img{
  margin-top: 11px;
}

</style>
