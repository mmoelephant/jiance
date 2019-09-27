import {datawork} from './datawork.js'
// import context from '../main.js'
// import api from './api/api.js'
// Vue.prototype.$api = api
export function getCilentId(data){
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
    uniquecode = new Date().getTime() + "" + Math.floor(Math.random()*89 +10)
    getClientData.unique_code = uniquecode
    localStorage.setItem('uniquecode',uniquecode)
    this.$store.commit('login/SET_UNIQUE_CODE',uniquecode)
    getClientData.timestamp = Math.round(new Date().getTime() / 1000).toString()
    getClientData2 = datawork(getClientData)
    return getClientData2
    // context.$api.get_client(getClientFinal).then(v => {
    //     console.log(v)
    // })
}