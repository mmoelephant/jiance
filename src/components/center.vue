<template>
    <div class='cb'>
        <p class='t'>当前展示</p>
        <div class='b'>{{this.$store.state.bigscreen.cate_on.name}}</div>
        <div style='width :100%;margin-top:15px;position:relative;height:30px;text-align:center' @click='backToYN'>
            <p style='cursor:pointer;color:#55c0fd;line-height:30px;position:absolute;left:15px'>
                {{areaid != 0 && areaid != 530000000000?"返回":""}}
            </p>
            <img src="../../public/img/tem.png" alt="" class='tem'>    
        </div>
        <div class='map'></div>
    </div>
</template>
<script>
import yn from '../../public/map/yunnan.json'
import bs from '../../public/map/保山市.json'
import cx from '../../public/map/楚雄彝族自治州.json'
import dl from '../../public/map/大理白族自治州.json'
import dh from '../../public/map/德宏傣族景颇族自治州.json'
import dq from '../../public/map/迪庆藏族自治州.json'
import hh from '../../public/map/红河哈尼族彝族自治州.json'
import km from '../../public/map/昆明市.json'
import lj from '../../public/map/丽江市.json'
import pe from '../../public/map/普洱市.json'
import lc from '../../public/map/临沧市.json'
import nj from '../../public/map/怒江傈僳族自治州.json'
import qj from '../../public/map/曲靖市.json'
import ws from '../../public/map/文山壮族苗族自治州.json'
import xsbn from '../../public/map/西双版纳傣族自治州.json'
import yx from '../../public/map/玉溪市.json'
import zt from '../../public/map/昭通市.json'
import areajson from '../../public/json/yn.json'
import {datawork} from '../plugins/datawork.js'
import {getToken} from '../plugins/gettoken.js'

export default {
    data() {
        return {
            upsymbol:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0RUE3QUE1NkZBQzExRTlBQUZGRjg0QjNFOTU1NDE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0RUE3QUE2NkZBQzExRTlBQUZGRjg0QjNFOTU1NDE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjRFQTdBQTM2RkFDMTFFOUFBRkZGODRCM0U5NTU0MTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjRFQTdBQTQ2RkFDMTFFOUFBRkZGODRCM0U5NTU0MTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6otKEhAAACIUlEQVR42rSXz2pTQRTGk4mF0Lho6qKkEpW2m0KhmJKYPoF1H3f6CL5Ut+5ETbvrriVpA4VCNwZiwP7ZVIQmBCSJ34HvyvWaOSe5Nz3wW1xm5nx3Zs7MOZMepz6kprAMWCerIA+ybBuAn+AKtMnQcvjIaBfnVVAGOU+fx6QIXoE+aIAT/tRESysz3gJ7dBrH7sEBuJh2xg684SyTmPxwDTwHdTCKikS/385BNGxl+nSasCztZmr+tknfE4VlTyuph7MKNf7Z4yz31bIVLt0aWOKx+QU6oAlujfGi8U2iPRCuKsdFbAG8BiU5CZHgfEKkrQUOwW+Pnxy1jhwvh7Ih+h7sRET/O5rs844+tWDLON5GOWN5ijPs5TNj20RrPRD2mVyPL2MEUonx4LMNES4oHbZjRnDa2L6CY2B4/yzB8VlT2pZdKMtMsnwC4SUt+Thj8DCBsDrWaamLl0Nc08YORPhO6dBOINxR2u4cKwefnScQbilt186Y1ZXhQBPVJtQOhPtKp6+gO4Nol2N81pNE4Rh9DSM698EZGCv9xuyzb0S0ZLFhkJ1OjIJOHH0Gp8yrLyJpscufvzFWo0etv/l4wLqoZgwUx58SBFw9OL7hC+TCWPKk1ghXnNGbS8rRywcQvaRvb7EnJehHBsC8rEmfI6uulg5fwHcm9FxMwR73dOqCPrznUpjtMuIXpxTsc5bHcZ8wvkfbU8+j7ccsj7Y/AgwA/LR3QT2Y9/gAAAAASUVORK5CYII=',
            downsymbol:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI1QjRBQjZCNkZBQzExRTlCOEM4QzVFNjM3MkE0REIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI1QjRBQjZDNkZBQzExRTlCOEM4QzVFNjM3MkE0REIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjVCNEFCNjk2RkFDMTFFOUI4QzhDNUU2MzcyQTREQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjVCNEFCNkE2RkFDMTFFOUI4QzhDNUU2MzcyQTREQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz556KrVAAACEElEQVR42rSXz0sCQRTH17FA2g5Wh7DoB9olEKLCsL+gutet/jmvdeznrVtiPyAIvCSUkNXFCFKEUHuvvgvrtjPP3dUHn4POzPvOzryZ9yZmdY+tPixOZMAMMUEk0NYiPogaUQFtyWFMEGbneSJH2FZ/1iRKRBGTCiycJbaJcSucfRHnxINf44jPf4rYwVdGMZ7wLrFAnBEdr4j3994ARN2Wg09lEualXbYGb8vw7SvMe7phDc82oNGzxwnsq2TTWLo0kcSx+SSeiGviXRjPGo8c7Y5wXjguo8QWsfZ7EnqDcwpw2x1xQXxr/NjQulS4HHKC6AGx7hH9fzT/+uzDpynY4gq3kS0sz1yAvZwXto21Mo6wzvh6XA0RSGuIB50tsXDK0GElZATHhO1LKQSGdmYRjk/a0DapXFnGzyYiCCdNyUcJg9sRhI1jlSl14XIIa6axLRauGzpUIgg/GdrqCpWDzu4jCN8Z2l6V8FU1wYFJ1PRBFUe4aeh0SlQDiFYxRmcNThQK0VcSorNA3BJdQ78u+hSEiOYs1nayU1Eo6NgRF2c3yKuLnrRYxeTfhNVoQKun2MuiRhqmHTnFn/sCeRCWPKqV3BWn9+bicrQ8BNEyfGuLPS5BDxEAg7Jr+OxIdTV3OCGekdDtkIIN1NN9F/TuPefCbBMRPxbgCcNfeRX2CaN7tM1qHm0vQR5tPwIMAEWMd77cFWV+AAAAAElFTkSuQmCC',
            cpsymbol:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0MTU0RDM2NkZBQzExRTlBMDJBRDgxMDg5MDFCQUMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0MTU0RDM3NkZBQzExRTlBMDJBRDgxMDg5MDFCQUMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjQxNTREMzQ2RkFDMTFFOUEwMkFEODEwODkwMUJBQzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjQxNTREMzU2RkFDMTFFOUEwMkFEODEwODkwMUJBQzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz62ELPCAAACHUlEQVR42rSXu0sDQRDGk1VBjIWPQlR8oDaCID4StbNTe+30n7O1EzVaKRYqUSOCkMaABnw1ikVCQKJ+A9/Jebg7ubs48CuO3Z1vH3M7s8nsyVWiDmsCo6QPdIJWtlXBG3gERVLTHDYr7eJ8HqRBytKnnQyAOVABOXDGSYUWngDLdBrG2sAimAX74KZeYQNWuMo4JhNeBUMgCz6DIsHvtQaI+i1Nn8YlLFs7nmi8jdP3n8JyppnE/1mGGr/OuJXnqlkPt24EdPC3eQd34By8KONF41ai3ROed/wuYi1gCUyDZCA4u4m05cEB+LD4SVHryPBySCuiG2AmIBq0JPus06cr2JoMb6OUsj0DIc5yUDk20Rr1hG0m1+NUhECaZjzYbEyEex0dJiNGcFI5vl7DwLDOLMbvM+Jo6zK+LPOXdcYQ7nAlH6MMrsUQdo41rtTFyyGqucZWRfjV0aEYQ/jO0fZqWDnY7DqGcN7R9mSUVT0qDlyirgUVPeGKo9MeKIUQLXGMzcqSKAyjL6dE5ya4BF+Ofl/ss6lEtGSxmpedzpSCThztgAvm1eFAWixx8s/KbpSp9ZOPq6yLVpWB4ng7RsBlvd/Xf4HcKFse13L+ijN4c0k5WvgH0QJ9W4s9KUG3GACNsnP6/NTqaumwC+6Z0FMRBcs807oLev+ZS2G2wIhvq1OwwlWeRn3CeNF+CI59j7Z+y6PtIcyj7VuAAQD2R3dP+C6jjgAAAABJRU5ErkJggg==',
            area:areajson,
            chosed_area:{},
            CoordMap:[],
            chart:null,
            area_map:yn,
            map:{
                '保山市':bs,
                '楚雄州':cx,
                '大理州':dl,
                '德宏州':dh,
                '迪庆州':dq,
                '红河州':hh,
                '昆明市':km,
                '丽江市':lj,
                '临沧市':lc,
                '怒江州':nj,
                '曲靖市':qj,
                '文山州':ws,
                '西双版纳州':xsbn,
                '玉溪市':yx,
                '昭通市':zt,
                '普洱市':pe,
                '云南省':yn
            },
            areaid:0,
            areaname:''
        }
    },
    computed:{
        cate() {
            return this.$store.state.bigscreen.cate_on
        },
        map1() {
            return this.$store.state.login.map
        }
    },
    watch:{
        cate:{
            handler(val) {
                // console.log(val)
                //这里获取到的是左边部分的数据变化，（在big-left.vue部分有说明），然后对应的渲染地图
                if(val.areasData) {
                    // this.chart.dispose()
                    this.init_map(val.areasData)
                } else {
                    this.get_bar_data()
                }
            },
            deep: true
        },
        map1:{
            handler(val) {
                //点击某个市的地图板块，还有在区县的地图里面点击“返回”，这里的值会翻身变化，所以渲染地图要用的area_map也要随着变化。
                //这里的作用主要是让this.area_map随着变化，然后渲染地图的时候，比较方便跟传init_map()方法的数据做匹配
                //areaid的作用就是判断“返回”字眼的显示与否，当点击返回以后，这里val.id的值将是530000000000（云南省对应的地区编码），
                // 当点击某个地区板块之后，areaid将会是对应地区的地区编码
                this.areaid = Number(val.id)
                this.areaname = val.name
                this.area_map = this.map[this.areaname]
            },
            deep:true
        }
    },
    created() {
        //判断有误账户信息
        if(localStorage.getItem('user')){
            let areanum = JSON.parse(localStorage.getItem('user')).area_code
            let arealen = JSON.parse(localStorage.getItem('user')).area_code.length
            if(arealen != 12){
                for(var i = 0;i < 12-arealen;i++){
                    areanum = areanum + '0'
                }
            }
            this.areaid = Number(areanum)
            // 当有账户信息存在的时候，用户如果不是云南省的权限，那就将对应的渲染地图要使用的数据area_map切换成用户的权限地区
            this.areaname = JSON.parse(localStorage.getItem('user')).area_name
            if(this.areaname.indexOf('>') != -1){
                this.areaname = JSON.parse(localStorage.getItem('user')).area_name.split('>')[1].replace(/\s+/g,'')
            }else{
                this.areaname = JSON.parse(localStorage.getItem('user')).area_name
            }
            this.area_map = this.map[this.areaname]

        }else{
            console.log('用户还未登陆')
            this.areaid = 0
            // this.areaid = 530100000000
            // this.areaname = '保山市'
        }
    },
    mounted() {
        
    },
    methods:{
        async get_bar_data() {
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
            data.client_id = localStorage.getItem('clientid')
            data.access_token = localStorage.getItem('accesstoken')
            if(this.areaid && this.areaid != 530000000000){
                data.areas = this.areaid
            }else{
                data.areas = 53
            }
            data2 = datawork(data)
            // let data = {
            //     id:this.cate.cid,
            //     monthNumber:1,
            // }
            let res
            if(this.area_map == yn) {
                res = await this.$api.get_cate_level1(data2)
                this.chosed_area = this.area
            } else {
                data.area= this.$store.state.login.map.id
                this.area.map(item => {
                    if(item.id == this.$store.state.login.map.id) {
                        this.chosed_area = item.childrenList
                    }
                })
                data2 = datawork(data)
                res = await this.$api.get_area_line(data)
            }
			let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.id == this.cate.id) {
					item.areasData = res.data.data.data
				}
            })
            res.data.data.data.filter(d => {
                this.chosed_area.forEach(a => {
                    if(a.id == d.name) {
                        d.city = a.name
                    }
                })
                
            }) 
            this.init_map(res.data.data)
            this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        init_map(data) {
            const arr = this.area_map.features
            this.CoordMap = []
            if(data.length > 0) {
                arr.forEach(item => {
                    data.forEach(d => {
                        let symbol=''
                        if(item.properties.name == d.name) {
                            if(d.data && d.data != {} && d.data.chain_rate && d.data.chain_rate != {}){
                                if(Number(d.data.chain_rate)>0) {
                                    symbol = 'image://'+this.upsymbol
                                } else if(Number(d.data.chain_rate)<0) {
                                    symbol = 'image://'+this.downsymbol
                                } else {
                                    symbol = 'image://'+this.cpsymbol
                                }
                            }else{
                                symbol = 'image://'
                            }
                            this.CoordMap.push({
                                name: item.properties.name, 
                                coord:item.properties.dot?item.properties.dot:item.properties.centroid, 
                                symbol:symbol
                            })
                        }
                    })
                })      
            }
            this.$echarts.registerMap('yn', this.area_map);
            this.chart =  this.$echarts.init(document.getElementsByClassName('map')[0]);
            // if(chart) chart.dispose()
            // const geoCoordMap = this.CoordMap
            let op = {
                series: [{
                    type: 'map',
                    top:80,
                    left:80,
                    right:80,
                    bottom:50,
                    map: 'yn',
                    aspectScale:1.1,
                    itemStyle: {
                        normal: {
                            show:true,
                            label: {
                                show: true,//默认是否显示省份名称  
                                color:'#fff',//修改字体颜色
                                fontSize:20,
                            },
                            areaColor:'rgba(0,0,0,0)',//设置背景颜色
                            areaStyle:{
                                color:'red',
                            },
                            borderWidth:2,
                            borderColor:'#43bcff',//设置边框颜色
                        },
                        emphasis: {//鼠标移入动态的时候显示的默认样式
                            show:false,
                            label: {
                                show: true,//选中状态是否显示省份名称
                                color:'#fff',//修改字体颜色
                                fontSize:'20' 
                            },
                            textStyle:{
                                color:'#fff',
                            },
                            areaColor:'rgba(0,0,0,0)',
                        },
                    },
                }],
            }
            if(this.CoordMap.length>0) {
                op.series[0].markPoint={
                    data:this.CoordMap,
                    // symbol: function(par) {
                    //     console.log(par)
                    // },//'image://https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
                    symbolSize:20,
                    silent:true,
                    symbolOffset:['100%', '-120%']
                }
            }
            this.chart.setOption(op);
            const _this= this
            this.chart.on('click', function(params){
                const area_name = params.name
                _this.area.map(item => {
                    if(item.name == area_name) {
                        _this.$emit('click_map',item)
                        _this.area_map = _this.map[area_name]
                        _this.$store.commit('login/SET_MAP', item)
                    }
                })
                //此处写点击事件内容
            });
        },
        backToYN() {
            this.area_map = yn
            this.areaid = 0
            this.$store.commit('login/SET_MAP', {id:'530000000000',name:'云南省'})
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/px2vh.stylus'
    .cb
        width px2vw(880)
        height 100% 
        padding-top px2vh(88)
        box-sizing border-box
        display flex
        flex-direction column
        align-items center
        position relative
        .t 
            font-size 16px
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
        .b 
            width px2vw(320)
            height px2vh(52)
            line-height px2vh(52)
            text-align center
            margin-top 17px
            font-size px2vh(22)
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
            text-shadow 0px 0px 10px rgba(85,227,253,0.4)
            background url('../../public/img/sb.png') no-repeat
            background-size 100% 100%
        .map
            width 100% 
            height 100%
            div 
                width 100% 
                height 100%
    .tem  
        width 180px
        height 18px
</style>
