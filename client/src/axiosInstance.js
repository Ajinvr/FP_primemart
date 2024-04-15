// axiosInstance.js

import axios from 'axios';
import { authuser } from './redux/features/authSlice';
import {useDispatch} from 'react-redux'
// const instance = axios.create({
//   baseURL: 'http://192.168.1.37:5000',
// });

// export default instance;
// import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.37:5000',
});


instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
        const dispatch = useDispatch();
        let authstate = {isAuthenticated:false}
        dispatch(authuser(authstate));
        localStorage.clear()
      console.log("Unauthorized access. Please log in");
    }
    return Promise.reject(error);
  }
);

export default instance;
