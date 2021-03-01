import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "./MainLayout";

export default class RootComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        );
    }
}