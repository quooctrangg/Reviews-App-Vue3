import { defineStore } from 'pinia'

export const useReviewStore = defineStore('reviews', {
    state: () => ({
        reviews: [],
        // editedData: {
        //     editTable: false,
        //     item: null
        // }
    }),
    actions: {
        async addReview(review) {
            const response = await fetch('http://localhost:5000/reviews/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            })
            const newReview = await response.json()
            this.reviews = [newReview, ...this.reviews]
        },
        async fetchReviews() {
            try {
                const reviews = await fetch(`http://localhost:5000/reviews?_sort=id&_order=desc`)
                const data = await reviews.json()
                this.reviews = data
            } catch (error) {
                console.log(error);
            }
        },
        // editReview(review) {
        //     let editedData = {
        //         editTable: true,
        //         item: review
        //     }
        //     this.editedData = editedData
        // },
        // async updateReview(review) {
        //     const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
        //         method: 'PUT',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(review)
        //     })
        //     const updateReview = await response.json()
        //     let reviews = this.reviews.map(item => item.id === review.id ? { ...item, ...updateReview } : item)
        //     this.reviews = reviews
        //     this.fetchReviews()
        //     let editedData = {
        //         editTable: false,
        //         item: null
        //     }
        //     this.editedData = editedData
        // },
        async deleteReview(review) {
            await fetch(`http://localhost:5000/reviews/${review.id}`, {
                method: 'DELETE'
            })
            this.reviews = this.reviews.filter(rev => rev.id !== review.id)
            this.fetchReviews()
        }
    },
    getters: {
        averageRating(state) {

            let temp = state.reviews.reduce((acc, cur) => {
                return acc + cur.rating
            }, 0) / state.reviews.length


            temp = temp.toFixed(1).replace(/[.,]0$/, "")
            return temp

        },
        reviewsCount() {
            return this.reviews.length
        },
        reviewsContent() {
            return this.reviews
        },
        // editedContent() {
        //     return this.editedData
        // }
    }
})