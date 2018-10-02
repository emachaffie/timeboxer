/* global localStorage */

import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
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
      timeUsed: this.props.timeUsed,
      dueDate: this.props.dueDate
    }
    this.editingTaskFn = this.editingTaskFn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidMount () {
    console.log(this.state.dueDate)
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
      timeUsed: this.state.timeUsed,
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
    let { task, timeNeeded, timeUsed, dueDate, id } = this.state
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
                // selected={this.state.dueDate}
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
            <p>Time Used: {timeUsed} min.</p>
            {/* <p>Due: {dueDate}</p> */}
            <button className='editTaskButton' onClick={this.editingTaskFn}>Edit</button>
          </div>
          <button id={id} className='deleteButton' onClick={this.props.deleteTaskFn}>Delete</button>
        </div>
      )
    }
  }
}
export default Task
