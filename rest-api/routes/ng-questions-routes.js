const { request } = require("express");
const express = require("express")

const ngQuestionDal =require("../dal/ng-question-dal");

const ngRoutes = express.Router();

ngRoutes.get("/ng-questions", (request, response) =>{
   ngQuestionDal.getAllAngularQuestions().then(
       questions => response.json(questions),
       reason => response.json(reason)
   );
})

ngRoutes.post("/new-vote", (request, response) =>{
    let vote = request.body;
    ngQuestionDal.newVote(vote).then(
        vote => response.json(vote),
        reason => response.json(reason)
    );
})

module.exports = ngRoutes;