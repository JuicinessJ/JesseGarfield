const { User, Thought } = require('../models');

const userController = {
    getUsers (req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser (req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((users) =>
            !users
                ? res.status(404).json({ message: 'No User Found with the ID'})
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
                ? res.status(404).json({ message: 'No User found with that ID'})
                : Thought.deleteMany({ _id: { $in: users.thoughts } })
                )
                .then(() => res.json({ message: 'User and Thoughts deleted!'}))
                .catch((err) => res.status(500).json(err));
    },
    
}



module.exports = userController;