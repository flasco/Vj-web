import axios from 'axios';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchList(page) {
  await sleep(1000);
  let data = [{
    proId: '1000',
    title: 'A + B Problem',
    ratio: '30.87%(220395/713855)',
  }, {
    proId: '1001',
    title: 'Sum Problem',
    ratio: '25.36%(129232/509626)',
  }, {
    proId: '1002',
    title: 'A + B Problem II',
    ratio: '19.36%(74637/385502)',
  }, {
    proId: '1003',
    title: 'Max Sum',
    ratio: '23.77%(62287/262089)',
  }, {
    proId: '1004',
    title: 'Let the Balloon Rise',
    ratio: '39.50%(51308/129882)',
  }, {
    proId: '1005',
    title: 'Number Sequence',
    ratio: '24.88%(45648/183443)',
  }, {
    proId: '1006',
    title: 'A + B Problem',
    ratio: '30.87%(220395/713855)',
  }, {
    proId: '1007',
    title: 'Sum Problem',
    ratio: '25.36%(129232/509626)',
  }, {
    proId: '1008',
    title: 'A + B Problem II',
    ratio: '19.36%(74637/385502)',
  }, {
    proId: '1009',
    title: 'Max Sum',
    ratio: '23.77%(62287/262089)',
  }, {
    proId: '1010',
    title: 'Let the Balloon Rise',
    ratio: '39.50%(51308/129882)',
  }, {
    proId: '1011',
    title: 'Number Sequence',
    ratio: '24.88%(45648/183443)',
  }];

  data = data.slice(10 * (page - 1), 10 * page);
  return {
    totalCount: 11,
    results: data,

  };
}