/* global localStorage */

import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
import tasks from './tasks.json'
import EditTask from './EditTask.js'

class Task extends Component {
  constructor (props) {
    super()
    this.state = {
      editingTask: false
    }
    this.editingTaskFn = this.editingTaskFn.bind(this)
  }

  editingTaskFn () {
    if (this.state.editingTask) {
      this.setState({
        editingTask: false
      })
    } else {
      this.setState({
        editingTask: true
      })
    }
  }

  render () {
    const { task, timeNeeded, timeLeft, dueDate, id } = this.props
    return (
      <div>
        {this.state.editingTask ? <EditTask editingTaskFn={this.editingTaskFn} id={id} task={task} timeNeeded={timeNeeded} timeLeft={timeLeft} dueDate={dueDate} /> : <div><Link to={`/task/${id}`} className='taskLink'><h3 className='taskDescription'>{task}</h3></Link>
          <p>Goal Time: {timeNeeded} min.</p>
          <p>Time Left: {timeLeft} min.</p>
          <p>Due: {dueDate}</p><button className='editTaskButton' onClick={this.editingTaskFn}>Edit</button></div>}
        <button id={id} className='deleteButton' onClick={this.props.deleteTaskFn}>Delete</button>
      </div>
    )
  }
}

export default Task
