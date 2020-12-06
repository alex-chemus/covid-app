<template>
    <div class="form-wrapper">
        <form action="" @submit="event => {
            event.preventDefault()
        }">

            <input 
                class="style" 
                type="text" 
                placeholder="see the latest data by country" 
                v-model="name"
                @focus="show_list = true"
                @input="log">
            <!--<datalist id="list" class="list">
                <option v-for="item in countries" :key="item.index">
                    <router-link :to="`/${item.Slug}/total`">{{ item.Country }}</router-link>
                </option>
            </datalist>-->

            <button type="submit" class="style" @click="submit">
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

        <ul 
            id="list"
            v-if="show_list">
            <li v-for="item in countries" :key="item.index" :class="item.index == selected ? 'selected' : ''">
                <router-link :to="`/${item.Slug}/total`" @click="reset">{{ item.Country }}</router-link>
            </li>
            <li v-if="countries.length == 0" class="not-found">
                {{ message }}
            </li>
        </ul>
    </div>
</template>


<script>
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'search',

    setup() {
        const store = useStore()
        const router = useRouter()

        let name = ref('')
        let countries = reactive([])
        let show_list = ref(false)
        let selected = ref(0)
        let message = ref('Start typing...')

        store.dispatch( 'get_countries' )

        document.addEventListener('keydown', event => {
            switch ( event.key ) {
                case 'ArrowUp':
                    selected.value = Math.max( selected.value-1, 0 )
                    
                    setTimeout(() => {
                        const elem = document.querySelector('.selected')
                        const parent = elem.offsetParent

                        if ( elem.offsetTop <= parent.scrollTop ) {
                            parent.scrollTop = elem.offsetTop
                        }
                    })
                    break;

                case 'ArrowDown':
                    selected.value = Math.min( selected.value+1, countries.length-1 )

                    setTimeout(() => {
                        const elem = document.querySelector('.selected')
                        const parent = elem.offsetParent

                        if ( elem.offsetTop + elem.offsetHeight >= parent.clientHeight + parent.scrollTop ) {
                            parent.scrollTop = elem.offsetHeight + elem.offsetTop - parent.clientHeight
                        }
                    })
                    break;
                
                case 'Enter':
                    if ( !show_list.value ) break
                    router.push(`/${countries.find(i => i.index == selected.value).Slug}/total`)
                    store.commit('country', countries.find(i => i.index == selected.value))
                    show_list.value = false
                    document.querySelector('input').blur()
                    name.value = ''
                    selected.value = 0
                    break;

                default: break
            }
        })

        document.addEventListener('click', event => {
            if ( !document.querySelector('.form-wrapper').contains(event.target) ) {
                show_list.value = false;
                message.value = 'Start typing...'
            }
        })

        watch(name, name => {
            message.value = 'Nothing found'
            countries.splice(0, countries.length)

            let counter = 0

            store.getters.get_countries.forEach( item => {
                if ( item.Country.toLowerCase().includes(name.toLowerCase()) && name != '' ) {
                    countries.push({ ...item, index: counter++ })
                }
            })

            selected.value = 0
        })

        return {
            name, countries, show_list, selected, message
        }
    },

    methods: {
        reset() {
            this.show_list = false
            this.countries.splice(0, this.countries.length)
            this.name = ''
            this.selected = 0
        },

        log() {
            console.log( this.show_list )
        },

        submit() {
            if (this.countries.length <= 0) return

            const country = this.countries.find(item => {
                return item.index == this.selected
            })

            this.$router.push(`/${country.Slug}/total`)
            this.$store.commit('country', country)

            //alert('submitted the form')
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../styles/main.sass'

form
    font-size: 1em
    display: flex
    align-items: center

.form-wrapper
    flex-grow: 1
    font-size: 18px
    position: relative

    @media screen and (max-width: 480px)
        font-size: 14px

.style
    border: 1px solid $blue
    padding: .2em
    border-radius: 10px
    font-size: 1em
    background-color: white
    font-family: 'Roboto'
    outline: none

    &:focus
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, .5)  

input
    margin-right: .5em
    flex-grow: 1

svg
    height: calc(1em + 4px)

    @media screen and (max-width: 480px)
        height: 1em

button
    box-sizing: content-box
    height: calc(1em + 4px)
    width: calc(1em + 4px)
    cursor: pointer

    @media screen and (max-width: 480px)
        width: 1em
        height: 1em

ul
    max-height: 200px
    width: 100%
    overflow-y: scroll
    overflow-x: hidden
    padding: 0
    margin: 0
    list-style: none
    position: absolute
    box-sizing: border-box
    border-radius: 10px
    background-color: $grey

    &::-webkit-scrollbar
        width: 5px

        &-thumb
            width: 100%
            background-color: $blue
            border-radius: 2.5px

    li
        padding: .5em
        &:not(:last-of-type)
            margin-bottom: .5em

        a
            display: block
            width: 100%
            height: 100%
            text-decoration: none
            color: black

        &.selected, &:hover
            box-shadow: 0 0 3px 0 rgba(0, 0, 0, .25)

            a
                color: $blue

        &.not-found
            @extend %centralize
            height: 100px
            color: rgba(0, 0, 0, .5)
</style>