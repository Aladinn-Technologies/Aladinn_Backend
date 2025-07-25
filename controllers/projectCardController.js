const ProjectCard = require('../models/ProjectCard');

// Create a new project card
exports.createProjectCard = async (req, res) => {
    const { title, description, imageUrl, category, technologies, githubLink, liveDemoLink } = req.body;
    const owner = req.user.id; // User ID from auth middleware

    try {
        const newProjectCard = new ProjectCard({
            title,
            description,
            imageUrl,
            category,
            technologies,
            githubLink,
            liveDemoLink,
            owner
        });
        const savedProjectCard = await newProjectCard.save();
        res.status(201).json(savedProjectCard);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error: Could not create project card' });
    }
};

// Get all project cards
exports.getAllProjectCards = async (req, res) => {
    try {
        const projectCards = await ProjectCard.find().populate('owner', 'username email'); // Optionally populate owner details
        res.status(200).json(projectCards);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error: Could not retrieve project cards' });
    }
};

// Get a single project card by ID
exports.getProjectCardById = async (req, res) => {
    try {
        const projectCard = await ProjectCard.findById(req.params.id).populate('owner', 'username email');
        if (!projectCard) {
            return res.status(404).json({ message: 'Project card not found' });
        }
        res.status(200).json(projectCard);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error: Could not retrieve project card' });
    }
};

// Update a project card
exports.updateProjectCard = async (req, res) => {
    const { title, description, imageUrl, category, technologies, githubLink, liveDemoLink } = req.body;
    try {
        let projectCard = await ProjectCard.findById(req.params.id);
        if (!projectCard) {
            return res.status(404).json({ message: 'Project card not found' });
        }

        // Ensure only the owner can update
        if (projectCard.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this project card' });
        }

        const updatedProjectCard = await ProjectCard.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, imageUrl, category, technologies, githubLink, liveDemoLink, updatedAt: Date.now() } },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedProjectCard);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error: Could not update project card' });
    }
};

// Delete a project card
exports.deleteProjectCard = async (req, res) => {
    try {
        let projectCard = await ProjectCard.findById(req.params.id);
        if (!projectCard) {
            return res.status(404).json({ message: 'Project card not found' });
        }

        // Ensure only the owner can delete
        if (projectCard.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this project card' });
        }

        await projectCard.deleteOne(); // Use deleteOne()
        res.status(200).json({ message: 'Project card deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error: Could not delete project card' });
    }
};