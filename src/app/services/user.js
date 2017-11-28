/**
 * 这里是user的接口访问。
 * created by flasco at 2017-11-24
 */

import axios from 'axios';
import sleep from '../utils/sleep';
import config from '../../config';

const { devMode, serverIp } = config;

axios.defaults.withCredentials = true//设置允许携带cookies

export async function userLoginCheck(info) {
  if (devMode) {
    await sleep(1200);
    console.log(info);
    if (info.accountName.indexOf('cool') !== -1) {
      let inf = {
        flag: true,
        res: {
          ...info,
          header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
          isLogin: true,
        }
      }
      return inf;
    } else {
      return { flag: false };
    }
  } else {
    const { data } = await axios.post(`${serverIp}/sessions`, info);
    let inf = {
      flag: data.user !== null,
      res: data.user
    }
    return inf;
  }
}

export async function loginCheck() {
  if(!devMode){
    const { data } = await axios.get(`${serverIp}/sessions`);  //验证是否在登录状态
    console.log(data);
    return data.success !== 1;
  }else{
    return true;
  }
}

export async function userRegisterCheck(info) {
  if (devMode) {
    await sleep(1200);
    return info.userName.indexOf('cool') !== -1;
  } else {
    const { data } = await axios.post(`${serverIp}/users`, info);
    return `${data.success}` === '1';
  }
}

export async function uploadAvatar(file) {
  const { data } = await axios.post(`${serverIp}/files/pic`, file);
  console.log(data);
  return data;
}