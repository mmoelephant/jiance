<template>
    <div class='right'>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>监测平台数据总量</p>
                <p class='fontb'>{{all}}<span>条</span></p>
                
            </div>
            <div id='pie'>

            </div>
        </div>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>{{this.$store.state.bigscreen.what_time}}{{cate.name}}环比/同比</p>
            </div>
            <div id='line'>

            </div>
        </div>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>{{areaname}}{{cate.name}}价格指数对比</p>
            </div>
            <div id='bar'>

            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import areajson from '../../public/json/yn.json'
import {datawork} from '../plugins/datawork.js'
import {getCilentId} from '../plugins/getclientidagain'
import {getToken} from '../plugins/gettoken.js'
export default {
    data() {
        return {
            all_area:areajson,
            area:areajson,
            all:0,
            areaid:0,
            areaname:'云南省',
        }
    },
    created(){
        if(localStorage.getItem('user')){
            let areanum = JSON.parse(localStorage.getItem('user')).area_code
            let arealen = JSON.parse(localStorage.getItem('user')).area_code.length
            if(arealen != 12){
                for(var i = 0;i < 12-arealen;i++){
                    areanum = areanum + '0'
                }
            }
            if(areanum != '530000000000'){
                this.areaid = Number(areanum)
            }else{
                this.areaid = 0
            }
            console.log(this.areaid)
        }else{
            console.log('用户还未登陆')
            this.areaid = 0
        }
    },
    computed:{
        cate() {
            return this.$store.state.bigscreen.cate_on
        },
        map() {
            return this.$store.state.login.map
        }
    },
    watch:{
        cate:{
            handler(val) {
                console.log(val)
                if(val.areasData){
                    this.init_line(val.areasData)
                    // this.init_pie(val.areasData)
                }else{

                }
                if(val.all_count){
                    this.init_pie(val)
                }else{
                    this.get_pie_data() 
                }
                if(val.termsData){
                    this.init_bar(val.termsData)
                }
                // if(val.areasData) {
                //     this.init_line(val.areasData)
                // } else {
                //     this.get_line_data()
                    
                // }
                // if(val.barData) {
                //     this.init_bar(val.barData)
                // } else {
                //     this.get_bar_data()
                // }
                // if(val.pieData) {
                //     this.init_pie(val.pieData)
                // }else {
                //     this.get_pie_data()
                // }
            },
            deep: true
        },
        map:{
            handler(val) {
                //这里只会随着对中间大屏的操作而改变，有两种情况：
                // 1.点击摸个市的地区板块，会有一个变化
                // 2.点击返回的时候，返回时的val.id的值固定是'530000000000'
                console.log(val)
                if(val.id != '530000000000'){
                    this.areaid = Number(val.id)
                    this.all_area.map(item => {
                        if(item.id == val.id){
                            this.area = item.childrenList
                        }
                    })
                }else{
                    this.areaid = 0
                    this.area = this.all_area
                }
                // if(val.id=='53') {
                //     this.area = this.all_area
                // } else { 
                //     this.all_area.map(item => {
                //         if(item.id == val.id) {
                //             this.area = item.childrenList
                //         }
                //     })
                // }
            },
            deep:true
        }
    },
    methods:{
        async get_line_data() {
            let data = {
                id:this.cate.cid,
				monthNumber:12,
            }
            let res
            if(this.$store.state.login.map.id==53) {
                res = await this.$api.get_bg_line(data)
            } else {
                data.area = this.$store.state.login.map.id
                res = await this.$api.get_area_line(data)
            }
			let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.cid == this.cate.cid) {
					item.lineData = res.data?res.data.data:[]
				}
            })
            this.init_line(res.data?res.data.data:[])
			this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        async get_bar_data() {
            let data = {
                id:this.cate.cid,
                monthNumber:1,
            }
            let res
            if(this.$store.state.login.map.id==53) {
                res = await this.$api.get_bg_line(data)
            } else {
                data.area = this.$store.state.login.map.id
                res = await this.$api.get_area_line(data)
            }
			let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.cid == this.cate.cid) {
					item.barData = res.data?res.data.data:[]
				}
            })
            this.init_bar(res.data?res.data.data:[])
			this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        async get_pie_data() {
            let data = {}
            let commondata = {}
            let data2 = {}
            if(this.$store.state.login.commonParam && this.$store.state.login.commonParam.agent){
                commondata = this.$store.state.login.commonParam
            }
            console.log(commondata)
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
            data.client_id = localStorage.getItem('clientid')
            data.access_token = localStorage.getItem('accesstoken')
            if(this.areaid){
                data.areas = this.areaid
            }else{

            }
            data2 = datawork(data)
            this.$api.get_cate_level1(data2).then(v => {
                console.log(v)
                if(v.data.errcode == 0){
                    this.all = v.data.data.all_count
                    this.init_pie(v.data.data)
                    this.areaname = v.data.data.areas_name
                }
            })
            // let data = {
            //     mid:this.cate.cid,
            // }
            // if(this.$store.state.login.map.id!='53') {
            //     data.area = this.$store.state.login.map.id
            // }
            // const res = await this.$api.get_bg_pie(data)
            // let cate_list = this.$store.state.bigscreen.cate_list
			// cate_list.forEach(item => {
			// 	if(item.cid == this.cate.cid) {
			// 		item.pieData = res.data.data
			// 	}
            // })
            // if(!this.all||this.all==0) {
            //     this.all = res.data.data.all.count
            // }
            // this.init_pie(res.data.data)
			// this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        init_pie(data) {
            let name = '云南省'
            console.log(data)
            this.all_area.map(item => {
                if(item.name == data.areas_name) {
                    name = item.name
                }
            })

            // const all = data.other.count + data.km.count
            // console.log(all,'123132132')
            const chart = this.$echarts.init(document.getElementById('pie'))
            const op = {
                color:['#ffaf25', '#215973'],
                series: [
                    {
                    // 设置成相对的百分比
                    center: ['25%', '50%'],
                    name:name,
                    type:'pie',
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                            }
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[{ 
                        value:data.area_count,
                        name:name,
                        itemStyle: {
                            normal: {
                                color: '#25ff8c',
                                shadowColor: 'rgba(37, 255, 140, 1)',
                                shadowBlur: 20
                            },
                        },
                        label:{
                            formatter: [
                                '{a|'+name+'}',
                                '{b|'+data.area_count+'}'
                            ].join('\n'),

                            rich: {
                                a: {
                                    color: '#fff',
                                    fontSize: '14',
                                    lineHeight:'34'
                                },
                                b: {
                                    color: '#25ff8c',
                                    fontSize: '14'
                                },
                            }
                        }
                    },{
                        value:data.area_count, name:'',itemStyle: { color: '#215973' }
                    }]
                    },
                    {
                    center: ['75%', '50%'],
                    name:this.cate.name,
                    type:'pie',
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[{ value:this.cate.count,
                        name:this.cate.name,
                        itemStyle: {
                            normal: {
                                color: '#ffaf25',
                                shadowColor: 'rgba(255, 175, 37, 1)',
                                shadowBlur: 20
                            },
                        },
                        label:{
                            formatter: [
                                '{a|'+this.cate.name+'}',
                                '{b|'+this.cate.count+'}'
                            ].join('\n'),
                            rich: {
                                a: {
                                    color: '#fff',
                                    fontSize: '14',
                                    lineHeight:'34'
                                },
                                b: {
                                    color: '#FFAF25',
                                    fontSize: '14'
                                },
                            }
                        }
                    },{
                        value:this.cate.count, name:'',itemStyle: { color: '#215973' }
                    }]
                }]
            }
            chart.setOption(op)
        },
        init_line(data) {
            let x=[],tb=[],hb=[]
            if(data) {
                data.map(item => {
                    if(item.name && item.data && item.data != {} && item.data.chain_rate && item.data.chain_rate != {} && item.data.years_rate && item.data.years_rate != {}){
                        x.push(item.name)
                        tb.push(item.data.years_rate)
                        hb.push(item.data.chain_rate)
                    }
                })
            } else {

            }
            console.log(x)
            const chart = this.$echarts.init(document.getElementById('line'))
            const op = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        
                        return params[0].name+':同比'+params[0].value.toFixed(2)+'%'+'<br/>'+params[1].name+':环比'+params[1].value.toFixed(2)+'%';
                    }
                    // formatter:'{b0}:Number({c0}).toFixed(2)同比%<br />{b1}:环比{c1}%'
                },
                grid:{
                    bottom:22,
                    left:85,
                    top:10
                },
                calculable : true,
                legend:{
                    data:[{name:'环比', icon:'rect'},
                        {name:'同比',icon:'rect'}],
                    itemHeight:2,
                    itemWidth:10,
                    textStyle:{
                        color : '#fff',
                        fontSize:10
                    },
                    left:200
                },
                xAxis : [{
                    type : 'category',
                    data : x,
                    /*echarts 隐藏x轴横线*/
                    axisLine: {
                    show: false
                    },
                    /*去除刻度线*/
                    splitLine:{
                        show:false
                    },
                    axisLabel:{
                        color: '#fff',
                        fontSize:10,
                        interval:0,
                        rotate:60
                    },
                }],
                yAxis : [{
                    type : 'value',
                    min: function(value) {
                        return Math.floor(value.min);
                    },
                    minInterval: 0,
                    /*显示y轴段数*/
                    splitNumber:4,
                    /*echarts 隐藏Y轴横线*/
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false, // 网格线是否显示
                    },

                    /*去除刻度线*/
                    axisTick:{
                        show:false
                    },
                    axisLabel:{
                        show: true,
                        formatter: '{value}',
                        color: '#55D7FD', fontSize:10
                    },
                }],
                series : [{
                    name:'同比',
                    symbol: 'none',//折线点设置为实心点circle   去掉折线图的折点圆圈 none
                    symbolSize: 0,   //折线点的大小
                    type:'line',
                    itemStyle: {
                        normal: {
                            color: "#2C54FF",//折线点的颜色
                            lineStyle: {
                                color: "#2C54FF",//折线的颜色
                                shadowColor: '#516EFF',
                                shadowBlur: 10
                            }
                        },
                        
                    },
                    data:tb,

                },{
                    name:'环比',
                    type:'line',
                    symbol: 'none',//折线点设置为实心点
                    symbolSize: 0,   //折线点的大小
                    data:hb,
                    itemStyle: {
                        normal: {
                            color: "#00FFB4",//折线点的颜色
                            lineStyle: {
                                color: "#00FFB4",//折线的颜色
                                shadowColor: '#51FFC4',
                                shadowBlur: 10
                            }
                        }
                    },
                }]
            }
            chart.setOption(op)
            this.$nextTick(() => {
                this.scroll_line()
            })
        },
        init_bar(data) {
            let x = [],y=[]
            if(data) {
                data.filter(item => {
                    // this.area.forEach(a => {
                    //     if(a.id==item.area) {
                    //         item.city = a.name
                    //     }
                    // })
                    // if(item.city&&item.city.length>4) {
                    //     item.city= item.city.substr(0,4)
                    // }
                    x.push(item.name)
                    if(item.data && item.data != {} && item.data.base_index_b && item.data.base_index_b != {}){
                        y.push(item.data.base_index_b)
                    }else{
                        y.push(0)
                    }

                })
            } else {

            }
            
            const chart = this.$echarts.init(document.getElementById('bar'))
            const op ={
                tooltip : {
                    trigger: 'axis',
                    formatter: function (par) {
                        // return JSON.stringify(par[0].name)
                        return par[0].name+':'+Number(par[0].value).toFixed(2)
                    }
                },
                grid:{
                    bottom:72,
                    left:85,
                    top:10
                },
                calculable : true,
                xAxis : [
                {
                    type : 'category',
                    data : x,
                    /*echarts 隐藏x轴横线*/
                    axisLine: {
                    show: false
                    },
                    /*去除刻度线*/
                    splitLine:{
                    show:false
                    },
                    axisLabel:{
                        color: '#fff', 
                        fontSize:10,
                        interval:0,
                        rotate:60
                    },
                }
                ],
                yAxis : [
                {
                    type : 'value',
                    min: function(value) {
                        return Math.floor(value.min);
                    },
                    minInterval: 0,
                    /*显示y轴段数*/
                    splitNumber:4,
                    /*echarts 隐藏Y轴横线*/
                    axisLine: {
                    show: false
                    },
                    //这行代码控制着坐标轴x轴的文字是否显示
                    splitLine: {
                    show: false, // 网格线是否显示
                    /*lineStyle: {
                        color: 'red' // 修改网格线颜色
                    },*/
                    },

                    /*去除刻度线*/
                    axisTick:{
                    show:false
                    },
                    axisLabel:{
                        show: true,
                        color: '#55D7FD', fontSize:10
                    },
                }
                ],
                series : [
                {
                    symbol: 'none',//折线点设置为实心点circle   去掉折线图的折点圆圈 none
                    symbolSize: 0,   //折线点的大小
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#38effd'
                            }, {
                            offset: 1,
                            color: '#005fe2'
                            }]),
                            lineStyle: {
                            color: "#02e1a2"//折线的颜色
                            }
                        }
                    },
                    data:y,
                    barMaxWidth:14,
                    barGap:'40%'
                }]
            }
            chart.setOption(op);
            this.$nextTick(() => {
                this.scroll_bar()
            })
        },
        scroll_line() {
            const box = $('.box')
            const content = $('#line div')
           
            const offW = content.width()-box.width()
            content.animate({"left":"-"+offW+"px"}, 5000,function() {
				content.animate({"left":0}, 2000, function() {

                })
            })
        },
        scroll_bar() {
            const box = $('.box')
            const content = $('#bar div')
           
            const offW = content.width()-box.width()
            content.animate({"left":"-"+offW+"px"}, 5000,function() {
				content.animate({"left":0}, 2000, function() {
                    
                })
            })
        }
    },
    mounted() {
        
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/px2vh.stylus'
.right
    width px2vw(500)
    padding-top px2vh(88)
    margin-left 100px
    height 100%
    display flex
    flex-direction column
    justify-content space-between
    box-sizing border-box
    .box
        width 100%
        height 33%
        background url('../../public/img/right.png') no-repeat
        background-size 100% 100%
        margin-bottom 20px
        overflow hidden 
        position relative
    .tt 
        display flex
        align-items center
        padding 0 px2vh(26)
        height px2vh(66)
        i 
            display block
            width 8px
            height 8px
            border 2px solid rgba(85,253,253,1)
            border-radius 50%
            margin-right 4px
        p  
            font-size px2vw(18)
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color #fff
            // line-height px2vh(66)
        .fontb
            font-size px2vw(32)
            font-weight bold
            color rgba(85,215,253,1)
            margin-left px2vw(76)
            span 
                font-size 16px
                font-family:MicrosoftYaHei
                font-weight 400
    #pie
        width 100%
        height 70%
    #line,#bar
        width 100%
        height 70%
        // position relative
        // left -50px
</style>
