/* global localStorage */

import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
import tasks from './tasks.json'
// import EditTask from './EditTask.js'
import request from 'superagent'
import DatePicker from 'react-datepicker'

class Task extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editingTask: false,
      id: this.props.id,
      task: this.props.task,
      timeNeeded: this.props.timeNeeded,
      dueDate: this.props.dueDate
    }
    this.editingTaskFn = this.editingTaskFn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
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

  handleChange (event) {
    event.preventDefault()
    const key = event.target.name
    const value = event.target.value
    this.setState({[key]: value})
  }

  handleDateChange (date) {
    this.setState({
      dueDate: date
    })
  }

  handleSubmit (event) {
    console.log(this.state.id, 'id')
    const editedTask = {
      id: this.state.id,
      task: this.state.task,
      timeNeeded: this.state.timeNeeded,
      timeLeft: this.state.timeNeeded,
      dueDate: this.state.dueDate,
      complete: false
    }
    console.log(this.state.id, 'id')
    event.preventDefault()
    request
      .put(`http://localhost:8000/tasks/${this.state.id}`)
      .send(editedTask)
      .then(this.editingTaskFn)
  }

  render () {
    const { task, timeNeeded, timeLeft, dueDate, id } = this.props
    if (this.state.editingTask) {
      return (
        <div className='addTaskFormDiv'>
          <form onSubmit={this.handleSubmit}>
            <label>
          Task:
              <input type='text' name='task' value={task} onChange={this.handleChange} />
            </label>
            <label>
            Time needed:
              <input type='text' name='timeNeeded' value={timeNeeded} onChange={this.handleChange} />
            </label>
            <label>
            Due date:
              <DatePicker
                className='dueDate'
                dateFormat='YYYY/MM/DD'
                // selected={this.props.dueDate}
                onChange={this.handleDateChange} />
              {/* Date picker is not closing on selection. */}
            </label>
            <button className='formSubmit' onClick={this.handleSubmit} value='Submit'>Done</button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <div key={id} className='singleTaskDiv'>
            <Link to={`/task/${id}`} className='taskLink'><h3 className='taskDescription'>{task}</h3></Link>
            <p>Goal Time: {timeNeeded} min.</p>
            <p>Time Left: {timeLeft} min.</p>
            <p>Due: {dueDate}</p>
            <button className='editTaskButton' onClick={this.editingTaskFn}>Edit</button>
          </div>
          <button id={id} className='deleteButton' onClick={this.props.deleteTaskFn}>Delete</button>
        </div>
      )
    }
  }
}
export default Task
