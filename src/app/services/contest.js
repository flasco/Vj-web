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
      id: '0001',
      title: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      status: 'Pending'
    }, {
      id: '0002',
      title: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      status: 'Pending'
    }, {
      id: '0003',
      title: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      status: 'Pending'
    }, {
      id: '0004',
      title: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Public',
      status: 'Ended'
    }, {
      id: '0005',
      title: '绝地吃鸡大比赛',
      startTime: '2017-11-23 15:44:54',
      contestType: 'Private',
      status: 'Ended'
    },];

    data = data.slice(10 * (page - 1), 10 * page);
    return {
      totalCount: 5,
      results: data,
    };
  } else {
    const x1 = await axios.get(`${serverIp}/contests/count?page=${page}&size=${size}&status=${status}&accountName=${accountName}&title=${title}&contestType=${contestType}`);
    const x2 = await axios.get(`${serverIp}/contests?page=${page}&size=${size}&accountName=${accountName}&status=${status}&title=${title}&contestType=${contestType}`);
    return {
      ...x1.data,//totalCount
      results: x2.data.obj,
    }
  }
}

export async function fetchContestDetList(cid, pwd = '') {
  let data;
  if (devMode) {
    await sleep(1000);
    data = {
      obj: {
        id: 3,
        title: "testjson",
        startTime: 1511618065170,
        duration: 360000,
        userId: 2,
        status: "Ended",
        contestType: 0,
        currentTime: '2017-11-23 16:43:23',
        password: null,
        accountName: null,
        problemList: null,
        containProblems: [{
          id: 85,
          title: "Courses",
          remoteProblemId: "1083",
          url: "http://acm.hdu.edu.cn/showproblem.php?pid=1083",
          remoteOj: "HDU"
        }, {
          id: 1002,
          title: "ASCII码排序",
          remoteProblemId: "2000",
          url: "http://acm.hdu.edu.cn/showproblem.php?pid=2000",
          remoteOj: "HDU"
        }]
      },
      success: 1,
      msg: '',
    }
  } else {
    const res = await axios.get(`${serverIp}/contests/${cid}?password=${pwd}`);
    console.log(res.data)
    data = res.data;
  }
  return data;
}

export async function fetchContestQues(oj, id, cid, pwd) {
  let data;
  if (devMode) {
    await sleep(1000);
    data = {
      author: "",
      description: "<div class=\"panel_content\">Baby Ming likes to deal with pixel map in the following way:\n       <br /><br />First, converting the pixel map into binary image (recorded as 01), and then, in the binary figures, for each grid, add up the grid and its neighboring grids’ binary number, and store in matrix &lt;b&gt;$Mat$&lt;/b&gt;.\n       <br /><br />All the pictures Baby Ming chosen have a &lt;b&gt;blank upper margin and bottom margin&lt;/b&gt; (the value of which is 0 in the binary image), because he thinks such a picture is beautiful.\n       <br /><br />The matrix $Mat$ is so big that Baby Ming is worried about the mistakes in the matrix. So he wants to know whether the binary image can be regained according to the $Mat$.\n       <br /><br /><img style=\"max-width:100%;\" src=\"http://bestcoder.hdu.edu.cn/data/images/C664-1004-1.jpg\" /></div>",
      hint: "<pre>in the second sample, the matrix[1 0 0] is not Baby Ming's Matrix, so there is no answer</div><i style=\"font-size:1px\"></i></div></pre></div>",
      input: "<div class=\"panel_content\">In the first line contains a single positive integer $T$, indicating number of test case.\n       <br /><br />In the second line there are two numbers $n, m$, indicating the size of the binary image and the size of the matrix $Mat$\n       <br /><br />In the next $n$ lines, each line input m numbers, indicating the matrix $Mat$.\n       <br /><br />$1 \\leq T \\leq 30, 2 &lt; n \\leq 12, m \\leq 100$\n       <br /></div>",
      memoryLimit: "65536/65536 K (Java/Others)",
      output: "<div class=\"panel_content\">Print &lt;b&gt;Impossible&lt;/b&gt;, if it is impossible to regain the binary image.\n       <br /><br />Print &lt;b&gt;Multiple&lt;/b&gt;, if it has more than one result.\n       <br /><br />Otherwise, print the binary image (Baby Ming's 01 matrix)\n       <br /></div><div class=\"panel_bottom\">\n       &nbsp;\n      </div>",
      remoteOj: "HDU",
      remoteProblemId: "5613",
      sampleInput: "<div class=\"panel_content\"><pre><div style=\"font-family:Courier New,Courier,monospace;\">2\r\n4 4\r\n1 2 3 2\r\n2 3 4 2\r\n2 3 4 2\r\n1 1 1 0\r\n3 1\r\n1\r\n1\r\n0</div></pre></div>",
      sampleOutput: "<div class=\"panel_content\"><pre><div style=\"font-family:Courier New,Courier,monospace;\">0 0 0 0\r\n0 1 1 1\r\n0 1 0 0\r\n0 0 0 0\r\nImpossible</div></div>",
      source: "BestCoder Round #69 (div.2) ",
      timeLimit: "2000/1000 MS (Java/Others)",
      title: "Baby Ming and Binary image",
      url: "http://acm.hdu.edu.cn/showproblem.php?pid=5613"
    };
  } else {
    const res = await axios.get(`${serverIp}/contests/${cid}/${oj}/${id}?password=${pwd}`);
    console.log(res.data);
    data = res.data;
  }
  return data;
}

export async function createContest(values) {
  if (devMode) {
    return values;
  } else {
    const { data } = await axios.post(`${serverIp}/contests`, values);
    return data;
  }
}

export async function updateContest(values, cid) {
  if (devMode) {
    return values;
  } else {
    const { data } = await axios.post(`${serverIp}/contests/${cid}`, values);
    return data;
  }
}

export async function getContestRank(cid) {
  if (devMode) {
    let data = {
      problem: [{
        id: 1,
        acCount: 234,
        failCount: 147,
      }, {
        id: 2,
        acCount: 21,
        failCount: 47,
      }],
      rank: [{
        team: 'coo',
        score: 4,
        penalty: 97,
        problem: [{
          acTime: '01:06:47',
          failCount: 0,
        }, {
          acTime: '01:03:42',
          failCount: 2,
        }, {
          acTime: '-1',
          failCount: 4,
        }]
      }]
    }
    return data;
  } else {
    let { data } = await axios.get(`${serverIp}/contests/${cid}/rank`);
    if (data.success === 1) {
      let x = calculate(data.obj)
      console.log(x);
      // console.log(data)
      return {
        success: data.success,
        rank: x,
        listLength: data.obj.number
      };
    } else {
      return data;
    }
  }
}

function calculate({ parts, submit, length, number }) {
  var map = {};
  for (let id in parts) {
    map[id] = {
      acCount: 0,
      penalty: 0,
      problems: []
    };
    for (let i = 0; i < number; i++) {
      map[id].problems.push({
        time: -1,
        failCount: 0,
      })
    }
  }
  for (let i = 0; i < submit.length; i++) {
    let uid = submit[i][0];
    let index = submit[i][1];
    let isAC = submit[i][2];
    let acTime = submit[i][3];
    if (acTime > length) {
      continue;
    }
    if (map[uid].problems[index] !== undefined && map[uid].problems[index].time !== -1) {
      continue;//如果已经AC，time已经有值，提交无效
    }
    if (isAC === 1) {
      map[uid].problems[index].time = acTime;
      map[uid].acCount++;
      map[uid].penalty += (acTime + map[uid].problems[index].failCount * 20 * 60 * 1000);
    } else {
      map[uid].problems[index].failCount++;
    }
  }

  var rankArr = [];
  for (let id in map) {
    map[id].userId = id;
    map[id].accountName = parts[id];
    rankArr.push(map[id]);
  }
  rankArr.sort(function (a, b) {
    if (a.acCount > b.acCount || (a.acCount === b.acCount && a.penalty < b.penalty)) {
      return -1;
    }
    return 1;
  });
  rankArr.filter(item => {
    for (let i = 0; i < item.problems.length; i++) {
      let l = item.problems[i].time;
      if (l < 0) {
        item.problems[i].time = '';
        continue;
      }
      let h = parseInt(l / (1000 * 60 * 60), 10);
      let m = parseInt((l % (1000 * 60 * 60)) / (1000 * 60), 10);
      let s = parseInt((l % (1000 * 60)) / 1000, 10);
      item.problems[i].time = `${h}:${m}:${s}`;
    }
    return true;
  })
  return rankArr;
}