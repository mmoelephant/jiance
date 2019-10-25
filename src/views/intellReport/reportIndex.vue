<template>
<div style="height:100%" v-loading.fullscreen="loading">
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
									<span class="listItem listT" @click="reDetail(item1.id,item.id)">{{item1.title?item1.title:'--'}}</span>
									<span class="listItem listTime">{{item1.addtime?item1.addtime:'--'}}</span>
									<span class="listItem listType" 
									:style="item1.terms_type&&item1.terms_type == '月度'?'color:#EB7846':item1.terms_type == '年度'?'color:#F95E70':item1.terms_type == '季度'?'color:#4F65E1':''">
										{{item1.terms_type?item1.terms_type:'--'}}
									</span>
									<span class="listItem listDo">
										<span class="seeDeIcon" @click="reDetail(item1.id,item.id)">查看报告</span>
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
									<span class="listItem listT" @click="reDetail(item1.id,bigType)" v-show="!searchModel">{{item1.title?item1.title:'--'}}</span>
									<span class="listItem listT" @click="reDetail(item1.id,bigType)" v-show="searchModel">
										{{item1.title?item1.title.substr(0,item1.title.indexOf(searContent)):''}}
										<span style="color:#F2342B">{{searContent}}</span>
										{{item1.title?item1.title.substr(item1.title.indexOf(searContent) + searContent.length):''}}
									</span>
									<span class="listItem listTime">{{item1.addtime?item1.addtime:'--'}}</span>
									<span class="listItem listType" 
									:style="item1.terms_type&&item1.terms_type == '月度'?'color:#EB7846':item1.terms_type == '年度'?'color:#F95E70':item1.terms_type == '季度'?'color:#4F65E1':''">
									{{item1.terms_type?item1.terms_type:'--'}}
									</span>
									<span class="listItem listDo">
										<span class="seeDeIcon" @click="reDetail(item1.id,bigType)">查看报告</span>
										<span class="deleteIcon" @click="deleteRe(item1.id)" v-show="bigType != 1 && !searchModel">删除</span>
									</span>
								</li>
								<div class="noData" v-show="reportslist1.length == 0">
									<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
									<p class="noDatap1">暂时没有报告</p>
									<p class="noDatap2">不要着急，要不再试试~</p>
								</div>
								<el-pagination 
								:page-size="pageSize1" 
								:total="totalPage1" 
								:pager-count="5" 
								:current-page="pageNum1" 
								:hide-on-single-page="false" 
								layout="prev, pager, next" 
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
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="报告类型" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择报告类型" @change="changeType">
						<el-option v-for="item in reTypes" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
  				<el-form-item label="时间选择" prop="timeInterval">
  					<!-- <el-select v-model="ruleForm.timeInterval" :placeholder="word" @change="changeTime" v-if='ruleForm.type==2'>
  						<el-option v-for="item in seasons" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select> -->
					<el-date-picker v-model="ruleForm.timeInterval" @change="changeTime" :disabled="ruleForm.type?false:true" :type="timeType" 
					value-format='yyyy-MM-dd' format="yyyy-MM-dd" :placeholder="word" v-show="bigType == 2 && ruleForm.type != 2"></el-date-picker>
					<el-date-picker v-model="ruleForm.timeInterval" :disabled="ruleForm.type?false:true" :type="timeType" range-separator="至" :start-placeholder="startWord" :end-placeholder="endWord" 
					value-format='yyyy-MM-dd' format="yyyy-MM-dd" v-show="bigType == 3 && ruleForm.type == 3"></el-date-picker>
					<el-date-picker class="picker" v-model="ruleForm.timeInterval" :disabled="ruleForm.type?false:true" :type="timeType" :placeholder="startWord" 
					value-format='yyyy-MM-dd' format="yyyy-MM-dd" v-show="bigType == 3 && ruleForm.type == 1"></el-date-picker>
					<span style="margin:0 12px" v-show="bigType == 3 && ruleForm.type == 1">至</span>
					<el-date-picker class="picker" v-model="ruleForm.timeInterval2" :disabled="ruleForm.type?false:true" :type="timeType" :placeholder="endWord" 
					value-format='yyyy-MM-dd' format="yyyy-MM-dd" v-show="bigType == 3 && ruleForm.type == 1"></el-date-picker>
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
		</el-dialog>
		<el-dialog :visible.sync="detailDialog1" width="1000px" height="1000px">
			<p class="reTitle">{{reTitle}}</p>
			<div class="dataItem" v-for="(item,index) in reportDetailList" :key="index" >
				<p class="graphName" v-if='item.mm =="暂无数据"'>暂无数据</p>
				<p class="titleItem1" v-if='item.mm !="暂无数据"'>
					<span class="titleDot"></span>
					{{item.title}}
				</p>
				<p class="contentItem" v-if='item.mm !="暂无数据"'>
					<span v-if="time1.length == 1">{{item.title?item.title.substr(0,9):'-'}} 云南省 {{item.maName}}价格</span>
					<span v-else-if="time1.length == 4">{{item.title?item.title.substr(0,9):'-'}} 云南省 {{item.maName}}价格</span>
					<span v-else>
						<span v-if="item.title.indexOf('月') == 6">{{item.title?item.title.substr(0,7):'-'}}</span>
						<span v-else>{{item.title?item.title.substr(0,8):'-'}}</span> 云南省 {{item.maName}}价格</span>
					{{item.mmYn[index]&&item.mmYn[index].price?item.mmYn[index].price.toFixed(2):'-'}} 元/吨 
					指数{{item.mmYn[index]&&item.mmYn[index].exponent?item.mmYn[index].exponent.toFixed(2):''}}点 
					环比下降{{item.mmYn[index]&&item.mmYn[index].hb?(Number(item.mmYn[index].hb.toFixed(5)) * 100).toFixed(2):'-'}}%，
					同比下降{{item.mmYn[index]&&item.mmYn[index].tb?(Number(item.mmYn[index].tb.toFixed(5)) * 100).toFixed(2):'-'}}%。
				</p>
				<table class="tableBox" border="1" v-if='item.mm !="暂无数据"'>
					<thead>
						<tr>
							<th rowspan="2">地区</th>
							<th colspan="5">{{item.maName}} 单位：{{item.mm[0].munit}}</th>
						</tr>
						<!--季度-->
						<tr v-if="time1.length == 1">
							<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年' + item.title.substr(5,4)}}</th>
							<th v-if="time1 == 1">{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年第4季度'}}</th>
							<th v-else-if="time1 == 2">{{item.title.substr(0,5) + '第1季度'}}</th>
							<th v-else-if="time1 == 3">{{item.title.substr(0,5) + '第2季度'}}</th>
							<th v-else>{{item.title.substr(0,5) + '第3季度'}}</th>
							<th>{{item.title.substr(0,9)}}</th>
							<th>同比增长率(%)</th>
							<th>环比增长率(%)</th>
						</tr>
						<!--年度-->
						<tr v-else-if="time1.length == 4">
							<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年'}}</th>
							<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年'}}</th>
							<th>{{item.title.substr(0,5)}}</th>
							<th>同比增长率(%)</th>
							<th>环比增长率(%)</th>
						</tr>
						<!--月度-->
						<tr v-else>
							<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年' + item.title.substr(5,2)}}</th>
							<th>{{item.title.substr(5,1) == '1'?(parseInt(item.title.substr(0,4)) - 1).toString() + '年12月':item.title.substr(0,5) + (parseInt(item.title.substr(5,2)) - 1).toString() + '月'}}</th>
							<th>{{item.title.substr(0,7)}}</th>
							<th>同比增长率(%)</th>
							<th>环比增长率(%)</th>
						</tr>
					</thead>
					<tbody v-for="(aa,index2) in item.mm" :key="index2">
						<tr>
							<td>{{aa.areaName?aa.areaName:'-'}}</td>
							<td>{{aa.tbPrice?aa.tbPrice.toFixed(2):'-'}}</td>
							<td>{{aa.hbPrice?aa.hbPrice.toFixed(2):'-'}}</td>
							<td>{{aa.price?aa.price.toFixed(2):'-'}}</td>
							<td>{{aa.tb?(Number(aa.tb.toFixed(5)) * 100).toFixed(2):'-'}}%</td>
							<td>{{aa.hb?(Number(aa.hb.toFixed(5)) * 100).toFixed(2):'-'}}%</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td>{{item.mmYn[index]?item.mmYn[index].areaName:'-'}}</td>
							<td>{{item.mmYn[index]&&item.mmYn[index].tbPrice?item.mmYn[index].tbPrice.toFixed(2):'-'}}</td>
							<td>{{item.mmYn[index]&&item.mmYn[index].hbPrice?item.mmYn[index].hbPrice.toFixed(2):'-'}}</td>
							<td>{{item.mmYn[index]&&item.mmYn[index].price?item.mmYn[index].price.toFixed(2):'-'}}</td>
							<td>{{item.mmYn[index]&&item.mmYn[index].tb?(Number(item.mmYn[index].tb.toFixed(5)) * 100).toFixed(2):'-'}}%</td>
							<td>{{item.mmYn[index]&&item.mmYn[index].hb?(Number(item.mmYn[index].hb.toFixed(5)) * 100).toFixed(2):"-"}}%</td>
						</tr>
					</tfoot>
				</table>
				<div :id="'main'+index" style="width: 600px;height:400px;margin:30px auto 20px;" v-if="item.mm != '暂无数据'"></div>
				<div :id="'main1'+index" style="width: 600px;height:400px;margin:30px auto 20px;" v-if="item.mm != '暂无数据'"></div>
			</div>
			<div class="lazyPic" :style="detaiLazy1"></div>
		</el-dialog>
		<el-dialog :visible.sync="detailDialog" width="1000px">
			<p class="reTitle">{{detailTitle}}</p>
			<div class="dataItem">
				<p class="graphName" v-if='noDataMsg !="查询成功"'>暂无数据</p>
				<p style="margin-top:20px" v-if='noDataMsg =="查询成功"'>
					<span class="titleDot"></span>
					据对16个州、市建设工程7大类26小类主要材料市场价格的监测显示，{{time3}}与{{time2}}相比，{{riseNum}}类材料价格上涨，{{descendNum}}类下降，{{unbiasedNum}}类持平。
				</p>
				<p class="graphName" v-if='noDataMsg =="查询成功"'>{{detailTitle.split('省')[1]}}</p>
				<table class="tableBox" border="1" v-if='noDataMsg =="查询成功"'>
					<thead>
						<tr>
							<th>材料名称</th>
							<th>单位</th>
							<th>本期价格（元）</th>
							<th>比上期价格涨跌(元)</th>
							<th>涨跌幅(%)</th>
						</tr>
					</thead>
					<tbody v-for="(item,index) in reportDetailList1" :key="index">
						<tr>
							<td style="font-weight:bold;text-align:left;text-indent:10px" colspan="5">{{item.mmB[0].maName}}</td>
						</tr>
						<tr v-for="(item1,index1) in item.mm" :key="index1">
							<td style="text-indent:2px;text-align:left;text-indent:30px">{{item1.maName}}</td>
							<td>{{item1.munit?item1.munit:'-'}}</td>
							<td>{{item1.price?item1.price.toFixed(2):'-'}}</td>
							<td>{{item1.hbPrice?(item1.price -item1.hbPrice).toFixed(2):'-'}}</td>
							<td>{{item1.hb?(item1.hb.toFixed(5) * 100).toFixed(2):'-'}}</td>	
						</tr>
					</tbody>
					<tfoot class="tableFoot">
						<tr>
							<td colspan="5">注：上期为{{time2}}</td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div class="lazyPic" :style="detaiLazy"></div>
			<div class="notes" v-if="noDataMsg =='查询成功'">
				<p class="noTitle">附注：</p>
				<p>1.建设工程主要材料市场价格，是指材料的市场综合采购参考价，即材料在指定范围内和对应时间区间的市场综合平均价格。</p>
				<p>2.建设工程主要材料的检测内容包括7大类26小类材料的价格。</p>
				<p>3.发布日期：每月15日</p>
			</div>
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
			word:'请选择月份',
			startWord:'请选择开始月份',
			endWord:'请选择结束月份',
			timeType:'month',
			reTypes:[],
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
			// type切换网格视图或列表视图
			type:1,
			token:this.$store.state.login.token,	
			// state2:'',
			resultVis:false,
			searchTip:false,
			lazyUlVis:true,
			resultReport:[],
			systemReport:[],
			customReport:[],
			new:'new',
			newHidden:false,
			pageNum2:1,
			pageSize2:14,
			totalPage2:14,
			pageNum3:1,
			pageSize3:14,
			totalPage3:14,
			noImg:false,
			noImgCustom:false,
			noImgResult:false,
			seasons:[
				{id:1,name:'第1季度'},
				{id:2,name:'第2季度'},
				// {id:3,name:'第三季度'},
				// {id:4,name:'第四季度'},
			],
			timeRange:'month',
			// timeType:1,
			detailDialog1:false,
			detailDialog:false,
			reTitle:'',
			detailTitle:'云南省建设工程主要材料市场价格变动情况',
			reportDetailList:[],
			reportDetailList1:[],
			time1:'',
			time2:'',
			time3:'',
			riseNum:0,
			descendNum:0,
			unbiasedNum:0,
			noDataMsg:'',
			detaiLazy:{
				display:''
			},
			detaiLazy1:{
				display:''
			},
			materiProp:{
				value: 'id',
				label:'name',
				children: 'childrenList'
			},
		}
	},
	created(){
		console.log(this.ruleForm.type)
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
				console.log(v)
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
			console.log(vv)
			if(this.bigType == 2){
				if(vv == 1){
					this.word = "请选择年份"
					this.timeType = 'year'
				}else if(vv == 3){
					this.word = '请选择月份'
					this.timeType = 'month'
				}
			}else if(this.bigType == 3){
				if(vv == 1){
					this.startWord = "请选择开始年份"
					this.endWord = '请选择结束年份'
					this.timeType = 'year'
				}else if(vv == 3){
					this.startWord = '请选择开始月份'
					this.endWord = '请选择结束月份'
					this.timeType = 'monthrange'
				}
			}
			// if(vv == 1){
			// 	this.season.display = 'none'
			// 	this.timeRange = 'month'
			// 	this.word = '请选择月份'
			// 	this.ruleForm.timeInterval = ''
			// 	this.timeType = 1	
			// }else if(vv == 2){
			// 	this.season.display = ''
			// 	this.word = '请选择季度'
			// 	this.ruleForm.timeInterval = ''
			// 	this.timeType = 2
			// }else{
			// 	this.season.display = 'none'
			// 	this.timeRange = 'year'
			// 	this.word = '请选择年份'
			// 	this.ruleForm.timeInterval = ''
			// 	this.timeType = 3
			// }
		},
		changeTime(vv){
			console.log(vv)
			this.ruleForm.timeInterval = vv
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
					data.terms_type = this.ruleForm.type
					data.categorys_ids = JSON.stringify(this.ruleForm.materialType)
					data.areas_ids = JSON.stringify(this.ruleForm.compareRegion)
					if(this.bigType == 2){
						data.terms = this.ruleForm.timeInterval
					}
					if(this.bigType == 3){
						if(this.ruleForm.type == 3){
							data.start_terms = this.ruleForm.timeInterval[0]
							data.end_terms = this.ruleForm.timeInterval[1]
						}else if(this.ruleForm.type == 1){
							console.log(this.ruleForm.timeInterval2)
							data.start_terms = this.ruleForm.timeInterval
							data.end_terms = this.ruleForm.timeInterval2
						}
					}
					data2 = datawork(data)
					this.$api.create_new_report(data2).then(v => {
						if(v.data.errcode == 0){
							this.loading = false
							this.dialogFormVisible = false
							this.searContent = ''
							this.searchModel = false
							this.$refs[formName].resetFields()
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
								message:'创建失败！'
							})
						}
					})
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
				console.log(v)
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
			console.log(data)
			this.$api.get_report_list(data2).then(v => {
				console.log(v)
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
		reDetail(aa,bb){
			// this.$router.push({name:'reportDetail',query:{type:bb}})
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
		drawGraph(aa,bb){
			if(aa.mm=='暂无数据') return 
			let x = [],y = []
			const mycharts = this.$echarts.init(document.getElementById('main'+bb))
			aa.mm.forEach(item => {
				x.push(item.areaName)
				y.push(item.price)
			})
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:['价格']
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						min: 0,
						max: 6000,
						interval: 1000,
						axisLabel: {
							formatter: '{value}'
						}
					}
				],
				series:[
					{
					name:'价格',
					type:'bar',
					color: ['#637CFB','#FE9B78'],
					data:y,
					barWidth:30
					},
				]
			}
			mycharts.setOption(option,true)
		},
		drawGraph1(aa,bb){
			if(aa.mm=='暂无数据') return
			let x = [],y =[],z=[]
			const mycharts1 = this.$echarts.init(document.getElementById('main1'+bb))
			aa.mm.forEach(item => {
				x.push(item.areaName)
				y.push(item.tbPrice)
				z.push(item.hbPrice)
			})
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:['同比价格','环比价格']
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						min: 0,
						max: 6000,
						interval: 1000,
						axisLabel: {
							formatter: '{value}'
						}
					}
				],
				series:[
					{
					name:'同比价格',
					type:'line',
					color:['#637CFB'],
					data:y,
					},
					{
					name:'环比价格',
					type:'line',
					color:['#FE9B78'],
					data:z,
					}
				]
			}
			mycharts1.setOption(option,true)
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
				this.$refs['ruleForm'].resetFields();			
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
		}
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
	padding 20px 0
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


// .newRe
// 	width 154px
// 	height 24px
// 	background #8B78FE
// 	padding-left 12px
// 	border 1px solid #6C56F5
// 	box-sizing border-box
// 	border-radius 14px
// 	color #fff
// 	position relative
// 	top -20px
// 	left 118px
// 	display flex
// 	align-items center
// 	cursor pointer
// 	span
// 		margin-left 6px
// .newRe:hover
// 	background-color #9f8ffe
// .gridUl
// 	padding 20px 10px
// 	box-sizing border-box
// 	display flex
// 	flex-wrap wrap
// .lazyUl
// 	padding 20px 10px
// 	box-sizing border-box
// 	display flex
// 	flex-direction row
// 	flex-wrap wrap
// 	justify-content flex-start
// .lazyLi
// 	width 208px
// 	height 240px
// 	background url(../../../public/img/report/lazyImg2.png) no-repeat center
// 	border-radius 8px
// 	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
// 	margin-right 20px
// 	margin-bottom 20px
// .lazyLi1
// 	width 208px
// 	height 240px
// 	background url(../../../public/img/report/lazyImg3.png) no-repeat center
// 	border-radius 8px
// 	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
// 	margin-right 20px
// 	margin-bottom 20px
// .systemVis
// 	display none
// .customVis
// 	display none
// .newVis
// 	display none
// .gridListClass
// 	width 208px
// 	height 240px
// 	background-color #ffffff
// 	border-radius 8px
// 	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
// 	margin-right 20px
// 	margin-bottom 20px
// 	cursor pointer
// 	display flex
// 	flex-direction column
// 	transition all .2s
// .gridListClass:hover
// 	background-color #E8EBF9
// 	margin-top -10px
// .gridListClass:nth-child(6n)
// 	margin-right 0
// .reportImg
// 	width 116px
// 	height 116px
// 	margin 30px auto 8px auto
// .reportIcon
// 	width 116px
// 	height 116px
// 	margin 13px auto 2px auto
// .reportMateri
// 	display flex
// 	span
// 		max-width 170px
// 		background-color #2B94FE
// 		padding 0 6px
// 		border-radius 4px
// 		box-sizing border-box
// 		margin 0 10px
// 		color #fff
// 		line-height 18px
// 		white-space nowrap
// 		text-overflow ellipsis
// 		overflow hidden
// .reportMateri1
// 	background-color #FEAC2B!important
// .typedd
// 	display flex
// 	align-items center
// 	justify-content space-between
// 	padding 0 10px
// 	box-sizing border-box
// 	margin-top 10px
// .reporType
// 	width 46px
// 	height 18px
// 	background #F83B5F
// 	border 1px solid #D9193D
// 	box-sizing border-box
// 	border-radius 9px
// 	color #fff
// 	line-height 17px
// 	text-align center
// .reporType1
// 	width 46px
// 	height 18px
// 	background #643BF8
// 	border 1px solid #4B22E0
// 	box-sizing border-box
// 	border-radius 9px
// 	line-height 18px
// 	text-align center
// .reporType2
// 	width 46px
// 	height 18px
// 	background #52B4FF
// 	border 1px solid #1184DC
// 	box-sizing border-box
// 	border-radius 9px
// 	line-height 18px
// 	text-align center
// .reportarea
// 	width 70px
// 	height 12px
// 	color #8E9099
// 	line-height 12px
// 	text-align right
// 	overflow hidden
// 	text-overflow ellipsis
// 	white-space nowrap
// .reporTitle
// 	max-height 40px
// 	padding 0 16px 0 10px
// 	box-sizing border-box
// 	line-height 20px
// 	overflow hidden
// 	text-overflow ellipsis
// .reporTitle1
// 	padding 0 14px 0 10px
// 	box-sizing border-box
// 	margin 10px 0
// 	line-height 14px
// 	overflow hidden
// 	text-overflow ellipsis
// 	white-space nowrap
// .timeArea
// 	display flex
// 	align-items center
// 	justify-content space-between
// 	padding 0 10px
// 	box-sizing border-box
// .reporTime
// 	font-size 12px
// 	color #999999
// 	overflow hidden
// 	text-overflow ellipsis
// 	white-space nowrap
// .toDetail
// 	border-right 1px solid #8E9099
// 	box-sizing border-box
// 	color #454EFF
// .toDetail:hover
// 	color #7f94ff
// .deleteRe
// 	color #FF7437
// .deleteRe:hover
// 	color #fc9d74
// .reTitle
// 	font-size 16px
// 	font-weight bold
// 	line-height 30px
// 	text-align center
// .dataItem
// 	padding 20px
// .graphName
// 	font-weight bold
// 	text-align center
// 	margin-top 30px
// .titleItem1
// 	font-size 14px
// 	font-weight bold
// 	line-height 28px
// 	box-sizing border-box
// 	margin-top 30px
// .titleDot
// 	width 8px
// 	height 8px
// 	display inline-block
// 	background #7F94FF
// 	border-radius 50%
// 	margin-right 4px
// 	line-height 28px
// .tableBox
// 	width 100%
// 	border 1px #ccc solid
// 	border-collapse collapse
// 	margin-top 20px
// 	font-size 14px
// 	text-align center
// .tableFoot
// 	text-align left
// 	td
// 		padding-left 30px
// 		text-align left
// .lazyPic
// 	width 100%
// 	height 825px
// 	background url(../../../public/img/report/lazyPic.png) no-repeat center
// .notes
// 	padding 20px
// 	.noTitle
// 		font-weight bold
// 	p
// 		font-size 14px
// 		line-height 24px

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
		.el-date-editor.picker.el-input
			width 160px

</style>


