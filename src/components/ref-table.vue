<template>
	<div style='position:relative' class='ttt'>
		<div class='ul'> 
			<div class='left'>
				<p class='head'>{{type==0?'地区':'材料'}}</p>
				<el-checkbox-group v-model="checked">
					<div class='info' v-for="(i,index) in newdata" :key="index" style="border:1px red solid">
						<div :class='type==0&&index==0?"nb n":"n"'>
							<div>							
								<el-checkbox v-show='type==0' class='label' :label='i.name'>1</el-checkbox>
								<el-checkbox v-show='type==1' class='label' :label='i.name'>1</el-checkbox>
								<p :style='(i.data&&i.data[0].area ==user.area||user.area=="53")&&!isnext&&index!=0?"color:#6C7DFF":""'
									v-show='type==0' @click='i.expand = !i.expand'>{{i.data&&i.data[0].area_name?i.data[0].area_name.substr(0,2)+''+i.data[0].area_name.substr(-1,1):''}}</p>
								<p v-show='type==1' @click='i.expand = !i.expand' style='cursor:pointer'>{{i.data&&i.data[0].name?i.data[0].name:''}}</p>
							</div>
							{{user.area}}
							<div v-show='type==0&&!isnext&&(i.data&&i.data[0].area ==user.area||user.area=="53")&&index!=0' @click='get_next_level(i)'>
								<p style='color:#6C7DFF;font-size:12px;cursor:pointer'>查看更多</p>
								<i class='iconfont icon-shang-copy'></i>
							</div>
							<i :class="i.expand?'iconfont icon-shang-copy rotate':'iconfont icon-shang-copy'" @click="chose_area(i)"  v-show='type==1'></i>
						</div>
						<div :class='i.expand?"info":"hide"' v-for="(c,ci) in i.dateData" :key="ci">
							<div class='n'>
								<div>
									<el-checkbox v-show='type==0' class='label' :label='c'>1</el-checkbox>
									<el-checkbox v-show='type==1' class='label' :label='c'>1</el-checkbox>
									<p v-show='type==0' @click='i.expand = !i.expand'>{{c.data&&c.data[0].area_name?c.data[0].area_name.substr(0,2)+''+c.data[0].area_name.substr(-1,1):''}}</p>
									<p v-show='type==1' @click='i.expand = !i.expand' style='cursor:pointer'>{{c.data&&c.data[0].name?c.data[0].name:''}}</p>

								</div>
							</div>
						</div>
					</div>
				</el-checkbox-group>
			</div>
			<!-- <div class='right'>
				<div class='head'>
					<p v-for="i in time" :key="i.id">{{i.name}}</p>
				</div>
				<div class='info' v-for="(i,index) in newdata" :key="index">
					<div :class='type==0&&index==0?"nb n":"n"'>
						<p v-for='(num,a) in i.data' :key='a'>
							<span v-show='t_type=="price"'>{{num.price?Number(num.price).toFixed(2):'-'}}</span>  
							<span v-show='t_type=="zs"'>{{num.price ==0?"-":num.exponent+'' !='undefined'?Number(num.exponent).toFixed(2):'-'}}</span>  
							<span v-show='t_type=="tb"'>{{num.price==0?"-":num.tongbi+''!='undefined'?(Number(num.tongbi)*100).toFixed(2)+'%':'-'}}</span>  
							<span v-show='t_type=="hb"'>{{num.price==0?"-":num.huanbi+''!='undefined'?(Number(num.huanbi)*100).toFixed(2)+'%':'-'}}</span>   -->
							<!--img src="../../public/img/ru.png" alt="" 
								v-show='num.price !=0 &&a!=0&&(t_type=="price"&&i.data[a-1]&&Number(i.data[a-1].price).toFixed(2)<Number(num.price).toFixed(2))||
									(t_type=="hb"&&i.data[a-1]&&Number(i.data[a-1].huanbi).toFixed(2)<Number(num.huanbi).toFixed(2))||
									(t_type=="tb"&&i.data[a-1]&&Number(i.data[a-1].tongbi).toFixed(2)<Number(num.tongbi).toFixed(2))||
									(t_type=="zs"&&i.data[a-1]&&Number(i.data[a-1].exponent).toFixed(2)<Number(num.exponent).toFixed(2))'>
							<img src="../../public/img/gd.png" alt="" 
								v-show='num.price !=0 &&a!=0&&(t_type=="price"&&i.data[a-1]&&Number(i.data[a-1].price).toFixed(2)>Number(num.price).toFixed(2))||
									(t_type=="hb"&&i.data[a-1]&&Number(i.data[a-1].huanbi).toFixed(2)>Number(num.huanbi).toFixed(2))||
									(t_type=="tb"&&i.data[a-1]&&Number(i.data[a-1].tongbi).toFixed(2)>Number(num.tongbi).toFixed(2))||
									(t_type=="zs"&&i.data[a-1]&&Number(i.data[a-1].exponent).toFixed(2)>Number(num.exponent).toFixed(2))'>							
							<img src="../../public/img/bp.png" alt="" 
								v-show='num.price !=0 &&a!=0&&(t_type=="price"&&i.data[a-1]&&Number(i.data[a-1].price).toFixed(2)==Number(num.price).toFixed(2))||
									(t_type=="hb"&&i.data[a-1]&&Number(i.data[a-1].huanbi).toFixed(2)==Number(num.huanbi).toFixed(2))||
									(t_type=="tb"&&i.data[a-1]&&Number(i.data[a-1].tongbi).toFixed(2)==Number(num.tongbi).toFixed(2))||
									(t_type=="zs"&&i.data[a-1]&&Number(i.data[a-1].exponent).toFixed(2)==Number(num.exponent).toFixed(2))'-->							
							<!-- <img src="../../public/img/ru.png" alt="" v-show='num.price !=0 &&((t_type=="price"||t_type=="hb")&&num.huanbi>0 || t_type=="tb"&&num.tongbi>0)'>
							<img src="../../public/img/gd.png" alt="" v-show='num.price !=0 &&((t_type=="price"||t_type=="hb")&&num.huanbi<0 || t_type=="tb"&&num.tongbi<0)'>
							<img src="../../public/img/bp.png" alt="" v-show='num.price !=0 &&((t_type=="price"||t_type=="hb")&&num.huanbi==0|| t_type=="tb"&&num.tongbi==0)'>
						</p>
					</div>
					
					<div v-for="(c,ci) in i.children" :key="ci" :class='i.expand?"info":"hide"' >
						<div class='n'>
							<p v-for='(cs,csi) in c.data' :key='csi' >
								<span v-show='t_type=="price"'>{{cs.price?Number(cs.price).toFixed(2):'-'}}</span>  
								<span v-show='t_type=="zs"'>{{cs.price ==0?"-":cs.exponent+''!='undefined'?Number(cs.exponent).toFixed(2):'-'}}</span>  
								<span v-show='t_type=="tb"'>{{cs.price==0?"-":cs.tongbi+''!='undefined'?(Number(cs.tongbi)*100).toFixed(2)+'%':'-'}}</span>  
								<span v-show='t_type=="hb"'>{{cs.price==0?"-":cs.huanbi+''!='undefined'?(Number(cs.huanbi)*100).toFixed(2)+'%':'-'}}</span>  
								<img src="../../public/img/ru.png" alt="" v-show='cs.price !=0 &&Number(cs.price).toFixed(2)!=0&&((t_type=="price"||t_type=="hb")&&cs.huanbi>0 || t_type=="tb"&&cs.tongbi>0)'>
								<img src="../../public/img/gd.png" alt="" v-show='cs.price !=0 &&Number(cs.price).toFixed(2)!=0&&((t_type=="price"||t_type=="hb")&&cs.huanbi<0 || t_type=="tb"&&cs.tongbi<0)'>
								<img src="../../public/img/bp.png" alt="" v-show='cs.price !=0 &&Number(cs.price).toFixed(2)==0&&((t_type=="price"||t_type=="hb")&&cs.huanbi==0|| t_type=="tb"&&cs.tongbi==0)'>
							</p>
						</div>
						
					</div>
				</div>
			</div> -->
			<div style='margin:0 auto;text-align:center;padding-top:20px' v-show='newdata.length ==0'>
				<img  src='../../public/img/noMessage.png' />
				<p>暂无数据</p>
			</div>
		</div>
	</div>
  	

</template>
<script>
import $ from 'jquery'
export default {
    data() {
      return {
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
				console.log(val)
			},
			deep:true
		},
      checked:{
        handler(val) {
          this.$emit('checkList',val)          
        }
      },
      tabledata:{
        handler(val) {
          this.newdata = []
          this.time = []
          if(val && val.dateData) {
            val.dateData.map(item => {
				const d = item
				// const d = item.mdate?item.mdate.toString().substr(0,7):item.asmdate.toString().substr(0,7)
				this.time.push(d)
				console.log(this.time)
            //   if(this.timeType == 3) {
			// 	const d = item
            //     // const d = item.mdate?item.mdate.toString().substr(0,7):item.asmdate.toString().substr(0,7)
			// 	this.time.push(d)
			// 	console.log(this.time)
            //   } else if(this.timeType == 2) {
            //     const m = item.mdate?Number(item.mdate.substr(5,2)):Number(item.asmdate.substr(5,2))
            //     const y = item.mdate?item.mdate.substr(0,4):item.asmdate.substr(0,4)
            //     if(m ==1) {
            //       this.time.push(y+'年第1季度')
            //     } else if( m ==4) {
            //       this.time.push(y+'年第2季度')
            //     } else if( m ==7) {
            //       this.time.push(y+'年第3季度')
            //     } else {
            //       this.time.push(y+'年第4季度')
            //     }
            //   } else {
            //     const y = item.mdate?item.mdate.substr(0,4):item.asmdate.substr(0,4)
            //     this.time.push(y+'年')
            //   }
            })
          }else{
			  console.log('1')
		  }
		  var objDeepCopy = function (source) {// 深度拷贝数组对象
              var sourceCopy = source instanceof Array ? [] : {};
              for (var item in source) {
				//   sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
				  sourceCopy[item] = source[item];
				  // console.log(source,2222)
			  }
			  return sourceCopy;
			  }
			  this.newdata = objDeepCopy(val.data)
			  console.log(this.newdata)
			  this.checked = [this.newdata[0]]
        },
        deep:true
      }
    },
    methods:{
      chose_area(item) {
        item.expand = !item.expand
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
		.n
			display flex
			justify-content space-between
			div
				padding 0 15px
				display flex
			i  
				margin-right 15px
		
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
		// min-width 100%
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
			color #fff
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
