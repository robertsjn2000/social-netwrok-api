const {Users, Thoughts, Reaction} = require('../models');
const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res){
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // get one user by id
    getThoughtById({params}, res){
        Thoughts.find({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData){
                res.status(404).json({
                    message: 'Thought not found.'
                });
                return;
            }
            res.json(thoughtData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // add thought to user
    createThought({params, body}, res){
        Thoughts.create(body)
        .then(({_id})=> {
            return Users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(thoughtData => {
            if (!thoughtData){
                res.status(404).json({
                    message: 'Thought not found.'
                });
                return;
            }
            res.json(thoughtData); 
        }) 
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // update thought by id
    updateThought({params, body}, res){
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData){
                res.status(404).json({
                    message: 'Thought not found.'
                });
                return;
            }
            res.json(thoughtData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // remove thought
    deleteThought({params}, res){
        Thoughts.findOneAndDelete({_id: params.id})
        .then(thoughtData => {
            if (!thoughtData){
                res.status(404).json({
                    message: 'Thought not found.'
                });
                return;
            }
            res.json(thoughtData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // add reaction
    addReaction({params, body}, res){
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData){
                res.status(404).json({
                    message: 'Thought not found.'
                });
                return;
            }
            res.json(thoughtData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // remove reaction
    deleteReaction({params, body}, res){
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: body}}, {new: true})
        .then(thoughtData => {
            if (!thoughtData){
                res.status(404).json({
                    message: 'Thought not found.'
                });
                return;
            }
            res.json(thoughtData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
}

module.exports = thoughtController;