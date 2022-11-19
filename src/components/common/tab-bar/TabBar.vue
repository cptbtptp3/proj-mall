<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>

#tab-bar{
  background-color: #f6f6f6;
  display: flex; /*flex布局*/

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0px -1px 2px rgba(100,100,100,.2); /*水平偏移量  垂直偏移量(负数为向上偏移) 模糊距离  阴影颜色 */
  /*红色（R）0 到 255 间的整数，代表颜色中的红色成分*/
  /*绿色（G）0 到 255 间的整数，代表颜色中的绿色成分*/
  /*蓝色（B）0 到 255 间的整数，代表颜色中的蓝色成分*/
  /*透明度（A）取值 0~1 之间， 代表透明度*/

}

</style>
