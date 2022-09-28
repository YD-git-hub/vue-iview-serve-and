import {get,post} from "./config";
export const sys_home_data = () => get('/sys_home_data'); //首页数据
export const Login = data => post('/Login/login', data); //登录
// export const _sign = data => post('/admin/Clinic/sys_home_data', data); //注册
