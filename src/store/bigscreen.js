export default {
    namespaced: true,
    state:{
        cate_on:{},
        cate_list:[],
        sys_title:'',
        what_time:'',
        what_name:'',
        areacount:0,
        allcount:0,
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
        },
        SET_DISPLAY_NAME(state,data){
            state.what_name = data
        },
        SET_DISPLAY_AREA_COUNT(state,data){
            state.areacount = data
        },
        SET_DISPLAY_ALL_COUNT(state,data){
            state.allcount = data
        }
    }
}