<template>
    <div id="container">
        <div id="loader"></div>
    </div>
</template>


<style lang="sass" scoped>
@import '../styles/main.sass'
    
#container
    font-size: 12px
    width: 100% 
    max-width: 80vw
    height: 1em
    position: relative
    border-radius: .5em
    overflow: hidden
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .25)

#loader
    height: 100%
    width: 10em
    background-color: $blue
    opacity: .8
    position: absolute
    border-radius: .5em
    
    animation: load
    animation-duration: 2s
    animation-iteration-count: infinite
    animation-direction: alternate
    animation-fill-mode: both
    animation-timing-function: ease-in-out

@keyframes load
    from 
        left: -5em 
    to  
        left: calc(100% - 5em)
</style>


<script>
export default {
    name: 'loader'
}
</script>