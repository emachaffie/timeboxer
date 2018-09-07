import React, { Component } from 'react'

class AddTask extends Component {
  constructor (props) {
    // let database = firebase.database()
    super()
    this.state = {
      taskDescription: '',
      timeNeeded: ''
      // user: firebase.auth().currentUser
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
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
          <button className='formSubmit' type='submit' value='Submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default AddTask
