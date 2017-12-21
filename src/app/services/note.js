
import axios from 'axios';
// import sleep from '../utils/sleep';
import sleep from '../utils/sleep';
import config from '../../config';

const { devMode, serverIp } = config;

export async function getNoteList(page, remoteOj = '', remoteId = '', userId = '-1', size = 10) {
  if (devMode) {
    await sleep(850);
  } else {
    let x1 = await axios.get(`${serverIp}/solutions/count?remoteOj=${remoteOj}&remoteProblemId=${remoteId}&userId=${userId}`)
    let x2 = await axios.get(`${serverIp}/solutions?remoteOj=${remoteOj}&remoteProblemId=${remoteId}&userId=${userId}&page=${page}&size=${size}`)
    return {
      success: x1.data.success && x2.data.success,
      ...x1.data.obj,//totalCount
      results: x2.data.obj,
    }
  }
}

export async function getNoteDet(id) {
  if (devMode) {
    await sleep(850);
    return {
      title: '[HDU] 2014题解 --- 无夏丶',
      author: 'cool',
      remoteOj: 'HDU',
      remoteId: '2014',
      content: '## Hello World!~\n\n> this is my **first** *word* to test.!\n\n```js\nlet x = 0;\nconsole.log(x)\n```\n\n下面我要放图片啦！\n\n<img src="https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3379289131,4055642412&fm=85&s=58A9AB550C61FA1D889581C40300A033" style="width:120px;" alt="asd"/>',
    }
  } else {
    let { data } = await axios.get(`${serverIp}/solutions/${id}`);
    return data;
  }
}

export async function createNote(note) {
  if (devMode) {
    await sleep(850);
    return {
      title: '[HDU] 2014题解 --- 无夏丶',
      author: 'cool',
      remoteOj: 'HDU',
      remoteId: '2014',
      content: '## Hello World!~\n\n> this is my **first** *word* to test.!\n\n```js\nlet x = 0;\nconsole.log(x)\n```\n\n下面我要放图片啦！\n\n<img src="https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3379289131,4055642412&fm=85&s=58A9AB550C61FA1D889581C40300A033" style="width:120px;" alt="asd"/>',
    }
  } else {
    let { data } = await axios.post(`${serverIp}/solutions`,note);
    return data;
  }
}

export async function updateNote(note) {
  if (devMode) {
    await sleep(850);
    return {
      title: '[HDU] 2014题解 --- 无夏丶',
      author: 'cool',
      remoteOj: 'HDU',
      remoteId: '2014',
      content: '## Hello World!~\n\n> this is my **first** *word* to test.!\n\n```js\nlet x = 0;\nconsole.log(x)\n```\n\n下面我要放图片啦！\n\n<img src="https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3379289131,4055642412&fm=85&s=58A9AB550C61FA1D889581C40300A033" style="width:120px;" alt="asd"/>',
    }
  } else {
    let { data } = await axios.post(`${serverIp}/solutions/${note.id}`,note);
    return data;
  }
}