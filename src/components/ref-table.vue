<template>
	<div style='position:relative' class='ttt'>
		<div class='ul'>
			<div class='left'>
				<div class='head'>
					<div class="alllabel" v-show="type == 0">
						<el-checkbox :label="allCheckTxt" v-model="allchecked">全选</el-checkbox>
						<span>地区</span>
					</div>
					<span v-show="type == 1">材料</span>
				</div>
				<el-checkbox-group v-model="checked">
					<div class='info' v-for="(i,index) in newdata" :key="index">
						<div :class='type == 0 && index == 0?"nb n":"n"' style="">
							<div>							
								<el-checkbox v-show='type == 0' class='label' :label='i'>i</el-checkbox>
								<!-- <el-checkbox v-show='type == 1' class='label' :label='i'>i</el-checkbox> -->
								<p v-show='type == 0'>{{i.dateData&&i.name?i.name:''}}</p>
								<p v-show='type == 1' style='cursor:pointer'>{{i.dateData&&i.name?i.name:''}}</p>
							</div>
							<div v-show='type == 0 && !isnext && index !=0' @click='get_next_level(i)'>
								<p style='font-size:12px;color:#6C7DFF;cursor:pointer'>区县数据</p>
								<i class='iconfont icon-shang-copy'></i>
							</div>
							<i style="margin-right:10px" :class="i.parent_id == '1'?'iconfont icon-shang-copy rotate':'iconfont icon-shang-copy'" @click="chose_area(i)"  v-show='type == 1'></i>
						</div>
						<div :class='i.parent_id == "1"?"info":"hide"' v-for="(c,ci) in i.children" :key="ci">
							<div class='n'>
								<div>
									<el-checkbox v-show='type==0' class='label' :label='c'>c</el-checkbox>
									<!-- <el-checkbox v-show='type==1' class='label' :label='c'>c</el-checkbox> -->
									<p v-show='type==0'>{{c.dateData&&c.name}}</p>
									<p v-show='type==1' @click='toggleParentId(i)' style='cursor:pointer;display:flex;align-items:center'>
										<span>{{c.dateData&&c.name?c.name:'-'}}</span>
										<span style="font-size:12px;color:#777" v-show="t_type == 'allprice'">（元/{{c.unit}}）</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</el-checkbox-group>
			</div>
			<div class='right'>
				<div class='head'>
					<p v-for="i in time" :key="i.id">{{i.name?i.name:'-'}}</p>
				</div>
				<div class='info' v-for="(i,index) in newdata" :key="index">
					<div :class='type == 0&&index==0?"nb n":"n"'>
						<p v-for='(num,a) in i.dateData' :key='a'>
							<span>{{num && typeof num != 'object' ?num:'--'}}</span>
							<img src="../../public/img/ru.png" alt="" v-show='num && typeof num != "object" && (t_type == "chain_rate" || t_type == "years_rate") && num > 0'>
							<img src="../../public/img/gd.png" alt="" v-show='num && typeof num != "object" && (t_type == "chain_rate" || t_type == "years_rate") && num < 0'>
							<!-- <img src="../../public/img/bp.png" alt="" v-show='num && typeof num != "object" && (t_type == "chain_rate" || t_type == "years_rate") && num == 0'> -->
						</p>
					</div>
					<div v-for="(c,ci) in i.children" :key="ci" :class='i.parent_id == "1"?"info":"hide"'>
						<div class='n'>
							<p v-for='(cs,csi) in c.dateData' :key='csi' >
								{{cs && typeof cs != 'object'?cs:'--'}}
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- <div style='margin:0 auto;text-align:center;padding-top:20px;' v-show='newdata.length ==0'>
				<img  src='../../public/img/noMessage.png' />
				<p>暂无数据</p>
			</div> -->
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
	data() {
		return {
			allchecked:false,
			allCheckTxt:'全选',
			checked:[],
			time:[],
			newdata:[]
		}
	},
	props:{
		tabledata:{
			type:Object
		},
		type:{
			type:Number
		},
		t_type:{
			type:String
		},
		isnext:{
			type:Boolean
		},
		timeType:{
			type:Number
		}
	},
	computed:{
		user() {
			return this.$store.state.login.userInfo
		}
	},
	watch:{
		user:{
			handler(val) {
			},
			deep:true
		},
		checked:{
			handler(val) {
				this.$emit('checkList',val)          
			}
		},
		allchecked:{
			handler(val) {
				if(val){
					this.checked = this.newdata
				}else{
					this.checked = []
				}
				
			}
		},
		tabledata:{
			handler(val,oldVal) {
				this.newdata = []
				this.time = []
				var objDeepCopy = function (source) {// 深度拷贝数组对象
					var sourceCopy = source instanceof Array ? [] : {};
					for (var item in source) {
						sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
						//   sourceCopy[item] = source[item];
						// console.log(source,2222)
					}
					return sourceCopy;
				}
				if(val && val.data) {
					val.dateData.map(item => {
						const d = item
						this.time.push(d)
					})
					this.newdata = objDeepCopy(val.data)
					this.checked = [this.newdata[0]]
					this.allchecked = false
				}else{
				}
				if(this.type == 1){
					console.log(this.newdata)
				}	
        },
        deep:true
      }
    },
    methods:{
		toggleParentId(aa){
			if(aa.parent_id == '0'){
				aa.parent_id = '1'
			}else{
				aa.parent_id = '0'
			}
		},
		chose_area(item) {
			if(item.parent_id == '0'){
				item.parent_id = '1'
			}else{
				item.parent_id = '0'
			}
			// item.expand = !item.expand
		},
		get_next_level(i) {
			this.$emit('get_next',i)
		}
	}
};
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
.ul 
	width 100%
	height 100%
	overflow-y auto
	// position relative
	#table
		width auto
		display flex
		font-size 14px
	.left 
		width 220px
		text-align center
		flex-shrink 0
		position absolute
		top 56px
		left 0	
		.head 
			width 100%
			.alllabel
				position absolute
				left 15px
				z-index 5
				cursor pointer
		.n
			display flex
			justify-content space-between
			div
				padding 0 15px
				box-sizing border-box
				display flex
			p
				color #6C7DFF
			i  
				// margin-right 15px
		
		.info,  
			background #fff 
			.info  
				padding-left 30px
		.info:nth-child(1n)
			background #F3F4FE
			p
				background #F3F4FE
			.info:nth-child(1n)
				background #F3F4FE
				p
					background #F3F4FE
			.info:nth-child(2n) 
				background #DFE1F4
				p
					background #DFE1F4
		.info:nth-child(2n) 
			background #DFE1F4
			p
				background #DFE1F4
			.info:nth-child(1n)
				background #DFE1F4
				p
					background #DFE1F4
			.info:nth-child(2n) 
				background #F3F4FE
				p
					background #F3F4FE
	.right
		height 100%
		min-width 100%
		padding-left 220px
		box-sizing border-box
		.head 
			display flex
			p
				width 130px
				text-align center				
		.info
			p
				width 130px
				text-align center
		.info:nth-child(even)
			background #F3F4FE
			p
				background #F3F4FE
			.info:nth-child(odd)
				background #F3F4FE
				p
					background #F3F4FE
			.info:nth-child(even) 
				background #DFE1F4
				p
					background #DFE1F4
		.info:nth-child(odd) 
			background #DFE1F4
			p
				background #DFE1F4
			.info:nth-child(odd)
				background #DFE1F4
				p
					background #DFE1F4
			.info:nth-child(even) 
				background #F3F4FE
				p
					background #F3F4FE
	.nb,.nb p
		background #8AA3FF!important
		color #fff !important
			// border 1px yellow solid
	.head 
		background #B0BDFF
		color #fff
		height 32px
		line-height 32px
		border-right 1px solid #fff
		p
			border-right 1px solid #fff
			flex-shrink 0
			background #B0BDFF
			box-sizing border-box
	.info 
		// height 32px
		line-height 32px
		.n 
			display flex
		p 
			font-size 14px
			flex-shrink 0
	.iconfont 
		font-size 10px
		color: #637CFB
		border none
		cursor: pointer
		flex-shrink 0
	.rotate:before
		display inline-block
		transform rotate(90deg)
		transition .3s		
.hide
	height 0
	transition .3s
	overflow hidden
img 
	margin-left 10px
.el-checkbox
	margin-right 10px
</style>
// <style lang="stylus">
// .el-checkbox.alllabel
// 	position absolute
// 	left 15px
// 	cursor pointer
// </style>
