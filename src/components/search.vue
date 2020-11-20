<template>
    <form action="" @submit="event => {
        event.preventDefault()
    }">

        <input class="style" type="text" placeholder="see the latest data by country" v-model="value">

        <button type="submit" class="style">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
            <g>
                <g>
                    <path fill='currentColo' d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
                        S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
                        c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
                        M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
                </g>
            </g>
            </svg>
        </button>

    </form>
</template>


<script>
import { ref } from 'vue'

export default {
    name: 'search',

    setup() {
        let value = ref('')

        return {
            value
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

form
    font-size: 18px
    display: flex
    align-items: center
    flex-grow: 1

.style
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5)
    border: 1px solid $blue
    padding: .2em
    border-radius: 10px
    font-size: 1em
    background-color: white
    font-family: 'Roboto'
    outline: none

input
    margin-right: .5em
    flex-grow: 1

svg
    height: calc(1em + 4px)

button
    box-sizing: content-box
    height: calc(1em + 4px)
    width: calc(1em + 4px)
    cursor: pointer
</style>