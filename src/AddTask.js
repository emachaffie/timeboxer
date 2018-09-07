import React, { Component } from 'react'

class AddTask extends Component {
  constructor (props) {
    // let database = firebase.database()
    super()
    this.state = {
      // user: firebase.auth().currentUser
    }
    this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
    this.addingTaskFn = this.addingTaskFn.bind(this)
  }
  render () {
    return (
      <h1>Add a Task</h1>
    )
  }
}

export default AddTask
