// 引入mockjs
const Mock = require('mockjs')
// 登录
Mock.mock('/admin/Login/login','post', (data)=>{
    let params=data.body.split('&')
    let info=[];
    for (const iter of params) {
        info.push(iter.split('='))
    }
    if(info[1][1]=='admin' && info[0][1]=='123456')
    return {
        code:1,
        data:{
            userid:7
        },
        msg:'登录成功'
    }
    else return {
        code:-1,
        msg:'账号密码错误'
    }
})
//首页数据
Mock.mock('/admin/Clinic/sys_home_data','get', ()=>{
    return {
        info:{
            data:{
                user_num:'1',
                clinic_num:'10',
                sao_num:'15',
                visit_num:'5'
            }
        }
        
    }
})
Mock.mock('/admin/Clinic/sys_hot_data','get', ()=>{
    return {
        info:{
            data:[{nums: 4, province: "四川", ratio: "2.60"},
            {nums: 4, province: "上海", ratio: "2.60"},
            {nums: 1, province: "重庆", ratio: "0.65"},
            {nums: 1, province: "江苏", ratio: "0.65"},
            {nums: 1, province: "河北", ratio: "0.65"}]
        }
        
    }
})
//找回密码
