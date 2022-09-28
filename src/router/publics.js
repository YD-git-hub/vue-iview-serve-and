let pubics=[
    {
        path: '/',
        name: 'publicslogin',
        component: ()=>import("@/views/login")//登录
    },
    {
        path: '/register',
        name: 'register',
        component: ()=>import("@/views/register")//注册
    },
    {
        path: '/Home',
        name: 'publicsHome',
        component: ()=>import("@/views/Home"),//后台
        children:[
            {
                path: '/Home/index',
                name: 'publicsindex',
                component: ()=>import("@/views/index"),
                meta:{breadnav:[{path:'',name:'HOME1'}],name:'HOME1',id:"1"}//营业数据
            },
            {
                path: '/Home/business',
                name: 'publicsbusiness',
                component: ()=>import("@/views/business"),
                meta:{breadnav:[{path:'',name:'HOME11',id:'1'}],name:'HOME11',id:'1'}//机构数据
            },
            {
                path: '/Home/cliniclist',
                name: 'publicscliniclist',
                component: ()=>import("@/views/cliniclist"),
                meta:{breadnav:[{path:'/Home/index',name:'HOME1'},{path:'',name:'HOME2'}],name:'HOME2',id:"2"}//机构
            },
       ]
    }
]
export default pubics