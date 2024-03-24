import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let cachedToken = null;

const instance = axios.create({
  baseURL: 'http://192.168.1.178:8080',
  headers: {
    Authorization: cachedToken ? `Bearer ${cachedToken}` : '',
  },
});

instance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('stmToken');
      cachedToken = token;
      config.headers.Authorization = `Bearer ${cachedToken}`;
      console.log('Token ' + cachedToken);
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
