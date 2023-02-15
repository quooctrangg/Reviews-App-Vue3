<template>
    <div>
        <p v-if="!store.reviewsContent || store.reviewsContent.length === 0">No Reviews Yet</p>
        <div v-else class="reviewList">
            <ReviewItem v-for="(item, index) of store.reviewsContent" :key="index" :item="item" />
        </div>
    </div>
</template>

<script setup>
import ReviewItem from './ReviewItem.vue';

import { useReviewStore } from '../stores/reviews'

const store = useReviewStore()
</script>