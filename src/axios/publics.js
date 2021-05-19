import {get,post} from "./config";
export const Login = data => post('/admin/Login/login', data); //登录
export const sys_home_data = data => get('/admin/Clinic/sys_home_data', data); //首页数据
export const sys_hot_data = data => get('/admin/Clinic/sys_hot_data', data); //首页数据