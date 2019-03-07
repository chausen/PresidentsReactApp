import React, { Component } from 'react';
import './PresidentCard.css';

class PresidentCard extends Component {

    render() {
        return (
            <div className = "president-card">
                <h3>{this.props.president.name}</h3>
                <p>Birthday: {this.props.president.birthday}</p>
            </div>
        );
    }
}

export default PresidentCard;