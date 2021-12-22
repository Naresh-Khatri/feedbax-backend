import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    presenters:[],
    feedbacks: []
})

export default mongoose.model('Profile', ProfileSchema)