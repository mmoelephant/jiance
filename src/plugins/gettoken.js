import {datawork} from './datawork.js'
import api from '../api/api'
import $store from '../store/store'

export function getToken(data){
    let getTokenData,getTokenData2
    for(var i in data){
        getTokenData[i] = data[i] 
    }
    getTokenData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
    getTokenData.timestamp = Math.round(new Date().getTime() / 1000).toString()
    getTokenData.unique_code = localStorage.getItem('uniquecode')
    getTokenData.client_id = localStorage.getItem('clientid')
    if(localStorage.getItem('userid')){
        getTokenData.user_id = localStorage.getItem('userid')
    }else{
        getTokenData.user_id = 0
    }
    getTokenData2 = datawork(getTokenData)
    api.get_token(getTokenData2).then(v => {
        if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
            localStorage.setItem('accesstoken',v.data.data.access_token)
            $store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
            localStorage.setItem('tokenDone',true)
        }else{
            localStorage.setItem('tokenDone',false)
        }
    })
}