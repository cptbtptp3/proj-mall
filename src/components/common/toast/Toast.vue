<template>
    <div class="toast" v-show="isShow">
        <div>
            {{message}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message:String,
    // isShow: {
    //   type: Boolean,
    //   default () {
    //     return false
    //   }
    // }
  },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message='商品已添加至购物车',duration=1000) {
    //   duration = duration || 2000
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.message = ''
        this.isShow =false
      },duration)
    }
  }
}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    background: rgba(0,0,0,.6);
    color: #fff;
    padding: 15px 20px;
    transform: translate(-50%,-50%);
    z-index: 99;
  border-radius: 8px;
}
</style>
