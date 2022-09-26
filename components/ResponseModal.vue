<template>
    <div v-show="show" class="bg-gray-500/75 min-w-full min-h-full fixed flex justify-center items-center" 
     @click="closeModal">
        <div class="p-6 bg-white rounded-md shadow-sm" @click.stop>

            <div v-if="status == 200" class="mb-9 sm:mb-7 lg:mb-6 text-green-600 text-2xl font-semibold leading-6"
                >Заявка Принята</div>
            <div v-else class="mb-9 sm:mb-7 lg:mb-6 text-pink-600 text-2xl font-semibold leading-6"
                >Заявка Отклонена</div>

            <div id="responseCont" 
                 class="w-60 text-slate-700 not-italic font-medium text-xl leading-normal"></div>

            <div class="mt-6 flex justify-center">
                <button v-if="status == 200" @click="closeModal"
                        class="confirm-btn w-full bg-green-600 hover:bg-green-700 active:bg-green-800"
                            >Хорошо</button>
                <div v-else class="w-full flex flex-col sm:flex-row justify-between">
                    <button @click="closeModal" 
                        class="confirm-btn w-full sm:w-44 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 
                        sm:mr-2 mb-2 sm:mb-0">Хорошо</button>
                    <button @click="reOpenForm"
                        class="confirm-btn w-full sm:w-44 bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
                        >Отправить ещё раз</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'ResponseModal',
    computed: {
        ...mapState({
            show: 'showResponseModal',
            response: 'response',
            status: 'responseStatus'
        })
    },
    methods: {
        ...mapMutations({
            closeModal: 'closeResponseModal',
            openForm: 'openFormModal'
        }),
        reOpenForm(){
            this.closeModal();
            this.openForm();
        }
    },
    watch: {
        show() {
            document.getElementById('responseCont').innerHTML = this.response;
        }
    }
}
</script>

<style scoped lang="postcss">
.confirm-btn {
    @apply h-10 rounded-md shadow-sm 
            text-white not-italic font-medium text-base leading-4
            hover:text-white hover:border-transparent 
            focus:outline-none focus:ring focus:ring-gray-300;
}
</style>