<template>
    <div class="home">
        <div class="container">
            <ReviewsForm />
            <ReviewStats />
            <ReviewList />
        </div>
    </div>
</template>

<script setup>
import ReviewsForm from '../components/ReviewsForm.vue';
import ReviewStats from '../components/ReviewStats.vue';
import ReviewList from '../components/ReviewList.vue';
</script>