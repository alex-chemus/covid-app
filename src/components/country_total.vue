<template>
    <main>
        <div class="wrapper">

            <p>some value</p>

        </div>
    </main>
</template>


<script>
export default {
    name: 'country_total',

    setup() {
        

        return {

        }
    }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

main
    font-size: 24px
    font-family: 'Roboto'

.wrapper, main
    @extend %centralize
    flex-direction: column

.wrapper
    width: 100%
    max-width: 1240px
    margin: auto
</style>