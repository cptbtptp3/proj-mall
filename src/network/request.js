import Axios from "axios";

export function request(config){
  //1.创建axios实例
  const instance = Axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })

  //2.axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config =>{
    //1.比如config一些信息不符合要求 可以在这修改
    //2.比如发送网络请求时，都希望在页面显示一个请求的图标
    //3.某些网络请求（登录），必须携带一些特殊信息token
    //4.拦截  进行操作后 需要将config返回出去
    return config
  },err => {
    console.log(err);
  })

  //2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
  })

  //3.发送真正的网络请求
  return instance(config) //因为他本身就是一个promise可以直接return 不需要再包装一个promise

}
