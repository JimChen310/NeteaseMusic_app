import axios from 'axios'

let service = axios.create({    // 创建一个 axios实例
    baseURL: 'http://localhost:3000/',  // 设置基础路径
    timeout: 5000, 
    withCredentials: true
})

export default service