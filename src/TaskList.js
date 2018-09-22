/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
// import tasks from './tasks.json'

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
            <Link to={`/task/${task.id}`} className='taskLink'><h3 className='taskDescription'>{task.task}</h3></Link>
            <p>Goal Time: {task.timeNeeded} min.</p>
            <p>Time Left: {task.timeLeft} min.</p>
            {/* <EditTask /> */}
            <button id={task.id} className='deleteButton' onClick={this.props.deleteTaskFn}>Delete</button>
          </div>
        ))}
      </div>
    )
  }
}

export default TaskList
