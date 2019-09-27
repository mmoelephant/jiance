import {datawork} from './datawork.js'
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
    return getTokenData2
}