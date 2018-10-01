import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './App.css'
import 'react-datepicker/dist/react-datepicker.css'
import uuid from 'uuid/v4'
import request from 'superagent'

class AddTask extends Component {
  constructor (props) {
    // let database = firebase.database()
    super(props)
    this.state = {
      id: '',
      task: '',
      timeNeeded: 0,
      dueDate: moment()
      // user: firebase.auth().currentUser
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    // this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
  }

  handleChange (event) {
    const key = event.target.name
    const value = event.target.value
    this.setState({[key]: value})
    // this.setState({value: event.target.value})
  }

  handleDateChange (date) {
    this.setState({
      dueDate: date
    })
  }

  handleSubmit (event) {
    const newId = uuid()
    this.setState({id: newId})
    const newTask = {
      id: this.state.id,
      task: this.state.task,
      timeNeeded: this.state.timeNeeded,
      timeUsed: 0,
      timeLeft: this.state.timeNeeded,
      dueDate: this.state.dueDate,
      complete: false
    }
    console.log(newTask)
    event.preventDefault()
    request
      .post('http://localhost:8000/tasks/')
      .send(newTask)
      .then(this.props.addingTaskFn())
  }

  render () {
    return (
      <div className='addTaskFormDiv'>
        <form onSubmit={this.handleSubmit}>
          <label>
          Task:
            <input type='text' name='task' onChange={this.handleChange} />
          </label>
          <label>
            Time needed:
            <input type='text' name='timeNeeded' onChange={this.handleChange} />
          </label>
          <label>
            Due date:
            <DatePicker
              name='dueDate'
              dateFormat='YYYY/MM/DD'
              selected={this.state.dueDate}
              onChange={this.handleDateChange} />
            {/* Date picker is not closing on selection. */}
          </label>
          <button className='formSubmit' onClick={this.handleSubmit} value='Submit'>Add Task</button>
          <button className='cancel' onClick={this.props.addingTaskFn}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default AddTask
