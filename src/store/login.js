export default {
    namespaced: true,
    state:{
        token:'',
        userInfo:{},
        commonParam:'',
        userid:'',
        uniquecode:'',
        clientid:'',
        accesstoken:'',
        map:{id:'53'}
    },
    mutations:{
        SET_TOKEN(state, data) {
            state.token = data
        },
        SET_USER_INFO(state, data) {
            state.userInfo = data
        },
        SET_USER_ID(state, data) {
            state.userid = data
        },
        SET_UNIQUE_CODE(state,data){
            state.uniquecode = data
        },
        SET_COMMON_PARAM(state,data){
            state.commonParam = data
        },
        SET_CLIENT_ID(state,data){
            state.clientid = data
        },
        SET_ACCESS_TOKEN(state,data){
            state.accesstoken = data
        },
        SET_MAP(state, data) {
            state.map = data
        }
    }
}