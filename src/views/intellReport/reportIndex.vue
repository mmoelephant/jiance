<template>
<div style="height:100%;" v-loading.fullscreen="loading">
	<!-- calc(100% - 78px) -->
	<div class="intellReport">
		<div class="inteLeft">
			<div :class="bigType == 0?'all allOn':'all'" @click="changeToAll(0,'全部报告')">
				<span class="iconfont">&#xe608;</span>
				<span class="whatRe">全部报告</span>
			</div>
			<div v-for="item in leftItems" :key="item.id" :class="bigType == item.id?'all allOn':'all'" @click="toggleBigType(item)">
				<span class="iconfont" v-show="item.id == 1">&#xe60b;</span>
				<span class="iconfont" v-show="item.id == 2">&#xe60d;</span>
				<span class="iconfont" v-show="item.id == 3">&#xe60a;</span>
				<span class="whatRe">{{item.name}}</span>
			</div>
		</div>
		<div class="inteRight">
			<router-view v-if='$route.name == "reportDetail"'></router-view>
			<div v-else>
				<div class="reportBtns">
					<div class="btnClass">
						<span class="dotClass"></span>
						<span class="navigiOn">{{ navigiOn}}</span>
					</div>
					<div class="createBtn" v-show="bigType == 2 || bigType == 3" @click="createRe(bigType)">
						<img src="../../../public/img/report/add.png" alt="">
						<span>{{bigType == 2?'新建地区对比报告':bigType == 3?'新建时间对比报告':''}}</span>
					</div>
					<div class="search">
						<input class="searchBox" placeholder="请输入需要检索的报告标题" v-model="searContent" @input="searchInput($event)">
						<div class="searchIcon" @click="goSearch"></div>
					</div>
				</div>
				<div class="reportContent">
					<div class="searchTip" v-show="searchModel">为您找到相关结果{{resultCount}}个</div>
					<div class="conBox">
						<div v-for="item in reportslist" :key="item.id" class="conItem" v-show="!searchModel && bigType == 0">
							<div class="conItem_title">
								<el-badge value="NEW" :hidden="newHidden"><p class="reporTypeTitle">{{item.name}}</p></el-badge>
								<div class="seeMoreBtn" @click="seeMore(item.id,item.name)">查看更多 ></div>
							</div>
							<ul class="listUl">
								<li class="lisTitle">
									<span class="titleItem titleNum">编号</span>
									<span class="titleItem titleT">报告标题</span>
									<span class="titleItem titleTime">创建时间</span>
									<span class="titleItem titleType">报告类型</span>
									<span class="titleItem titleDo">操作</span>
								</li>
								<li class="listClass" v-for="item1 in item.data" :key="item1.id">
									<span class="listItem listNum">{{item1.sn?item1.sn:'--'}}</span>
									<span class="listItem listT" @click="reDetail(item1.id)">{{item1.title?item1.title:'--'}}</span>
									<span class="listItem listTime">{{item1.addtime?item1.addtime:'--'}}</span>
									<span class="listItem listType" 
									:style="item1.terms_type&&item1.terms_type == '月度'?'color:#EB7846':item1.terms_type == '年度'?'color:#F95E70':item1.terms_type == '季度'?'color:#4F65E1':''">
										{{item1.terms_type?item1.terms_type:'--'}}
									</span>
									<span class="listItem listDo">
										<span class="seeDeIcon" @click="reDetail(item1.id)">查看报告</span>
										<span class="deleteIcon" @click="deleteRe(item1.id)" v-show="item.id != 1">删除</span>
									</span>
								</li>
							</ul>
						</div>
						<div class="conItem" v-show="searchModel || bigType != 0">
							<ul class="listUl">
								<li class="lisTitle">
									<span class="titleItem titleNum">编号</span>
									<span class="titleItem titleT">报告标题</span>
									<div class="titleItem titleTime">
										<span>创建时间</span>
										<div class="timeFilterBox">
											<div v-for="item in filterTimes" :key="item.id" :class="f_time_type == item.filter?'filterOn':''" 
											@click="filterTime(item.filter)">{{item.name == ''?'全部':item.name}}</div>
										</div>
									</div>
									<div class="titleItem titleType">
										<span>报告类型</span>
										<div class="timeFilterBox">
											<div v-for="item in filterTypes" :key="item.id" :class="f_type == item.id?'filterOn':''" 
											@click="filterType(item.id)">{{item.name == ''?'全部':item.name}}</div>
										</div>
									</div>
									<span class="titleItem titleDo">操作</span>
								</li>
								<li class="listClass" v-for="item1 in reportslist1" :key="item1.id">
									<span class="listItem listNum">{{item1.sn?item1.sn:'--'}}</span>
									<span class="listItem listT" @click="reDetail(item1.id)" v-show="!searchModel">{{item1.title?item1.title:'--'}}</span>
									<span class="listItem listT" @click="reDetail(item1.id)" v-show="searchModel">
										{{item1.title && item1.title.indexOf(searContent) != -1?item1.title.substr(0,item1.title.indexOf(searContent)):item1.title}}
										<span style="color:#F2342B">{{item1.title && item1.title.indexOf(searContent) != -1?searContent:''}}</span>
										{{item1.title && item1.title.indexOf(searContent) != -1?item1.title.substr(item1.title.indexOf(searContent) + searContent.length):''}}
									</span>
									<span class="listItem listTime">{{item1.addtime?item1.addtime:'--'}}</span>
									<span class="listItem listType" 
									:style="item1.terms_type&&item1.terms_type == '月度'?'color:#EB7846':item1.terms_type == '年度'?'color:#F95E70':item1.terms_type == '季度'?'color:#4F65E1':''">
									{{item1.terms_type?item1.terms_type:'--'}}
									</span>
									<span class="listItem listDo">
										<span class="seeDeIcon" @click="reDetail(item1.id)">查看报告</span>
										<span class="deleteIcon" @click="deleteRe(item1.id)" v-show="bigType != 1 && !searchModel">删除</span>
									</span>
								</li>
								<div class="noData" v-show="reportslist1.length == 0">
									<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
									<p class="noDatap1">暂时没有报告</p>
									<!-- <p class="noDatap2">不要着急，要不再试试~</p> -->
								</div>
								<el-pagination 
								:page-size="pageSize1" 
								:total="totalPage1" 
								:pager-count="5" 
								:current-page="pageNum1" 
								:hide-on-single-page="false" 
								layout="total,prev, pager, next, jumper" 
								class="reportPage" 
								@current-change="get_data1">
								<!-- v-show='bigType != 0' -->
								</el-pagination>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog :title="createTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :before-close="beforeCancel" width="600px" class="createNewBox">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" v-show="bigType == 2">
				<el-form-item label="报告类型" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择报告类型" @change="changeType">
						<el-option v-for="item in reTypes" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
  				<el-form-item label="时间选择" prop="timeInterval">
					<el-cascader :disabled="ruleForm.type?false:true" v-model="ruleForm.timeInterval" :options="timeoptions" 
					:props="{ expandTrigger: 'click',label:'name',value:'id',checkStrictly:true}" @change="timeChange" ref="refHandle"></el-cascader>
  				</el-form-item>
  				<el-form-item label="材料类型" prop="materialType">
					<el-select v-model="ruleForm.materialType" multiple collapse-tags placeholder="请选择材料类型">
						 <!-- @change="changeMateri" -->
						<el-option v-for="item in materiaList" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="对比地区" prop="compareRegion">
  					<el-select v-model="ruleForm.compareRegion" :multiple="multiChose" collapse-tags placeholder="请选择对比地区">
  						<el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item>
  					<el-button type="primary" @click="createNewNow('ruleForm')" class="newNow">立即创建</el-button>
  					<el-button @click="cancleNewReport('ruleForm')">取消</el-button>
  				</el-form-item>
			</el-form>
			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" v-show="bigType == 3">
				<el-form-item label="报告类型" prop="type">
					<el-select v-model="ruleForm2.type" placeholder="请选择报告类型" @change="changeType">
						<el-option v-for="item in reTypes" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
  				<el-form-item label="时间选择" prop="timeInterval">
					<el-cascader :disabled="ruleForm2.type?false:true" v-model="ruleForm2.timeInterval" :options="timeoptions" 
					:props="{ expandTrigger: 'click',label:'name',value:'id',checkStrictly:true}" @change="timeChange2" ref="refHandle" ></el-cascader>
					<span style="margin:0 12px">至</span>
					<el-cascader :disabled="ruleForm2.type?false:true" v-model="ruleForm2.timeInterval2" :options="timeoptions" 
					:props="{ expandTrigger: 'click',label:'name',value:'id',checkStrictly:true}" @change="timeChange3" ref="refHandle"></el-cascader>
  				</el-form-item>
  				<el-form-item label="材料类型" prop="materialType">
					<el-select v-model="ruleForm2.materialType" multiple collapse-tags placeholder="请选择材料类型">
						<el-option v-for="item in materiaList" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="对比地区" prop="compareRegion">
  					<el-select v-model="ruleForm2.compareRegion" :multiple="multiChose" collapse-tags placeholder="请选择对比地区">
  						<el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
  				</el-form-item>
				<p style="color:red;margin-left:100px">{{error1}}</p>
  				<el-form-item>
  					<el-button type="primary" @click="createNewNow('ruleForm2')" class="newNow">立即创建</el-button>
  					<el-button @click="cancleNewReport('ruleForm2')">取消</el-button>
  				</el-form-item>
			</el-form>
		</el-dialog>
    </div>
</div>
</template>
<script>
import $ from 'jquery'
import {datawork} from '../../plugins/datawork.js'
import { getToken } from '../../plugins/gettoken.js'
export default {
	data() {
		return {
			loading:false,
			userid:'0',
			uniquecode:'',
			clientid:'',
			leftItems:[],
			bigType:0,
			navigiOn:'全部报告',
			dialogFormVisible: false,
			createTitle:'新建地区对比报告',
			ruleForm: {},
			rules: {
				type: [
					{required: true, message: '请选择报告类型', trigger: 'change'}
				],
				timeInterval: [
					{required: true, message: ' ', trigger: ''}
				],
				materialType: [
					{required: true, message: '请选择材料类型', trigger: 'focus'}
				],
				compareRegion: [
					{required: true, message: '请选择对比地区', trigger: 'focus'}
				]
			},
			ruleForm2: {},
			rules2: {
				type: [
					{required: true, message: '请选择报告类型', trigger: 'change'}
				],
				timeInterval: [
					{required: true, message: ' ', trigger: ''}
				],
				timeInterval2: [
					{required: true, message: ' ', trigger: ''}
				],
				materialType: [
					{required: true, message: '请选择材料类型', trigger: 'focus'}
				],
				compareRegion: [
					{required: true, message: '请选择对比地区', trigger: 'focus'}
				]
			},
			// word:'请选择月份',
			// startWord:'请选择开始月份',
			// endWord:'请选择结束月份',
			// timeType:'month',
			reTypes:[],
			timeoptions:[],
			timevalue:'',
			timevalue2:'',
			timevalue3:'',
			error1:'',
			materiaList:[],
			regions:[],
			multiChose:true,
			reportslist:[],
			reportslist1:[],
			filterTimes:[
				{id:1,name:'',filter:''},
				{id:2,name:'按最新筛选',filter:'addtime_d'},
				{id:3,name:'按最早筛选',filter:'addtime_a'}
			],
			filterTypes:[
				{id:0,name:''},
				{id:1,name:'年度数据报告'},
				{id:2,name:'季度数据报告'},
				{id:3,name:'月度数据报告'}
			],
			f_time_type:'',
			f_type:0,
			searContent:'',
			searchModel:false,
			resultCount:0,
			pageSize1:10,
			totalPage1:10,
			pageNum1:1,
			newHidden:false,
		}
	},
	created(){
		this.userid = localStorage.getItem('userid')
		this.uniquecode = localStorage.getItem('uniquecode')
		this.clientid = localStorage.getItem('clientid')
		this.get_left()
		this.getReportAll()
	},
	mounted() {
        const input = $('input')[0]
        // this.isSupportPlaceholder =  'placeholder' in input
		const that = this
		document.onkeydown = function(e) {
			var keycode = document.all ? event.keyCode : e.which;
			if (keycode == 13) {
				that.goSearch()
				return false;
			}
		}
		//点击文本就让它自动点击前面的input就可以触发选择。但是因组件阻止了冒泡，暂时想不到好方法来触发。
		//这种比较耗性能，暂时想不到其他的，能实现效果了。
		setInterval(function() {
			document.querySelectorAll(".el-cascader-node__label").forEach(el => {
				el.onclick = function() {
					if (this.previousElementSibling) this.previousElementSibling.click();
				};
			});
		}, 1000);
	},
	methods:{
		get_left(){
			this.loading = true
			let data = {}
			let data1 = {}
			let commondata = {}
			if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
				commondata = this.$store.state.login.commonParam
			}
			for(var i in commondata){
				data[i] = commondata[i]
			}
			data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
			data.timestamp = Math.round(new Date().getTime() / 1000).toString()
			if(this.userid){
				data.user_id = this.userid
			}else{
				data_user_id = '0'
			}
			if(this.uniquecode){
				data.unique_code = this.uniquecode
			}
			if(this.clientid && this.clientid.length > 0){
				data.client_id = this.clientid
			}
			if(localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
				data.access_token = localStorage.getItem('accesstoken')
			}
			data1 = datawork(data)
			this.$api.get_report_left(data1).then(v => {
				if(v.data.errcode == 0){
					this.loading = false
					this.leftItems = v.data.data.data
				}else if(v.data.errcode == 1104){
					let _that = this
					getToken(commondata)
					setTimeout(() => {
						if(localStorage.getItem('tokenDone')){
							_that.get_left()
						}
					}, 1000)
				}else{

				}
			})
		},
		changeToAll(aa,bb){
			this.bigType = aa
			this.navigiOn = bb
			this.searchModel = false
			this.searContent = ''
			this.$router.push({name:'reportIndex'})
		},
		toggleBigType(aa){
			this.bigType = aa.id
			this.navigiOn = aa.name
			this.searchModel = false
			this.searContent = ''
			this.$router.push({name:'reportIndex'})
			if(aa.id == 2){
				this.createTitle = '新建地区对比报告'
			}else if(aa.id == 3){
				this.createTitle = '新建时间对比报告'
			}
		},
		seeMore(aa,bb){
			this.bigType = aa
			this.navigiOn = bb
			this.f_time_type = ''
			this.f_type = 0
		},
		createRe(aa){
			if(aa == 2){
				this.multiChose = true
			}else{
				this.multiChose = false
			}
			let data = {}
			let data2 = {}
			let commondata = {}
			if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
				commondata = this.$store.state.login.commonParam
			}
			for(var i in commondata){
				data[i] = commondata[i]
			}
			data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
			data.timestamp = Math.round(new Date().getTime() / 1000).toString()
			if(this.userid){
				data.user_id = this.userid
			}else{
				data_user_id = '0'
			}
			if(this.uniquecode){
				data.unique_code = this.uniquecode
			}
			if(this.clientid && this.clientid.length > 0){
				data.client_id = this.clientid
			}
			if(localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
				data.access_token = localStorage.getItem('accesstoken')
			}
			data.type = aa
			data2 = datawork(data)
			this.$api.get_report_new_type(data2).then(v => {
				this.dialogFormVisible = true
				if(v.data.errcode == 0){
					this.materiaList = v.data.data.categoryData
					this.regions = v.data.data.areasData
					this.reTypes = v.data.data.termsTypeData
				}else if(v.data.errcode == 1104){
					let _that = this
					getToken(commondata)
					setTimeout(() => {
						if(localStorage.getItem('tokenDone')){
							_that.createRe()
						}
					}, 1000);
				}else{

				}
			})
		},
		changeType(vv){
			this.reTypes.map(item => {
				if(item.id == vv){
					this.timeoptions = item.data
				}
			})
		},
		// changeTime(vv){
		// 	this.ruleForm.timeInterval = vv
		// },
		timeChange(val){
			// this.$refs.refHandle.dropDownVisible = false
			console.log(val)
			if(this.ruleForm.type == 1){
				this.timevalue = val[0] + '-01-01'
			}else if(this.ruleForm.type == 2){
				this.timevalue = val[0] + '-' + val[1] + '-01'
			}else{
				this.timevalue = val[0] + '-' + val[1] + '-01'
			}
		},
		timeChange2(val){
			console.log(val)
			if(this.ruleForm2.type == 1){
				this.timevalue2 = val[0] + '-01-01'
			}else if(this.ruleForm2.type == 2){
				this.timevalue2 = val[0] + '-' + val[1] + '-01'
			}else{
				this.timevalue2 = val[0] + '-' + val[1] + '-01'
			}
		},
		timeChange3(val){
			console.log(val)
			if(this.ruleForm2.type == 1){
				this.timevalue3 = val[0] + '-01-01'
			}else if(this.ruleForm2.type == 2){
				this.timevalue3 = val[0] + '-' + val[1] + '-01'
			}else{
				this.timevalue3 = val[0] + '-' + val[1] + '-01'
			}
		},
		createNewNow(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true
					let data = {}
					let data2 = {}
					let commondata = {}
					if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
						commondata = this.$store.state.login.commonParam
					}
					for(var i in commondata){
						data[i] = commondata[i]
					}
					data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
					data.timestamp = Math.round(new Date().getTime() / 1000).toString()
					if(this.userid){
						data.user_id = this.userid
					}else{
						data_user_id = '0'
					}
					if(this.uniquecode){
						data.unique_code = this.uniquecode
					}
					if(this.clientid && this.clientid.length > 0){
						data.client_id = this.clientid
					}
					if(localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
						data.access_token = localStorage.getItem('accesstoken')
					}
					data.type = this.bigType
					if(this.bigType == 2){
						data.terms_type = this.ruleForm.type
						data.terms = this.timevalue
						data.categorys_ids = JSON.stringify(this.ruleForm.materialType)
						data.areas_ids = JSON.stringify(this.ruleForm.compareRegion)
						data2 = datawork(data)
						this.$api.create_new_report(data2).then(v => {
							if(v.data.errcode == 0){
								this.loading = false
								this.dialogFormVisible = false
								this.searContent = ''
								this.searchModel = false
								this.$refs[formName].resetFields()
								this.error1 = ''
								this.$message({
									type:'success',
									message:'创建成功！'
								})
								this.getReportList()
							}else if(v.data.errcode == 1104){
								let _that = this
								getToken(commondata)
								setTimeout(() => {
									if(localStorage.getItem('tokenDone')){
										_that.createNewNow(formName)
									}
								}, 1000);
							}else{
								this.loading = false
								this.$message({
									type:'error',
									message:v.data.errmsg
								})
							}
						})
					}
					if(this.bigType == 3){
						if(this.timevalue3){
							data.terms_type = this.ruleForm2.type
							data.start_terms = this.timevalue2
							data.categorys_ids = JSON.stringify(this.ruleForm2.materialType)
							data.areas_ids = JSON.stringify(this.ruleForm2.compareRegion)
							data.end_terms = this.timevalue3
							data2 = datawork(data)
							this.$api.create_new_report(data2).then(v => {
								console.log(v)
								if(v.data.errcode == 0){
									this.loading = false
									this.dialogFormVisible = false
									this.searContent = ''
									this.searchModel = false
									this.$refs[formName].resetFields()
									this.error1 = ''
									this.$message({
										type:'success',
										message:'创建成功！'
									})
									this.getReportList()
								}else if(v.data.errcode == 1104){
									let _that = this
									getToken(commondata)
									setTimeout(() => {
										if(localStorage.getItem('tokenDone')){
											_that.createNewNow(formName)
										}
									}, 1000);
								}else{
									this.loading = false
									this.$message({
										type:'error',
										message:v.data.errmsg
									})
								}
							})
						}else{
							this.loading = false
							this.error1 = '请选择结束时间'
						}
					}
				} else {
					this.loading = false
					console.log('error submit!!');
					return false;
				}
			});
		},
		getReportAll(){
			this.loading = true
			let data = {}
			let data2 = {}
			let commondata = {}
			if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
				commondata = this.$store.state.login.commonParam
			}
			for(var i in commondata){
				data[i] = commondata[i]
			}
			data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
			data.timestamp = Math.round(new Date().getTime() / 1000).toString()
			if(this.userid){
				data.user_id = this.userid
			}else{
				data_user_id = '0'
			}
			if(this.uniquecode){
				data.unique_code = this.uniquecode
			}
			if(this.clientid && this.clientid.length > 0){
				data.client_id = this.clientid
			}
			if(localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
				data.access_token = localStorage.getItem('accesstoken')
			}
			data2 = datawork(data)
			this.$api.get_report_all(data2).then(v => {
				if(v.data.errcode == 0){
					this.loading = false
					this.reportslist = v.data.data.data
				}else if(v.data.errcode == 1104){
					let _that = this
					getToken(commondata)
					setTimeout(() => {
						if(localStorage.getItem('tokenDone')){
							_that.getReportAll()
						}
					}, 1000)
				}else{
				}
			})
		},
		getReportList(){
			this.loading = true
			let data = {}
			let data2 = {}
			let commondata = {}
			if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
				commondata = this.$store.state.login.commonParam
			}
			for(var i in commondata){
				data[i] = commondata[i]
			}
			data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
			data.timestamp = Math.round(new Date().getTime() / 1000).toString()
			if(this.userid){
				data.user_id = this.userid
			}else{
				data_user_id = '0'
			}
			if(this.uniquecode){
				data.unique_code = this.uniquecode
			}
			if(this.clientid && this.clientid.length > 0){
				data.client_id = this.clientid
			}
			if(localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
				data.access_token = localStorage.getItem('accesstoken')
			}
			if(this.bigType == 0){
			}else{
				data.type = this.bigType
			}
			if(this.f_time_type && this.f_time_type != ''){
				data.so = this.f_time_type
			}
			if(this.f_type){
				data.terms_type = this.f_type
			}
			if(this.searContent){
				data.keyword = this.searContent
			}
			if(this.pageNum1 == 1){

			}else{
				data.p = this.pageNum1
			}
			data2 = datawork(data)
			this.$api.get_report_list(data2).then(v => {
				if(v.data.errcode == 0){
					this.loading = false
					this.reportslist1 = v.data.data.data
					this.totalPage1 = Number(v.data.data.count)
					this.resultCount = Number(v.data.data.count)
				}else if(v.data.errcode == 1104){
					let _that = this
					getToken(commondata)
					setTimeout(() => {
						if(localStorage.getItem('tokenDone')){
							_that.getReportList()
						}
					}, 1000)
				}else{
					this.loading = false
					this.reportslist1 = []
				}
			})
		},
		filterTime(aa){
			this.pageNum1 = 1
			this.f_time_type = aa
			this.getReportList()		
		},
		filterType(aa){
			this.pageNum1 = 1
			this.f_type = aa
			this.getReportList()
		},
		reDetail(aa){
			this.$router.push({name:'reportDetail',query:{id:aa}})
			// type:bb,
			// ,title:cc
		},
		deleteRe(aa){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.loading = true
				let data = {}
				let data2 = {}
				let commondata = {}
				if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
					commondata = this.$store.state.login.commonParam
				}
				for(var i in commondata){
					data[i] = commondata[i]
				}
				data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
				data.timestamp = Math.round(new Date().getTime() / 1000).toString()
				if(this.userid){
					data.user_id = this.userid
				}else{
					data_user_id = '0'
				}
				if(this.uniquecode){
					data.unique_code = this.uniquecode
				}
				if(this.clientid && this.clientid.length > 0){
					data.client_id = this.clientid
				}
				if(localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
					data.access_token = localStorage.getItem('accesstoken')
				}
				data.id = Number(aa)
				data2 = datawork(data)
				this.$api.delete_report(data2).then(v => {
					if(v.data.errcode == 0){
						this.loading = false
						// this.f_time_type = ''
						// this.f_type = 0
						this.$message({
							type:'success',
							message:'删除成功！'
						})
						if(this.bigType == 0){
							this.getReportAll()
						}else{
							this.getReportList()
						}
					}else if(v.data.errcode == 1104){
						let _that = this
						getToken(commondata)
						setTimeout(() => {
							if(localStorage.getItem('tokenDone')){
								_that.deleteRe()
							}
						}, 1000)
					}else{
						this.$message({
							type:'error',
							message:'删除失败！'
						})
					}
				})
			}).catch(() => {
				this.$message({
					type:'info',
					message:'已取消删除！'
				})
			})
		},
		goSearch(){
			this.f_time_type = ''
			this.f_type = 0
			this.searchModel = true
			this.reportslist = []
			this.pageNum1 = 1
			this.getReportList()
		},
		searchInput(event){
		},
		get_data1(val) {
			this.pageNum1 = val
			this.getReportList()
		},
		cancleNewReport(formName){
			this.$confirm('此操作将清空您做出的选择, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.dialogFormVisible = false
				this.$refs[formName].resetFields();			
			}).catch(() => {
				this.$message({
					type:'info',
					message:'已取消！'
				})
			})
		},
		beforeCancel(formName){
			this.$confirm('此操作将清空您做出的选择, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.dialogFormVisible = false
				this.$refs['ruleForm'].resetFields()
				this.$refs['ruleForm2'].resetFields()	
			}).catch(() => {
				this.$message({
					type:'info',
					message:'已取消！'
				})
			})
		}
	},
	watch:{
		bigType(val){
			if(val ==0){
				this.reportslist1 = []
				this.getReportAll()
			}else{
				this.reportslist = []
				this.pageNum1 = 1
				this.getReportList()
			}
		},
		searContent(val){
			if(val == ''){
				this.searchModel = false
				if(this.bigType == 0){
					this.getReportAll()
				}else{
					this.pageNum1 = 1
					this.getReportList()
				}
			}else{

			}
		},
		timevalue2(val){
			if(this.timevalue3){
				let time1 = new Date(this.timevalue3).getTime()
				let time2 = new Date(this.timevalue2).getTime()
				if(time2 >= time1){
					this.error1 = '起始时间应小于结束时间'
				}else{
					this.error1 = ''
				}
			}
		},
		timevalue3(val){
			this.error1 = ''
			if(this.timevalue2){
				let time1 = new Date(this.timevalue3).getTime()
				let time2 = new Date(this.timevalue2).getTime()
				if(time2 >= time1){
					this.error1 = '起始时间应小于结束时间'
				}else{
					this.error1 = ''
				}
			}
		}
		// ruleForm(val) {
		// 	console.log('1')
		// 	if(val){
		// 		console.log(val)
		// 		if(val.)
		// 	}
		// 	if (this.$refs.refHandle) {
		// 		this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
		// 	}
		// }
	}
}
// }
</script>
<style lang="stylus" scoped>
.intellReport
	width 100%
	height 100%
	min-height 100%
	overflow auto
	// display flex
.inteLeft
	width 200px
	height calc(100% - 78px)
	max-height calc(100% - 78px)
	background-color #fff
	position fixed
	top 78px
	left 0
.all
	width 100%
	height 58px
	padding 0 18px
	box-sizing border-box
	margin-bottom 10px
	color #8E9099
	cursor pointer
	display flex
	align-items center
	span.iconfont
		margin-right 8px
		font-size 20px
	span.whatRe
		font-size 14px
.all:hover
	color #2C2D33
.allOn
	background linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white
	font-weight bold
	span.iconfont
		font-weight normal
.allOn:hover
	background linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white
.inteRight
	width calc(100% - 220px)
	padding-top 30px
	box-sizing border-box
	margin-left 220px
.search
	width 460px
	height 38px
	background-color #fff
	border-radius 8px
	margin-left 156px
	display flex
	// position relative
.searchBox
	width calc(100% - 58px)
	height 38px
	border none
	border-radius 8px 0 0 8px
	text-indent 15px
::-webkit-input-placeholder /*Webkit browsers*/
	color #CBCED8
:-moz-placeholder /*Mozilla Firefox 4 to 8*/
	color #CBCED8
::moz-placeholder/*Mozilla Firefox 19+*/
	color #CBCED8
:-ms-input-placeholder/*Internet Explorer 10+*/
	color #CBCED8
.searchIcon
	width 58px
	height 38px
	border-radius 0px 8px 8px 0px
	background #FF7437 url(../../../public/img/report/search.png) no-repeat center
	cursor pointer
.searchIcon:hover
	background-color #fe9b78
.searchTip
	font-size 12px
.reportContent
	width 100%
	padding 30px 20px 0 0
	box-sizing border-box
	// 这里声明了主要内容的字体大小
	font-size 12px
	color #8E9099
	line-height 14px
.conItem_title
	display flex
	align-items center
.reporTypeTitle
	font-size 20px
	color #000
	line-height 20px
.seeMoreBtn
	width 82px
	height 20px
	background #6389FB
	border-radius 10px
	margin-left 60px
	font-size 12px
	color #fff
	cursor pointer
	line-height 20px
	text-align center
.seeMoreBtn:hover
	background #7f94ff
.listUl
	padding 10px 0 20px 0
	box-sizing border-box
	display flex
	flex-direction column
	// flex-wrap wrap
	text-align center
.lisTitle
	width 100%
	height 36px
	background-color #fff
	border-radius 4px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-bottom 10px
	font-weight bold
	display flex
	align-items center
.titleNum
	width 13%
.titleT
	width 40%
.titleTime,.titleType
	width 15%
	position relative
	span
		background url(../../../public/img/report/filterIcon1.png) no-repeat right center
		background-size 7px
		padding-right 11px
		box-sizing border-box
		line-height 36px
		cursor pointer
	span:hover
		background-image url(../../../public/img/report/filterIcon.png)
	.timeFilterBox
		width 108px
		background #fff
		padding 12px 0
		box-sizing border-box
		box-shadow 0px 2px 8px 0px rgba(79,101,255,0.24)
		border-radius 4px
		display none
		position absolute
		top 26px
		left 50%
		margin-left -54px
		font-weight normal
		line-height 32px
		transition display 0.5s
		>div
			cursor pointer
		div:hover
			color #5C5D62
		.filterOn
			background #E9ECFE
			color #635EF9
.titleTime:hover,.titleType:hover
	.timeFilterBox
		display block	
.titleType
	width 15% !important
.titleDo
	width 17%
.listClass
	width 100%
	height 48px
	background-color #fff
	border-radius 4px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-bottom 20px
	display flex
	align-items center
	transition background-color 0.1s
.listClass:hover
	background-color #D3D8F4
.listItem
	// padding 0 6px
	white-space nowrap
	text-overflow ellipsis
	overflow hidden
.listNum
	width 13%
.listT
	width 40%
	color #2C2D33
	cursor pointer
.listTime
	width 15%
.listType
	width 15%
	color #5C5D62
.listDo
	width 17%
	color #5C5D62
	span
		cursor pointer
	.deleteIcon
		margin-left 20px
		color #8E9099
	span.seeDeIcon:hover
		color #635EF9
		text-decoration underline
	span.deleteIcon:hover
		color #635EF9
.noData
	// margin-bottom 50px
	font-size 20px
	text-align center
.noDatap2
	margin-top 10px
	font-size 14px
	color #8E9099
.noDataImg
	width 200px
	height 249px
	display block
	margin 0 auto
	margin-top 70px
	margin-bottom 10px
.reportPage
	padding 0
	padding-right 50px
	box-sizing border-box
	margin-bottom 50px
	text-align right
</style>
<style lang="stylus">
.el-dialog__wrapper.createNewBox
	.el-dialog__header
		padding-bottom 20px
		line-height 18px
	.el-dialog__body
		padding 20px 0 35px 0 !important
		.el-select
			width 360px
		.el-button
			margin-top 10px
		.el-button.el-button--primary
			background #9A7CFF
			border none
		.el-button.el-button--primary:hover
			background #C7B7FF
		.el-cascader .el-input
			width 160px

</style>