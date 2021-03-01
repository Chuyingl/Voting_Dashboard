import React, { Component } from 'react';

import voteServiceObject from "../services/vote-service";

export default class AngularVoting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngQuestions: [],
            technologyName: "Angular 10.x",
            question1: 3,
            question2: 3,
            question3: 3,
            question4: 3,
            question5: 3,
        }
        this.onVoteSelection = this.onVoteSelection.bind(this);
        this.onVoteSubmit = this.onVoteSubmit.bind(this);
    }
    async componentDidMount() {
        let questions = await voteServiceObject.getAllAngularQuestions();
        if (questions.length > 0) {
            this.setState({
                ngQuestions: questions
            });
        }
    }
    onVoteSelection(e) {
        this.setState({
            [e.target.name]: Number.parseInt(e.target.value)
        })
    }
    async onVoteSubmit(e) {
        e.preventDefault();
        let customerVote = {
            "technologyName": this.state.technologyName,
            "requirements": this.state.question1,
            "spa": this.state.question2,
            "otherPlatforms": this.state.question3,
            "solution": this.state.question4,
            "speedAndPerformance": this.state.question5
        };
        let vote = await voteServiceObject.insertNewVote(customerVote);
        if (vote !== null) {
            this.props.history.push("/thank-you");
        }
    }
    render() {
        let title = "Angular Framework Voting Form!";
        let subTitle = "Please read the questions carefully and vote!";
        if (this.state.ngQuestions.length > 0) {
            return (
                <div>
                    <h1>{title}</h1>
                    <hr />
                    <h6>{subTitle}</h6>
                    <table className="table">
                        <tbody>
                            {
                                this.state.ngQuestions.map((question, idx) =>
                                    <tr key={idx}>
                                        <th>{question.question}</th>
                                        <td>
                                            <input type="radio" id={question.questionNumber + 1} value="1" name={question.questionNumber} onChange={this.onVoteSelection} />1
                                        </td>
                                        <td>
                                            <input type="radio" id={question.questionNumber + 2} value="2" name={question.questionNumber} onChange={this.onVoteSelection} />2
                                        </td>
                                        <td>
                                            <input type="radio" value="3" id={question.questionNumber + 3} name={question.questionNumber} onChange={this.onVoteSelection} />3
                                        </td>
                                        <td>
                                            <input type="radio" value="4" id={question.questionNumber + 4} name={question.questionNumber} onChange={this.onVoteSelection} />4
                                        </td>
                                        <td>
                                            <input type="radio" value="5" id={question.questionNumber + 5} name={question.questionNumber} onChange={this.onVoteSelection} />5
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <button className="btn btn-primary" type="submit" onClick={this.onVoteSubmit}>Submit My Vote!</button>
                </div>
            )
        }
        else {
            return <h4>Loading...</h4>
        }
    }
}
