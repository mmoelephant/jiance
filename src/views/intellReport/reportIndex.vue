<template>
<router-view v-if='$route.name == "reportDetail"'></router-view>
<!-- v-loading.fullscreen="loading" style="height:100%" -->
<div style="height:auto;" v-else>
	<div class="intellReport">
		<div class="inteLeft">
			<div :class="bigType == 0?'all allOn':'all'">全部报告</div>
			<div v-for="item in leftItems" :key="item.id" :class="bigType == item.id?'all allOn':'all'">
				<span class="reIcons" style="font-family:reIcons" v-show="item.id == 1">&#xe60b;</span>
				{{item.name}}
			</div>
		</div>
		<div class="inteRight">
			<div class="reportBtns">
				<div class="btnClass"><span class="dotClass"></span>智能报告  >&nbsp<span class="navigiOn">{{ navigiOn}}</span></div>
				<div class="viewToggle">
					<span :class="type == 0?'view1 viewActive':'view1'" @click="choose(0)">网格显示</span>
					<span :class="type == 1?'view2 viewActive':'view2'" @click="choose(1)">列表显示</span>
				</div>
				<div class="search">
					<input class="searchBox" placeholder="请输入需要检索的报告标题" v-model="searContent">
					<!-- <a href="javascript:void(0)" @click="goSearch"><div class="searchIcon"></div></a> -->
					<div class="searchIcon" @click="goSearch"></div>
				</div>
			</div>
			<div class="reportContent">
				<div class="searchTip" v-show="searchTip">搜索
					<span class="keyWord">{{'“' + searContent + '”'}}</span>结果如下：<a href="javascript:void(0)" class="goback" @click="goback">返回</a>
				</div>
				<div class="gridView" v-show="type == 0">
					<!-- :style="viewToggle" -->
					<!-- 月度智能报告(网格视图) -->
					<div v-show="bigType != 2">
						<!-- :style="allVis" -->
						<el-badge value="new" :hidden="newHidden"><p class="reporTypeTitle">月度智能报告</p></el-badge>
						<ul class="gridUl" v-show="!lazyUlVis">
							<li class="gridListClass" v-for="item in systemReport" :key="item.id" @click="toDetail_system(item.id)">
								<img src="../../../public/img/report/more.png" class="reportImg" v-if="item.materialClassID&&item.materialClassID.indexOf(',') != -1">
								<img src="../../../public/img/report/single.png" class="reportImg" v-else>
								<p class="reporTitle">云南省建设工程主要材料市场价格变动情况</p>
								<p class="reporTime">
									<span v-if="item.timeInterval.length == 6">
										{{item.timeInterval?item.timeInterval.substr(0,4) + '年' + item.timeInterval.substr(5,1) + '月':'-'}}
									</span>
									<span v-else>
										{{item.timeInterval?item.timeInterval.substr(0,4) + '年' + item.timeInterval.substr(5,2) + '月':'-'}}
									</span>
								</p>
							</li>
						</ul>
						<ul class="lazyUl" v-show="lazyUlVis">
							<!-- :style="lazyUlVis"  -->
							<li class="lazyLi"></li>
						</ul>
						<div class="noData" v-show="noImg">
							<!-- :style="noImg"  -->
							<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
							<p class="noDatap1">暂时没有报告</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize1" :total="totalPage1" :pager-count="5" :current-page="pageNum1" :hide-on-single-page="true" layout="prev, pager, next" 
						class="reportPage" @current-change="get_data1" v-show='bigType==1'>
						</el-pagination>
					</div>
					<!-- 自定义报告(网格视图) -->
					<div v-show="bigType != 1">
						<!-- :style="allVis" -->
						<el-badge value="new" :hidden="newHidden"><p class="reporTypeTitle">自定义报告</p></el-badge>
						<div style="height:0">
							<div class="newRe" v-show="bigType == 2" @click="openDialog">
								<img src="../../../public/img/report/add.png">
								<span>新建自定义报告</span>
							</div>
						</div>
						<ul class="gridUl" v-show="!lazyUlVis" style="border:1px red solid">
							<!-- <li class="gridListClass">
								<div class="typedd">
									<div class="reporType" @click="toDetail(item.id)">月报</div>
									<img src="../../../public/img/report/delete.png" class="deleteIcon" @click="deleteRe(item.id)">
								</div>
								<img src="../../../public/img/report/more1.png" class="reportIcon" @click="toDetail(item.id)">
								<div class="reportMateri" @click="toDetail(item.id)">
									<span>单材料-钢材</span>
								</div>
								<p class="reporTitle1" @click="toDetail(item.id)">某某同报告</p>
								<div class="timeArea">
									<p class="reporTime" @click="toDetail(item.id)">2019-06-24</p>
									<p class="reportarea" @click="toDetail(item.id)">昆明</p>
								</div>
							</li> -->
							<li class="gridListClass" v-for="item in customReport" :key="item.id">
								<img src="../../../public/img/report/more1.png" class="reportIcon" v-if="item.materialClassID&&item.materialClassID.indexOf(',') != -1" 
								@click="toDetail(item.id)">
								<img src="../../../public/img/report/single1.png" class="reportIcon" v-else @click="toDetail(item.id)">
								<!-- <a href="javascript:void(0)" v-if="item.materialClassID&&item.materialClassID.indexOf(',') != -1" @click="toDetail(item.id)"> -->
								<!-- <a href="javascript:void(0)" v-else @click="toDetail(item.id)"> -->
								<!-- </a> -->
								<div :class="item.materialClassID&&item.materialClassID.indexOf(',') != -1?'reportMateri':'reportMateri reportMateri1'" 
								@click="toDetail(item.id)">

									{{item.materialClassID&&item.materialClassID.indexOf(',') != -1?item.materialName:'单材料-' + item.materialName}}
								</div>
								<div class="reporType" v-if="item.dataType == 1" @click="toDetail(item.id)">月报</div>
								<div class="reporType1" v-else-if="item.dataType == 2" @click="toDetail(item.id)">季报</div>
								<div class="reporType2" v-else @click="toDetail(item.id)">年报</div>
								<img src="../../../public/img/report/delete.png" class="deleteIcon" @click="deleteRe(item.id)">
								<!-- <a href="javascript:void(0)">
									
								</a> -->
								<p class="reportarea" @click="toDetail(item.id)">{{item.areaName}}</p>
								<p class="reporTitle1" @click="toDetail(item.id)">{{item.title}}</p>
								<p class="reporTime" @click="toDetail(item.id)">{{item.createTimeStr?item.createTimeStr:'-'}}</p>
							</li>
						</ul>
						<ul class="lazyUl" v-show="lazyUlVis">
							<li class="lazyLi1"></li>
						</ul>
						<div class="noData" v-show="noImgCustom">
							<!-- :style="noImgCustom"  -->
							<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
							<p class="noDatap1">暂时没有报告</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize2" :total="totalPage2" :pager-count="5" :current-page="pageNum2" :hide-on-single-page="true" 
						layout="prev, pager, next" class="reportPage" @current-change="get_data2" v-show='bigType==2'>
						</el-pagination>
					</div>
				</div>
				<div class="listView" v-show="type == 1">
					<!-- :style="viewToggle1" -->
					<!-- 月度智能报告(列表视图) -->
					<div v-show="bigType != 2">
						<!-- :style="allVis" -->
						<el-badge value="new" :hidden="newHidden"><p class="reporTypeTitle">月度智能报告</p></el-badge>
						<ul class="listUl">
							<li class="lisTitle">
								<span class="titleItem titleNum">序号</span>
								<span class="titleItem titleT">报告标题</span>
								<span class="titleItem titleTime">创建时间</span>
								<span class="titleItem titleDo">操作</span>
							</li>
							<li class="listClass" v-for="(item,index) in systemReport" :key="index">
								<span class="listItem listNum">{{index < 9 ?"YD00" + (index + 1):"YD0" + (index+1)}}</span>
								<span class="listItem listT" @click="toDetail_system(item.id)">
									<a href="javascript:void(0)">
										云南省建设工程主要材料市场价格变动情况
										<span v-if="item.timeInterval.length == 6">
											{{item.timeInterval?item.timeInterval.substr(0,4) + '年' + item.timeInterval.substr(5,1) + '月':'-'}}
										</span>
										<span v-else>
											{{item.timeInterval?item.timeInterval.substr(0,4) + '年' + item.timeInterval.substr(5,2) + '月':'-'}}
										</span>
									</a>
								</span>
								<span class="listItem listTime">{{item.createTimeStr?item.createTimeStr:'-'}}</span>
								<span class="listItem listDo"><a href="javascript:void(0)" @click="toDetail_system(item.id)">查看报告></a></span>	
							</li>
						</ul>
						<div class="noData" v-show="noImg">
							<!-- :style="noImg"  -->
							<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
							<p class="noDatap1">暂时没有报告</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize1" :total="totalPage1" :pager-count="5" :current-page="pageNum1" :hide-on-single-page="true" 
						layout="prev, pager, next" class="reportPage" @current-change="get_data1">
						</el-pagination>
					</div>
					<!-- 自定义报告(列表视图) -->
					<div v-show="bigType != 1">
						<!-- :style="allVis" -->
						<el-badge value="new" :hidden="newHidden"><p class="reporTypeTitle">自定义报告</p></el-badge>
						<div class="newRe" v-show="bigType == 2" @click="openDialog">
							<img src="../../../public/img/report/add.png">
							<span>新建自定义报告</span>
						</div>
						<ul class="listUl">
							<li class="lisTitle">
								<span class="titleItem titleNum_custom">序号</span>
								<span class="titleItem titleT_custom">报告标题</span>
								<span class="titleItem titleType_custom">类型
									<span class="filterDo">
										<a href="javascript:void(0)" class="lift" title="升序" @click="lift(0)"></a>
										<a href="javascript:void(0)" class="down" title="降序" @click="down(0)"></a>
									</span>
								</span>
								<span class="titleItem titleTime_custom">创建时间
									<span class="filterDo" style="margin-left:32px">
										<a href="javascript:void(0)" class="lift" title="升序" @click="lift(1)"></a>
										<a href="javascript:void(0)" class="down" title="降序" @click="down(1)"></a>
									</span>
								</span>
								<span class="titleItem titleDo_custom">操作</span>
							</li>
							<li class="listClass" v-for="(item,index) in customReport" :key="index">
								<span class="listItem listNum_custom">{{index < 9 ?"YD00" + (index + 1):"YD0" + (index+1)}}</span>
								<span class="listItem listT_custom" @click="toDetail(item.id)">
									<a href="javascript:void(0)">
										{{item.title?item.title.substr(0,25)+'...':'-'}}
									</a>
								</span>
								<span class="listItem listType_custom" v-if="item.dataType == 1">月度</span>
								<span class="listItem listType_custom1" v-else-if="item.dataType == 2">季度</span>
								<span class="listItem listType_custom2" v-else>年度</span>
								<span class="listItem listTime_custom">{{item.createTimeStr?item.createTimeStr:'-'}}</span>
								<span class="listItem listDo_custom">
									<a href="javascript:void(0)" class="toDetail" @click="toDetail(item.id)">查看报告</a>
									<a href="javascript:void(0)" class="deleteRe" @click="deleteRe(item.id)">删除</a>
								</span>	
							</li>
						</ul>
						<div class="noData" v-show="noImgCustom">
							<!-- :style="noImgCustom"  -->
							<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
							<p class="noDatap1">暂时没有报告</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize2" :total="totalPage2" :pager-count="5" :current-page="pageNum2" :hide-on-single-page="true" 
						layout="prev, pager, next" class="reportPage" @current-change="get_data2">
						</el-pagination>
					</div>
					<div v-show="resultVis">
						<!-- :style="resultVis"  -->
						<ul class="listUl">
							<li class="lisTitle">
								<span class="titleItem titleNum">编号</span>
								<span class="titleItem titleT">报告标题</span>
								<span class="titleItem titleTime">创建时间</span>
								<span class="titleItem titleDo">操作</span>
							</li>
							<li class="listClass" v-for="(item,index) in resultReport" :key="index">
								<span class="listItem listNum">{{index < 9 ?"YD00" + (index + 1):"YD0" + (index+1)}}</span>
								<span class="listItem listT" @click="toDetail_system(item.id)" v-if="item.type == 1">
									<a href="javascript:void(0)">
										{{item.title.substr(0,item.title.indexOf(searContent))}}
										<span style="color:#F2342B">{{searContent}}</span>
										{{item.title.substr(item.title.indexOf(searContent) + searContent.length)}}
										<span v-if="item.timeInterval.length == 6">
											{{item.timeInterval?item.timeInterval.substr(0,4) + '年' + item.timeInterval.substr(5,1) + '月':'-'}}
										</span>
										<span v-else>{{item.timeInterval?item.timeInterval.substr(0,4) + '年' + item.timeInterval.substr(5,2) + '月':'-'}}</span>
									</a>
								</span>
								<span class="listItem listT" @click="toDetail(item.id)" v-if="item.type == 2">
									<a href="javascript:void(0)">
										{{item.title.substr(0,item.title.indexOf(searContent))}}
										<span style="color:#F2342B">{{searContent}}</span>
										{{item.title.substr(item.title.indexOf(searContent) + searContent.length).slice(0,10)}}...
									</a>
								</span>
								<span class="listItem listTime">{{item.createTimeStr?item.createTimeStr:'-'}}</span>
								<span class="listItem listDo" v-if="item.type == 1"><a href="javascript:void(0)" @click="toDetail_system(item.id)">查看报告></a></span>	
								<span class="listItem listDo" v-if="item.type == 2"><a href="javascript:void(0)" @click="toDetail(item.id)">查看报告></a></span>	
							</li>
						</ul>
						<div class="noData" v-show="noImgResult">
							<!-- :style="noImgResult"  -->
							<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
							<p class="noDatap1">暂时没有报告</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize3" :total="totalPage3" :pager-count="5" :current-page="pageNum3" :hide-on-single-page="true" 
						layout="prev, pager, next" class="reportPage" @current-change="get_data3">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="新建自定义报告" :visible.sync="dialogFormVisible" width="620px">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding:20px">
				<el-form-item label="报告名称" prop="name">
					{{ruleForm.name}}
				</el-form-item>
				<el-form-item label="报告类型" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择报告类型" @change="changeType" :style="ruleFormClass">
						<el-option v-for="item in reType" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
  				<el-form-item label="时间选择" prop="timeInterval">
  					<el-select v-model="ruleForm.timeInterval" :placeholder="word" :style="season" @change="changeTime" v-if='ruleForm.type==2'>
  						<el-option v-for="item in seasons" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
					<el-date-picker v-model="ruleForm.timeInterval" :style="timePicker" @change="changeTime" :type="timeRange" value-format='yyyy-MM' range-separator="至" 
					:placeholder="word" v-if="ruleForm.type == 1 || ruleForm.type == ''">
					</el-date-picker>
					<el-date-picker v-model="ruleForm.timeInterval" :style="timePicker" @change="changeTime" :type="timeRange" value-format='yyyy' 
					:placeholder="word" v-if='ruleForm.type == 3'>
					</el-date-picker>
  				</el-form-item>
  				<el-form-item label="材料类型" prop="materialType">
					<el-select v-model="ruleForm.materialType" multiple placeholder="请选择材料类型" @change="changeMateri" :style="ruleFormClass">
						<el-option class="matetiBig" v-for="item in material" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="对比地区" prop="compareRegion">
  					<el-select v-model="ruleForm.compareRegion" multiple placeholder="请选择对比地区" @change="changeRegion" :style="ruleFormClass">
  						<el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item>
  					<el-button type="primary" @click="submitForm('ruleForm')" class="newNow">立即创建</el-button>
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
import {datawork} from '../../plugins/datawork.js'
import { getToken } from '../../plugins/gettoken.js'
export default {
	data() {
		return {
			leftItems:[],
			bigType:1,
			navigiOn:'全部报告',
			// type切换网格视图或列表视图
			type:1,
			token:this.$store.state.login.token,
			searContent:'',
			// state2:'',
			resultVis:false,
			searchTip:false,
			lazyUlVis:true,
			resultReport:[],
			systemReport:[],
			customReport:[],
			new:'new',
			newHidden:false,
			pageNum1:1,
			pageSize1:14,
			totalPage1:14,
			pageNum2:1,
			pageSize2:14,
			totalPage2:14,
			pageNum3:1,
			pageSize3:14,
			totalPage3:14,
			noImg:false,
			noImgCustom:false,
			noImgResult:false,
			dialogFormVisible: false,
			reType:[
				{id:1,name:'月度数据报告'},
				{id:2,name:'季度数据报告'},
				{id:3,name:'年度数据报告'},
			],
			seasons:[
				{id:1,name:'第1季度'},
				{id:2,name:'第2季度'},
				// {id:3,name:'第三季度'},
				// {id:4,name:'第四季度'},
			],
			material:[],
			regions:[],
			ruleForm: {
				name: '请先选择相应的报告内容',
				type:'',
				timeInterval: '',
				materialType:'',
				compareRegion:'',
			},
			ruleFormClass:{
				width:'360px'
			},
			timeRange:'month',
			timeType:1,
			word:'请选择月份',
			season:{
				display:'none',
				width:'360px'
			},
			timePicker:{
				display:'',
				width:'360px'
			},
			rules: {
				type: [
					{required: true, message: '请选择报告类型', trigger: 'change'}
				],
				timeInterval: [
					{required: true, message: '请选择时间节点', trigger: 'change'}
				],
				materialType: [
					{required: true, message: '请选择材料类型', trigger: 'focus'}
				],
				compareRegion: [
					{required: true, message: '请选择对比地区', trigger: 'focus'}
				]
			},
			loading:true,
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
		console.log(this.$store.state.login.commonParam)
		let commondata = {}
		let data = {}
		let data1 = {}
		let clientid = localStorage.getItem('clientid')
		let accesstoken = localStorage.getItem('accesstoken')
		if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
			commondata = this.$store.state.login.commonParam
		}
		for(var i in commondata){
			data[i] = commondata[i]
		}
		data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
		data.timestamp = Math.round(new Date().getTime() / 1000).toString()
		if(localStorage.getItem('userid')){
			data.user_id = localStorage.getItem('userid')
		}else{
			data_user_id = 0
		}
		if(localStorage.getItem('uniquecode')){
			data.unique_code = localStorage.getItem('uniquecode')
		}
		if(clientid && clientid.length > 0){
			data.client_id = clientid
		}
		if(accesstoken && accesstoken.length > 0){
			data.access_token = accesstoken
		}
		data1 = datawork(data)
		this.$api.get_report_left(data1).then(v => {
			console.log(v)
			if(v.data.errcode == 0){
				this.leftItems = v.data.data.data
			}
		})
		// var data1 = {
		// 	pageNum:this.pageNum1,
		// 	pageSize:this.pageSize1,
		// 	token:this.token,
		// 	type:1,
		// 	dataType:1
		// }
		// var data2 = {
		// 	pageNum:this.pageNum2,
		// 	pageSize:this.pageSize2,
		// 	token:this.token,
		// 	type:2
		// }	
		// 获取平台报告
		this.$api.get_reports(data1).then(v => {
			if(v.data.count != null){
				this.lazyUlVis = false
				this.noImg = false
				this.systemReport = v.data.list
				this.totalPage1 = v.data.count
			}else{
				this.noImg = true
				this.lazyUlVis = false
				this.systemReport = []
				this.totalPage1 = 0
			}
			this.$nextTick(() => {
				this.loading = false
			})
		})
		this.$api.get_reports(data2).then(v => {
			if(v.data.count != null){
				this.noImgCustom = false
				this.customReport = v.data.list
				this.totalPage2 = v.data.count
			}else{
				this.noImgCustom = true
				this.customReport = []
				this.totalPage2 = 0
			}
		})
		this.$api.get_area().then(res => {
			this.regions = res.data
		})
		this.$api.get_cate().then(res => {
			res.data.map( item=> {
				item.childrenList.map(aa => {
					this.material.push(aa)
				})
			})
		})
	},
	mounted() {
    },
	methods:{
		toggleBig:function(aa,bb){
			this.bigType = aa
			this.navigiOn = bb
			if(aa == 0){
				this.newHidden = false
			}else{
				this.newHidden = true
			}
		},
		choose:function(status){
			this.type = status
		},
		goSearch(){
			this.resultReport = []
			this.type = 1
			this.resultVis = true
			this.loading = true
			var data17 = {
				pageNum:this.pageNum3,
				pageSize:this.pageSize3,
				token:this.token,
				title:this.searContent	
			}
			this.$api.get_reports(data17).then(v => {
				this.loading = false
				if(v.data.count != null){
					this.searchTip = true
					this.noImgResult = false
					this.resultReport = v.data.list
					this.totalPage3 = v.data.count
				}else{
					this.searchTip = true
					this.noImgResult = true
					this.resultReport = []
					this.totalPage3 = 0
				}
			})
		},
		goback(){
			this.loading = true
			this.type = 0
			this.resultReport = []
			this.resultVis = false
			this.searchTip = false
			this.noImgResult = false
			this.searContent = ''
			this.loading = false
		},
		get_data1(val) {
			this.pageNum1 = val
			var data5 = {
				pageNum:val,
				pageSize: this.pageSize1,
				token:this.token,
				type:1,
				dataType:1
			}
			this.loading = true
			this.$api.get_reports(data5).then(v => {
				this.loading = false
				if(v.data.count != null){
					this.noImg = false
					this.systemReport = v.data.list
					this.totalPage1 = v.data.count
				}else{
					this.noImg = true
					this.systemReport = []
					this.totalPage1 = 0
				}
			})
		},
		get_data2(val){
			this.pageNum2 = val
			var data6 = {
				pageNum:val,
				pageSize:this.pageSize2,
				token:this.token,
				type:2
			}
			this.loading = true
			this.$api.get_reports(data6).then(v => {
				this.loading = false
				if(v.data.count != null){
					this.noImgCustom = false
					this.customReport = v.data.list
					this.totalPage2 = v.data.count
				}else{
					// this.noImgCustom.display = 'block'
					this.noImgCustom = true
					this.customReport= []
					this.totalPage2 = 0
				}
			})
		},
		get_data3(val){
			this.pageNum3 = val
			var data18 = {
				pageNum:val,
				pageSize:this.pageSize3,
				token:this.token,
			}
			this.loading = true
			this.$api.get_reports(data18).then(v => {
				this.loading = false
				if(v.data.count != null){
					this.noImgResult = false
					this.resultReport = v.data.list
					this.totalPage3 = v.data.count
				}else{
					this.noImgResult.display = 'block'
					this.noImgResult = true
					this.resultReport= []
					this.totalPage3 = 0
				}
			})
		},
		deleteRe(dd){
			var data9 = {
				id:dd
			}
			var data10 = {
				pageNum:this.pageNum2,
				pageSize:this.pageSize2,
				token:this.token,
				type:2
			}
			var data12 = {
				pageSize:14,
				token:this.token,
				type:2
			}
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$api.delete_report(data9).then(v => {
					if(v.data.msg == 'success'){
						this.$api.get_reports(data10).then(v => {
							if(v.data.count != null){
								this.noImgCustom = false
								this.customReport = v.data.list
								this.totalPage2 = v.data.count
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
							}else{
								this.$api.get_reports(data12).then(v => {
									if(v.data.count != null){
										this.noImgCustom = false
										this.customReport = v.data.list
										this.totalPage2 = v.data.count
										this.$message({
											type:'success',
											message:'删除成功！'
										})
									}else{
										this.noImgCustom = true
										this.customReport = []
										this.totalPage2 = 0
										this.$message({
											type:'info',
											message:'获取失败！'
										})
									}
								})
							}
						})
					}else{
						this.$message({
							type: 'error',
							message: '删除失败!'
						})
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		toDetail(aa){
			this.detailDialog1 = true
			var data13 = {
				id:aa,
				token:this.token
			}
			this.$api.get_reports_detail(data13).then(v =>{
				this.reTitle = v.data.data.title
				this.detaiLazy1.display = 'none'
				this.reportDetailList = v.data.data.mapList
				this.time1 = v.data.data.timeInterval
				this.$nextTick(() => {
					this.reportDetailList.forEach((item,index) => {
						this.drawGraph(item,index)
						this.drawGraph1(item,index)
					})
				
				})
			})
		},
		toDetail_system(cc){
			this.detailDialog = true
			var data14 = {
				id:cc,
				token:this.token
			}
			this.$api.get_reports_detail(data14).then(v =>{
				v.data.data.dataList.map(item => {
					item.mm.map(m => {
					switch(m.maName){
						case '钢筋':
							m.munit = '吨'
						break;
						case '钢板':
							m.munit = '吨'
						break;
						case '钢管':
							m.munit = '吨'
						break;
						case '型钢':
							m.munit = '吨'
						break;
						case '钢绞线':
							m.munit = '千克'
						break;
						case '钢丝绳':
							m.munit = '千克'
						break;
						case '水泥':
							m.munit = '吨'
						break;
						case '建筑用砂':
							m.munit = '立方米'
						break;
						case '砌体材料':
							m.munit = '吨'
						break;
						case '建筑用石':
							m.munit = '立方米'
						break;
						case '轻骨料':
							m.munit = '立方米'
						break;
						case '地基用材':
							m.munit = '立方米'
						break;
						case '混凝土':
							m.munit = '立方米'
						break;
						case '建筑砂浆':
							m.munit = '立方米'
						break;
						case '电力电缆':
							m.munit = '米'
						break;
						case '电气装备用电线电缆':
							m.munit = '米'
						break;
						case '其他电气材料':
							m.munit = '米'
							m.maName = '其他电力材料'
						break;
						case '非金属管':
							m.munit = '米'
						break;
						case '复合管':
							m.munit = '米'
						break;
						case '金属管':
							m.munit = '吨'
						break;
						case '防水卷材':
							m.munit = '平方米'
						break;
						case '防水涂料':
							m.munit = '千克'
						break;
						case '防水砂浆':
							m.munit = '吨'
						break;
						case '特种琉璃':
							m.munit = '平方米'
							m.maName = '特种玻璃'
						break;
						case '混凝土管':
							m.munit = '米'
						break;
						case '混凝土预制桩':
							m.munit = '米'
						break;
					}
					})					
				})
				this.reportDetailList1 = v.data.data.dataList
				this.detaiLazy.display = 'none'
				this.detailTitle = '云南省建设工程主要材料市场价格变动情况' + '(' + v.data.data.year.toString() + '年' + v.data.data.month.toString() + '月' + ')'
				this.time3 = v.data.data.year.toString() + '年' + v.data.data.month.toString() + '月'
				this.riseNum = v.data.data.rise
				this.descendNum = v.data.data.descend
				this.unbiasedNum = v.data.data.unbiased
				this.noDataMsg = v.data.msg
				if( v.data.data.month == 1){
					this.time2 = (v.data.data.year - 1).toString() + '年12月'
				}else{
					this.time2 = v.data.data.year.toString() + '年' + (v.data.data.month - 1).toString() + '月'
				}
			})
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
		lift(aa){
			var data22 = {
				pageNum:this.pageNum2,
				pageSize:this.pageSize2,
				token:this.token,
				type:2,
				orderType:aa,
				orderWay:1
			}
			this.loading = true
			this.$api.get_reports(data22).then(v => {
				this.loading = false
				if(v.data.count != null){
					// this.noImgCustom.display = 'none'
					this.noImgCustom = false
					this.customReport = v.data.list
					this.totalPage2 = v.data.count
					this.$message({
						type:'success',
						message:'排序成功'
					})
				}else{
					// this.noImgCustom.display = 'block'
					this.noImgCustom = true
					this.customReport = []
					this.totalPage2 = 0	
					this.$message({
						type:'error',
						message:'暂未获取到数据'
					})
				}
			})
		},
		down(aa){
			var data22 = {
				pageNum:this.pageNum2,
				pageSize:this.pageSize2,
				token:this.token,
				type:2,
				orderType:aa,
				orderWay:0
			}
			this.loading = true
			this.$api.get_reports(data22).then(v => {
				this.loading = false
				if(v.data.count != null){
					// this.noImgCustom.display = 'none'
					this.noImgCustom = false
					this.customReport = v.data.list
					this.totalPage2 = v.data.count
					this.$message({
						type:'success',
						message:'排序成功'
					})
				}else{
					// this.noImgCustom.display = 'block'
					this.noImgCustom = true
					this.customReport = []
					this.totalPage2 = 0	
					this.$message({
						type:'error',
						message:'暂未获取到数据'
					})
				}
			})
		},
		openDialog(){
			this.dialogFormVisible = true
		},
		ruleFormName(){
			let cate_list =[]
			this.ruleForm.materialType.map( item=> {
				this.material.map(cate => {
					if(item == cate.id) {
						cate_list.push(cate.name)
					}
				})
			})
			let area_list = []
			this.ruleForm.compareRegion.map(item => {
				this.regions.map(area => {
					if(item == area.id) {
						area_list.push(area.name)
					}
				})
			})
			if(this.timeType == 1){
				this.ruleForm.name = this.ruleForm.timeInterval.split('-')[0] + '年' + this.ruleForm.timeInterval.split('-')[1] + '月' + area_list.toString() + cate_list.toString() + '月度数据报告'
			}else if(this.timeType == 2){
				let jidu = ''
				this.seasons.map(ji => {
					if(this.ruleForm.timeInterval == ji.id){
						jidu = ji.name
					}
				})
				this.ruleForm.name = '2019年' + jidu + area_list.toString() + cate_list.toString() + '季度数据报告'
			}else{
				this.ruleForm.name = this.ruleForm.timeInterval.substr(0,4) + '年' + area_list.toString() + cate_list.toString() + '年度数据报告'
			}
		},
		changeType(vv){
			if(vv == 1){
				this.season.display = 'none'
				this.timeRange = 'month'
				this.word = '请选择月份'
				this.ruleForm.timeInterval = ''
				this.timeType = 1	
			}else if(vv == 2){
				this.season.display = ''
				this.word = '请选择季度'
				this.ruleForm.timeInterval = ''
				this.timeType = 2
			}else{
				this.season.display = 'none'
				this.timeRange = 'year'
				this.word = '请选择年份'
				this.ruleForm.timeInterval = ''
				this.timeType = 3
			}
		},
		changeTime(){
			this.ruleFormName()
		},
		changeMateri(){
			this.ruleFormName()
		},
		changeRegion(){
			this.ruleFormName()
		},
		openTip(){
			this.$message({
				showClose:true,
				message:'创建成功！',
				type:'success',
				duration:2000				
			})
		},
		openTip1(){
			this.$message({
				showClose:true,
				message:'创建失败！',
				type:'error',
				duration:2000				
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var data8 = {
						type:2,
						dataType:this.ruleForm.type,
						token:this.token,
						timeInterval:this.ruleForm.timeInterval,
						materialClassID:this.ruleForm.materialType.toString(),
						contrastRegionID:this.ruleForm.compareRegion.toString(),
						name:this.ruleForm.name
					}
					var data11 = {
						pageNum:this.pageNum2,
						pageSize:this.pageSize2,
						token:this.token,
						type:2
					}
					this.$api.add_report(data8).then(v =>{
						if(v.data.msg == 'success'){
							this.dialogFormVisible = false
							this.$refs[formName].resetFields()
							this.$api.get_reports(data11).then(v => {
								if(v.data.count != null){
									// this.noImgCustom.display = 'none'
									this.noImgCustom = false
									this.customReport = v.data.list
									this.totalPage2 = v.data.count
									this.$message({
										type: 'success',
										message: '创建成功!'
									})
								}else{
									// this.noImgCustom.display = 'block'
									this.noImgCustom = true
									this.customReport= []
									this.totalPage2 = 0
									this.$message({
										type: 'info',
										message: '重新加载失败!'
									})
								}
							})
						}else{
							this.dialogFormVisible = false
							this.$refs[formName].resetFields()
							this.openTip1()
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		cancleNewReport(formName){
			this.dialogFormVisible = false
			this.$refs[formName].resetFields();
		},
    }
	}
// }
</script>

<style lang="stylus" scoped>

.el-dialog__body
	padding 20px !important
.intellReport
	width 100%
	height auto
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
.all,.month,.custom
	width 100%
	height 58px
	padding 0 18px
	box-sizing border-box
	margin-bottom 10px
	font-size 14px
	color #8E9099
	cursor pointer
	display flex
	align-items center
	span
		font-size 20px

.all:hover
	color #2C2D33

.allOn
	background linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white
	font-weight bold

.allOn:hover
	background linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white

.month
	background url(../../../public/img/report/month_grey.png) no-repeat 15px 15px !important

.month:hover
	background #F5F6FE url(../../../public/img/report/month_black.png) no-repeat 15px 15px !important
	color #2C2D33

.monthOn
	background url(../../../public/img/report/month_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white
	font-weight bold

.monthOn:hover
	background url(../../../public/img/report/month_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white

.custom
	background url(../../../public/img/report/custom_grey.png) no-repeat 15px 15px !important

.custom:hover
	background #F5F6FE url(../../../public/img/report/custom_black.png) no-repeat 15px 15px !important
	color #2C2D33

.customOn
	background url(../../../public/img/report/custom_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white
	font-weight bold

.customOn:hover
	background url(../../../public/img/report/custom_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
	color white

.inteRight
	width calc(100% - 220px)
	padding-top 30px
	box-sizing border-box
	margin-left 220px

.searchTip
	margin-bottom 30px
	font-size 20px

.keyWord
	color #F2342B

.goback
	margin-left 20px
	color #454EFF
	text-decoration underline

.goback:hover
	margin-left 20px
	color #676efe
.view1,.view2
	cursor pointer

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

.reportContent
	width 100%
	padding 40px 0
	box-sizing border-box
	font-size 14px
	color #333
	line-height 14px

.reporTypeTitle
	font-size 20px
	color #000
	line-height 20px

.newRe
	width 154px
	height 24px
	background #8B78FE
	padding-left 12px
	border 1px solid #6C56F5
	box-sizing border-box
	border-radius 14px
	color #fff
	position relative
	top -20px
	left 118px
	display flex
	align-items center
	cursor pointer
	span
		margin-left 6px
.newRe:hover
	background-color #9f8ffe
// .newRe1
// 	display none

.gridUl
	padding 20px 10px
	box-sizing border-box
	display flex
	flex-wrap wrap

.lazyUl
	padding 20px 10px
	box-sizing border-box
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start

.lazyLi
	width 208px
	height 240px
	background url(../../../public/img/report/lazyImg2.png) no-repeat center
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px

.lazyLi1
	width 208px
	height 240px
	background url(../../../public/img/report/lazyImg3.png) no-repeat center
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px
	
.systemVis
	display none

.customVis
	display none

.newVis
	display none

.gridListClass
	width 208px
	height 240px
	background-color #ffffff
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px
	cursor pointer
	display flex
	flex-direction column
	transition all .2s

.gridListClass:hover
	background-color #E8EBF9
	margin-top -10px

.gridListClass:nth-child(6n)
	margin-right 0

.gridListClass:hover .deleteIcon
	display block

.reportImg
	width 116px
	height 116px
	margin 30px auto 8px auto
.reportIcon
	width 116px
	height 116px
	margin 13px auto 2px auto

.deleteIcon
	width 20px
	height 20px
	display none
.reportMateri
	display flex
	span
		max-width 170px
		background-color #2B94FE
		padding 0 6px
		border-radius 4px
		box-sizing border-box
		margin 0 10px
		color #fff
		line-height 18px
		white-space nowrap
		text-overflow ellipsis
		overflow hidden

.reportMateri1
	background-color #FEAC2B!important

.typedd
	display flex
	align-items center
	justify-content space-between
	padding 0 10px
	box-sizing border-box
	margin-top 10px
.reporType
	width 46px
	height 18px
	background #F83B5F
	border 1px solid #D9193D
	box-sizing border-box
	border-radius 9px
	color #fff
	line-height 17px
	text-align center
.reporType1
	width 46px
	height 18px
	background #643BF8
	border 1px solid #4B22E0
	box-sizing border-box
	border-radius 9px
	line-height 18px
	text-align center
.reporType2
	width 46px
	height 18px
	background #52B4FF
	border 1px solid #1184DC
	box-sizing border-box
	border-radius 9px
	line-height 18px
	text-align center
.reportarea
	width 70px
	height 12px
	color #8E9099
	line-height 12px
	text-align right
	overflow hidden
	text-overflow ellipsis
	white-space nowrap

.reporTitle
	max-height 40px
	padding 0 16px 0 10px
	box-sizing border-box
	line-height 20px
	overflow hidden
	text-overflow ellipsis

.reporTitle1
	padding 0 14px 0 10px
	box-sizing border-box
	margin 10px 0
	line-height 14px
	overflow hidden
	text-overflow ellipsis
	white-space nowrap

.timeArea
	display flex
	align-items center
	justify-content space-between
	padding 0 10px
	box-sizing border-box

.reporTime
	font-size 12px
	color #999999
	overflow hidden
	text-overflow ellipsis
	white-space nowrap

.reportPage
	padding 0
	padding-right 80px
	box-sizing border-box
	margin-bottom 50px
	text-align right

.listUl
	padding 20px 10px
	border 1px red solid
	box-sizing border-box
	display flex
	flex-direction column
	flex-wrap wrap
	text-align center

.lisTitle
	width 100%
	height 36px
	background-color #fff
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-bottom 10px
	color #5C5D62
	line-height 36px
	display flex

.titleItem
	display inline-block

.titleNum
	width 10%
.titleT
	width 45%
.titleTime
	width 35%
.titleDo
	width 10%

.titleNum_custom
	width 10%
.titleT_custom
	width 40%

.titleType_custom
	width 10%
	position relative

.titleTime_custom
	width 24%
	position relative

.filterDo
	position absolute
	top 0
	left 50%
	margin-left 16px

.lift
	display block
	width 18px
	height 18px
	background url(../../../public/img/report/normal.png) no-repeat left bottom

.lift:hover
	background url(../../../public/img/report/hover.png) no-repeat left bottom

.down
	display block
	width 20px
	height 18px
	background url(../../../public/img/report/normal1.png) no-repeat left top

.down:hover
	background url(../../../public/img/report/hover1.png) no-repeat left top
 
.titleDo_custom
	width 16%

.listClass
	width 100%
	height 48px
	background-color #fff
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-bottom 20px
	line-height 48px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content flex-start
	transition background-color 0.1s

.listClass:hover
	background-color #D3D8F4

.listItem
	display inline-block
	padding 0 6px
	white-space nowrap
	text-overflow ellipsis
	overflow hidden

.listNum
	width 10%
	color #8E9099
.listT
	width 45%
	color #2C2D33
	a
		color #2c2d33
	a:hover
		color #7f94ff

.listTime
	width 35%
	color #8E9099
.listDo
	width 10%
	color #454EFF
	a
		color #454EFF
	a:hover
		color #7f94ff

.listNum_custom
	width 10%
	color #8E9099
.listT_custom
	width 40%
	color #2C2D33
	a
		color #2c2d33
	a:hover
		color #7f94ff

.listType_custom
	width 10%
	color #F83B5F
.listType_custom1
	width 10%
	color #643BF8
.listType_custom2
	width 10%
	color #52B4FF

.listTime_custom
	width 24%
	color #8E9099

.listDo_custom
	width 16%
	color #454EFF
	a
		padding 0 12px

.toDetail
	border-right 1px solid #8E9099
	box-sizing border-box
	color #454EFF
.toDetail:hover
	color #7f94ff

.deleteRe
	color #FF7437
.deleteRe:hover
	color #fc9d74

.noData
	margin-bottom 50px
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
	margin-top 50px
	margin-bottom 10px

.reTitle
	font-size 16px
	font-weight bold
	line-height 30px
	text-align center

.dataItem
	padding 20px

.graphName
	font-weight bold
	text-align center
	margin-top 30px

.titleItem1
	font-size 14px
	font-weight bold
	line-height 28px
	box-sizing border-box
	margin-top 30px
.titleDot
	width 8px
	height 8px
	display inline-block
	background #7F94FF
	border-radius 50%
	margin-right 4px
	line-height 28px

.tableBox
	width 100%
	border 1px #ccc solid
	border-collapse collapse
	margin-top 20px
	font-size 14px
	text-align center
.tableFoot
	text-align left
	td
		padding-left 30px
		text-align left

.lazyPic
	width 100%
	height 825px
	background url(../../../public/img/report/lazyPic.png) no-repeat center

.notes
	// margin-top 20px
	padding 20px
	.noTitle
		font-weight bold
	p
		font-size 14px
		line-height 24px


</style>


