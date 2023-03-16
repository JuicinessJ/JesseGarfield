const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, updateUser } = require('../../controllers/userController');

// need to verify if this is correct
router.route('/').get(getUsers).get(getSingleUser).post(createUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(createUser).delete(deleteUser);

module.exports = router;