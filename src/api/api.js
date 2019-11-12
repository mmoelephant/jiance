import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
// const test = 'http://test.dlzjzy.com'
const test = 'http://nindex.ynbzde.com'
const service = axios.create({ //hg
		baseURL: process.env.NODE_ENV === 'development'?'/api':test+'/index.php',
    withCredentials: false,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
			alert('网络错误，请稍后重试')
			return Promise.reject(error)
    }
)
const api = {
		get_client(data){
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/Access/client',data)
		},
		get_token(data){
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/Access/token',data)
		},
		//大屏接口
		get_cate_level1(data={}) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/Index/index',data)
		},
		//登录
		login (data) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/Passport/login',data)
		},
		check_user(data){
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/User/info',data)
		},
		// 退出登录
		user_logout(data){
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/User/logout',data)
		},
		// 数据查询
    get_cate(data) {
			if(data) data = qs.stringify(data, {allowDots:true})
			return service.post('/Api/Datas/index', data)
		},
		get_area_time_list(data) {
			if(data) data = qs.stringify(data, { allowDots:true})
			return service.post('/Api/Datas/searchCategory',data)
		},
		get_cate_time_list(data) {
			if(data) data = qs.stringify(data, { allowDots:true})
			return service.post('/Api/Datas/searchArea',data)
		},
		// 报告
		get_report_left(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/left',data)
		},
		get_report_new_type(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/addBefore',data)
		},
		create_new_report(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/add',data)
		},
		get_report_all(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/index',data)
		},
		get_report_list(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/search',data)
		},
		delete_report(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/delete',data)
		},
		get_report_detail(data){
			if(data) data = qs.stringify(data,{allowDots:true})
			return service.post('/Api/Report/detail',data)
		}
}

export default api