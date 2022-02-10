const {Users} = require('../models');
const userController = {

    // get all users
    getAllUsers(req, res){
        Users.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // get one user by id
    getUserById({params}, res){
        Users.find({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if (!userData){
                res.status(404).json({
                    message: 'User not found.'
                });
                return;
            }
            res.json(userData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // createUser
    createUser({body}, res){
        Users.create(body)
        .then(userData => res.json(userData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // update user by id
    updateUser({params, body}, res){
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(userData => {
            if (!userData){
                res.status(404).json({
                    message: 'User not found.'
                });
                return;
            }
            res.json(userData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // delete user
    deleteUser({params}, res){
        Users.findOneAndDelete({_id: params.id})
        .then(userData => {
            if (!userData){
                res.status(404).json({
                    message: 'User not found.'
                });
                return;
            }
            res.json(userData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // add friend
    addFriend({params}, res){
        Users.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if (!userData){
                res.status(404).json({
                    message: 'User not found.'
                });
                return;
            }
            res.json(userData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // remove friend
    removeFriend({params}, res){
        Users.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendId}}, {new: true})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if (!userData){
                res.status(404).json({
                    message: 'User not found.'
                });
                return;
            }
            res.json(userData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    }
}

module.exports = userController;