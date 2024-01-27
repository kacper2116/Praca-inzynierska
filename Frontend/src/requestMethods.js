import axios from "axios";

const BASE_URL = "http://localhost:5000/api"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTBmMjgxYTU1MWRjOTViNDhmNWY0NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjEzNDQyNywiZXhwIjoxNzAyMzkzNjI3fQ.gokkvnBIU6l0onq1YIrK0kh2iE3Q7VtKc0fIdHAWzkM"

export const publicRequest = axios.create({
    baseURL: BASE_URL,

})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    //header: {token: `Bearer ${TOKEN}`}
    
})

userRequest.interceptors.request.use(config => {
    
    config.headers.Authorization = `Bearer ${TOKEN}`;
    return config;
});