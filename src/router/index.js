import Vue from "vue";
import VueRouter from "vue-router"
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shop-cart/ShopCart')
const Profile = () => import('views/profile/Profile')

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/shop-cart',
      component:ShopCart
    },
    {
      path:'/profile',
      component:Profile
    }
  ],
  mode:'history'
})
