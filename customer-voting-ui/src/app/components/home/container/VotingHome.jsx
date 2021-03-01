import React, { Component } from 'react';

export default class VotingHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title = "Welcome To Customer Voting Home Application!";
        return (
            <div>
                <h1>{title}</h1>
            </div>
        )
    }
}