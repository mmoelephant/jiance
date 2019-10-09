<template>
    <div class='login' v-loading="loading">
        <div class='login-box'>
            <div class='left'>
                <img src='../../public/img/logo.png'/>
                <p>云南省建设工程材料及设备价格</p>
                <p>监测系统</p>
                <p class='cp mt'>
                    Copyright 2018-2019 版权所有 昆明行列科技有限公司
                </p>
                <p class='cp'>Ver 2.1.2</p>
            </div>
            <div class='right'>
                <h1>用户登录</h1>
                <div class='input'>
                    <div :class='focusIndex == 1? "onfocus":error1&&error1.length>0?"onerror":""'>
                        <i class='iconfont icon-zhanghao'></i>
                        <span v-if='focusIndex != 1 && username.length==0 && !isSupportPlaceholder' @click='getfocus(0)'>请输入手机号</span>
                        <input 
                            autocomplete="off"
                            v-model='username' 
                            :placeholder="isSupportPlaceholder?'请输入手机号/账号':''"
                            @focus="focus(1)"
                            @blur="blur(1)"
                            :class='error1&&error1.length>0?"red":username&&username.length>0?"blue":""'>
                    </div>
                    <p class='error'>{{error1}}</p>
                </div>
                <div class='input'>
                    <div :class='focusIndex == 2? "onfocus":error2&&error2.length>0?"onerror":""'>
                        <i class='iconfont icon-mima'></i>
                        <span v-if='focusIndex != 2 && password.length==0&& !isSupportPlaceholder' @click='getfocus(1)'>请输入密码</span>
                        <input
                            autocomplete="off"
                            :placeholder="isSupportPlaceholder?'请输入密码':''"
                            v-model='password' type='password'
                            @focus="focus(2)"
                            @blur="blur(2)"
                            :class='error2&&error2.length>0?"red":password&&password.length>0?"blue":""'>

                    </div>
                    <p class='error'>{{error2}}</p>
                </div>
                <el-button @click='login' 
                    :class='!username || username.length ==0 || !password || password.length==0?"loginbtn disabled":"loginbtn abled"'>登 录</el-button>
                <div class='tool'>
                    <p @click='$router.replace("/")'>&lt;返回首页</p>
                    <!--p>帮助中心</p-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {datawork} from '../plugins/datawork.js'
import {getCilentId} from '../plugins/getclientidagain'
import {getToken} from '../plugins/gettoken.js'
import { deflate } from 'zlib'
export default {
    data() {
        return {
            loading:true,
            username:'',
            password:'',
            error2:'',
            error1:'',
            focusIndex:0,
            isSupportPlaceholder:'',
            requestaData:{},
            clientid:'',
            accesstoken:'',
            random16:'',
            random15:'',
            tt:'',
            userid:''
        }
    },
    created() {
        // 获取16位的随机数(nonce_str)
        this.random16 = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
		// 获取15位的随机数(unique_code)
        if(localStorage.getItem('uniquecode')){
            this.random15 = localStorage.getItem('uniquecode')
        }else{
            this.random15 = new Date().getTime() + "" + Math.floor(Math.random()*89 +10)
        }
        // 获取user_id
        if(localStorage.getItem('userid')){
            this.userid = localStorage.getItem('userid')
        }else{
            this.userid = 0
        }
        // 获取10位时间戳(秒级,timestamp)
        this.tt = Math.round(new Date().getTime() / 1000).toString()
        // 获取公共请求参数
        this.requestaData = this.$store.state.login.commonParam

        this.requestaData.nonce_str = this.random16
        this.requestaData.timestamp = this.tt
        this.requestaData.unique_code = this.random15
        this.requestaData.user_id = this.userid
        this.clientid = localStorage.getItem('clientid')
        this.accesstoken = localStorage.getItem('accesstoken')
        if(this.clientid && this.clientid.length > 0 && this.accesstoken && this.accesstoken.length > 0){
            this.requestaData.client_id = this.clientid
            this.requestaData.access_token = this.accesstoken
        }else{
			this.$store.commit('login/SET_CLIENT_ID', '')
            this.$store.commit('login/SET_ACCESS_TOKEN', '')
        }
        this.$nextTick(() => {
            this.loading = false
        })
    },
    mounted() {
        const input = $('input')[0]
        this.isSupportPlaceholder =  'placeholder' in input
		const that = this
		document.onkeydown = function(e) {
			var keycode = document.all ? event.keyCode : e.which;
			if (keycode == 13) {
				that.login()
				return false;
			}
		}
	},
    methods:{
        getfocus(index) {
            $('input')[index].focus()
        },
        focus(i) {
            this.focusIndex = i
            if(i ==1) {
                this.error1 = ''
            } else {
                this.error2 = ''
            }
        },
        blur(i) {
            if(i==1) {
                if(this.username.length>0) {
                    return
                } else {
                    this.error1 = '请输入正确的账号/手机号'
                }
                
            } else {
                if(this.password.length>0) {
                    return
                } else {
                    this.error2 = '请输入正确的密码'
                }
            } 
            this.focusIndex = 0
        },
        async login() {
            let finaldata,getClientFinal,getTokenFinal
            let me = this
            if(!this.check()) return
            this.loading = true
            this.requestaData.username = this.username
            this.requestaData.password = this.password
            finaldata = datawork(this.requestaData)
            this.$api.login(finaldata).then(v => {
                if(v.data.data && v.data.errcode == 0 && v.data.errmsg == 'ok') {
                    this.loading = false
                    this.$store.commit('login/SET_USER_ID', v.data.data.id)
                    localStorage.setItem('userid', v.data.data.id)
                    localStorage.setItem('user', JSON.stringify(v.data.data))
                    this.$store.commit('login/SET_USER_INFO', v.data.data)
                    this.$message({
                        message: '恭喜你，登录成功',
                        type: 'success',
                        duration:1000
                    });
                    setTimeout(function(){
                        me.$router.push({name:'ref'})
                    },1000)
                } else {
                    if(v.data.errcode == 2901) {
                        this.loading = false
                        this.error1 = '账号不存在'
                    }else if(v.data.errcode == 2902){
                        this.loading = false
                        this.error2 = '密码错误'
                    }else if(v.data.errcode == 1103){
                        let that = this
                        getCilentId(that.requestaData)
                        setTimeout(function(){
                            if(localStorage.getItem('done')){
                               that.loading = false
                                that.requestaData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                                that.requestaData.timestamp = Math.round(new Date().getTime() / 1000).toString()
                                that.requestaData.client_id = localStorage.getItem('clientid')
                                that.requestaData.access_token = localStorage.getItem('accesstoken')
                                that.requestaData.unique_code = localStorage.getItem('uniquecode')
                                that.login()
                            }else{
                            }  
                        },1000)
                    }else if(v.data.errcode == 1104){
                        let that = this
                        getToken(this.requestaData)
                        setTimeout(function(){
                            if(localStorage.getItem('tokenDone')){
                               that.loading = false
                                this.requestaData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                                this.requestaData.timestamp = Math.round(new Date().getTime() / 1000).toString()
                                this.requestaData.access_token = localStorage.getItem('accesstoken')
                                that.login()
                            }else{
                            }  
                        },1000)

                    }
                }
            })
            // const v = await this.$api.login(data1)
        },
        copy(){
                        // getClientFinal = getCilentId(this.requestaData)
                        // this.$api.get_client(getClientFinal).then(v => {
                        //     if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                        //         this.loading = false
                        //         localStorage.setItem('clientid',v.data.data.client_id)
                        //         this.$store.commit('login/SET_CLIENT_ID', v.data.data.client_id)
                        //         localStorage.setItem('accesstoken',v.data.data.access_token)
                        //         this.$store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
                        //         this.requestaData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                        //         this.requestaData.timestamp = Math.round(new Date().getTime() / 1000).toString()
                        //         this.requestaData.client_id = v.data.data.client_id
                        //         this.requestaData.access_token = v.data.data.access_token
                        //         this.requestaData.unique_code = localStorage.getItem('uniquecode')
                        //         this.login()
                        //     }else{
                        //     }
                        // })
                        // getTokenFinal = getToken(this.requestaData)
                        // this.$api.get_token(getTokenFinal).then(v => {
                        //     if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
                        //         localStorage.setItem('accesstoken',v.data.data.access_token)
                        //         this.requestaData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
                        //         this.requestaData.timestamp = Math.round(new Date().getTime() / 1000).toString()
                        //         this.requestaData.access_token = v.data.data.access_token
                        //         this.$store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
                        //         this.login()
                        //     }
                        // })
        },
        check() {
            if(!this.username || this.username.length==0) {
                this.error1 = '请输入正确的账号/手机号'
                return false
            } else if(!this.password || this.password.length==0) {
                this.error2 = '请输入正确的密码'
                return false
            }
            // else if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.name))) {
            //     this.error1 = '手机号格式不正确'
            //     return false
            // }
            else {
                return true
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../style/color.stylus'
    .icon-mima
        font-size 19px
    .login 
        width 100% 
        height 100%
        background url('../../public/img/bg.jpg') no-repeat
        background-size 100% 100%
        display flex
        justify-content center
        align-items center
        position absolute
        top 0
        left 0
        z-index 999
    .login-box
        display flex
        .left
            display flex
            flex-direction column
            align-items center
            width 360px
            height 480px
            padding 102px 30px 49px 30px
            box-sizing border-box
            margin-right 10px
            background url('../../public/img/loginq.jpg') no-repeat
            background-size 100% 100%
            box-shadow 0px 13px 29px 0px rgba(5,16,65,0.5) 
            img 
                width 116px
                margin-bottom 24px
            p
                font-size 16px
                color #fff
                font-weight 600
                line-height 28px
            .cp
                font-size 12px
                color #A6A6A6
                font-weight 400
                line-height 20px
            .mt 
                margin-top 128px
        .right 
            width 480px 
            height 480px
            box-shadow 0px 13px 29px 0px rgba(5,16,65,0.5)
            background rgba(255,255,255,0.85)
            // opacity 0.85
            border-radius 8px
            padding 90px 90px 0 90px
            box-sizing border-box
            h1 
                margin-bottom 50px
                font-size 24px
                color #2C2D33
                text-align center
            .input
                width 100%
                font-size 14px
                color rgba(153,153,153,1)
                margin-bottom 20px
                position relative      
                div
                    display flex
                    align-items center
                    border-bottom 1px solid #C6C9D6
                i
                    font-weight 600
                .onfocus
                    border-bottom 2px solid #454EFF
                    i
                        color #454EFF
                .onerror
                    border-bottom 2px solid font-color-red
                    i  
                        color font-color-red
                input 
                    width 100%
                    height 32px
                    background rgba(255,255,255,0)
                    border none
                    outline none
                    margin-left 14px
                    line-height 32px
                    display block
                span 
                    position absolute
                    color #8E9099
                    font-size 14px
                    left 40px
                .blue
                    border-color #3577EC
                .red
                    border-color #FF1A25
                .error
                    height 16px
                    font-size 12px
                    color #FF1A25
                    line-height 16px
            .loginbtn 
                width 100%
                height 42px
                margin-bottom 20px
                color #fff
                font-size 16px
                font-weight bold
                border-radius 4px
            .abled
                // background #454EFF linear-gradient(90deg,rgba(41,105,219,1) 0%,rgba(28,92,208,1) 100%)
                background #454EFF
                box-shadow 0px 8px 12px 0px rgba(59,110,255,0.3)
            .abled:hover 
                // background #7f94ff linear-gradient(90deg,rgba(74,135,243,1) 0%,rgba(37,104,226,1) 100%)
                background #637cfb
                box-shadow 0px 10px 14px 0px rgba(36,133,250,0.14)
            .disabled 
                background #8E9099
                box-shadow 0px 8px 12px 0px rgba(142,144,153,0.3)
            .tool 
                display flex
                justify-content space-between
                font-size 14px
                p
                    color #454EFF
                    cursor pointer
                p+p
                    color font-color-black
</style>
