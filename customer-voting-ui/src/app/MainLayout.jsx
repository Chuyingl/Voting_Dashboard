import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";

import VotingMenu from "./components/navigation/presentation/VotingMenu";
import VotingHome from "./components/home/container/VotingHome";

const AngularVoting = lazy(() => import("./components/vote/container/AngularVoting"));

import { ThankYou } from "./components/vote/predentation/ThankYou";

export default class MainLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <VotingMenu />
                <main>
                    <Suspense fallback={<div style={{ textAlign: "center", marginTop: "10%" }}>
                        <h5>Loading...</h5>
                    </div>}>
                        <Switch>
                            <Route path="/" component={VotingHome} exact />
                            <Route path="/home" component={VotingHome} exact />
                            <Route path="/ng-vote" render={props => <AngularVoting {...props} />} exact />
                            <Route path="/thank-you" component={ThankYou} exact />
                        </Switch>
                    </Suspense>
                </main>
            </div>
        )
    }
}
