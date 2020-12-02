<template>
    <main>
        <p id="title">Oops...</p>
        <p>This page doesn't exist</p>
    </main>
</template>

<script>
export default {
    name: 'not_found'
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

main 
    font-size: 24px
    font-family: 'Roboto'
    @extend %centralize
    flex-direction: column

#title, p
    margin: 0

#title
    margin-bottom: 1.5em
    font-size: 1.2em
</style>