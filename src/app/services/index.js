/**
 * 这里放一些共用的函数功能区分性不强的代码。
 * created by flasco at 2017-11-24
 */

import axios from 'axios';
// import sleep from '../utils/sleep';
import config from '../../config';

const { devMode,serverIp } = config;


export async function fetchRealStatus(runId, proId, author, languageId, suatusId, page) {
  let data = [{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Output Limit Exceeded',
    remoteOj:'mock',
    remoteProblemId:'mock',
    exeTime:'mock',
    exeMemory:'mock',
    codeLen:'mock',
    language:'mock',
    author:'mock',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Memory Limit Exceeded',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Time Limit Exceeded',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Runtime Error',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Compilation Error',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Presentation Error',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Wrong Answer',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  },{
    //runId ;  submitTime;  judgeStatus;  remoteOj;  remoteProblemId； exeTime;  ExeMemory;Author
    runId:'23006988',
    submitTime:'2017-11-25 18:25:03',
    judgeStatus:'Accepted',
    remoteOj:'HDU',
    remoteProblemId:'2154',
    exeTime:'1000MS',
    exeMemory:'75388K',
    codeLen:'2314B',
    language:'Pascal',
    author:'rocket_rac',
  }];
  return data;
}

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