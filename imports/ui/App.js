import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

//importing Mongo collection
import { Tasks } from '../api/tasks';

// importing components
import Task from './Task';
import Form from './Form';
import AccountsUIWrapper from './AccountsUIWrapper';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false
        };
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter( task => !task.checked);
        }


        return filteredTasks.map(task => {
            let currentUserId = this.props.currentUser && this.props.currentUser._id;
            let showPrivateButton = task.owner === currentUserId;

            return <Task key={task._id} {...task} showPrivateButton={showPrivateButton} />;
        });
    }

    toggleHideCompleted = () => {
        this.setState(prevState => ({
            hideCompleted: !prevState.hideCompleted
        }))
    };

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List {this.props.incompleteCount}</h1>

                    <label className="hide-completed">
                        <input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted} />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    {this.props.currentUser ? <Form class="new-task"/> : ''}
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user()
    }
})(App);