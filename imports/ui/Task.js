import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Task extends Component {
    toggleChecked = () => {
        Meteor.call('tasks.setChecked', this.props._id, !this.props.checked)
    };

    removeTask = () => {
        Meteor.call('tasks.remove', this.props._id);
    };

    togglePrivate = () => {
        Meteor.call('tasks.setPrivate', this.props._id, !this.props.private)
    };

    render() {
        let taskClassName = classnames({
            checked: this.props.checked,
            private: this.props.private
        });


        return (
           <li className={taskClassName}>
               <button onClick={this.removeTask} className="delete">
                   &times;
               </button>
               <input type="checkbox" readOnly checked={!!this.props.checked} onClick={this.toggleChecked} />

               {this.props.showPrivateButton ? (
                   <button className="toggle-private" onClick={this.togglePrivate}>
                       {this.props.private ? 'Private' : 'Public'}
                       </button>
               ): ''}

               <span className="text">
                   <strong>{this.props.username}</strong>: {this.props.text}
                   </span>
           </li>
        );
    }
}