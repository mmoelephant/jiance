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
                <div class="backBtn">
                    <i class="iconfont">&#xe606;</i>
                    <span>返回</span>
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
            reType:1
        }
    },
    created(){
        console.log(this.$route)
        this.reType = this.$route.query.type
    },
    methods:{
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
    text-decoration underline
    cursor pointer
    // i
    //     margin-right 3px
    //     text-decoration none !important
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