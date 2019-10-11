<template>
<div style="height:auto">
    <div class="reportDetail">
        <div class="detailLeft">
            <!-- <a href="javascript:void(0)"><div :class="bigType == 0 ?'all allOn':'all'" @click="toggleBig(0)">全部报告</div></a> -->
            <div :class="bigType == 0 ?'all allOn':'all'" @click="toggleBig(0)">全部报告</div>
            <div :class="bigType == 1 ?'month monthOn':'month'" @click="toggleBig(1)">月度智能报告</div>
            <div :class="bigType == 2 ?'custom customOn':'custom'" @click="toggleBig(2)">自定义报告</div>
        </div>
        <div class="detailRight">
			<div class="reportBtns">
				<div class="btnClass"><span class="dotClass"></span>月度智能报告  >&nbsp<span class="navigiOn">报告详情</span></div>
                <div class="backBtn">
                    返回
                </div>
			</div>
            <div class="detailBox">
                <p class="bigTit">云南省建筑工程主要材料市场价格变动情况<span>(2019年6月)</span></p>
                <div class="markInfo">
                    <div class="source">来源：<span>行列科技</span></div>
                    <div class="timeInfo">发布时间：<span>2019-6-24</span></div>
                </div>
                <div class="summary">
                    据对16个州、市建设工程7大类26小类主要材料市场价格的监测显示，2018年9月与上月相比，
                    <span style="color:#F96E31">10</span>类材料价格上涨，<span style="color:#0CCE63">5</span>类下降，<span>12</span>类持平。
                </div>
                <div class="mianTable">
                    <div class="tableTil">建筑工程主要材料市场价格变动情况统计表<span>(2019年6月)</span></div>
                    <div>
                        <div class="m-table">
                            <p class="mateName">一、钢材</p>
                            <ul class="mateList">
                                <li class="listName">
                                    <span class="colItem col1">材料名称</span>
                                    <span class="colItem col2">单位</span>
                                    <span class="colItem col3">本期价格（元）</span>
                                    <span class="colItem col4">比上期价格涨跌（元）</span>
                                    <span class="colItem col5">涨跌幅（%）</span>
                                </li>
                                <li class="listItem">
                                    <span class="colItem1 col1">钢筋</span>
                                    <span class="colItem1 col2">吨</span>
                                    <span class="colItem1 col3">403.06</span>
                                    <span class="colItem1 col4">10.00</span>
                                    <span class="colItem1 col5">0.1</span>
                                </li>
                                <li class="listItem">
                                    <span class="colItem1 col1">钢筋</span>
                                    <span class="colItem1 col2">吨</span>
                                    <span class="colItem1 col3">403.06</span>
                                    <span class="colItem1 col4">10.00</span>
                                    <span class="colItem1 col5">0.1</span>
                                </li>
                                <li class="listItem">
                                    <span class="colItem1 col1">钢筋</span>
                                    <span class="colItem1 col2">吨</span>
                                    <span class="colItem1 col3">403.06</span>
                                    <span class="colItem1 col4">10.00</span>
                                    <span class="colItem1 col5">0.1</span>
                                </li>
                                <li class="listItem">
                                    <span class="colItem1 col1">钢筋</span>
                                    <span class="colItem1 col2">吨</span>
                                    <span class="colItem1 col3">403.06</span>
                                    <span class="colItem1 col4">10.00</span>
                                    <span class="colItem1 col5">0.1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="notes">
                            <p class="noteTil">附注：</p>
                            <p>
                                1.建设工程主要材料市场价格，是指材料的市场综合采购参考价，即材料在指定范围内和对应时间区间的市场综合平均价格。<br>
                                2.建设工程主要材料的检测内容包括7大类26小类材料的价格。<br>
                                3.发布日期：每月5日
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data(){
        return {
            bigType:0
        }
    },
    methods:{
        toggleBig(aa){
            this.bigType = aa
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
.detailLeft
    width 200px
    height calc(100% - 78px)
    max-height calc(100% - 78px)
    background-color #fff
    position fixed
    top 78px
    left 0
.detailRight
    width calc(100% - 220px)
    height auto
    padding-top 30px
    box-sizing border-box
    margin-left 220px
.reportBtns
    align-items center
.all,.month,.custom
    width 100%
    height 58px
    background url(../../../public/img/report/all_grey.png) no-repeat 15px 15px
    padding-left 46px
    box-sizing border-box
    margin-bottom 10px
    font-size 14px
    color #8E9099
    line-height 58px
    cursor pointer
.all:hover
    background #F5F6FE url(../../../public/img/report/all_black.png) no-repeat 15px 15px !important
    color #2C2D33
.allOn
    background url(../../../public/img/report/all_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
    color white
    font-weight bold
.allOn:hover
    background url(../../../public/img/report/all_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) !important
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
.backBtn
    padding-left 17px
    box-sizing border-box
    margin-left 20px
    font-size 14px
    color #635EF9
    font-weight bold
    text-decoration underline
    cursor pointer
    // background url(../../../public/img/)
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
.tableTil
    margin 95px 0 20px 0
    font-size 16px
    color #2C2D33
    text-align center
    cursor pointer
.mateName
    font-size 14px
    font-weight bold
    color #2C2D33
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
.colItem1
    color #5C5D62
    font-weight normal
.col1
    width 20%
.col2
    width 20%
.col3
    width 20%
.col4
    width 20%
.col5
    width 20%
.notes
    font-size 12px
    color #5C5D62
    line-height 20px
.noteTil
    color #8E9099
</style>