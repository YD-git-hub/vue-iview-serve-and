import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// import store from '@/store/index';
import router from '@/router/index';
import {
  Spin,
  Message
} from 'view-design';
// axios.defaults.baseURL = ''

// if (process.env.NODE_ENV == 'development') {
//   //本地(开发)环境
//   axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'production') {
//   //线上（开发）环境
//   axios.defaults.baseURL = '';
// }

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
  config => {
      const userid = sessionStorage.userid;
      userid && (config.headers.userid = userid);
      Spin.show({
        render: h => {
          return h('div', [
            h('Icon', {
              'style': 'animation: ani-demo-spin 1s linear infinite;color:#fff',
              props: {
                type: 'ios-loading',
                size: 30
              }
            }),
            h('div', {
              'style': 'color:#fff'
            }, '加载中...')
          ]);
        }
      });
      return config;

  },
  error => {
    return Promise.error(error);
  });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      Spin.hide();
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          router.replace({
            path: '/',
          });
          break;
        // 403 token过期
        case 403:
          Message['warning']({
            background: true,
            content: '!登录过期，请重新登录'
          });
          // // 清除token
          sessionStorage.removeItem('userid');
          setTimeout(() => {
            router.replace({
              path: '/',
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message['error']({
            background: true,
            content: '!网络请求不存在'
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message['error']({
            background: true,
            content: error.response.data.message
          });
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function Uploadpost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
