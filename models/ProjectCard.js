const mongoose = require('mongoose');

const projectCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String, // URL to an image hosted externally or on your server
        default: 'https://via.placeholder.com/300x200?text=Project+Image'
    },
    liveDemoLink: {
        type: String,
        trim: true
    },
    status: {
        type: String,
      enum: ['upcoming', 'completed', 'in-progress', 'archived'],

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

projectCardSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ProjectCard = mongoose.model('ProjectCard', projectCardSchema);
module.exports = ProjectCard;