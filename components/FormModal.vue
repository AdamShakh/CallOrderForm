<template>
<div v-if="show" class="modal-cont" @click="closeModal">
    <div class="modal" @click.stop>

        <div class="mb-6 text-gray-900 text-2xl leading-6">Заказать звонок</div>
        
        <div class="flex mb-5">

            <div class="flex flex-col mr-5">
                <span class="h-5 text-gray-700 mb-1">Имя*</span>
                <input v-model="name" class="input" type="text" placeholder="Иван Иванов">
            </div>
            <div class="flex flex-col mr-5">
                <span class="h-5 text-gray-700 mb-1">Телефон*</span>
                <input v-model="phone" class="input" type="text" placeholder="+7 (___) ___-__-__">
            </div>
            <div class="flex flex-col mr-5">
                <span class="h-5 text-gray-700 mb-1">Email*</span>
                <input v-model="email" class="input" type="text" placeholder="you@example.com">
            </div>
            <div class="flex flex-col">
                <span class="h-5 text-gray-700 mb-1">Город*</span>
                <select v-model="city_id" class="input" id="">
                    <option v-for="(city, i) in cities" :key="i" :value="city.id" :selected="city.id==cityId"
                        >{{ city.name }}</option>
                </select>
            </div>

        </div>

        <div class="flex justify-end">
            <button type="button" @click="submit" class="submit-btn">Отправить</button>
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
            cityId: 'currentCityId',
        }),
        ...mapGetters({
            cities: 'getCitiesForSelect'
        }),
    },
    data: () => ({
        name:    '',
        phone:   '',
        email:   '',
        city_id: '',
    }),
    methods: {
        ...mapMutations({
            closeMutation: 'closeFormModal'
        }),
        submit() {
            this.$store.dispatch('PostRequest', {
                name:    this.name, 
                phone:   this.phone, 
                email:   this.email, 
                city_id: this.city_id
            });
            this.closeModal();
        },
        closeModal() {
            this.closeMutation();
            this.name = this.phone = this.email = this.city_id = "";
        }
    }
}
</script>

<style scoped lang="postcss">
@tailwind components;

@layer components {
    .modal-cont {
        @apply bg-gray-500/75 min-w-full min-h-full fixed flex justify-center items-center;
    }
    .modal {
        @apply p-6 bg-white
               rounded-md shadow-sm text-white not-italic font-medium text-base leading-5
               text-black not-italic font-medium;
               
    }
    .input {
        @apply w-44 h-10 text-gray-900 py-2 px-3 font-normal text-gray-900 placeholder:text-gray-500 
               bg-white border border-solid border-gray-300 shadow-sm rounded-md;
    }
    .submit-btn {
        @apply py-3 px-10 w-44 mb-1 bg-green-600 hover:bg-green-700 active:bg-green-800
               rounded-md shadow-sm text-white not-italic font-medium text-base leading-4
               hover:text-white hover:border-transparent 
               focus:outline-none focus:ring focus:ring-gray-300;
    }
}
</style>