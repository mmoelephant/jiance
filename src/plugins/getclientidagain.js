import {datawork} from './datawork.js'
import api from '../api/api'
import $store from '../store/store'
export function getCilentId(data){
    console.log(data)
    let getClientData,getClientData2,uniquecode
    getClientData = data
    for(var i in getClientData){
        if(i == 'access_token'){
            delete getClientData[i]
        } else if(i == 'client_id') {
            delete getClientData[i]
        } else if(i == 'password') {
            delete getClientData[i]
        } else if(i == 'username') {
            delete getClientData[i]
        } else if(i == 'unique_code') {
            delete getClientData[i]
        } else if(i == 'timestamp') {
            delete getClientData[i]
        } else if(i == 'nonce_str') {
            delete getClientData[i]
        }
    }
    getClientData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
    if(localStorage.getItem('userid')){
        getClientData.user_id = localStorage.getItem('userid')
    }else{
        getClientData.user_id = 0
    }
    if(localStorage.getItem('uniquecode')){
        console.log(localStorage.getItem('uniquecode'))
        uniquecode = localStorage.getItem('uniquecode')
    }else{
        uniquecode = new Date().getTime() + "" + Math.floor(Math.random()*89 +10)
    }
    getClientData.unique_code = uniquecode
    localStorage.setItem('uniquecode',uniquecode)
    $store.commit('login/SET_UNIQUE_CODE',uniquecode)
    getClientData.timestamp = Math.round(new Date().getTime() / 1000).toString()
    getClientData2 = datawork(getClientData)
    api.get_client(getClientData2).then(v => {
        if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
            console.log(v.data.data.client_id)
            console.log('在插件里面重新获取了client_id')
            localStorage.setItem('clientid',v.data.data.client_id)
            $store.commit('login/SET_CLIENT_ID', v.data.data.client_id)
            localStorage.setItem('accesstoken',v.data.data.access_token)
            $store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
            localStorage.setItem('done',true)
        }else{
            localStorage.setItem('done',false)
        }
    }) 
}