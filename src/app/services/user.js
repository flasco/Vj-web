/**
 * 这里是user的接口访问。
 * created by flasco at 2017-11-24
 */

import axios from 'axios';
import sleep from '../utils/sleep';
import config from '../../config';

const { devMode,serverIp } = config;

axios.defaults.withCredentials=true