import axios from 'axios';

let SeverIp = 'http://172.22.1.105:8080';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchContestList(page) {
  await sleep(700);
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
  await sleep(1000);
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
  // await sleep(1000);
  const { data } = await axios.get(`${SeverIp}/problem/json?pid=${id}`);
  console.log(data);
  // let data = {
  //   author: "",
  //   description: "<div class=\"panel_content\">Baby Ming likes to deal with pixel map in the following way:\n       <br /><br />First, converting the pixel map into binary image (recorded as 01), and then, in the binary figures, for each grid, add up the grid and its neighboring grids’ binary number, and store in matrix &lt;b&gt;$Mat$&lt;/b&gt;.\n       <br /><br />All the pictures Baby Ming chosen have a &lt;b&gt;blank upper margin and bottom margin&lt;/b&gt; (the value of which is 0 in the binary image), because he thinks such a picture is beautiful.\n       <br /><br />The matrix $Mat$ is so big that Baby Ming is worried about the mistakes in the matrix. So he wants to know whether the binary image can be regained according to the $Mat$.\n       <br /><br /><img style=\"max-width:100%;\" src=\"http://bestcoder.hdu.edu.cn/data/images/C664-1004-1.jpg\" /></div>",
  //   hint: "<pre>in the second sample, the matrix[1 0 0] is not Baby Ming's Matrix, so there is no answer</div><i style=\"font-size:1px\"></i></div></pre></div>",
  //   input: "<div class=\"panel_content\">In the first line contains a single positive integer $T$, indicating number of test case.\n       <br /><br />In the second line there are two numbers $n, m$, indicating the size of the binary image and the size of the matrix $Mat$\n       <br /><br />In the next $n$ lines, each line input m numbers, indicating the matrix $Mat$.\n       <br /><br />$1 \\leq T \\leq 30, 2 &lt; n \\leq 12, m \\leq 100$\n       <br /></div>",
  //   memoryLimit: "65536/65536 K (Java/Others)",
  //   output: "<div class=\"panel_content\">Print &lt;b&gt;Impossible&lt;/b&gt;, if it is impossible to regain the binary image.\n       <br /><br />Print &lt;b&gt;Multiple&lt;/b&gt;, if it has more than one result.\n       <br /><br />Otherwise, print the binary image (Baby Ming's 01 matrix)\n       <br /></div><div class=\"panel_bottom\">\n       &nbsp;\n      </div>",
  //   remoteOj: "HDU",
  //   remoteProblemId: "5613",
  //   sampleInput: "<div class=\"panel_content\"><pre><div style=\"font-family:Courier New,Courier,monospace;\">2\r\n4 4\r\n1 2 3 2\r\n2 3 4 2\r\n2 3 4 2\r\n1 1 1 0\r\n3 1\r\n1\r\n1\r\n0</div></pre></div>",
  //   sampleOutput: "<div class=\"panel_content\"><pre><div style=\"font-family:Courier New,Courier,monospace;\">0 0 0 0\r\n0 1 1 1\r\n0 1 0 0\r\n0 0 0 0\r\nImpossible</div></div>",
  //   source: "BestCoder Round #69 (div.2) ",
  //   timeLimit: "2000/1000 MS (Java/Others)",
  //   title: "Baby Ming and Binary image",
  //   url: "http://acm.hdu.edu.cn/showproblem.php?pid=5613"
  // };
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
  await axios.post(`${SeverIp}/problem/submit`,{
    ...values,
  });
}