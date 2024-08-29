import axios from 'axios';
// const axiosServices = axios.create();

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
// );

// export default axiosServices;

const getAuthFromLocalHost = ()=>{
  const auth = localStorage.getItem("serviceToken")
  return  auth || ""
}

const axiosServices = axios.create({
  baseURL:"http://192.168.1.108/api/account/login",
  headers:{
      Authorization:`Bearer ${getAuthFromLocalHost()}`,
      "Content-Type":"application/json"
  }

});


export default axiosServices;