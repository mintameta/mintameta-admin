import axios from 'axios'
import qs from 'qs'
import localStore from './localstorage.js';
window.axiosCancel = []

axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    //添加取消标记
    config.cancelToken = new axios.CancelToken(cancel => {
        window.axiosCancel.push({
            cancel
        })
    })
    return config;
},(error) =>{
    //console.log('Params Error')
    return Promise.reject(error);
});

axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    //console.log('Network Error')
    return Promise.reject(error);
});

export function fetchCancel() {
    let cancelArr = window.axiosCancel;
    cancelArr.forEach((ele,index)=>{
        ele.cancel("axios cancel")  //
        delete window.axiosCancel[index]
        //console.log('axios cancel',ele,index)
    })
}

export  function fetchPost(url, params, baseURL) {
    // if (store.state.HeaderItems.accounts.length <=0) {
    //   store.commit('setKey', {key: 'HeaderItems', value: {loginShow: true}})
    //   return
    // }
    if (token != '' && token != undefined && token != null){
        var token = token;
    } else {
        var token = localStore.fetch('index_token');
    }
    // //console.log(111);
    // //console.log(token);
    axios.defaults.timeout = 10000;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    axios.defaults.headers.post['Authorization'] = 'Bearer ' + token;
    axios.defaults.baseURL = baseURL;

    return new Promise((resolve, reject) => {
        fetchCancel()
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export  function fetchGet(url, param, baseURL) {
    // if (store.state.HeaderItems.accounts.length <=0) {
    //   store.commit('setKey', {key: 'HeaderItems', value: {loginShow: true}})
    //   return
    // }
    if (token != '' && token != undefined && token != null){
        var token = token;
    } else {
        var token = localStore.fetch('index_token');
    }
    // //console.log(111);
    // //console.log(token);
    axios.defaults.timeout = 10000;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    axios.defaults.headers.post['Authorization'] = 'Bearer ' + token;
    axios.defaults.baseURL = baseURL;

    return new Promise((resolve, reject) => {
        fetchCancel()
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
