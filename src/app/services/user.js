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
    if (info.accountName.indexOf('cool') !== -1) {
      let inf = {
        flag: true,
        res: {
          id: 3,
          accountName: info.accountName,
          icon: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
          isLogin: true,
        }
      }
      console.log(inf)
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
  if (!devMode) {
    const { data } = await axios.get(`${serverIp}/sessions`);  //验证是否在登录状态
    return data.success === 1;
  } else {
    await sleep(750);
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
  if (devMode) {
    return '/12312';
  } else {
    const { data } = await axios.post(`${serverIp}/files/icon`, file);
    // console.log(data);
    return data;
  }
}

export async function getUserInfo(uid) {
  if (devMode) {
    await sleep(800);
    let data;
    if (uid === '3') {
      data = {
        id: 3,
        accountName: 'cool',
        icon: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
        description: '自你离去的那一天起，我便失去了所有的夏天。\n自你离去的那一天起，我便失去了所有的夏天。\n自你离去的那一天起，我便失去了所有的夏天。',
        gender: 'woman',
        school: 'United States Ivy League'
      }
    } else {
      data = {
        id: 4,
        accountName: 'shua',
        icon: 'http://img2.woyaogexing.com/2017/11/12/6751808381431831!400x400_big.jpg',
        description: '自你离去的那一天起，我便失去了所有的夏天。',
        gender: 'woman',
        school: '英国加里敦大学'
      }
    }
    return data;
  } else {
    const { data } = await axios.get(`${serverIp}/users/${uid}`)
    data.user.icon = `${config.serverIp}${data.user.icon}`;
    return data.user;
  }
}

export async function submitUserInfo(values) {
  if (devMode) {
    console.log(values)
  } else {
    console.log(values)
  }
}