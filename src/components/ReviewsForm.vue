<template>
    <Card>
        <form @submit.prevent="handleSubmit">
            <h2>How would you rate your service with us?</h2>
            <RatingSelect :rating="rating" @setRating="setRating" />
            <div class="input-group">
                <input type="text" placeholder="Write a review" v-model="text">
                <button type="submit" class="btn btn-primary" :disabled="btnDisabled">Send</button>
            </div>
            <div class="message" v-if="message !== ''">{{ message }}</div>
        </form>
    </Card>
</template>

<script setup>
import { ref, watch } from 'vue'

import Card from './shared/Card.vue'
import RatingSelect from './RatingSelect.vue';

import { useReviewStore } from '../stores/reviews'
import { storeToRefs } from 'pinia';

const store = useReviewStore()

const text = ref('')
const btnDisabled = ref(true)
const message = ref('')

const rating = ref(10)

const { editedContent } = storeToRefs(store)

watch(editedContent, (newData) => {
    if (newData.editTable) {
        text.value = newData.item.text
        rating.value = newData.item.rating
    }
})

watch(text, (newVal) => {
    if (newVal.trim().length <= 10) {
        btnDisabled.value = true
        message.value = 'Text must be at least 10 characters'
    } else {
        btnDisabled.value = false
        message.value = ''
    }
})

const setRating = val => {
    rating.value = val
}

const handleSubmit = () => {
    const newReview = {
        text: text.value,
        rating: rating.value
    }
    store.addReview(newReview)
    // if (!store.editedContent.editTable) {
    //     store.addReview(newReview)
    // }
    // else {
    //     store.updateReview({
    //         ...newReview,
    //         id: store.editedContent.item.id
    //     })
    // }
    text.value = ''
}
</script>