<template>
    <div class='box'>
        <div :class='disablepage==-1 || disablepage==2? "left disable":"left"' @click='page(-1)'>
            <i class='iconfont icon-shang-copy'></i>
        </div>
        <div :class='disablepage==1 || disablepage==2? "right disable":"right"' @click='page(1)'>
            <i class='iconfont icon-shang-copy'></i>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        disablepage:{
            type:Number
        }
    },
    watch:{
        disablepage(val) {
        }
    },
    methods:{
        page(type) {
            if(this.disablepage ==2 || this.disablepage == type) {
                return
            } else {
                this.$emit('pagechange',type)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .box 
        width 90px
        display flex
        justify-content space-between
        div
            width 40px
            height 32px
            border 1px solid #7F94FF
            border-radius 4px
            line-height 32px
            text-align center
            font-size 18px
            // color #7F94FF
            color red
            cursor pointer
        div:hover
            background #7F94FF
            color #fff
        .left 
            .iconfont:before
                display inline-block
                transform rotate(180deg)
        .disable
            color #C6C9D6
            border-color #C6C9D6
            cursor default
        .disable:hover
            color #C6C9D6
            border-color #C6C9D6
            cursor default
            background #fff

</style>
