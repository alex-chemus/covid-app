<template>
    <top/>
    <router-view/>
    <div style="background: blue"></div>
</template>

<script>
import top from './components/top.vue'
//import bottom from './components/bottom.vue'

export default {
    name: 'App',

    components: { top }
}
</script>

<style lang='sass'>
body
    margin: 0

html, body
    height: 100vh

#app
    height: 100vh
    display: grid
    font-size: 18px
    grid-template-rows: 3em 1fr 3em
</style>
