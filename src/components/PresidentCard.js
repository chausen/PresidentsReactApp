import React, { Component } from 'react';

class PresidentCard extends Component {

    render() {
        return (
            <div className = "president-card">
                <h1>{this.props.president.name}</h1>
                <p>Birthday: {this.props.president.birthday}</p>
            </div>
        );
    }
}

export default PresidentCard;