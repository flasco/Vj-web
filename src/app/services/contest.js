/**
 * 这里是contest的接口访问。
 * created by flasco at 2017-11-24
 */
import sleep from '../utils/sleep';
import config from '../../config';
import axios from 'axios';

const { devMode, serverIp } = config;

export async function fetchContestList(page, title = '', accountName = '', status = '', contestType = '-1', size = 10) {//page,size,title,accountName,status
  let data;
  if (devMode) {
    await sleep(700);
    data = [{
      contestId: '0001',
      contestName: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      contestStatus: 'Pending'
    }, {
      contestId: '0002',
      contestName: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      contestStatus: 'Pending'
    }, {
      contestId: '0003',
      contestName: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      contestStatus: 'Pending'
    }, {
      contestId: '0004',
      contestName: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      contestStatus: 'Ended'
    }, {
      contestId: '0005',
      contestName: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Private',
      contestStatus: 'Ended'
    },];

    data = data.slice(10 * (page - 1), 10 * page);
    return {
      totalCount: 5,
      results: data,
    };
  } else {
    const x1 = await axios.get(`${serverIp}/contests/count?page=${page}&size=${size}&status=${status}&accountName=${accountName}&title=${title}&contestType=${contestType}`);
    const x2 = await axios.get(`${serverIp}/contests?page=${page}&size=${size}&accountName=${accountName}&status=${status}&title=${title}&contestType=${contestType}`);
    console.log(x2.data);
    return {
      ...x1.data,//totalCount
      results: x2.data,
    }
  }
}

export async function fetchContestDetList(cid) {
  let data;
  if (devMode) {
    await sleep(1000);
    data = [{
      solved: true,
      remoteProblemId: '1001',
      title: 'Palindrome',
      ratio: '35.37%(29/82)'
    }, {
      solved: false,
      remoteProblemId: '1002',
      title: 'K-th Number',
      ratio: '35.37%(29/82)'
    }, {
      solved: true,
      remoteProblemId: '1003',
      title: 'Confliction',
      ratio: '35.37%(29/82)'
    }, {
      solved: false,
      remoteProblemId: '1004',
      title: 'X-Men',
      ratio: '35.37%(29/82)'
    },]
  } else {
    const res = await axios.get(`${serverIp}/`)
    data = res.data;
  }
  return data;
}
