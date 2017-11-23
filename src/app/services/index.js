import axios from 'axios';

let SeverIp = 'http://172.16.54.186:8080'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchContestList(page){
  await sleep(700);
  let data = [{
    contestId:'0001',
    contestName:'绝地吃鸡大比赛',
    startTime:'2017-11-23 15:44:54',
    contestType:'Public',
    contestStatus:'Pending'
  },{
    contestId:'0002',
    contestName:'绝地吃鸡大比赛',
    startTime:'2017-11-23 15:44:54',
    contestType:'Public',
    contestStatus:'Pending'
  },{
    contestId:'0003',
    contestName:'绝地吃鸡大比赛',
    startTime:'2017-11-23 15:44:54',
    contestType:'Public',
    contestStatus:'Pending'
  },{
    contestId:'0004',
    contestName:'绝地吃鸡大比赛',
    startTime:'2017-11-23 15:44:54',
    contestType:'Public',
    contestStatus:'Ended'
  },{
    contestId:'0005',
    contestName:'绝地吃鸡大比赛',
    startTime:'2017-11-23 15:44:54',
    contestType:'Private',
    contestStatus:'Ended'
  },];

  data = data.slice(10 * (page - 1), 10 * page);
  return {
    totalCount: 5,
    results: data,
  };

}

export async function fetchContestDetList(cid) {
  await sleep(1000);
  let data = [{
    solved:true,
    remoteProblemId:'1001',
    title:'Palindrome',
    ratio:'35.37%(29/82)'
  },{
    solved:false,
    remoteProblemId:'1002',
    title:'K-th Number',
    ratio:'35.37%(29/82)'
  },{
    solved:true,
    remoteProblemId:'1003',
    title:'Confliction',
    ratio:'35.37%(29/82)'
  },{
    solved:false,
    remoteProblemId:'1004',
    title:'X-Men',
    ratio:'35.37%(29/82)'
  },]

  return data;
}

export async function fetchQuesList(page) {
  await sleep(1000);
  let data = [{
    remoteOJ: 'HDU',
    remoteProblemId: '1000',
    title: 'A + B Problem',
    ratio: '30.87%(220395/713855)',
  }, {
    remoteOJ: 'HDU',
    remoteProblemId: '1001',
    title: 'Sum Problem',
    ratio: '25.36%(129232/509626)',
  }, {
    remoteOJ: 'HDU',
    remoteProblemId: '1002',
    title: 'A + B Problem II',
    ratio: '19.36%(74637/385502)',
  }, {
    remoteProblemId: '1003',
    title: 'Max Sum',
    ratio: '23.77%(62287/262089)',
  }, {
    remoteProblemId: '1004',
    title: 'Let the Balloon Rise',
    ratio: '39.50%(51308/129882)',
  }, {
    remoteProblemId: '1005',
    title: 'Number Sequence',
    ratio: '24.88%(45648/183443)',
  }, {
    remoteProblemId: '1006',
    title: 'A + B Problem',
    ratio: '30.87%(220395/713855)',
  }, {
    remoteProblemId: '1007',
    title: 'Sum Problem',
    ratio: '25.36%(129232/509626)',
  }, {
    remoteProblemId: '1008',
    title: 'A + B Problem II',
    ratio: '19.36%(74637/385502)',
  }, {
    remoteProblemId: '1009',
    title: 'Max Sum',
    ratio: '23.77%(62287/262089)',
  }, {
    remoteProblemId: '1010',
    title: 'Let the Balloon Rise',
    ratio: '39.50%(51308/129882)',
  }, {
    remoteProblemId: '1011',
    title: 'Number Sequence',
    ratio: '24.88%(45648/183443)',
  }];

  data = data.slice(10 * (page - 1), 10 * page);
  return {
    totalCount: 11,
    results: data,
  };
}

export async function fetchQuesDet(id) {
  await sleep(1000);
  // const { data } = await axios.get(`${SeverIp}/problem/json?pid=${id}`);
  // console.log(data);
  let data = {
    title: 'A + B Problem',
    timeLimit: '2000/1000 MS (Java/Others)',
    memoryLimit: '65536/32768 K (Java/Others)',
    description: ' We define the distance of two strings A and B with same length n is <br />$dis_{A,B} = \\sum\\limits_{i=0}^{n-1}|A_{i}-B_{n-1-i}|$\n     <br />The difference between the two characters is defined as the difference in ASCII.\n       <br />You should find the maximum length of two non-overlapping substrings in given string S, and the distance between them are less then or equal to m.\n       <br />',
    input: 'Each line will contain two integers A and B. Process to end of file.',
    output: 'For each case, output A + B in one line.',
    sampleInput: '1 1',
    sampleOutput: '2',
    author: 'HDOJ',
    source: 'ZJCPC2004',
    recommend: ''
  };
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

export async function postCode(values){
  console.log(values)
  // await axios.post(`${SeverIp}/problem/submit`,{
  //   ...values,
  // });
}