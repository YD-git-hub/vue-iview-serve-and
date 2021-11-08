import {get,post} from "./config";
export const _code = () => get('/login/code'); //验证码
export const _login = data => post('/login/login', data); //登录
export const _sign = data => post('/sign/sign', data); //注册
