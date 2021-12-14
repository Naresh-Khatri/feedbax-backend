import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true
    },
    feedbacks: []
})

export default mongoose.model('Profile', ProfileSchema)