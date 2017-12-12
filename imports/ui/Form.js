import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Form extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text);

        // clearing form afterwards
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    };

    render() {
        return (
            <form className={this.props.class} onSubmit={this.handleSubmit}>
                <input type="text" ref="textInput" placeholder="Type to add new tasks" />
            </form>
        );
    }
}