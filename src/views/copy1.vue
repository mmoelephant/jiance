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