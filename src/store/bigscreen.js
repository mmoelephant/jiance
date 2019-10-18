export default {
    namespaced: true,
    state:{
        cate_on:{},
        cate_list:[],
        sys_title:'',
        what_time:''
    },
    mutations:{
        SET_CATE_ON(state, data) {
            state.cate_on = data
        },
        SET_CATE_LIST(state, data) {
            state.cate_list = data
        },
        SET_SYSTEM_TITLE(state,data){
            state.sys_title = data
        },
        SET_DISPLAY_TIME(state,data){
            state.what_time = data
        }
    }
}