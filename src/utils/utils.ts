import axios from 'axios';

// const token = {
// 	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwic3ViIjoiYmFlMGNkYzQtZWQ1Ny00ODViLWIxYWYtZGU4MjY0N2YwMzI3IiwiaWF0IjoxNjgyMjk0NDUxLCJleHAiOjE2ODIyOTgwNTF9.CWzi2pKH-5czzi8UL9h3KTFHpPfxNF9Gbnicjzb3n8o"
// }
const LOCAL_STORAGE_KEY = 'SaveProjectsToken';

const token = localStorage.getItem(LOCAL_STORAGE_KEY);
console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
console.log(token);
console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');


export const axiosAuthApi = axios.create({
  // baseURL: `${process.env.API_URL}`,
  baseURL: `http://localhost:3333`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

export const axiosApi = axios.create({
   // baseURL: `${process.env.API_URL}`,
   baseURL: `http://localhost:3333`,
   headers: {
     'Access-Control-Allow-Origin': '*',
     'Authorization': `Bearer ${token}`
   },
 });
