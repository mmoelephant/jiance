<template>
	<div class="home">
		<div class='b-t'>
			<div class='bt-content'>
				<div>
					<img src='../../public/img/logob.png'/>
					<!-- <p>云南省建设工程材料及设备价格监测系统</p> -->
					<p>{{this.$store.state.bigscreen.sys_title?this.$store.state.bigscreen.sys_title:'云南省建设工程材料及设备价格监测系统'}}</p>
				</div>
				<p class='s' @click='$router.push("/ref")'>进入工作台 ENTER</p>
			</div>
			<div class='bt-line'>
				<i class='cut'></i>
				<i class='light'></i>
			</div>
		</div>
		<div class='content'>
			<div class='left'>
				<div style='display:flex;margin-bottom:40px'>
					<div style='display:flex;flex-direction:column;align-items:center'>
						<p>监测市级</p>
						<div class='num-box'>
							<i class='l'></i>
							<p class='fontb'>{{cityNum}}</p>
							<i class='r'></i>
						</div>
					</div>
					<div style='display:flex;flex-direction:column;align-items:center'>
						<p>监测区、县级</p>
						<div class='num-box'>
							<i class='l'></i>
							<p class='fontb'>{{countyNum}}</p>
							<i class='r'></i>
						</div>
					</div>
				</div>
				
				<p>材料价格指数及环比涨跌<!--span style='font-size:12px'>(当前最新)</span--></p>
				<p style='color:#0DFDA0;font-size:12px'>时间：{{nowT}}<!--span>{{list[0].asmdate?list[0].asmdate.substr(0,10):0}}</span--></p>
				<div class='cate'>
					<i class='k'></i>
					<ul :class="animate==true?'cate-list anim':'cate-list'">
						<li v-for='(item,index) in list' :key='index'>
							<div style='justify-content:space-between'>
								<p>{{item.name?item.name:''}}</p>
								<p>{{item.data && item.data != {} && item.data.base_index_b && item.data.base_index_b != {}?item.data.base_index_b:'-'}}</p>
							</div>
							<el-progress :percentage="item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {}?Math.abs(item.data.chain_rate):0" 
							:color="item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {} && Number(item.data.chain_rate)>0?'#FD3A0D':'#0DFDA0'" 
							:text-inside="true" 
							:stroke-width="4"
							style='margin:10px auto;'>
							</el-progress>
							<div>
								<p class='p'>
									{{item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {}?item.data.chain_rate:'-'}}
								</p>
								<img src='../../public/img/上.png' v-show='item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {} && Number(item.data.chain_rate) > 0'/>
								<img src='../../public/img/下.png' v-show='item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {} && Number(item.data.chain_rate) < 0'/>
								<p v-show='item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {} && Number(item.data.chain_rate) == 0'>-</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<center></center>
			<rigth></rigth>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

//import "echarts/lib/chart/line"
import { setInterval, clearInterval } from 'timers'
import $ from 'jquery'
import left from '../components/big-left'
import center from '../components/center'
import rigth from '../components/big-right'
import {datawork} from '../plugins/datawork.js'
import {getCilentId} from '../plugins/getclientidagain.js'
import {getToken} from '../plugins/gettoken.js'
export default {
	data(){
		return {
            list:[],
            cityNum:16,
            countyNum:129,
            nowT:'2019年9月',
            timer:null,
            animate:false,
            areaid:0,
            sysTitle:''
		}
	},
	created(){
        this.list = []
        clearInterval(this.timer)
        this.$store.commit('bigscreen/SET_CATE_ON', {})
        this.$store.commit('bigscreen/SET_CATE_LIST', [])
        if(localStorage.getItem('user')){
            let areanum = JSON.parse(localStorage.getItem('user')).area_code
            if(areanum != 53){
                this.areaid = areanum
            }else{
                this.areaid = 0
            }
        }else{
            this.areaid = 0
            
        }
        this.get_cate()
	},
    computed:{
        map() {
            return this.$store.state.login.map
        }
    },
    watch:{
        map:{
            handler(val) {
                //对地图板块有所操作的时候，这里会发生变化，那么会重新请求各个材料对应的16个州市的数据，
                // 下面的判断语句作用为：如果点击的是“返回”，那么请求参数的时候不传地区的对应代码
                // 请求完数据以后，this.$store.commit('bigscreen/SET_CATE_ON',this.list[0])，会随着变化。
                // 这时候在center.vue模块会获取到变化
                if(val.id != '530000000000'){
                    this.areaid = Number(val.id)
                }else{
                    this.areaid = 0
                }
                this.get_cate()
                clearInterval(this.timer)
            },
            deep:true
        }
    },
	components: {
		left,
		center,
		rigth
	},
	methods:{
        t() {
            let _that = this
            _that.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            _that.list.push(_that.list[0])
            // setTimeout(() => {
                _that.list.shift()
                _that.animate = false
                _that.$store.commit('bigscreen/SET_CATE_ON', _that.list[0])
                // console.log(_that.list)
            // },100)
            // setTimeout(()=>{
            //         _that.list.push(_that.list[0])
            //         _that.list.shift()
            //         _that.animate = false
            //         _that.$store.commit('bigscreen/SET_CATE_ON', _that.list[0])
            //         console.log(_that.list)
            // },1000)
        },
        async get_cate() {
            let res
            let data = {}
            let commondata = {}
            let data2 = {}
            if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                commondata = this.$store.state.login.commonParam
            }
            for(var i in commondata){
                data[i] = commondata[i]
            }
            data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
            if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                data.user_id = localStorage.getItem('userid')
            }else{
                data.user_id = 0
            }
            data.timestamp = Math.round(new Date().getTime() / 1000).toString()
            if(localStorage.getItem('clientid') && localStorage.getItem('accesstoken')){
                data.client_id = localStorage.getItem('clientid')
                data.access_token = localStorage.getItem('accesstoken')
            }else{
                console.log('不存在client_id,要重新获取')
            }
            if(this.areaid){
                data.areas = this.areaid
            }else{
                data.areas = 53
            }
            data2 = datawork(data)
            this.$api.get_cate_level1(data2).then(v => {
                if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                    this.cityNum = v.data.data.areas_city
                    this.countyNum = v.data.data.areas_area
                    this.list = v.data.data.data
                    this.nowT = v.data.data.terms_name
                    this.$store.commit('bigscreen/SET_DISPLAY_TIME',v.data.data.terms_name)
                    this.$store.commit('bigscreen/SET_DISPLAY_NAME',v.data.data.areas_name)
                    this.$store.commit('bigscreen/SET_DISPLAY_AREA_COUNT',v.data.data.area_count)
                    this.$store.commit('bigscreen/SET_DISPLAY_ALL_COUNT',v.data.data.all_count)
                    this.sysTitle = v.data.data.title
                    this.$store.commit('bigscreen/SET_SYSTEM_TITLE',v.data.data.title)
                    this.$store.commit('bigscreen/SET_CATE_ON',this.list[0])
                    this.$store.commit('bigscreen/SET_CATE_LIST',this.list)
                } else if(v.data.errcode == 1104){
                    //token失效，重新获取·token
                    let that = this
                    getToken(commondata)
                    setTimeout(function(){
                        if(localStorage.getItem('tokenDone')){
                            that.get_cate()
                        }
                    },1000)
                }else{
                    //重新获取client_id
                    let that = this
                    getCilentId(commondata)
                    setTimeout(function(){
                        if(localStorage.getItem('done')){
                            that.get_cate()
                        }
                    },1000)

                }
            })
            this.$nextTick(() => {
                this.timer = setInterval(this.t,10000)
            })
        }
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
	},
	// beforeDestroy() {
	// 	console.log(this.timer)
	// 	if(this.timer){
	// 		console.log(this.timer)
	// 		clearInterval(this.timer)
	// 	}
	// },
    beforeRouteLeave(to,from,next) {
		// this.timer = null
		console.log(this.timer)
		clearInterval(this.timer)
        next()
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
	background url('../../public/img/bgb.jpg') no-repeat
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
		.anim
			transition all 0.6s
			margin-top -92px
		.left
			// height 100%
			width px2vw(380)
			flex-shrink 0
			padding-top px2vh(88)
			box-sizing border-box
			display flex
			flex-direction column
			align-items center
			p
				font-family MicrosoftYaHei-Bold
				font-weight bold
				color rgba(85,253,253,1)
				margin-bottom 15px
				// margin-left -20px
			.num-box
				// width px2vw(150)
				padding 0 15px
				height px2vh(50)
				display flex
				justify-content space-between
				line-height px2vh(50)
				i
					display block
					height 100%
					width 7px
				.l
					background url('../../public/img/br.png') no-repeat
					background-size 100% 100%
				.r
					background url('../../public/img/bl.png') no-repeat
					background-size 100% 100%
				p
					font-size 60px
					margin 0
					text-shadow 0px 0px 10px rgba(85,227,253,0.4)
			.cate
				width 100%
				height 640px
				position relative
				overflow hidden
				.k
					display block
					position absolute
					width 100%
					height 92px
					background url('../../public/img/lk.png') no-repeat
					background-size 100% 100%
				.cate-list
					width 100%
					li
						width 100%
						padding 15px px2vw(105) 13px px2vw(76)
						box-sizing border-box
						img
							width 10px
							height 10px
							margin-left 10px
						div
							display flex
							align-items center
							p
								margin 0
								font-size 14px
								font-weight normal
								// font-family MicrosoftYaHei-Bold
								// font-weight bold
								color #fff
								text-overflow ellipsis
								// width 50%
							.p
								color #95979C
								font-size 14px
								width 50%
								text-overflow ellipsis
					li:nth-child(1)
						p
							font-size 15px
							font-weight bold
					.el-progress-bar__outer
						background-color #4D6084 !important
						border-radius 0 !important
					.el-progress-bar__innerText
						opacity 0
					.el-progress-bar__inner
						border-radius 0 !important
</style>