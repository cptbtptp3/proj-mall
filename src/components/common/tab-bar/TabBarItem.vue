<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-selected"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
      }
  },
  // data(){
  //   return {isActive:false}
  // },
  computed:{
    isActive(){
      //判断当前活跃的path与传过来的path是否相等
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
      }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
      // this.isActive = !this.isActive
      }
  }
}
</script>

<style scoped>

.tab-bar-item{
  flex: 1; /*子元素平分1*/
  text-align: center;
  height: 49px;

}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active{
  color: blue;
}

</style>
