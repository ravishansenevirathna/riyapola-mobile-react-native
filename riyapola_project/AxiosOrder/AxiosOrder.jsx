import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let cachedToken = null;
let cachedId = null;

const instance = axios.create({
  baseURL: 'http://172.20.10.2:8080',
  headers: {
    Authorization: cachedToken ? `Bearer ${cachedToken}` : '',
  },
});



instance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('stmToken');
      const cusId = await AsyncStorage.getItem('cusId');
      cachedToken = token;
      cachedId = cusId;
      config.headers.Authorization = `Bearer ${cachedToken}`;
      console.log('Token ' + cachedToken);
      console.log('id ' + cachedId);

    } catch (error) {
      // Handle AsyncStorage errors
    }
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  },
);

export default instance;
