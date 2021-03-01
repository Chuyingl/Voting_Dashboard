const mongojs =require("mongojs");
const db =mongojs("technology-voting-db", ["ngQuestions", "angularVotes"]);

class NgQuestionDal {
    constructor(){

    }

    getAllAngularQuestions (){
      return new Promise ((resolve, reject) =>{
          db.ngQuestions.find((err, docs) =>{
              if(err){
                  reject(err);
                  return;
              }
              console.log(docs)
              resolve(docs);
          })
      })  
    }

    newVote(vote) {
        return new Promise ((resolve, reject) => {
            db.angularVotes.insert(vote, (err,doc) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(doc);
            })
        })
    }
}

module.exports =new NgQuestionDal();