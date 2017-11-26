/**
 * 这里是user的接口访问。
 * created by flasco at 2017-11-24
 */

import axios from 'axios';
import sleep from '../utils/sleep';
// import config from '../../config';

// const { devMode, serverIp } = config;

axios.defaults.withCredentials = true//设置允许携带cookies

export async function userLoginCheck(info) {
  await sleep(1200);
  // console.log(info);
  return info.userName.indexOf('cool') !== -1;
}

export async function userRegisterCheck(info) {
  await sleep(1200);
  // console.log(info);
  return info.userName.indexOf('cool') !== -1;
}