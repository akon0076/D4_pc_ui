import axios from 'axios';
import qs from 'qs';
import NProgress from 'nprogress'; // progress bar
import {store} from '../store';
import {Msg} from './message';
import router from '../router/index'

NProgress.configure({showSpinner: false}); // NProgress Configuration
axios.defaults.withCredentials = true;

/**
 * 请求类
 */
export class BaseApi {
  servers;

  /**
   * 初始化servers
   */
  constructor(hot) {

    this.servers = axios.create({
      baseURL: hot,
      // headers: {
      //   'App-Version': '0.1.0',
      // },
      timeout: 20000,
      withCredentials: true
    });
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      NProgress.done();
      response.data.message && Msg.success(response.data.message || '操作成功');
      return response
    }, function (error) {
      NProgress.done();
      let msg = '';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            msg = error.response.data.message;
            Msg.error(msg);
            break;
          case 500:
            msg = error.response.data.message;
            Msg.error(msg);
            break;
          case 590:
            break;
          case 401:
            msg = "非法的服务器请求被拒绝";
            router.push("/login")
            Msg.error(msg);
          default:
            msg = '与服务器通讯出错(' + error.response.status + ')';
            Msg.error(msg);
        }
      } else {
        msg = '与服务器通讯出错（原因未知）'
        Msg.error(msg);
      }

      return Promise.reject(error.response || '与服务器通讯出错，请稍候再试！');
    })
  }

  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @param fileList
   * @param fileKey
   * @returns {Promise<any>}
   */
  connection(method = 'GET', url, body, fileList, fileKey = 'files', getObj) {
    this.getStatusToken();
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'};
      const param = new window.FormData();
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key)) param.append(key, body[key]);
      }
      fileList.forEach(file => param.append(fileKey, file));
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (getObj) {
      if (method === 'get') {
        url = url + (url.indexOf('?') > 0 ? '&' : '?' + qs.stringify(body));
        body = {}
      }
    } else {
      if (!body.params) {
        body = {params: {}, data: body};
      }
      url = url + ((url.indexOf('?') > 0 ? '&' : '?') + qs.stringify(body.params));
      NProgress.start();
    }
    return Promise.resolve(this.servers[method](url, body.data))
  }

  getArgs(func, values, method = 'GET') {
    if (arguments.length == 0) {
      return {params: {}, data: {}};
    }
    method = method.toLocaleLowerCase();
    // 先用正则匹配,取得符合参数模式的字符串.
    // 第一个分组是这个: ([^)]*) 非右括号的任意字符
    var args = func.toString().match(/function.*?\(([^)]*)\)/)[1];
    // 用逗号来分隔参数(arguments string).
    var args1 = args.split(",").map(function (arg) {
      // 去除注释(inline comments)以及空格
      return arg.replace(/\/\*.*\*\//, "").trim();
    }).filter(function (arg) {
      // 确保没有 undefined.
      return arg;
    });
    var argsWrapped = {};
    argsWrapped.params = {};
    argsWrapped.data = {};
    var argsLength = Math.min(values.length, args1.length)
    if (method === "get") {
      for (var i = 0; i < argsLength; i++) {
        argsWrapped.params[args1[i]] = values[i];
      }
    }
    else if (method === "post") {
      for (var i = 0; i < argsLength - 1; i++) {
        argsWrapped.params[args1[i]] = values[i];
      }
      argsWrapped.data = values[argsLength - 1];
    }
    return argsWrapped;
  }


  /**
   * 设置token
   * @param isLogin
   * @param token
   */
  setToken({isLogin, token}) {
    if (isLogin) {
      this.servers.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  /**
   * 获取登录状态，token值
   * @returns {{isLogin: string, token: string}}
   */
  getStatusToken() {
    const {isLogin, token} = store.getters;
    this.setToken({isLogin, token})
  }
}

export const simpleServer = new BaseApi(process.env.BASE_SIMPLE_API); // 基础simple平台管理
export const generatorServer = new BaseApi(process.env.BASE_GENERATOR_API);// 基础代码生成平台管理
export const pmServer = new BaseApi(process.env.BASE_PM_API);// 基础PM平台管理
export const psServer = new BaseApi(process.env.BASE_PS_API);// 基础PS平台管理
