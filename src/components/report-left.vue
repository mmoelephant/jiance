<template>
    <div class='reportLeft'>
        <ul>
            <li v-for='(item,index) in tree' :key='index' @click='$router.push(item.path)'>
                {{item.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tree:[
                {
                    name:'全部报告',
                    path:'/reportIndex',
                },
                {
                    name:'月度报告',
                    path:'/reportIndex'
                },
                {
                    name:'自定义报告',
                    path:'/reportIndex'
                },
            ]
        }
    },
}
</script>
<style lang="stylus" scoped>
    .reportLeft 
        width 200px
        background #fff 
        padding 40px 0 40px 30px
        ul 
            margin-bottom 40px
            p
                font-size 16px
                color #333
                line-height 16px
                margin-bottom 30px
            li  
                font-size 14px
                color #666
                line-height 14px 
                margin-bottom 20px
                cursor pointer
            .ac 
                color #2E7BFF
</style>

