import axios from "axios";

class VoteService {
    constructor() {

    }
    async getAllAngularQuestions() {
        let response = await axios.get("http://localhost:9090/api/ng-questions");

        if (response.status !== 200) {
            throw Error("Something went wrong!");
        }

        return response.data;
    }
    async insertNewVote(vote) {
        let response = await axios.post("http://localhost:9090/api/new-vote", vote, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status !== 200) {
            throw Error("Something went wrong!");
        }

        return response.data;
    }
}

export default new VoteService();