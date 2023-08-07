import Ques from "../models/Ques.js";
import User from "../models/User.js";

export const createQues = async (req,res) => {
    try{

        const { userId , statement , picturePath } = req.body;
        const user = await User.findById(userId);
        const newQues = new Ques({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            statement ,
            answers : [],
            picturePath,
            userPicturePath : user.picturePath,
        });
        await newQues.save();
        user.questionAsked++;
        await User.findByIdAndUpdate(
            userId,
            {questionAsked : user.questionAsked},
            {new : true},
        )
        const ques = await Ques.find();
        res.status(201).json(ques);
    } catch(err) {
        res.status(409).json({message : err.message});
    }
};

export const getFeedQues = async (req,res) => {
    try {
        const ques = Ques.find();
        res.status(200).json(ques);
    } catch (err) {
        res.status(404).json({message : err.message});
    } 
};

export const getSpecificQues = async (req,res) => {
    try {
        const { quesId } = req.params;
        const ques = await Ques.findById(quesId);
        res.status(200).json(ques);
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};

export const upvote = async (req,res) => {
    try {
        const { quesId , answerId } = req.params;
        const { userId } = req.body;

        const question = await Ques.findById(quesId);
        const answer = question.answers.id(answerId);

        const isUpvoted = answer.upvotes.get(userId);
        if(isUpvoted) {
            answer.upvotes.delete(userId);
        }
        else{
            answer.upvotes.set(userId,true);
            answer.downvotes.delete(userId);
        }
        await question.save();
        const updatedQues = await Ques.findById(quesId);
        res.status(200).json(updatedQues);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
} ;


export const downvote = async (req,res) => {
    try {
        const { quesId , answerId } = req.params;
        const { userId } = req.body;

        const question = await Ques.findById(quesId);
        const answer = question.answers.id(answerId);

        const isDownvoted = answer.downvotes.get(userId);
        if(isDownvoted) {
            answer.downvotes.delete(userId);
        }
        else{
            answer.downvotes.set(userId,true);
            answer.upvotes.delete(userId);
        }
        await question.save();
        const updatedQues = await Ques.findById(quesId);
        res.status(200).json(updatedQues);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
} ;

export const ansQues = async (req,res) => {
    try {
       const { quesId } = req.params;
       const { userId , answerText } = req.body;
       const user = await User.findById(userId);
       const question = await Ques.findById(quesId);
       const newAnswer = {
        answerText,
        answeredBy : userId,
        upvotes : new Map(),
        downvotes : new Map(),
       };
       question.answers.push(newAnswer);
       await question.save();
       user.questionAnswered++;
       await findByIdAndUpdate(
        userId,
        {questionAnswered : user.questionAnswered},
        {new : true},
       )
       const updatedQues = await Ques.findById(quesId);
       res.status(200).json(updatedQues);
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};