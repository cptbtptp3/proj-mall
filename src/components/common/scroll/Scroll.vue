<template>
 <div class="wrapper" ref="wrapper">
   <div class="content">
     <slot></slot>
   </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    },
    observeDOM: {
      type: Boolean,
      default: false,
    },
    observeImage: {
      type: Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
      //创建bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{ //this.$refs.wrapper相当于直接拿到ref="wrapper"的元素对象
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        observeDOM: this.observeDOM,
        // 等页面图片加载完之后，刷新content高度
        observeImage: this.observeImage
      })

      //监听滚动事件
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',position => {
          // console.log(position);
          //必须设置定时器  否则在bscroll对象创建出来之前 浏览器是解析不了.on()方法的
          this.$emit('scroll',position)
        })
      }

      //监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() =>{
          this.$emit('pullingUp')
        })
      }
  },
  methods: {
    //time是默认值
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh(){
      // console.log('-----');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  watch: {
    data () {
      setTimeout(this.refresh,30)
    }
  }
}
</script>

<style scoped>

</style>
