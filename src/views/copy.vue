<template>
<div>
<el-form>
    <el-form-item label="日期" class="seasonDate">
        <el-input placeholder="请选择季度" v-model="showValue" style="width:138px;" @focus="showSeason=true">
             <!-- @blur="showSeason = false" -->
            <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
        <el-card class="seasonCard" v-show="showSeason">
            <div slot="header">
                <button type="button" aria-label="前一年" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="prev">
                </button>
                <span role="button" class="el-date-picker__header-label">{{year}}年</span>
                <button type="button" aria-label="后一年" @click="next" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right">
                </button>
            </div>
            <div style="text-align:center;">
                <el-button type="text" size="medium" @click="selectSeason(0)">
                    第一季度
                </el-button>
                <el-button type="text" size="medium" @click="selectSeason(1)">
                    第二季度
                </el-button>
            </div>
            <div style="text-align:center;">
                <el-button type="text" size="medium" @click="selectSeason(2)">
                    第三季度
                </el-button>
                <el-button type="text" size="medium" @click="selectSeason(3)">
                    第四季度
                </el-button>
            </div>
        </el-card>
    </el-form-item>
</el-form>
</div>
</template>
<script>
export default {
  props: {
    valueArr: {
      default: () => {
        return ['01-01', '04-01', '07-01', '10-01']
      },
      type: Array
    },
    getValue: {
      default: () => {},
      type: Function
    },
  },
  data() {
    return {
      showSeason: false,
      season: '',
      year: new Date().getFullYear(),
      showValue: ''
    }
  },
  created() {
  },
  watch:{

  },
  methods: {
    one() {
      this.showSeason = false
    },
    prev() {
      this.year = this.year * 1 - 1
    },
    next() {
      this.year = this.year * 1 + 1
    },
    selectSeason(i) {
      let that = this
      that.season = i + 1
      let arr = that.valueArr[i].split('-')
      that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
      that.showSeason = false
      this.showValue = `${this.year}年${this.season}季度`
    }
  }
}
</script>
<style lang="stylus">
.el-form-item.seasonDate
    .el-form-item__label
        line-height 32px
    .el-form-item__content
        line-height 32px
        .el-input__inner 
            height 32px
        .el-input__icon
            line-height 32px
        .seasonCard.el-card
            width 324px
            padding 0 3px 20px
            position absolute
            top 42px
            left 0
            z-index 9999
            .el-card__header
                padding 0 12px !important
                border none
                line-height 54px
                div
                    border-bottom 1px solid #EBEEF5
                    text-align center
                    .el-picker-panel__icon-btn
                        margin-top 20px
            .el-card__body 
                padding 0
                padding-top 12px
                >div
                    display flex
                    justify-content center
                    .el-button.el-button--medium
                        width 40%
                        padding 0
                        color #606266
                        text-align center
                        line-height 42px
                        float left

</style>