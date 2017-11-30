/**
 * 这里放一些共用的函数功能区分性不强的代码。
 * created by flasco at 2017-11-24
 */

import axios from 'axios';
// import sleep from '../utils/sleep';
import config from '../../config';
import sleep from '../utils/sleep';

const { devMode, serverIp } = config;


export async function fetchRealStatus(runId, proId, author, languageId, suatusId, page) {
  let data = [{
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Output Limit Exceeded',
    remoteOj: 'mock',
    remoteProblemId: 'mock',
    exeTime: 'mock',
    exeMemory: 'mock',
    codeLen: 'mock',
    language: 'mock',
    author: 'mock',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Memory Limit Exceeded',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Time Limit Exceeded',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Runtime Error',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Compilation Error',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Presentation Error',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Wrong Answer',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }, {
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId: '23006988',
    submitTime: '2017-11-25 18:25:03',
    judgeStatus: 'Accepted',
    remoteOj: 'HDU',
    remoteProblemId: '2154',
    exeTime: '1000MS',
    exeMemory: '75388K',
    codeLen: '2314B',
    language: 'Pascal',
    author: 'rocket_rac',
  }];
  return data;
}

export async function getSelectChild(plantformId) {
  const data = [{
    value: 'G++',
    content: 'G++',
  }, {
    value: 'GCC',
    content: 'GCC',
  }, {
    value: 'C++',
    content: 'C++',
  }, {
    value: 'C',
    content: 'C',
  }, {
    value: 'Pascal',
    content: 'Pascal',
  }, {
    value: 'Java',
    content: 'Java',
  }, {
    value: 'C#',
    content: 'C#',
  }];
  return data;
}

export async function postCode(values) {
  devMode && await sleep(850);
  !devMode && await axios.post(`${serverIp}/submissions`, {
    ...values,
  });
}

export async function getUserRank(page) {
  if (devMode) {
    await sleep(1000);
    let data = [{
      rank: '1',
      nickName: '无夏丶',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '4587',
    },{
      rank: '2',
      nickName: '无夏丶',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '4587',
    },{
      rank: '3',
      nickName: '无夏丶呜呜呜呜呜呜呜',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '684450',
    },{
      rank: '4',
      nickName: '无夏丶',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '4587',
    },{
      rank: '5',
      nickName: '无夏丶',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '4587',
    },{
      rank: '6',
      nickName: '无夏丶',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '4587',
    },{
      rank: '7',
      nickName: '无夏丶',
      accountName: 'cool',
      header: 'http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg',
      description:'自你离去的那一天起，我便失去了所有的夏天。',
      solved: '1459',
      submitted: '4587',
    }]
    return {
      totalCount:7,
      results:data
    };
  }
}