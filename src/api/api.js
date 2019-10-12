import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
const test = 'http://test.dlzjzy.com'
// const baseURL = '/api'
// const baseURL = '/'
// console.log(process.env.NODE_ENV === 'development' )
const service = axios.create({ //hg
		baseURL: process.env.NODE_ENV === 'development'?'/api':test+'/index.php',
    withCredentials: false,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// const service1 = axios.create({ //lw
// 	baseURL: process.env.NODE_ENV === 'development'?'/lw':test+':9220',
//     withCredentials: false,
//     headers: { 'Content-Type': 'application/json;charset=UTF-8' }
// })
// const service2 = axios.create({ //xb
// 	baseURL: process.env.NODE_ENV === 'development'?'/xb':test+':9220',
//     withCredentials: false,
//     headers: { 'Content-Type': 'application/json;charset=UTF-8' }
// })
// const service3 = axios.create({
// 	baseURL: process.env.NODE_ENV === 'development'?'/api':test+':9220',
//     withCredentials: false,
//     headers: { 'Content-Type': 'application/json;charset=UTF-8' }
// })
// const formser = axios.create({ //hg
// 	baseURL: process.env.NODE_ENV === 'development'?'/api':test+':9440',
// 	withCredentials: false,
// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// })
// const formser = axios.create({ //hg
// 	baseURL: '/api',
// 	withCredentials: false,
// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
// })

service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
			alert('网络错误，请稍后重试')
			return Promise.reject(error)
    }
)
// service1.interceptors.response.use(
// 	response => {
// 		return response
// 	},
// 	(error) => {
// 		alert('网络错误，请稍后重试')
// 		return Promise.reject(error)
// 	}
// )
// service2.interceptors.response.use(
// 	response => {
// 		return response
// 	},
// 	(error) => {
// 		alert('网络错误，请稍后重试')
// 		return Promise.reject(error)
// 	}
// )
// service3.interceptors.response.use(
// 	response => {
// 		return response
// 	},
// 	(error) => {
// 		alert('网络错误，请稍后重试')
// 		return Promise.reject(error)
// 	}
// )
// formser.interceptors.response.use(
// 	response => {
// 		return response
// 	},
// 	(error) => {
// 		alert('网络错误，请稍后重试')
// 		return Promise.reject(error)
// 		// console.log(
// 		// 	'fetch',
// 		// 	error.config.url,
// 		// 	error.config.params,
// 		// 	'error. error:',
// 		// 	error
// 		// )
// 		// return Promise.reject(error)
// 	}
// )
// export default service
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
			return service.post('/PageMaterialController/getMaterialsInfoByRecent',data)
		},
		get_bg_line(data) {
			return service.post('/PageMaterialController/getMaterialsInfoByAllCities',data)
		},
		get_area_line(data) {
			return service.post('/PageMaterialController/getMaterialsInfoByAllArea',data)
		},
		get_bg_pie(data) {
			return service.post('/PageMaterialController/getMaterialCount',data)
		},
		get_cate_num(data) {
			return service.post('/PageMaterialController/getMaterialCount',data)
		},
		//登录
		login (data) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/Passport/login',data)
		},
		// Api/Passport/checkUsername
		check_user(data){
			if(data) data = qs.stringify(data, { allowDots: true })
			// return service.post('/Api/Datas/index',data)
			return service.post('/Api/User/info',data)
		},
		// updata_user(data) {
		// 	if(data) data = qs.stringify(data, { allowDots: true })
		// 	return service.post('/PageUserController/updateUserInfo',data)
		// },
		// 退出登录
		user_logout(data){
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/Api/User/logout',data)
		},
		// 数据查询
    get_cate(data) {
			if(data) data = qs.stringify(data, {allowDots:true})
			return service.post('/Api/Datas/index', data)
		// return service.post('/PageMaterialController/getMaterialsClass', {})
		},
		// get_area_time_list(data,type) {
		get_area_time_list(data) {
			if(data) data = qs.stringify(data, { allowDots:true})
			return service.post('/Api/Datas/searchCategory',data)
			// if(type == 0) {
			// 	return service.post('/Api/Datas/searchCategory',data)
			// } else if(type==1) {
			// 	return service.post('/PageMaterialController/getMaterialsInfoByAreaQuarter',data)
			// } else {
			// 	return service.post('/PageMaterialController/getMaterialsInfoByAreaYear',data)
			// }
		},
		// get_cate_time_list(data,type) {
		get_cate_time_list(data) {
			if(data) data = qs.stringify(data, { allowDots:true})
			return service.post('/Api/Datas/searchCategory',data)
			// if(type == 0) {
			// 	return service.post('/PageMaterialController/getMaterialsInfoEncapsulation',data)
			// } else if(type==1) {
			// 	return service.post('/PageMaterialController/getMaterialsInfoByQuarter',data)
			// } else {
			// 	return service.post('/PageMaterialController/getMaterialsInfoByYear',data)
			// }
		},
		get_yn_time_list(data,type) {
			if(type == 0) {
				return service.post('/PageMaterialController/getMaterialsInfoByProvinceAreaEncapsulation',data)
			} else if(type==1) {
				return service.post('/PageMaterialController/getMaterialsInfoByProvinceAreaQuarter',data)
			} else {
				return service.post('/PageMaterialController/getMaterialsInfoByProvinceAreaYear',data)
			}
		},
    get_area(data={pid:53}) {
		return service.post('/PageAreaController/getAreaList', data)
    },
    // get_cate(data) {
		// 	if(data) data = qs.stringify(data, { allowDots: true })
		// 	return service.post('/Api/Datas/index', {})
		// // return service.post('/PageMaterialController/getMaterialsClass', {})
		// },
		//帮助
		get_help(data) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/pageHelperController/findHelperByPage', data)
		},
		get_help_detail(data) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return service.post('/pageHelperController/getArtInfo', data)
		},
    get_cate_data(data) {
		return service.post('/PageMaterialController/getMaterialsInfo',data)
	},
	get_area_data(data) {
		return service.post('PageMaterialController/getMaterialsInfoByArea', data)
	},
	// 报告备注
	get_markList(data) {
		// if(data) data = qs.stringify(data, { allowDots:true })
		return service.post('/PageReportRemarkController/findList', data)
	},
	add_mark(data){
		// if(data) data = qs.stringify(data, { allowDots:true })
		return service.post('/PageReportRemarkController/add', data)
	},
	delete_mark(data) {
		// if(data) data = qs.stringify(data, { allowDots:true})
		return service.post('/PageReportRemarkController/deleteRemark', data)
	},
	modify_mark(data) {
		return service.post('/PageReportRemarkController/updateRemark', data)
	},
	get_reports(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageReportController/findListByPage', data)
	},
	get_reports_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageReportController/getReportInfoById', data)
	},
	updata_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageReportController/updateReport', data)
	},
	add_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageReportController/addReport', data)
	},
	delete_report(data){
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageReportController/deleteReport', data)	
	},
	get_subscrib(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageSubscriptionController/findPage', data)
		// PageSubscriptionController
	},
	delete_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageSubscriptionController/delete',data)
	},
	sub_detail(data) {
		if(data) data = qs.stringify(data, { allowDots:true })
		return service.post('/PageSubscriptionController/getInfoById',data)
	},
	add_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageSubscriptionController/add',data)
	},
	get_help_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/pageHelperController/getArtInfo', data)
	},
	get_msg(data) {
		// if(data) data = qs.stringify(data, { allowDots: true })
		return service.post('/PageMessageController/getMessage', data)
	},
	delete_msg(data) {
		return service.post('/PageMessageController/delMessage', data)
	}
}

export default api