<template>
  <div>
    <Header />
  </div>
  <router-view />
</template>

<script setup>
import Header from '../src/components/Header.vue'

import { useReviewStore } from './stores/reviews'

import { onMounted } from 'vue'

const store = useReviewStore()
onMounted(() => {
  store.fetchReviews()
})
</script>