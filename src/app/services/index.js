import axios from 'axios';

export async function aaa() {
  const {err,data} = await axios.get('http://localhost:3025/Analy_x?action=2&url=http://www.xs.la/34_34495/2266828.html',{
    headers:{
      'Access-Control-Allow-Origin':'*',
    }
  });
  
  return data;
}