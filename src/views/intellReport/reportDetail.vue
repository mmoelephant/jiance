<template>
<div style="width:100%;height:100%">
    <div class="reportDetail">
        <div class="detailRight">
			<div class="reportBtns">
				<div class="btnClass">
                    <span class="dotClass"></span>
                    <span style="color:#8E9099">{{reType == 1?'智能数据报告':reType == 2?'地区对比报告':'时间对比报告'}}  >&nbsp</span>
                    <span class="navigiOn">报告详情</span>
                </div>
                <div class="backBtn" @click="back(reType)">
                    <i class="iconfont">&#xe606;</i>
                    <span>返回</span>
                </div>
			</div>
            <div class="detailBox">
                <p class="bigTit">{{reTitle}}</p>
                <div class="markInfo">
                    <div class="source">来源：<span>行列科技</span></div>
                    <div class="timeInfo">发布时间：<span>{{addtime}}</span></div>
                </div>
                <div class="summary" v-show="reType == 1">
                    据对16个州、市建设工程{{bigcate}}大类{{smallcate}}小类主要材料的监测显示，本期与上期相比，
                    <span style="color:#F96E31">{{upnum}}</span>类材料上涨，<span style="color:#0CCE63">{{downnum}}</span>类下降，<span>{{holdnum}}</span>类持平。
                </div>
                <div class="summary" v-show="reType == 2 || reType == 3">
                    本报告选取{{areasname}}{{areasnum}}个地区，针对{{catesname}}{{catesnum}}种材料进行相关对比分析。
                </div>
                <div class="mianTable">
                    <!-- <div class="tableTil" v-show="reType == 1">建筑工程主要材料市场指数变动情况统计表</div> -->
                    <div>
                        <div class="m-table" v-for="item in listdata" :key="item.id" v-show="reType == 1" style="margin-top:20px">
                            <p class="mateName">{{item.name}}</p>
                            <ul class="mateList">
                                <li class="listName">
                                    <span class="colItem col1">材料名称</span>
                                    <span class="colItem col2">环比指数</span>
                                    <span class="colItem col3">环比增长速度（%）</span>
                                </li>
                                <li class="listItem" v-for="item1 in item.children" :key="item1.id">
                                    <span class="colItem1 col1">{{item1.name}}</span>
                                    <span class="colItem1 col2">{{item1.data.chain_index&&item1.data.chain_index != {}?item1.data.chain_index:'--'}}</span>
                                    <span class="colItem1 col3">{{item1.data.chain_rate&&item1.data.chain_rate != {}?item1.data.chain_rate:'--'}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="notes" v-html="note" v-show="reType == 1"></div>
                        <div v-for="item in listdata1" :key="item.id" v-show="reType == 2 || reType == 3">
                            <p class="itemTitle" v-show="reType == 2">{{item.name}}材料多地区指数对比分析</p>
                            <p class="itemTitle" v-show="reType == 3">{{areasname}}{{item.name}}材料各时间段指数对比分析</p>
                            <el-popover class='sm' placement="bottom-start" width="200" trigger="hover" title="指数说明">
                                <p>
                                    反映了市场材料价格变动情况的相对数。定基指数=（报告期价格/基期价格）* 基期价格指数
                                </p>
                                <p>基准期：2018年1月</p>
                                <p>基期价格指数：1000</p>
                                <div slot="reference">
                                    <img src="../../../public/img/wh.png" alt="">
                                    指数定义说明
                                </div>
                            </el-popover>
                            <ul class="mateList" v-show="reType == 2">
                                <li class="listName">
                                    <span class="colItem col4">地区</span>
                                    <span class="colItem col7">{{hbdate}}(环比)</span>
                                    <span class="colItem col5">{{tbdate}}(同比)</span>
                                    <span class="colItem col6">{{now}}</span>
                                    <span class="colItem col9">环比增长速度（%）</span>
                                    <span class="colItem col8">同比增长速度（%）</span>
                                </li>
                                <li class="listItem" v-for="item1 in item.data" :key="item1.id">
                                    <span class="colItem1 col4">{{item1.name}}</span>
                                    <span class="colItem1 col7">{{item1.prevData && item1.prevData.base_index_b?item1.prevData.base_index_b:'--'}}</span>
                                    <span class="colItem1 col5">{{item1.prevYearsData && item1.prevYearsData.base_index_b?item1.prevYearsData.base_index_b:'--'}}</span>
                                    <span class="colItem1 col6">{{item1.data && item1.data.base_index_b?item1.data.base_index_b:'--'}}</span>
                                    <span class="colItem1 col9">
                                        {{item1.data && item1.data.chain_rate?item1.data.chain_rate:'--'}}
                                        <img src="../../../public/img/上.png" alt="" v-show='item1.data && item1.data.chain_rate && Number(item1.data.chain_rate) > 0'>
                                        <img src="../../../public/img/下.png" alt="" v-show='item1.data && item1.data.chain_rate && Number(item1.data.chain_rate) < 0'>
                                        <img src="../../../public/img/bp.png" alt="" v-show='item1.data && item1.data.chain_rate && Number(item1.data.chain_rate) == 0'>
                                    </span>
                                    <span class="colItem1 col8">
                                        {{item1.data && item1.data.years_rate?item1.data.years_rate:'--'}}
                                        <img src="../../../public/img/上.png" alt="" v-show='item1.data && item1.data.years_rate && Number(item1.data.years_rate) > 0'>
                                        <img src="../../../public/img/下.png" alt="" v-show='item1.data && item1.data.years_rate && Number(item1.data.years_rate) < 0'>
                                        <img src="../../../public/img/bp.png" alt="" v-show='item1.data && item1.data.years_rate && Number(item1.data.years_rate) == 0'>
                                    </span>
                                </li>
                            </ul>
                            <ul class="mateList" v-show="reType == 3">
                                <li class="listName">
                                    <span class="colItem" v-for="item1 in item.data" :key="item1.id" :style="'width:' + itemWidth + '%'">{{item1.name?item1.name:'--'}}</span>
                                </li>
                                <li class="listItem">
                                    <span class="colItem1" v-for="item1 in item.data" :key="item1.id" :style="'width:' + itemWidth + '%'">{{item1.data && item1.data.base_index_b?item1.data.base_index_b:'--'}}</span>
                                </li>
                            </ul>
                            <p class="itemTitle" v-show="reType == 2">{{item.name}}材料多地区指数同比统计图</p>
                            <div :id="'main1' + item.id" ref="chart1" style="width: 900px;height:400px;margin:0 auto" v-show="reType == 2"></div>
                            <p class="itemTitle" v-show="reType == 2">{{item.name}}材料多地区指数环比统计图</p>
                            <div :id="'main2' + item.id" style="width: 900px;height:400px;margin:0 auto" v-show="reType == 2"></div>
                            <p class="itemTitle" v-show="reType == 2">{{item.name}}材料多地区指数同比、环比增长趋势统计图</p>
                            <div :id="'main3' + item.id" style="width: 900px;height:400px;margin:0 auto" v-show="reType == 2"></div>
                            <p class="itemTitle" v-show="reType == 3">{{areasname}}{{item.name}}材料各时间段指数对比统计图</p>
                            <div :id="'main4' + item.id" style="width: 900px;height:400px;margin:0 auto" v-show="reType == 3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-tooltip placement="top" content="回到顶部">
        <BackToTop :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade"/>
    </el-tooltip>
</div>
</template>
<script>
import $ from 'jquery'
import {datawork} from '../../plugins/datawork.js'
import { getToken } from '../../plugins/gettoken.js'
import  BackToTop from '../../components/back-to-top'
export default {
    data(){
        return {
            termtype:1,
            reType:1,
            reId:0,
            reTitle:'',
            author:'',
            addtime:'',
            bigcate:0,
            smallcate:0,
            upnum:0,
            downnum:0,
            holdnum:0,
            listdata:[],
            userid:0,
            uniquecode:'',
            clientid:'',
            note:'',
            areasname:'',
            areasnum:0,
            catesname:'',
            catesnum:0,
            listdata1:[],
            tbdate:'',
            hbdate:'',
            now:'',
            itemWidth:10,
            myBackToTopStyle: {
                right: '50px',
                bottom: '50px',
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                lineHeight: '45px', // 请保持与高度一致以垂直居中
                // background: '#78A4FE'// 按钮的背景颜色
            }
        }
    },
    components:{BackToTop},
    created(){
        this.reId = Number(this.$route.query.id)
        this.userid = localStorage.getItem('userid')
        this.uniquecode = localStorage.getItem('uniquecode')
        this.clientid = localStorage.getItem('clientid')
        this.get_detail()
    },
    mounted(){  
    },
    methods:{
        get_detail(){
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
            data.id = this.reId
            data2 = datawork(data)
            this.$api.get_report_detail(data2).then(v => {
                if(v.data.errcode == 0){
                    this.termtype = Number(v.data.data.selfData.terms_type)
                    this.reType = Number(v.data.data.selfData.type)
                    this.reTitle = v.data.data.selfData.title
                    this.author = v.data.data.selfData.author
                    this.addtime = v.data.data.selfData.addtime
                    if(v.data.data.selfData.type == '1'){
                        this.bigcate = v.data.data.othersData.big
                        this.smallcate = v.data.data.othersData.small
                        this.upnum = v.data.data.othersData.up
                        this.downnum = v.data.data.othersData.down
                        this.holdnum = v.data.data.othersData.just
                        this.listdata = v.data.data.data
                        this.note = v.data.data.othersData.htmldata
                    }else{
                        this.termtype = Number(v.data.data.selfData.terms_type)
                        this.terms = JSON.parse(v.data.data.selfData.terms_content)
                        this.areasname = v.data.data.othersData.areas_name
                        this.areasnum = v.data.data.othersData.areas_number
                        this.catesname = v.data.data.othersData.categorys_name
                        this.catesnum = v.data.data.othersData.categorys_number
                        this.listdata1 = v.data.data.data
                        this.tbdate = v.data.data.othersData.prev_years_terms_name
                        this.hbdate = v.data.data.othersData.prev_terms_name
                        this.$nextTick(() => {
                            if(this.reType == 2){
                                this.nowDate(this.termtype)
                                this.listdata1.forEach(item => {
                                    this.renderGraph(item,item.id)
                                    this.renderGraph2(item,item.id)
                                    this.renderGraph3(item,item.id)
                                })
                            }else if(this.reType == 3){
                                this.listdata1.forEach(item => {
                                    this.itemWidth = 100 / item.data.length
                                    this.renderGraph4(item,item.id)
                                })
                            }
                        })
                    }
                }else if(v.data.errcode == 1104){
                    let _that = this
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.get_detail()
                        }
                    }, 1000);
                }else{

                }
            })
        },
        nowDate(data){
            if(data == 1){
                this.now = this.terms[0].slice(0,4) + '年'
            }else if(data == 3){
                this.now = this.terms[0].slice(0,4) + '年' + this.terms[0].slice(6,7) + '月'
            }else{
                if(this.terms[0].slice(6,7) == 1){
                    this.now = this.terms[0].slice(0,4) + '年第一季度'
                }else if(this.terms[0].slice(6,7) == 4){
                    this.now = this.terms[0].slice(0,4) + '年第二季度'
                }else if(this.terms[0].slice(6,7) == 7){
                    this.now = this.terms[0].slice(0,4) + '年第三季度'
                }else{
                    this.now = this.terms[0].slice(0,4) + '年第四季度'
                }
                
            }
        },
        renderGraph(data,aa){
            let x = []
            let y = []
            let z = []
            let label1 = this.now + '指数'
            let label2 = this.tbdate + '指数'
            const mycharts = this.$echarts.init(document.getElementById('main1' + aa))
            if(data && data.data){
                data.data.forEach(item => {
                    x.push(item.name)
                    if(item.data){
                        if(item.data.base_index_b){
                            z.push(Number(item.data.base_index_b))
                        }else{
                            z.push(0)
                        }
                    }else{
                        z.push(0)
                    }
                    if(item.prevYearsData){
                        if(item.prevYearsData.base_index_b){
                            y.push(Number(item.prevYearsData.base_index_b))
                        }else{
                            y.push(0)
                        }
                    }else{
                        y.push(0)
                    }
                })
            }
            var option = {
                xAxis: {
                    data: x,
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    z: 10
                },
                yAxis: {
                    name: '指数',
                    nameTextStyle:{
                        color:'#8E9099'
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                },
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
                },
                legend: {
                    data: [label1, label2],
                },
                series: [
                    {
                        name:label1,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new  this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#FF6278'},
                                        {offset: 1, color: '#F0314C'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: z
                    },
                    {
                        name:label2,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#8F65F7'},
                                        {offset: 1, color: '#6B41ED'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: y
                    }
                ]
            }
            mycharts.setOption(option,true)
        },
        renderGraph2(data,aa){
            let x = []
            let y = []
            let z = []
            let label1 = this.now + '指数'
            let label2 = this.hbdate + '指数'
            const mycharts = this.$echarts.init(document.getElementById('main2' + aa))
            if(data && data.data){
                data.data.forEach(item => {
                    x.push(item.name)
                    if(item.data){
                        if(item.data.base_index_b){
                            z.push(Number(item.data.base_index_b))
                        }else{
                            z.push(0)
                        }
                    }else{
                        z.push(0)
                    }
                    if(item.prevData){
                        if(item.prevData.base_index_b){
                            y.push(Number(item.prevData.base_index_b))
                        }else{
                            y.push(0)
                        }
                    }else{
                        y.push(0)
                    }
                })
            }
            var option = {
                xAxis: {
                    data: x,
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    z: 10
                },
                yAxis: {
                    name: '指数',
                    nameTextStyle:{
                        color:'#8E9099'
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                },
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
                },
                legend: {
                    data: [label1, label2],
                },
                series: [
                    {
                        name:label1,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new  this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#52EFA0'},
                                        {offset: 1, color: '#1CD596'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: z
                    },
                    {
                        name:label2,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#8F65F7'},
                                        {offset: 1, color: '#6B41ED'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: y
                    }
                ]
            }
            mycharts.setOption(option,true)
        },
        renderGraph3(data,aa){
            let x = []
            let y = []
            let z = []
            let label1 = '同比增长速度'
            let label2 = '环比增长速度'
            const mycharts = this.$echarts.init(document.getElementById('main3' + aa))
            if(data && data.data){
                data.data.forEach(item => {
                    x.push(item.name)
                    if(item.prevYearsData){
                        // 附加同比数据
                        if(item.prevYearsData.base_index_b){
                            z.push(Number(item.prevYearsData.base_index_b))
                        }else{
                            z.push(0)
                        }
                    }else{
                        z.push(0)
                    }
                    if(item.prevData){
                        // 附加环比数据
                        if(item.prevData.base_index_b){
                            y.push(Number(item.prevData.base_index_b))
                        }else{
                            y.push(0)
                        }
                    }else{
                        y.push(0)
                    }
                })
            }
            var option = {
                xAxis: {
                    data: x,
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    z: 10
                },
                yAxis: {
                    name: '指数',
                    nameTextStyle:{
                        color:'#8E9099'
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                },
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
                },
                legend: {
                    data: [label1, label2],
                },
                series: [
                    {
                        name:label1,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new  this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#4BD7FF'},
                                        {offset: 1, color: '#3B93FF'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: z
                    },
                    {
                        name:label2,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#FFAC4B'},
                                        {offset: 1, color: '#FF704A'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: y
                    }
                ]
            }
            mycharts.setOption(option,true)
        },
        renderGraph4(data,aa){
            let x = []
            let y = []
            let z = []
            let label1 = '指数'
            // let label2 = '环比增长速度'
            const mycharts = this.$echarts.init(document.getElementById('main4' + aa))
            if(data && data.data){
                data.data.forEach(item => {
                    x.push(item.name)
                    if(item.data){
                        if(item.data.base_index_b){
                            y.push(item.data.base_index_b)
                        }else{
                            y.push(0)
                        }
                        // if(item.data.years_rate){
                        //     z.push(Number(item.data.years_rate))
                        // }else{
                        //     z.push(0)
                        // }
                        // if(item.data.chain_rate){
                        //     y.push(Number(item.data.chain_rate))
                        // }else{
                        //     y.push(0)
                        // }
                    }else{
                        y.push(0)
                    }
                })
            }
            var option = {
                xAxis: {
                    data: x,
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    z: 10
                },
                yAxis: {
                    name: '指数',
                    nameTextStyle:{
                        color:'#8E9099'
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5C5D62'
                        }
                    },
                },
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
                },
                legend: {
                    data: [label1],
                },
                series: [
                    {
                        name:label1,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#8293FF'},
                                        {offset: 1, color: '#5A71FF'}
                                    ]
                                )
                            },
                        },
                        barWidth:20,
                        data: y
                    }
                ]
            }
            mycharts.setOption(option,true)
        },
        back(aa){
            this.$router.push({name:'reportIndex',query:{type:aa}})
        }
    }
}
</script>
<style lang="stylus" scoped>
.reportDetail
    width 100%
    height auto
    min-height 100%
    // overflow auto
    // display flex
.detailRight
    width 100%
    height auto
    box-sizing border-box
.backBtn
    margin-left 20px
    font-size 14px
    color #635EF9
    font-weight bold
    cursor pointer
    span
        text-decoration underline
.backBtn:hover
    color #7f94ff
.detailBox
    width 82%
    height auto
    background #ffffff
    padding 60px 80px
    box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
    border-radius 8px
    box-sizing border-box
    margin 0 auto
    margin-top 60px
.bigTit
    margin-bottom 46px
    font-size 24px
    color #2C2D33
    line-height 24px
    text-align center
.markInfo
    display flex
    align-items center
    font-size 12px
    color #8E9099
.timeInfo
    margin-left 80px
.summary
    min-height 48px
    height auto
    background #F8F8F9
    padding 10px 20px
    box-sizing border-box
    margin-top 14px
    font-size 14px
    color #5C5D62
    line-height 28px
    // white-space nowrap
    // text-overflow ellipsis
    // overflow hidden
.tableTil,.itemTitle
    margin 95px 0 20px 0
    font-size 16px
    color #2C2D33
    text-align center
    cursor pointer
.mateName
    font-size 14px
    font-weight bold
    color #2C2D33
.itemTitle
    margin-top 60px !important
.mateList
    width 100%
    border-top 1px #DCDEE2 solid
    box-sizing border-box
    margin 10px 0 40px 0
    li
        border 1px #dcdee2 solid
        box-sizing border-box
        border-top none

.listName
    display flex
    align-items center
    width 100%
    height 50px
    background #F8F8F9
.listItem
    display flex
    align-items center
    width 100%
    height 50px
.listItem:hover
    background #F4F5FC

.colItem,.colItem1
    padding 0 20px
    font-size 12px
    color #8E9099
    font-weight bold
    text-align center
.colItem1
    color #5C5D62
    font-weight normal
.col1
    width 25%
    text-align left 
.col2
    width 40%
.col3
    width 35%
.col4,.col5,.col6,.col7
    width 15%
.col8,.col9
    width 20%
.col4
    text-align left
.notes
    font-size 12px
    color #5C5D62
    line-height 20px
.noteTil
    color #8E9099
.sm 
    color #728CFF
    font-size 12px
    cursor pointer
    div
        font-size 12px !important
        display flex
        align-items center
    img 
        width 12px
        height 12px
        margin-left 5px
</style>