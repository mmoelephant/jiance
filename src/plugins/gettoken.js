import {datawork} from './datawork.js'
import api from '../api/api'
import $store from '../store/store'

export function getToken(data){
    let getTokenData,getTokenData2
    getTokenData = data
    for(var i in getTokenData){
        if(i == 'access_token'){
            delete getTokenData[i]
        }else if(i == 'password') {
            delete getTokenData[i]
        } else if(i == 'username') {
            delete getTokenData[i]
        }else if(i == 'timestamp') {
            delete getTokenData[i]
        } else if(i == 'nonce_str') {
            delete getTokenData[i]
        }
    }
    getTokenData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
    getTokenData.timestamp = Math.round(new Date().getTime() / 1000).toString()
    getTokenData2 = datawork(getTokenData)
    // return getTokenData2
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