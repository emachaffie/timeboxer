import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class AddTask extends Component {
  constructor (props) {
    // let database = firebase.database()
    super()
    this.state = {
      taskDescription: '',
      timeNeeded: '',
      dueDate: moment()
      // user: firebase.auth().currentUser
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    // this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  handleDateChange (date) {
    this.setState({
      dueDate: date
    })
  }

  render () {
    return (
      <div className='addTaskFormDiv'>
        <h1>Add a Task</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
          Task:
            <input type='text' value={this.state.taskDescription} onChange={this.handleChange} />
          </label>
          <label>
            Time needed:
            <input type='text' value={this.state.timeNeeded} />
          </label>
          <label>
            Due date:
            <DatePicker
              dateFormat='YYYY/MM/DD'
              selected={this.state.dueDate}
              onChange={this.handleDateChange} />
            {/* <input type='text' value={this.state.dueDate} /> */}
          </label>
          <button className='formSubmit' type='submit' value='Submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default AddTask
