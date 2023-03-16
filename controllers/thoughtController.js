const { User, Thought } = require('../models');

// Get all Thoughts
// Get single Thought
// Create new Thought
// Update Thought
// Delete Thought
// Create new Reaction
// Delete Reaction

const thoughtController = {
    getThoughts (req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought (req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thoughts) => 
            !thoughts
                ? res.status(404).json({ message: 'No Thoughts Were found with this ID!'})
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought (req, res) {
        Thought.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {res.status(500).json(err);
        });
    },
    updateThought (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No Thoughts were found with this ID!'})
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought (req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No Thoughts were found with this ID!'})
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            )
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'Thoughts deleted, but no Users found',})
                    : res.json({ message: 'Users successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No Thoughts were found with this ID!'})
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
            { runValidators: true, new: true }
        )
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No Thoughts were found with this ID!'})
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;