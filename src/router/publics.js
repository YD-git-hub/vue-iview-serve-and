let pubics=[
    {
        path: '/',
        name: 'publicslogin',
        component: ()=>import("@/views/publics/login")//登录
    },
    {
        path: '/register',
        name: 'register',
        component: ()=>import("@/views/publics/register")//注册
    },
    {
        path: '/Home',
        name: 'publicsHome',
        component: ()=>import("@/views/publics/Home"),//后台
        children:[
            {
                path: '/Home/index',
                name: 'publicsindex',
                component: ()=>import("@/views/publics/Home/index"),
                meta:{breadnav:[{path:'',name:'HOME1'}],name:'HOME1'}//营业数据
            },
            {
                path: '/Home/business',
                name: 'publicsbusiness',
                component: ()=>import("@/views/publics/Home/business"),
                meta:{breadnav:[{path:'',name:'HOME11'}],name:'HOME11'}//机构数据
            },
            {
                path: '/Home/cliniclist',
                name: 'publicscliniclist',
                component: ()=>import("@/views/publics/Home/cliniclist"),
                meta:{breadnav:[{path:'/Home/index',name:'HOME1'},{path:'',name:'HOME2'}],name:'HOME2'}//机构
            },
       ]
    }
]
export default pubics