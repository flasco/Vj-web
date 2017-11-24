/**
 * 这里是contest的接口访问。
 * created by flasco at 2017-11-24
 */
import sleep from '../utils/sleep';
import config from '../../config';

const { devMode,serverIp } = config;

export async function fetchContestList(page) {
  devMode && await sleep(700);
  let data = [{
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

}

export async function fetchContestDetList(cid) {
  devMode && await sleep(1000);
  let data = [{
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

  return data;
}
