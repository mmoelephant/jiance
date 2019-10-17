<template>
	<div class="home">
		<div class='b-t'>
			<div class='bt-content'>
				<div>
					<img src='../../public/img/logob.png'/>
					<!-- <p>云南省建设工程材料及设备价格监测系统</p> -->
					<p>{{sysTitle}}</p>
				</div>
				<p class='s' @click='$router.push("/ref")'>进入工作台 ENTER</p>
			</div>
			<div class='bt-line'>
				<i class='cut'></i>
				<i class='light'></i>
			</div>
		</div>
		<div class='content'>
			<left></left>
			<center></center>
			<rigth></rigth>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

//import "echarts/lib/chart/line"
import left from '../components/big-left'
import center from '../components/center'
import rigth from '../components/big-right'
import {datawork} from '../plugins/datawork.js'
import {getToken} from '../plugins/gettoken.js'
export default {
	data(){
		return {
			sysTitle:''
		}
	},
	created(){
		// console.log(this.$store.state.login.commonParam)
		// let data = {}
        // let commondata = {}
        // let data2 = {}
        // if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
        //     commondata = this.$store.state.login.commonParam
        // }
        // for(var i in commondata){
        //     data[i] = commondata[i]
        // }
        // data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
        // if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
        //     data.user_id = localStorage.getItem('userid')
        // }else{
        //     data.user_id = 0
        // }
        // data.timestamp = Math.round(new Date().getTime() / 1000).toString()
        // data.client_id = localStorage.getItem('clientid')
        // data.access_token = localStorage.getItem('accesstoken')
        // if(this.areaid){
        //     data.areas = this.areaid
        // }else{
        //     data.areas = 53
		// }
		// data2 = datawork(data)
		// console.log(data)
		// console.log(data2)
        // this.$api.get_cate_level1(data2).then(v => {
		// 	console.log(v)
		// 	if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
		// 		this.sysTitle = v.data.data.title
		// 	}
        // })
	},
	components: {
		left,
		center,
		rigth
	},
	methods:{
		
	},
	mounted() {
		const that = this
		document.onkeydown = function(e) {
			var keycode = document.all ? event.keyCode : e.which;
			if (keycode == 13) {
				if(that.$route.name=='index') {
					that.$router.push('/ref')
					return false;
				}	
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import '../style/px2vh.stylus'
	.home 
		position fixed
		width 100%
		height 100%
		top 0
		left 0
		background url('../../public/img/bgb.png') no-repeat
		background-size 100% 100%
		font-family "MicrosoftYaHei"
		z-index 999
		// overflow scroll
	.b-t
		width 100% 
		height px2vh(120)
		position absolute
	.bt-content
		line-height px2vh(120)
		display flex
		align-items center
		justify-content space-between
		width 100%
		padding 0 82px 0 40px
		box-sizing border-box
		color #fff
		position relative
		div
			display flex
			align-items center
			font-size 32px
		img 
			width px2vw(45)
			margin-right px2vw(10)
		.s 
			font-size 20px
			color rgba(85,192,253,1)
			text-shadow 0px 0px 10px rgba(85,192,253,0.4) 
			cursor pointer
	.bt-line
		position absolute
		width 100%
		i 
			display block
			position absolute
		.cut
			width 100%
			height 1px
			background url('../../public/img/cutline.png') no-repeat
			background-size 100% 100%
			bottom 0
		.light
			width px2vw(277)
			height px2vh(14)
			background url('../../public/img/cutlight.png') no-repeat
			background-size 100% 100%
			left px2vw(40)
			bottom -3px
	.content 
		display flex
		width 100% 
		height 100% 
		padding 60px 80px 0 0
		box-sizing border-box
</style>

