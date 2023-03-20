const { User, Thought } = require('../models');

// Get All
// Get One
// Create Users
// Delete Users
// Update Users
// Add Friend
// Delete Friend

const userController = {
    getUsers (req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser (req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        // .populate('thoughts')
        .then((users) =>
            !users
                ? res.status(404).json({ message: 'No User found with this ID!'})
                : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser (req, res) {
        User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    deleteUser (req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((users) => 
            !users
                ? res.status(404).json({ message: 'No User found with this ID!'})
                : Thought.deleteMany({ _id: { $in: users.thoughts } })
                )
                .then(() => res.json({ message: 'User and Thoughts deleted!'}))
                .catch((err) => res.status(500).json(err));
    },
    updateUser (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((users) =>
            !users
                ? res.status(404).json({ message: 'No User found with this ID!'})
                : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    addFriend (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((users) =>
            !users
                ? res.status(404).json({ message: 'No User found with this ID!'})
                : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteFriend (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((users) =>
            !users
                ? res.status(404).json({ message: 'No User found with this ID!'})
                : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;