<template>
<div v-show="show" class="bg-gray-500/75 min-w-full min-h-full fixed flex justify-center items-center" 
     @click="closeModal">
    <div class="modal" @click.stop>

        <div class="mb-9 sm:mb-7 lg:mb-6 text-gray-900 text-2xl font-semibold leading-6">Заказать звонок</div>
        
        <div class="grid grid-cols-[315px] sm:grid-cols-3 lg:grid-cols-4 gap-5 gap-x-7 lg:gap-x-5">
 
            <div class="h-16 col-start-1 row-start-2 sm:col-start-2 lg:col-start-1 sm:row-start-1">
                <div class="absolute flex flex-col">
                    <span class="h-5 text-gray-700 mb-1">Имя*</span>
                    <input id="name" v-model="name" class="input w-80 sm:w-48 lg:w-44" type="text" 
                        placeholder="Иван Иванов">
                    <span v-show="invalid.name" class="absolute -bottom-4 text-xs text-pink-500"
                        >Обязательное Поле</span>
                </div>
            </div>

            <div class="h-16 col-start-1 row-start-1 sm:col-start-1 lg:col-start-2 sm:row-start-1">
                <div class="absolute flex flex-col">
                    <span class="h-5 text-gray-700 mb-1">Телефон*</span>
                    <input id="phone" v-model="phone" class="input w-80 sm:w-48 lg:w-44" type="text" 
                        placeholder="+7 (___) ___-__-__">
                    <span v-show="invalid.phone" class="absolute -bottom-4 text-xs text-pink-500"
                        >Обязательное Поле</span>
                </div>
            </div>
            
            <div class="h-16 col-start-1 row-start-3 sm:col-start-3 sm:row-start-1">
                <div class="absolute flex flex-col">
                    <span class="h-5 text-gray-700 mb-1">Email*</span>
                    <input id="email" v-model="email" class="input w-80 sm:w-48 lg:w-44" type="text" 
                        placeholder="you@example.com">
                    <span v-show="invalid.email" class="absolute -bottom-4 text-xs text-pink-500"
                        >Обязательное Поле</span>
                </div>
            </div>

            <div class="flex flex-col
                        col-start-1 row-start-4
                        sm:col-start-1 sm:col-end-3 sm:row-start-2 
                        lg:col-start-4 lg:col-end-5 lg:row-start-1">
                <span class="h-5 text-gray-700 mb-1">Город*</span>
                
                <select id="city_id" v-model="city_id" class="input w-80 sm:w-full lg:w-44">
                    <option v-for="(city, i) in cities" :key="i" :value="city.id" :id="'opt-'+i"
                        >{{ city.name }}</option>
                </select>
            </div>

            <div class="col-start-1 row-start-5 sm:col-start-3 lg:col-start-4 sm:row-start-2 flex flex-col justify-end">
                <button type="button" @click="submit" class="submit-btn">Отправить</button>
            </div>

        </div>
    
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'FormModal',
    computed: {
        ...mapState({
            show:   'showFormModal',
            city_id: 'currentCityId',
        }),
        ...mapGetters({
            cities: 'getCitiesForSelect'
        }),
    },
    data: () => ({
        name:    '',
        phone:   '',
        email:   '',
        invalid: {
            name: false, phone: false, email: false
        }
    }),
    mounted() {
        this.$phoneMaskAt('#phone');
    },
    methods: {
        ...mapMutations({
            closeMutation: 'closeFormModal'
        }),
        submit() {
            if (this.checkValidity()){
                this.phone = this.phone.replace(/[^0-9+]/g, '')
                this.$store.dispatch('PostRequest', {
                    name:    this.name, 
                    phone:   this.phone, 
                    email:   this.email, 
                    city_id: this.city_id
                });
                this.closeModal();
            }
        },
        closeModal() {
            this.closeMutation();
            this.name = this.phone = this.email = "";
            this.manageInvalidity([]);
        },
        checkValidity() {
            let invalids = [];
            ['name', 'phone', 'email'].forEach(id => {
                if (id=='name'       && (this.name == '' || this.name.match(/[^a-zA-Zа-яА-Я ]/)))
                    invalids.push(id)
                else if (id=='phone' && this.phone.replace(/[^0-9+]/g, '').length != 12)
                    invalids.push(id)
                else if (id=='email' && !this.validateEmail(this.email))
                    invalids.push(id)
            });
            this.manageInvalidity(invalids);
            if (invalids.length)
                return false;
            else 
                return true;
        },
        manageInvalidity(invalids) {
            const inputs = ['name', 'phone', 'email'];
            inputs.forEach(input => {
                if (invalids.indexOf(input) != -1) 
                    this.invalid[input] = true;
                else
                    this.invalid[input] = false;
            });
        },
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
    },
}
</script>

<style scoped lang="postcss">
@tailwind components;

@layer components {
    .modal {
        @apply px-5 py-6 sm:px-6 sm:pb-8 lg:pb-7
               bg-white rounded-md shadow-sm 
               text-black not-italic font-medium text-base leading-5;
    }
    .input {
        @apply py-2 px-3 h-10
               text-gray-900 font-normal text-gray-900 placeholder:text-gray-500 
               bg-white border border-solid border-gray-300 shadow-sm rounded-md
               focus:outline-none focus:ring-2 focus:ring-gray-300;
    }
    .submit-btn {
        @apply py-3 px-10 w-80 sm:w-48 lg:w-44 bg-green-600 hover:bg-green-700 active:bg-green-800
               rounded-md shadow-sm text-white not-italic font-medium text-base leading-4
               hover:text-white hover:border-transparent 
               focus:outline-none focus:ring focus:ring-gray-300;
    }
}
</style>