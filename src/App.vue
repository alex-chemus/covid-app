<template>
    <top/>
    <router-view/>
    <bottom/>
</template>

<script>
import top from './components/top.vue'
import bottom from './components/bottom.vue'

export default {
    name: 'App',

    components: { top, bottom }
}
</script>

<style lang='sass'>
body
    margin: 0

html, body
    min-height: 100vh

#app
    min-height: 100vh
    width: 100%
    display: grid
    font-size: 18px
    grid-template-rows: 3em 1fr 3em

    @media screen and (max-width: 380px)
        font-size: 14px
</style>
