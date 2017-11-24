/**
 * 这里放一些共用的函数功能区分性不强的代码。
 * created by flasco at 2017-11-24
 */

import axios from 'axios';
import sleep from '../utils/sleep';
import config from '../../config';

const { devMode,serverIp } = config;



export async function getSelectChild(plantformId) {
  const data = [{
    value: '0',
    content: 'G++',
  }, {
    value: '1',
    content: 'GCC',
  }, {
    value: '2',
    content: 'C++',
  }, {
    value: '3',
    content: 'C',
  }, {
    value: '4',
    content: 'Pascal',
  }, {
    value: '5',
    content: 'Java',
  }, {
    value: '6',
    content: 'C#',
  }];
  return data;
}

export async function postCode(values) {
  // console.log(values)
  devMode && await axios.post(`${serverIp}/problem/submit`, {
    ...values,
  });
}