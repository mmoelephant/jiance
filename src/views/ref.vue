<template>
    <div style='height:100%;margin-top:78px;' v-loading.fullscreen.lock="loading">        
        <el-container class="refContainer">
            <el-aside class='cate'>
                <div :class='t==0?"title acttitle":"title"'  @click='check(0)'>
                    <div>
                        <p class='c'></p>
                        <span>按材料查询</span>
                    </div>
                    <i class='iconfont icon-shang-copy'></i>
                </div>
                <el-tree ref="tree"
                    :data="cateList" node-key = "id" :default-expanded-keys="defaultExpand" :props="defaultProps" @node-click="handleNodeClick" :indent='30' :accordion='true'
                    v-show='t==0'>
                </el-tree>
                <div :class='t==1?"title acttitle":"title"' @click='check(1)'>
                    <div>
                        <p class='a'></p>                   
                        <span>按地区查询</span>
                    </div>
                    <i class='iconfont icon-shang-copy'></i>
                </div>
                <el-tree ref="tree1"
                    :data="areaList" node-key = "id" :props="defaultProps" @node-click="handleNodeClick" :indent='30' :accordion='true'
                    v-show='t==1'>
                </el-tree>
            </el-aside>
            <el-container class='charts-main'>
                <div class="reportBtns">
                    <div class='btnClass'>
                        <span class="dotClass"></span>
                        <span class="firstNav">数据查询 >&nbsp</span>
                        <span class="navigiOn">{{t==0?' 各地材料数据':' 各地材料对比'}}</span>
                    </div>
                </div>
                <div class='tooltip'>
                    <div class='left'>
                        <h1>云南省各地区材料数据</h1>
                        <div class='tab'>
                            <p v-for="item in termstype" :key="item.id" :class="timetype == item.id?'active':''" @click="toggleTimeType(item.id)">
                                {{item.name}}
                            </p>
                        </div>
                        <!-- “显示勾选对比图表”只在二级材料下显示 -->
                        <div class='switch' @click='show_c(showcharts)' v-show="t == 0">
                             <!-- v-show='chosed_cate.level != 1' -->
                            显示勾选{{t==0?'地区':'材料'}}对比图表
                        </div>
                    </div>                   
                </div>  
                <div class='table-box'>
                    <div class='t-box'>
                        <div class='t'>
                            <div>
                                <p v-if='t==0'>各地区<span>"{{chosed_cate.name}}"</span>{{timetype==3?"月度":timetype==2?"季度":timetype==1?"年度":""}}数据表
                                    <span v-show='isnext' @click='back' style='font-size:12px'>返回 ></span>
                                </p>
                                <p v-if='t==1'><span>"{{chosed_city.name}}"</span>各材料{{timetype==3?"月度":timetype==2?"季度":timetype==1?"年度":""}}数据表
                                </p>
                                <ul>
                                    <li v-for="item in filtConditions" v-bind:key="item.id" :class="chosed_type == item.id?'ac':''" @click="toggleChoseType(item.id)">
                                        {{item.name}}
                                    </li>
                                </ul>
                                <el-popover
                                    class='sm'
                                    v-show='chosed_type == "base_index_b"'
                                    placement="bottom-start"
                                    width="200"
                                    trigger="hover"
                                    title="指数定义">
                                    <p>
                                        反映了市场材料价格变动情况的相对数。报告期指数=（当期价格/基期价格）×定基指数
                                    </p>
                                    <p>基准期：2018年1月</p>
                                    <p>定基指数：1000</p>
                                    <div slot="reference">
                                        指数说明
                                        <img src="../../public/img/wh.png" alt="">
                                    </div>
                                </el-popover>
                                <div v-show='t == 0 && chosed_type == "allprice"' style='font-size:12px;margin-left:20px'>（单位：元 / {{dw}}）</div>
                            </div>
                            <div class='timer'>
                                <span>时间</span>
                                <!-- //选择月度 -->
                                <el-select v-model="time" placeholder="请选择查询时间" v-show='timetype==3'>
                                    <el-option
                                    v-for="item in monthoptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <!-- 选择季度 -->
                                <el-select v-model="time" placeholder="请选择查询时间" v-show='timetype==2'>
                                    <el-option
                                    v-for="item in seasonoptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <!-- 选择年度 -->
                                <el-select v-model="time" placeholder="请选择查询时间" v-show='timetype==1'>
                                    <el-option
                                    v-for="item in yearoptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div> 
                    </div>
                    <div style='width:100%;height:100%;padding-top:56px;overflow:hidden;display:flex;' v-show='loading'>
                        <img src="../../public/img/table.png" alt="" style='width:100%;min-height: 577px;max-height:577px'>
                    </div>
                    <reftable 
                        v-show='!loading'
                        style='padding-top:56px;'
                        :tabledata='tabledata'
                        :type='t' 
                        :timeType='timetype'
                        :t_type='chosed_type'
                        @checkList='checkList' 
                        @get_next='get_next'
                        :isnext='isnext'>
                    </reftable>
                    <page-btn :disablepage="disablepage" @pagechange='pagechange' style='padding-top:20px;float:right'></page-btn>
                </div>
            </el-container>
        </el-container>
        <el-dialog :visible.sync="showcharts" width="60%" class="chartDialog">
            <div class='ch' v-show ='showcharts'>
                <h1 v-show='t==0'>云南省{{areaname}}{{chosed_cate.name}}价格对比柱状图</h1>
                <h1 v-show='t==1'>{{chosed_city.name}}材料价格对比柱状图</h1>
                <div class='tool'>
                    <ul>   
                        <li @click='change_charts="bar"' :class='change_charts=="bar"?"active":""'>
                            <i class='iconfont icon-zhuzhuangtu'></i>
                        </li>
                        <li @click='change_charts="line"' :class='change_charts=="line"?"active":""'>
                            <i class='iconfont icon-zhexian'></i>
                        </li>
                        <li @click='change_charts="mixin"' :class='change_charts=="mixin"?"active":""'>
                            <i class='iconfont icon-zhuzhuangzhexian'></i>
                        </li>
                    </ul>
                </div>
                <div id ='main'>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import $ from 'jquery'
import reftable from '../components/ref-table'
import pageBtn from '../components/page-btn'
import areajson from '../../public/json/yn.json'
import {datawork} from '../plugins/datawork.js'
import {getToken} from '../plugins/gettoken.js'
// import { get } from 'http'
// import { readlink } from 'fs'
export default {
    data() {
        return {
            t:0,//0 单材料多区域 1 多材料单区域
            cateList: [],//分类列表 左侧树状图
            // areaList:areajson,//区域列表，左侧树状图
            areaList:[],//区域列表，左侧树状图
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            chosed_city:{
                name:'全省',
                id:'53'
            },
            chosed_cate:{
                // id:1,
                // name:'钢材'
            },//选中的分类
            showcharts:false,//是否展示图
            t:0,//选择表格展示类型 0：区域比较 1：材料比区域比较
            termstype:[],
            monthoptions:[],//月度时间控件
            seasonoptions:[], //季度时间控件
            yearoptions:[],//年度时间控件
            time:'',//选取的时间
            filtConditions:[],
            chosed_type:'base_index_b',//表格内容展示筛选 allprice:价格 base_index_b：指数 years_rate：同比 chain_rate：环比
            timetype:3,//时间类型 3：月度 2：季度 1：年度
            tabledata:{},//表格数据 
            chosed_area:{
                area:53
            }, // 选择的区域code 默认云南省 用于图展示
            disablepage:2, //传给分页组件的判定哪个按钮禁用 -1:左按钮 1：右按钮 0：不禁用 2:都禁用
            isnext:false,//是否是子表格
            checked:[],//选中作为图渲染的数据,
            mycharts:null,
            change_charts:'bar',//展示图表的类型
            color:['#7bc9ff','#eea8c3','#7be2db','#fedcc1','#ade3f6',
            '#b6c6fe','#efbbb2','#fa9583','#b4fce3','#e4c3f4','#77a1ff',
            '#f1dc4f','#bc8878','#f9b7e1','#c890c3','#9eca98','#ff7571'],
            boxwidth:0,
            tablewidth:0,
            loading:false,
            dw:'',//材料单位
            areaid:0,
            areaname:'',
            defaultExpand:[]
        }
    },
    created() {       
        this.get_cate()
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
        }
    },
    mounted() {
        // this.get_cate()
    },
    components:{
        reftable,
        pageBtn
    },
    watch:{
        timetype(type) {
            if(type==3) {
                // this.time = this.monthoptions[0].id
            } else if(type==2) {
                this.time = this.seasonoptions[0].id
            } else {
                this.time = this.yearoptions[0].id
            }
            // this.isnext = false
            if(this.t == 0){
                this.get_area_data()
            }else{
                this.get_cate_data()
            }
        },
        time(val) {
            // this.isnext = false
            if(this.t == 0) {
                // this.areaid = 0
                this.get_area_data()
            } else {
                this.get_cate_data()
            }
        },
        showcharts(val){
            if(val) {
                this.$nextTick(() => {
                    if(this.change_charts=='bar') {
                        this.init()
                    } else if(this.change_charts=='line') {
                        this.init_line()
                    } else {
                        this.init_barline()
                    }
                })
            }
        },
        t(val) {
            //切换材料多地区对比和地区多材料对比时，保证渲染第一项的数据
            this.chosed_city = {id:'53', name:'全省'}
            this.chosed_cate = this.cateList[0]
            this.isnext = false
            if(val == 0) {
                this.areaid = 0
                this.get_area_data()
            } else {
                //多区域材料对比
                this.areaid = 0
                if(this.chosed_type =='allprice') this.chosed_type = 'base_index_b'
                this.get_cate_data()
            }
        },
        chosed_type(val){
            if(this.t == 0){
                this.get_area_data()
            }else{
                this.get_cate_data()
            }
        },
        change_charts(type){
            if(type=='bar') {
                this.init()
            } else if(type=='line') {
                this.init_line()
            } else {
                this.init_barline()
            }
        }
    },  
    methods:{
        check(aa){
            this.t = aa
            if(aa == 0){
                this.$refs.tree.setCurrentKey(1)
                this.defaultExpand = [1]
            }else{
                this.$refs.tree1.setCurrentKey(null)
                this.defaultExpand = []
            }
        },
        toggleTimeType(aa){
            this.timetype = aa
        },
        toggleChoseType(bb){
            this.chosed_type = bb
            // this.areaid = 0
            // this.isnext = false
        },
        back() {
            this.isnext = false
            if(this.t ==0) {
                // this.chosed_area = {
                //     area:53
                // }
                this.areaid = 0
                this.get_area_data()
            } else {
                this.get_cate_data()
            }
        },
        formateTime() {
            const now =  new Date()
            let month = now.getMonth()
            let exmonth,exyear
            const y= now.getFullYear()
            if(this.timetype == 0) {
                if (month>=this.time) {
                    exmonth = month-this.time+1
                    exyear = y
                } else {
                    exmonth = month+12-this.time+1
                    exyear = y-1
                }
            }
            exmonth = exmonth>9?exmonth:'0'+exmonth
            month = month>9?month:'0'+month
            return [exyear+'-'+exmonth,y+'-'+month]
        },
        // async 
        async get_cate() { //获取分类列表 左侧树渲染
            let commonparam = this.$store.state.login.commonParam
            let data = {}
            let data1
            for(var i in commonparam){
                data[i] = commonparam[i]
            }
            data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
            if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                data.user_id = localStorage.getItem('userid')
            }else{
                data.user_id = 0
            }
            data.timestamp = Math.round(new Date().getTime() / 1000).toString()
            data.client_id = localStorage.getItem('clientid')
            data.access_token = localStorage.getItem('accesstoken')
            data1 = datawork(data)
            this.$api.get_cate(data1).then(v => {
                if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                    this.cateList = v.data.data.categorys
                    this.chosed_cate = v.data.data.categorys[0]
                    this.dw = this.chosed_cate.unit
                    this.areaList = v.data.data.areas
                    this.termstype = v.data.data.terms_type
                    this.monthoptions = v.data.data.month
                    this.seasonoptions = v.data.data.quarter
                    this.yearoptions = v.data.data.years
                    // this.time = this.monthoptions[0].id
                    this.get_area_data()
                }else if(v.data.errcode == 1104){
                    //token失效的时候，再度获取token
                    let that = this
                    getToken(commonparam)
                    setTimeout(function(){
                        if(localStorage.getItem('tokenDone')){
                            that.get_cate()
                        }else{

                        }
                    },1000)
                }else{

                }
            })
        },
        async get_area_data() {// 获取单材料多地区的数据
            this.loading = true
            this.tabledata = {}
            this.checked = []
            let data4 = {}
            let commondata = {}
            let data5
            if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                commondata = this.$store.state.login.commonParam
            }
            for(var i in commondata){
                data4[i] = commondata[i]
            }
            data4.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
            if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                data4.user_id = localStorage.getItem('userid')
            }else{
                data4.user_id = 0
            }
            data4.timestamp = Math.round(new Date().getTime() / 1000).toString()
            data4.client_id = localStorage.getItem('clientid')
            data4.access_token = localStorage.getItem('accesstoken')
            data4.categorys = Number(this.chosed_cate.id)
            data4.data_type = this.timetype
            if(this.time){
                data4.date_type = this.time
            }else{
                // data4.date_type = 1
            }
            if(this.areaid){
                data4.areas = this.areaid
            }else{
                // data4.areas = 53
            }
            data4.field = this.chosed_type
            data5 = datawork(data4)
            this.$api.get_area_time_list(data5).then(v => {
                if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                    this.loading = false
                    this.tabledata = v.data.data
                    //将“指数、同比、环比、价格索引条件赋值给数组”
                    this.filtConditions = v.data.data.fieldData
                }else if(v.data.errcode == 1104){
                    //token失效的时候，再度获取token
                    let that = this
                    getToken(commondata)
                    setTimeout(function(){
                        if(localStorage.getItem('tokenDone')){
                            that.get_area_data()
                        }else{}
                    },1000)
                }else{
                    // this.tabledata = {}
                    // this.show_page()
                    // this.loading = false
                }
            })
            if(this.showcharts) { //如果展示图表  渲染
                if(this.change_charts=='bar') {
                    this.init()
                } else if(this.change_charts=='line') {
                    this.init_line()
                } else {
                    this.init_barline()
                }
            }
            this.$nextTick(() =>{
                this.show_page()
                this.loading = false
            })
        },
        async get_cate_data() { //获取材料的数据 
            this.loading = true
            this.tabledata = {}
            this.checked = []
            let data2 = {}
            let commondata = {}
            let data3
            if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                commondata = this.$store.state.login.commonParam
            }
            for(var i in commondata){
                data2[i] = commondata[i]
            }
            data2.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
            if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                data2.user_id = localStorage.getItem('userid')
            }else{
                data2.user_id = 0
            }
            data2.timestamp = Math.round(new Date().getTime() / 1000).toString()
            data2.client_id = localStorage.getItem('clientid')
            data2.access_token = localStorage.getItem('accesstoken')
            // data2.categorys = 
            data2.data_type = this.timetype
            if(this.time){
                data2.date_type = this.time
            }else{
                // data2.date_type = 1
            }
            if(this.areaid){
                data2.areas = this.areaid
            }else{
                // data2.areas = 53
            }
            data2.field = this.chosed_type
            data3 = datawork(data2)
            this.$api.get_cate_time_list(data3).then(v => {
                if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                    this.loading = false
                    this.tabledata = v.data.data
                    this.filtConditions = v.data.data.fieldData
                }else if(v.data.errcode == 1104){
                    //token失效的时候，再度获取token
                    let that = this
                    getToken(commondata)
                    setTimeout(function(){
                        if(localStorage.getItem('tokenDone')){
                            that.get_cate_data()
                        }else{}
                    },1000)   
                }else{

                }
            })
            if(this.showcharts) {
                if(this.change_charts=='bar') {
                    this.init()
                } else if(this.change_charts=='line') {
                    this.init_line()
                } else {
                    this.init_barline()
                }
            }
            this.$nextTick(() =>{
                this.show_page()
                this.loading = false
            })
        },
        async get_next(aa) {
            this.loading = true
            this.tabledata = {}
            this.checked = []
            this.areaid = aa.id
            this.areaname = aa.name
            let data6 = {}
            let commondata = {}
            let data7
            if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                commondata = this.$store.state.login.commonParam
            }
            for(var i in commondata){
                data6[i] = commondata[i]
            }
            data6.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
            if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                data6.user_id = localStorage.getItem('userid')
            }else{
                data6.user_id = 0
            }
            data6.timestamp = Math.round(new Date().getTime() / 1000).toString()
            data6.client_id = localStorage.getItem('clientid')
            data6.access_token = localStorage.getItem('accesstoken')
            data6.categorys = this.chosed_cate.id
            data6.data_type = this.timetype
            if(this.time){
                data6.date_type = this.time
            }else{
                // data6.date_type = 1
            }
            data6.field = this.chosed_type
            data6.areas = aa.id
            data7 = datawork(data6)
            this.$api.get_area_time_list(data7).then(v => {
                if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                    this.loading = false
                    this.tabledata = v.data.data
                    this.filtConditions = v.data.data.fieldData
                }else if(v.data.errcode == 1104){
                    let that = this
                    getToken(commondata)
                    setTimeout(function(){
                        if(localStorage.getItem('tokenDone')){
                            that.get_next()
                        }else{}
                    },1000)
                }else{
                    
                }
            })
            if(this.showcharts) { //如果展示图表  渲染
                if(this.change_charts=='bar') {
                    this.init()
                } else if(this.change_charts=='line') {
                    this.init_line()
                } else {
                    this.init_barline()
                }
            }
            this.$nextTick(() =>{
                this.show_page()
                this.loading = false
                this.isnext = true
            })        
        },
        handleNodeClick(data) { //选择材料
            this.checked = []
            // this.isnext = false
            if(this.t == 0) { //获取材料多地区对比
                this.chosed_cate = data
                this.dw = data.unit
                if(this.chosed_cate.level == 1) {
                    this.chosed_type='base_index_b'
                }else if(this.chosed_cate.level == 2){
                    this.chosed_type = 'allprice'
                }
                this.chosed_name = data.name
                this.get_area_data()
            } else {
                this.defaultExpand = []
                this.chosed_city = data
                this.areaid = data.id
                this.get_cate_data()
            }
        },
        async init() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.forEach((item,index) => {
                    //初始化data为空
                    let data = []
                    x = []
                    if(item.dateData && item.dateData != {}){
                        for(var i in item.dateData){
                            x.push(i)
                            data.push(item.dateData[i])
                        }
                    }
                    if(this.t == 0){
                        legend.push(item.name)
                        y.push({data:data,type:'bar',name:item.name,
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[index]
                        }})
                    }else{
                        legend.push(item.name)
                        y.push({data:data,type:'bar',name:item.name,
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[index]
                        }})
                    }
           
                })
            } else {// 获取全省的材料数据 用于初始化图表
                if(this.t == 0 && !this.isnext) { //第一级空选中 显示全省数据
                    // const t_arr = this.formateTime()
                    let commondata = {}
                    let data8 = {}
                    let data9 = {}
                    if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                        commondata = this.$store.state.login.commonParam
                    }
                    for(var i in commondata){
                        data8[i] = commondata[i]
                    }
                    data8.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                    if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                        data8.user_id = localStorage.getItem('userid')
                    }else{
                        data8.user_id = 0
                    }
                    data8.timestamp = Math.round(new Date().getTime() / 1000).toString()
                    data8.client_id = localStorage.getItem('clientid')
                    data8.access_token = localStorage.getItem('accesstoken')
                    data8.categorys = this.chosed_cate.id
                    data8.data_type = this.timetype
                    if(this.time){
                        data8.date_type = this.time
                    }else{
                        // data8.date_type = 1
                    }
                    data8.field = this.chosed_type
                    data8.areas = 53
                    data9 = datawork(data8)

                    const res = await this.$api.get_area_time_list(data9)
                    arr = res.data.data.data
                    y.push({
                        data:[],
                        type:'bar',
                        name:'全省',
                        itemStyle:{
                            color:this.color[0]
                        },
                        barMaxWidth:20
                    })
                    for(var i in arr[0].dateData){
                        x.push(i)
                        y[0].data.push(arr[0].dateData[i])
                    }
                    legend = ['全省']
                } else {
                    let data = []
                    try {
                        const defaultcate = this.tabledata[0]
                        if(x.length < defaultcate.data.length) {
                            x = []
                            defaultcate.data.map(t => {                    
                                x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                            })
                        }
                        defaultcate.data.map(t=> {
                            data.push(t.price) 
                        })
                        if(this.t==0) {
                            legend.push(defaultcate.data[0].area_name)
                            y.push({data:data,type:'bar',name:defaultcate.data[0].area_name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        } else {
                            legend.push(defaultcate.data[0].name)
                            y.push({data:data,type:'bar',name:defaultcate.data[0].name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        }  
                    } catch(e) {
                        // console.error(e)
                    }
                }
            }       
            const option = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (par) {
                        // return JSON.stringify(par[0].name)
                        let fucku = ''
                        par.map(i =>{
                            fucku+=i.seriesName+':'+Number(i.value).toFixed(2)+'<br/>'
                        })
                        return fucku
                    }
                },
                legend: {
                    data:legend,
                    bottom:0,
                    type:'scroll',
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {
                            show: true,
                            icon: ''
                        },
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {
                            show: true,
                            icon: ''
                        }
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : x,
                        name:'时间',
                        nameTextStyle:{
                            fontSize:14,
                            color:'#6064FD'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'指数',
                        nameTextStyle:{
                            fontSize:14,
                            color:'#6064FD'
                        }
                    }
                ],
                series :y
            }
            this.mycharts = this.$echarts.init(document.getElementById('main'))
            this.mycharts.setOption(option,true)
        },
        async init_line() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.forEach((item,index) => {
                    let data =[]
                    if(item.dateData && item.dateData != {}){
                        x = []
                        for(var i in item.dateData){
                            x.push(i)
                            data.push(item.dateData[i])
                        }
                    }
                    if(this.t == 0){
                        legend.push(i.name)
                        y.push({
                            data:data,
                            type:'line',
                            name:item.name,
                            itemStyle:{
                                color:this.color[index]
                            }
                        })
                    }else{
                        legend.push(item.name)
                        y.push({
                            data:data,
                            type:'line',
                            name:item.name,
                            itemStyle:{
                                color:this.color[index]
                            }
                        })
                    }                 
                })
            } else {// 获取全省的材料数据 用于初始化图表
                if(this.t ==0&&!this.isnext) {
                    let commondata = {}
                    let data10 = {}
                    let data11 = {}
                    if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                        commondata = this.$store.state.login.commonParam
                    }
                    for(var i in commondata){
                        data10[i] = commondata[i]
                    }
                    data10.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                    if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                        data10.user_id = localStorage.getItem('userid')
                    }else{
                        data10.user_id = 0
                    }
                    data10.timestamp = Math.round(new Date().getTime() / 1000).toString()
                    data10.client_id = localStorage.getItem('clientid')
                    data10.access_token = localStorage.getItem('accesstoken')
                    data10.categorys = this.chosed_cate.id
                    data10.data_type = this.timetype
                    if(this.time){
                        data10.date_type = this.time
                    }else{
                        // data10.date_type = 1
                    }
                    data10.field = this.chosed_type
                    data10.areas = 53
                    data11 = datawork(data10)

                    const res = await this.$api.get_area_time_list(data11)
                    arr = res.data.data.data
                    y.push({
                        data:[],
                        type:'line',
                        name:'全省',
                        itemStyle:{
                            color:this.color[0]
                        },
                    })
                    for(var i in arr[0].dateData){
                        x.push(i)
                        y[0].data.push(arr[0].dateData[i])
                    }
                    legend = ['全省']
                } else {
                    let data=[]
                    try {
                        const defaultcate = this.tabledata[0]
                        if(x.length<defaultcate.data.length) {
                            x=[]
                            defaultcate.data.map(t => {                       
                                x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                            })
                            
                        }
                        defaultcate.data.map(t=> {
                            data.push(t.price) 
                        })
                        if(this.t==0) {
                            legend.push(defaultcate.data[0].area_name)
                            y.push({data:data,type:'bar',name:defaultcate.data[0].area_name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        } else {
                            legend.push(defaultcate.data[0].name)
                            y.push({data:data,type:'bar',name:defaultcate.data[0].name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        }  
                    } catch(e) {
                    }
                }
            }          
            const option = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (par) {
                        // return JSON.stringify(par[0].name)
                        let fucku = ''
                        par.map(i =>{
                            fucku+=i.seriesName+':'+Number(i.value).toFixed(2)+'<br/>'
                        })
                        return fucku
                    }
                },
                legend: {
                    data:legend,
                    bottom:0
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {
                            show: true,
                            icon: ''
                        },
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {
                            show: true,
                            icon: ''
                        }
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : x,
                        name:"时间",
                        nameTextStyle:{
                            fontSize:14,
                            color:'#6064FD'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:"价格",
                        nameTextStyle:{
                            fontSize:14,
                            color:'#6064FD'
                        }
                    }
                ],
                series :y
            }
            this.mycharts = this.$echarts.init(document.getElementById('main'))
            this.mycharts.setOption(option,true)
        },
        async init_barline() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.forEach((item,index) => {
                    let data =[],tb=[],hb=[]
                    if(item.dateData && item.dateData != {}){
                        x = []
                        for(var i in item.dateData){
                            x.push(i)
                            data.push(item.dateData[i])
                        }
                    }
                    if(this.t == 0){
                        legend.push(item.name)
                        y.push({
                            data:data,
                            type:'bar',
                            name:item.name,
                            barMaxWidth:20,
                            itemStyle:{
                                color:this.color[index]
                            }
                        },
                        {
                            data:data,
                            type:'line',
                            name:item.name,
                            itemStyle:{
                                color:this.color[index]
                            }
                        })
                    }else{
                        legend.push(item.name)
                        y.push({
                            data:data,
                            type:'bar',
                            name:item.name,
                            barMaxWidth:20,
                            itemStyle:{
                                color:this.color[index]
                            }
                        },
                        {
                            data:data,
                            type:'line',
                            name:item.name,
                            itemStyle:{
                                color:this.color[index]
                            }
                        }
                        )
                    }            
                })
            } else {// 获取全省的材料数据 用于初始化图表
                if(this.t ==0&&!this.isnext) {
                    let commondata = {}
                    let data12 = {}
                    let data13 = {}
                    if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                        commondata = this.$store.state.login.commonParam
                    }
                    for(var i in commondata){
                        data12[i] = commondata[i]
                    }
                    data12.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                    if(localStorage.getItem('userid') && localStorage.getItem('userid').length > 0){
                        data12.user_id = localStorage.getItem('userid')
                    }else{
                        data12.user_id = 0
                    }
                    data12.timestamp = Math.round(new Date().getTime() / 1000).toString()
                    data12.client_id = localStorage.getItem('clientid')
                    data12.access_token = localStorage.getItem('accesstoken')
                    data12.categorys = this.chosed_cate.id
                    data12.data_type = this.timetype
                    if(this.time){
                        data12.date_type = this.time
                    }else{
                        data12.date_type = 1
                    }
                    data12.field = this.chosed_type
                    data12.areas = 53
                    data13 = datawork(data12)

                    const res = await this.$api.get_area_time_list(data13)
                    arr = res.data.data.data
                    y.push({
                        data:[],
                        type:'bar',
                        name:'全省',
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[0]
                        },
                    })
                    y.push({ //环比
                        data:[],
                        type:'line',
                        name:'全省',
                        yAxisIndex:1,
                        emphasis:{
                            label:{
                                formatter:'{b}环比: {c}'
                            }
                        },
                        itemStyle:{
                            color:this.color[0]
                        }
                    })
                    for(var i in arr[0].dateData){
                        x.push(i)
                        y[0].data.push(arr[0].dateData[i])
                    }
                    legend = ['全省']
                } else {
                    let data=[]
                    try {
                        const defaultcate = this.tabledata[0]
                        if(x.length<defaultcate.data.length) {
                            x=[]
                            defaultcate.data.map(t => {                       
                                x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                            })
                        }
                        defaultcate.data.map(t=> {
                            data.push(t.price) 
                        })
                        if(this.t==0) {
                            legend.push(defaultcate.data[0].area_name)
                            y.push({data:data,type:'bar',name:defaultcate.data[0].area_name,itemStyle:{
                            color:this.color[index]
                        }})
                        } else {
                            legend.push(defaultcate.data[0].name)
                            y.push({data:data,type:'bar',name:defaultcate.data[0].name,itemStyle:{
                            color:this.color[index]
                        }})
                        }  
                    } catch(e) {
                    }
                }
            }          
            const option = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (par) {
                        // return JSON.stringify(par[0].name)
                        let fucku = ''
                        par.map(i =>{
                            fucku+=i.seriesName+':'+Number(i.value).toFixed(2)+'<br/>'
                        })
                        return fucku
                    }
                },
                legend: {
                    data:legend,
                    bottom:0
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {
                            show: true,
                            icon: ''
                        },
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {
                            show: true,
                            icon: ''
                        }
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : x,
                        name:'时间',
                        nameTextStyle:{
                            fontSize:14,
                            color:'#6064FD'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'指数',
                        nameTextStyle:{
                            fontSize:14,
                            color:'#6064FD'
                        }
                    },
                    // {
                    //     type:'value'
                    // }
                ],
                series :y
            }
            this.mycharts = this.$echarts.init(document.getElementById('main'))
            this.mycharts.setOption(option,true)
        },
        saveImg() {
            var canvasData = $('#main').children('div').children('canvas')
            var a = document.createElement("a")
            a.href = canvasData[0].toDataURL()
            a.download = "图表"
            a.click()
        },
        checkList(val) { //根据获取到的list重新渲染图表
            this.checked = val
            if(this.showcharts) {
                if(this.change_charts == 'bar') {
                    this.init()
                } else if(this.change_charts == 'line') {
                    this.init_line()
                } else {
                    this.init_barline()
                }
            }
        },
        show_c(status) {
            if(status) {
                this.showcharts = !status
                return
            }
            if(this.checked && this.checked.length >0) {
                this.showcharts = !status
            } else {
                this.showcharts = !status
                // this.$message.error('没有勾选数据')
            }
        },
        show_page() {
            this.boxwidth = $('.t-box').width()
            let scroll = $('.ul').scrollLeft()
            let that = this
            setTimeout(function(){
                that.tablewidth = 300 + ($('.right .head p').length) * 130
                let left = that.tablewidth - that.boxwidth - scroll
                if(scroll == 0 && left > 0) {
                    that.disablepage = -1
                } else if(that.boxwidth >= that.tablewidth || left < 0){
                    that.disablepage = 2
                } else if(left == 0){
                    that.disablepage = 1
                } else {
                    that.disablepage = 0
                }
            },500)
        },
        pagechange(type) {
            let scroll = $('.ul').scrollLeft()
            let left = this.tablewidth - this.boxwidth -scroll
            const that = this
            if(type == -1) {
                if(scroll>this.boxwidth) {
                    $('.ul').animate({
                        scrollLeft:scroll-this.boxwidth
                    },500,() =>{
                        that.show_page()
                    })
                } else {
                    $('.ul').animate({
                        scrollLeft:0
                    },500,() =>{
                        that.show_page()
                    })
                }
            } else {
                if(left > this.boxwidth) {
                    $('.ul').animate({
                        scrollLeft:scroll+this.boxwidth
                    },500,() =>{
                        that.show_page()
                    })
                } else {
                    $('.ul').animate({
                        scrollLeft:this.tablewidth
                    },500,() =>{
                        that.show_page()
                    })
                }
            }
        }
    },
    beforeRouteLeave(to,from,next){
        next()
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
.el-container.refContainer
    height 100%
    background #F6F7FE
    padding 0 20px 0 0
    box-sizing border-box
    // display flex
.title
    display flex
    align-items center
    justify-content space-between
    height 58px
    padding 0 20px 0 13px
    box-sizing border-box
    margin-bottom 10px
    font-size 14px
    color font-color-light-b
    cursor pointer
    div
        display flex
        align-items center
    p
        width 30px
        height 30px
        flex-shrink 0
        margin-right 3px  
    .c
        background url('../../public/img/1g.png') no-repeat center
        background-size 100% 100%
    .a
        background url('../../public/img/2g.png') no-repeat center
        background-size 100% 100%
    i 
        color font-color-light-b
        font-size 12px
.title:hover
    background #F5F6FE
    color #2D2E33
    .c
        background url('../../public/img/1b.png') no-repeat center
        background-size 100% 100%
    .a
        background url('../../public/img/2b.png') no-repeat center
        background-size 100% 100%
    i 
        color #2D2E33   
.acttitle,.acttitle:hover
    background -webkit-linear-gradient(right,#61e0ff,#6439f8) !important/* Safari 5.1-6.0 */
    background -o-linear-gradient(left,#61e0ff,#6439f8)!important /* Opera 11.1-12.0 */ 
    background -moz-linear-gradient(left,#61e0ff,#6439f8)!important /* Firefox 3.6-15 */
    background linear-gradient(to left,#61e0ff,#6439f8)!important /* 标准语法 */
    color #fff
    font-weight bold
    .c
        background url('../../public/img/1w.png') no-repeat
        background-size 100% 100%
    .a
        background url('../../public/img/2w.png') no-repeat
        background-size 100% 100%
    i
        color #fff
        font-weight normal
    .iconfont:before
        display inline-block
        transform rotate(90deg)
.el-aside.cate
    width 200px !important
    height 100%
    min-height 100%
    background #fff
    box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
    border-radius 0 !important
    overflow-y auto
    position fixed
    top 78px
    left 0
    .cate-list 
        height auto
        .active
            height auto
            div
                background #7F94FF
                color #fff  
            .iconfont:before
                display inline-block
                transform rotate(90deg)
                color #fff
                
        .active2
            background #7F94FF
            p
                color #fff  
    .level1
        height 28px
        transition .3s
        overflow hidden
        line-height 28px
        font-size 16px
        color font-color-black
        cursor pointer
        .iconfont
            font-size 10px
            color main-color
            margin-right 6px
            margin-left 13px
        .iconfont:before 
            transform rotate(0deg)
            transition .3s            
        .level2 
            font-size 14px
            color font-color-light-b
            p
                margin-left 50px
.el-container.charts-main
    width 100%
    height 100%
    min-height 100%
    display flex
    flex-direction column
    padding-top 30px
    box-sizing border-box
    margin-left 220px
    .table-box
        width 100%
        // height 100%
        // min-height calc(100% - 180px)
        // min-height 100%
        // overflow-y scroll
        margin-top 20px
        position relative
        .t-box
            width 100%
            padding 20px
            box-sizing border-box
            position absolute
            top 0
            left 0
            z-index 99
        .t
            width 100%
            display flex
            justify-content space-between
            align-items center
            height 56px
            padding 0 40px
            background #6064FD
            border-radius 4px 4px 0px 0px
            color #fff
            box-sizing border-box
            >div
                display flex
                align-items center
            p
                font-size 20px
                font-family MicrosoftYaHei-Bold
                font-weight bold
                >span 
                    color #7bfaff
                    font-weight 400
                    cursor pointer
            ul
                display flex
                align-items center
                font-size 14px
                color #BDBEF8
                li
                    margin-left 20px
                    cursor pointer
                li:nth-child(1)
                    margin-left 100px
                .ac 
                    font-size 18px
                    color #fff
    >div
        width 100%
        max-height auto
        height auto
        background #fff
        padding 20px
        border-radius 8px
        box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
        box-sizing border-box

    .reportBtns
        width auto
        background rgba(0,0,0,0)
        padding 0
        box-shadow none
        margin-bottom 20px
        span.navigiOn
            color #2C2D33
    .tooltip
        display flex
        justify-content space-between
        align-items center
        padding 18px 30px
        h1 
            font-size 20px
            font-weight bold
            color rgba(96,100,253,1)
            margin-right 50px
        .left,.tab
            display flex
            align-items center
        .switch
            width 180px
            background #6064FD
            border-radius 16px
            font-size 14px
            text-align center
            color #fff
            line-height 32px            
            cursor pointer
        .switch:hover 
            background rgba(127,148,255,1)
        .tab
            margin-right 60px
            p
                width 80px
                height 32px
                background #fff
                border 1px solid #D6D9E2
                // border-radius 4px 0px 0px 4px
                font-size 12px
                color #8E9099
                line-height 32px
                text-align center
                cursor pointer
            p+p
                // border-radius 0
                border-left 0
            p+p+p
                // border-radius 0px 4px 4px 0px
                border-left 0
            p:hover
                background #eee
            .active 
                background #7F94FF
                border 1px solid #7F94FF
                color #fff
            .active:hover
                background #7f94ff !important
.timer
    align-items center
    span 
        font-size 14px
        color #fff
        margin-right 10px
    .el-input__inner
        height 34px
.ch
    width 100%
    display flex
    flex-direction column
    h1 
        // width 300px
        width auto
        padding 0 20px
        line-height 48px
        margin 0 auto
        font-size 20px
        font-weight bold
        color #fff  
        background main-color
        border 1px solid rgba(108,125,255,1)
        box-shadow 0px 8px 14px 0px rgba(39,30,237,0.14)
        border-radius 24px
        text-align center
    #main 
        width 100%
        height 400px
        div,canvas
            // width 100%
            height 400px
    .tool
        display flex
        justify-content space-between
        align-items center
        padding-left 60px
        ul 
            display flex
            align-items center
            li
                width 50px
                height 50px
                background #7F94FF
                box-shadow 0px 6px 6px 0px rgba(127,148,255,0.24)
                border-radius 50%
                text-align center
                color #fff
                line-height 50px
                margin-right 20px
                cursor pointer
                .iconfont 
                    font-size 26px
            .active
                background #FB6371
                box-shadow 0px 6px 6px 0px rgba(251,99,113,0.24)
            .active:hover
                background #FB6371
                box-shadow 0px 6px 6px 0px rgba(251,99,113,0.24)
            li:hover
                background #AEBBFF
                box-shadow 0px 6px 6px 0px rgba(127,148,255,0.24)
        ul+ul
            li
                width 100px
                height 28px
                border 1px solid rgba(108,125,255,1)
                border-radius 14px
                font-size 14px
                color #7F94FF
                background #fff
                box-shadow none
                line-height 28px
            li+li
                color #fff
                background #637CFB
                .iconfont 
                    font-size 16px
.alist
    height 28px
    line-height 28px   
    font-size 14px
    color #2c2d33
    li
        padding 0 30px
        cursor pointer
    li:hover
        background #b7bfff 
        color #fff
    .ac,.ac:hover 
        background #7F94FF
        color #fff
.sm 
    color #FEFEFE
    font-size 12px
    margin-left 60px
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
<style lang="stylus">
.chartDialog
    .el-dialog__body
        padding 20px !important
.timer
    .el-input__inner
        height 34px
    .el-input__icon
        line-height 34px
</style>