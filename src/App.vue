<template>
	<div id="app" v-title data-title="云南省建设工程材料及设备价格监测系统" v-loading="loading">
		<el-container class="el-container" style="background-color:#F6F7FE">
            <el-header class='header'>
                <div class='left'>
                    <img src='../public/img/loginlogo.png'>
                    <p>云南省建设工程材料及设备价格监测系统</p>
					<div class='nav'>
						<div :class='route == "/ref"?"act":""' @click='$router.push("/ref")'>
							<i class='c'></i>
							<p>数据查询</p>
						</div>
						<div :class='route == "/reportIndex" || route == "/reportIndex/reportDetail"?"act":""' @click='$router.push("/reportIndex")'>
							<i class='c1'></i>
							<p>智能报告</p>
						</div>
					</div>
                </div>
                <div class='right'>
                    <p @click='$router.push("/")'>返回首页</p>
                    <i></i>
					<!-- {{token&&token.length>0?'设置中心':'登录'}} -->
                    <p class='blue' @mouseenter="show=true" @mouseleave="show=false">{{userid?'设置中心':'登录'}}</p>
					<!-- @mouseleave="show=false" -->
					<div class='set' v-show='show' @mouseenter="show=true" @mouseleave="show=false">
						<p @click='goset'>账户信息</p>
						<p @click='logout'>退出登录</p>
					</div>
                </div>
            </el-header>
            <el-container style='min-height:100%;height:auto;flex-direction:column;overflow:auto;'>
				<!-- height:100%;max-height:100%; -->
				<router-view></router-view>
            </el-container>
			<el-footer style="background:#F6F7FE;"><!-- :style="route.name == 'ref'?'margin-top:72px;border:1px green solid':''"	 -->
				<p class='ba'>主办：云南省住建厅科技与标准定额处&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;承办：云南省工程建设技术经济室&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;数据及技术支持：昆明行列科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;联系电话：0871-6818404</p>
				<p class='ba'>滇公网安备 5301110011230  备案编号：滇ICP备16100321号  Copyright 2018-2019 版权所有 昆明行列科技有限公司</p>
			</el-footer>
        </el-container>
		<el-dialog title="账户信息" :visible.sync="dialogVisible" width="480px" class="userInfoBox">
			<el-form :model="formInline" style='width:86%;padding:30px 0 0 40px;box-sizing:border-box' label-width="42px">
				<el-form-item label="账号">
					<el-input v-model="formInline.username" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="formInline.name" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="单位">
					<el-input v-model="formInline.unit" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="formInline.phone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="formInline.email" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="地区">
					<el-input v-model="formInline.location" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<!-- @click="save" -->
				<el-button type="primary" @click="save">确定</el-button>
				<!-- <el-button @click="dialogVisible= false">取消</el-button> -->
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {datawork} from './plugins/datawork.js'
import { getToken } from './plugins/gettoken'
export default {
	name: 'app',
	data() {
        return {
            navList: [
                // {
                //     name: '我的首页',
                //     icon: 'iconshouye',
                //     router: '/'
                // }, 
                {
                    name: '数据查询',
                    icon: 'icon-shuju',
                    router: '/ref'
                }, {
                    name: '智能报告',
                    icon: 'icon-baogaoshoucang',
                    router: '/reportIndex'
				}, 
				// {
                //     name: '数据订阅',
                //     icon: 'icon-dingyue',
                //     router: '/dataIndex'
				// }, 
				// {
                //     name: '帮助中心',
                //     icon: 'icon-bangzhu',
                //     router: '/help'
				// }, 
				{
                    name: '账户设置',
                    icon: 'icon-setting',
                    router: '/setting'
                }
            ],
			mainHeight: 0,
			defaultimg:'this.src="'+ require('../public/img/head.png') +'"',
			show:false,
			dialogVisible:false,
			formInline:{},
			navi:'',
			ip_addre:'',
			random16:'',
			random15:'',
			// unicode:'',
			userid1:0,
			tt:'',
			commonData:{},
			loading:false,
        };
	},
	computed:{
		user() {
			return this.$store.state.login.userInfo
		},
		userid() {
			return this.$store.state.login.userid
		},
		route() {
			return this.$route.path
		}
	},
	watch: {
		user:{
			handler(val) {
			},
			deep:true
		},
		route(val) {
		}
	},
	created() {
		let data = {}
		let finaldata
		let uniquecode = localStorage.getItem('uniquecode')
		this.userid1 = localStorage.getItem('userid')
		const user = JSON.parse(localStorage.getItem('user'))
		// 先查看是否有用户信息存在（userid为0时，表示用户没有没有登录），如果存在就存储用户信息，如果不存在就将存储的值设置为空
        if(this.userid1 && user && user.username) {
			this.$store.commit('login/SET_USER_ID', this.userid1)
			this.$store.commit('login/SET_USER_INFO', user)
        } else {
            this.$store.commit('login/SET_USER_ID', '')
			this.$store.commit('login/SET_USER_INFO', '')
			this.userid1 = 0
            localStorage.removeItem('userid')
			localStorage.removeItem('user')
			//在没有登录的情况下，去往除首页以外的其他页面都会先跳转到登录页面。
			if(this.$route.path == '/') {
			} else {
				this.$router.push('/login')
			}	
		}
		// 获取浏览器信息
		this.navi = navigator.userAgent
		// 获取ip地址
		this.ip_addre = returnCitySN["cip"]
		// 获取16位的随机数(nonce_str)
		this.random16 = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
		// 获取15位的随机数(unique_code),将会与clinent_id一起保存，二者是同步的
		// 将客户端唯一身份码存储在本地
		this.random15 = new Date().getTime() + "" + Math.floor(Math.random()*89 +10)
		if(uniquecode && uniquecode.length > 0){
			this.$store.commit('login/SET_UNIQUE_CODE',uniquecode)
			localStorage.setItem('uniquecode',uniquecode)
		}else{
			uniquecode = this.random15
			localStorage.setItem('uniquecode',this.random15)
			this.$store.commit('login/SET_UNIQUE_CODE',this.random15)
		}
		// 获取10位时间戳(秒级,timestamp)
		this.tt = Math.round(new Date().getTime() / 1000).toString()
		// 定义并存储公共参数
		this.commonData = {
			agent:this.navi,
			appid:'hlwpfc86b1f482c5f9',
			charset:'utf-8',
			format:'JSON',
			ip:this.ip_addre,
			sign_type:'md5',
			unique_code:uniquecode,
			version:'2.0',
		}
		this.$store.commit('login/SET_COMMON_PARAM', this.commonData)
		localStorage.setItem('commonParam',this.commonData)
		for(var i in this.commonData){
			data[i] = this.commonData[i]
		}
		data.nonce_str = this.random16
		data.user_id = this.userid1
		data.timestamp = this.tt
		finaldata = datawork(data)
		if(localStorage.getItem('clientid') && localStorage.getItem('clientid').length > 0 && 
		localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){

		}else{
			this.$api.get_client(finaldata).then(v => {
				if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
					localStorage.setItem('clientid',v.data.data.client_id)
					this.$store.commit('login/SET_CLIENT_ID', v.data.data.client_id)
					localStorage.setItem('accesstoken',v.data.data.access_token)
					this.$store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
				}else{
					console.log('未成功')
				}
			})
		}
	},
	mounted() {
		// console.log(this.$store.state.login.commonParam)
		// 以下注释掉的部分是获取浏览器的信息
		// var NV = {};    
		// var UA = navigator.userAgent.toLowerCase();
		// console.log(UA)
		// try    
		// {    
		// 	NV.name=!-[1,]?'ie':    
		// 	(UA.indexOf("firefox")>0)?'firefox':    
		// 	(UA.indexOf("chrome")>0)?'chrome':    
		// 	window.opera?'opera':    
		// 	window.openDatabase?'safari':  
		// 	'unkonw';    
		// }catch(e){};    
		// try    
		// {    
		// 	NV.version=(NV.name=='ie')?UA.match(/msie ([\d.]+)/)[1]:    
		// 	(NV.name=='firefox')?UA.match(/firefox\/([\d.]+)/)[1]:    
		// 	(NV.name=='chrome')?UA.match(/chrome\/([\d.]+)/)[1]:    
		// 	(NV.name=='opera')?UA.match(/opera.([\d.]+)/)[1]:    
		// 	(NV.name=='safari')?UA.match(/version\/([\d.]+)/)[1]:    
		// 	'0';    
		// }catch(e){};    
		// try    
		// {    
		// 	NV.shell=(UA.indexOf('360ee')>-1)?'360极速浏览器':    
		// 	(UA.indexOf('360se')>-1)?'360安全浏览器':    
		// 	(UA.indexOf('se')>-1)?'搜狗浏览器':    
		// 	(UA.indexOf('aoyou')>-1)?'遨游浏览器':    
		// 	(UA.indexOf('theworld')>-1)?'世界之窗浏览器':    
		// 	(UA.indexOf('worldchrome')>-1)?'世界之窗极速浏览器':    
		// 	(UA.indexOf('greenbrowser')>-1)?'绿色浏览器':    
		// 	(UA.indexOf('qqbrowser')>-1)?'QQ浏览器':    
		// 	(UA.indexOf('baidu')>-1)?'百度浏览器':    
		// 	'未知或无壳';    
		// }catch(e){}    
		// console.log('浏览器UA='+UA+    
		// '\n\n浏览器名称='+NV.name+    
		// '\n\n浏览器版本='+parseInt(NV.version)+    
		// '\n\n浏览器外壳='+NV.shell)   

	},
	methods:{
		logout() {
			let data0 = {}
			let data1
			let commondata = {}
			if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
				commondata = this.$store.state.login.commonParam
			}else{
				commondata = this.commonData
			}
			for(var i in commondata){
				data0[i] = commondata[i]
			}
			data0.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
			if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
				data0.user_id = localStorage.getItem('userid')
			}else{
				data0.user_id = 0
			}
			data0.timestamp = Math.round(new Date().getTime() / 1000).toString()
			data0.client_id = localStorage.getItem('clientid')
			data0.access_token = localStorage.getItem('accesstoken')
			data1 = datawork(data0)
			this.$confirm('确定要退出登录吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.loading = true
				this.$api.user_logout(data1).then(v => {
					if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
						this.loading = false
						this.$store.commit('login/SET_USER_ID', '')
						this.$store.commit('login/SET_USER_INFO', '')
						localStorage.removeItem('userid')
						localStorage.removeItem('user')
						this.$router.push('login')
					}else if(v.data.errcode == 1104){
						let that = this
						getToken(commondata)
						setTimeout(function(){
							if(localStorage.getItem('tokenDone')){
								that.logout()
							}else{
								this.$message({
									type:'error',
									message:'异常，请稍候重试！'
								})
							}  
						},1000)
					}else{
						this.$message({
							type:'error',
							message:'退出失败，请刷新重试！'
						})
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				});
			});
		},
		hh() {
			// if(this.token&&this.token.length>0) {
			// 	this.show = !this.show
			// } else {
			// 	this.$router.push('/login')
			// }
			if(this.userid&&this.userid.length>0) {
				this.show = !this.show
			} else {
				this.$router.push('/login')
			}
		},
		goset() {
			let data2 = {}
			let commonparam = {}
			let data3
			if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
				commonparam = this.$store.state.login.commonParam
			}else{
				commonparam = this.commonData
			}
			for(var i in commonparam){
				data2[i] = commonparam[i]
			}
			data2.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
			if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
				data2.user_id = localStorage.getItem('userid')
			}else{
				data2.user_id = 0
			}
			data2.timestamp = Math.round(new Date().getTime() / 1000).toString()
			if(localStorage.getItem('clientid') && localStorage.getItem('clientid').length > 0 
			&& localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
				data2.client_id = localStorage.getItem('clientid')
				data2.access_token = localStorage.getItem('accesstoken')
			}
			data3 = datawork(data2)
			this.$api.check_user(data3).then(v => {
				if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
					this.formInline = {
						username:v.data.data.username,
						name:v.data.data.realname,
						unit:v.data.data.company,
						phone:v.data.data.mobile,
						email:v.data.data.email,
						location:v.data.data.area_name
					}
					this.dialogVisible = true
				}else if(v.data.errcode == 1104){
					// token失效的情况下，重新获取token
					let that = this
					getToken(commonparam)
					setTimeout(function(){
						if(localStorage.getItem('tokenDone')){
							that.goset()
						}else{
							this.$message({
								type:'error',
								message:'异常，请稍后重试！'
							})
						}  
					},1000)
				}else{
					this.$message({
						type:'error',
						message:'异常，请稍后重试！'
					})
				}
			})
		},
		save(){
			this.dialogVisible =  false
		}
	}
}
</script>

<style lang='stylus'>
	@import './style/color.stylus'
	#app 
		height 100%
		background-color #F6F7FE
	.el-container
		height 100%
		background-color #F6F7FE
		padding 0
	.header
		width 100%
		display flex
		justify-content space-between
		align-items center
		padding 0 77px 0 30px !important
		background #fff
		height 78px !important
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.1)
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.1)
		position fixed
		z-index 999
		.left 
			display flex
			align-items center
			height 100%
			img 
				height 34px
				margin-right 6px
			p 
				font-size 18px
				font-weight bold
				color font-color-black
			.nav
				display flex
				align-items center
				height 100%
				margin-left 105px
				div:hover
					background #f6f7fe
					border-bottom 2px solid #f6f7fe
					p 
						color #2c2d33
					.c 
						background url('../public/img/数据黑.png') no-repeat
						background-size 100% 100%
					.c1 
						background url('../public/img/报告黑.png') no-repeat
						background-size 100% 100%
				div
					text-align center
					width 100px
					height 100%
					border-bottom 2px solid #fff
					box-sizing border-box
					padding 15px 0 10px 0
					cursor pointer
					margin-right 10px
					.c 
						background url('../public/img/数据灰色.png') no-repeat
						background-size 100% 100%
					.c1 
						background url('../public/img/报告灰.png') no-repeat
						background-size 100% 100%
				
				i 
					width 32px
					margin 0
					display block
					height 34px
					margin 0 auto
				
				p
					font-size 14px
					font-weight 400
					color #8E9099
				.act,.act:hover
					background #F6F7FE
					border-bottom 2px solid #635EF9
					.c 
						background url('../public/img/数据选中.png') no-repeat
						background-size 100% 100%
					.c1 
						background url('../public/img/报告选中.png') no-repeat
						background-size 100% 100%
					p 
						color #635EF9
		.right 
			display flex
			align-items center
			position relative
			p 
				font-size 14px
				font-weight 400
				color #8E9099
				cursor pointer
			i 
				display block
				width 1px
				height 14px
				background rgba(102,102,102,1)
				margin 0 16px
			.blue 
				color #7F94FF
				line-height 28px
			.set
				position absolute
				top 22px
				left 55px
				width 120px
				background #fff
				border 1px solid rgba(237,240,242,1)
				box-shadow 0px 6px 10px 0px rgba(70,74,78,0.12)
				border-radius 4px
				color #8E9099
				font-size 14px
				text-align center
				line-height 42px
				p:hover
					background #EFF2FC
					color #637CFB
</style>
<style lang="stylus">
// .accoutInfo
#app .el-dialog__footer .el-button.el-button--primary
	width 56px
	height 32px
	background #66b1ff
	padding 0
	border none
	text-align center
	
</style>
