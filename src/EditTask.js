import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './App.css'
import 'react-datepicker/dist/react-datepicker.css'
import request from 'superagent'

class EditTask extends Component {
  constructor (props) {
    // let database = firebase.database()
    super(props)
    this.state = {
      id: this.props.id,
      task: '',
      timeNeeded: '',
      dueDate: ''
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
    const editedTask = {
      id: this.state.id,
      task: this.state.task,
      timeNeeded: this.state.timeNeeded,
      timeLeft: this.state.timeNeeded,
      dueDate: this.state.dueDate,
      complete: false
    }
    console.log(this.state.id, "id")
    event.preventDefault()
    request
      .put('http://localhost:8000/tasks/{this.state.id}')
      .send(editedTask)
      .then(this.props.editingTaskFn())
  }

  render () {
    const { task, timeNeeded, timeLeft, dueDate, id } = this.props
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
  }
}

export default EditTask
