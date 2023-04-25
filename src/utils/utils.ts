import axios from 'axios';

const LOCAL_STORAGE_KEY = 'SaveProjectsToken';

const token = localStorage.getItem(LOCAL_STORAGE_KEY);


export const axiosAuthApi = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

export const axiosApi = axios.create({
   baseURL: `${import.meta.env.VITE_API}`,
   headers: {
     'Access-Control-Allow-Origin': '*',
     'Authorization': `Bearer ${token}`
   },
 });

 export const axiosZipCode = axios.create({
  baseURL: `${import.meta.env.VITE_ZIP}`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});