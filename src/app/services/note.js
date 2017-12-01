
// import axios from 'axios';
// import sleep from '../utils/sleep';
import sleep from '../utils/sleep';
import config from '../../config';

const { devMode } = config;

export async function getNoteList(page, type, p1, p2 = '') {
  if (devMode) {
    await sleep(850);
    if (type === 1) {
      //这里是用户列表
      let data = [{
        id: '42906',
        title: '[HDU] 2014题解 --- 无夏丶',
        to: 'HDU, 2014',
        author: 'cool'
      }, {
        id: '42907',
        title: '[BKU] 4906题解 --- 无夏丶',
        to: 'BKU, 4906',
        author: 'cool'
      }, {
        id: '42908',
        title: '[HDU] 2054题解 --- 无夏丶',
        to: 'HDU, 2054',
        author: 'cool'
      }, {
        id: '42999',
        title: '[HDU] 2231题解 --- 无夏丶',
        to: 'HDU, 2231',
        author: 'cool'
      }]

      return {
        totalCount: 4,
        results: data,
      };
    } else if (type === 2) {
      //题库的本题题解
      console.log(`oj:${p1},id:${p2}`);
      let data = [{
        id: '426',
        title: '[HDU] 2014题解 --- 无夏丶',
        to: 'HDU, 2014',
        author: 'cool'
      }, {
        id: '476',
        title: '[HDU] 2014题解 --- 碎念',
        to: 'HDU, 2014',
        author: 'undefined'
      }, {
        id: '4296',
        title: '[HDU] 2014题解 --- 此题无解',
        to: 'HDU, 2014',
        author: 'null'
      }, {
        id: '42906',
        title: '[HDU] 2014题解 --- 你们A的都是假的',
        to: 'HDU, 2014',
        author: 'aaaaa'
      }, {
        id: '42908',
        title: '[HDU] 2014题解 --- 季姬击鸡记',
        to: 'HDU, 2014',
        author: 'jijiji'
      },];
      return {
        totalCount: 5,
        results: data,
      };
    }
  } else {

  }
}

export async function getNoteDet(id) {
  if(devMode){
    return {
      title:'[HDU] 2014题解 --- 无夏丶',
      author:'cool',
      to:'HDU, 2014',
      content:'这里是一个测试语句啦啦啦',
    }
  }
}