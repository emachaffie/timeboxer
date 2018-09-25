/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
import Task from './Task'

class TaskList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: this.props.tasks
    }
  }

  render () {
    let taskList = this.props.tasks
    return (
      <div>
        {taskList.map((task, i) => (
          <div key={task.id} className='singleTaskDiv'>
            <Task task={task.task} id={task.id} timeNeeded={task.timeNeeded} timeLeft={task.timeLeft} dueDate={task.dueDate} />
          </div>
        ))}
      </div>
    )
  }
}

export default TaskList
