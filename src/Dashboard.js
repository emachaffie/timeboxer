/* global localStorage */
import React, { Component } from 'react'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom'
import tasks from './tasks.json'
import AddTask from './AddTask.js'

class Dashboard extends Component {
  constructor (props) {
    // let database = firebase.database()
    super()
    this.state = {
      loggedIn: true,
      // addingTask: false,
      tasks: tasks
      // user: firebase.auth().currentUser
    }
    this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
    // this.addingTaskFn = this.addingTaskFn.bind(this)
  }

  componentDidMount () {
    // if (this.state.addingContact) {
    //   return (
    //     <AddTask />
    //   )
    // }
    // firebase.auth().onAuthStateChanged(user => {
    //   this.setState({
    //     user: user
    //   })
    // })
    // const taskList = database.ref('tasks')
  }

  changeLoggedInStatus (boo) {
    this.setState({loggedIn: boo})
    console.log(this.state.loggedIn)
  }

  // addingTaskFn () {
  //   this.setState({addingTask: true})
  //   console.log('addingTask to true')
  // }

  render () {
    if (this.state.addingTask) {
      return <AddTask />
    }
    return (
      <div className='dashboardDiv'>
        <h1>Timeboxer</h1>
        <p>Knock out your to-do list!</p>
        <button className='addTaskButton' onClick={() => this.props.history.push('/add')}>Add Task</button>
        {this.state.tasks.map((task, i) => (
          <div key={i} className='singleTaskDiv'>
            <div className='taskButton' onClick={this.addingTaskFn}>BoxIt
            </div>
            <h3 className='taskDescription' onClick={() => this.props.history.push('/task')}>{task.task}</h3>
            <p>Time Allocated: {task.timeNeeded} min.</p>
            <p>Time Left: {task.timeLeft} min.</p>
          </div>
        ))}
      </div>
    )
    // if (!this.state.loggedIn) {
    //   var provider = new firebase.auth.GoogleAuthProvider()
    //   return (
    //     firebase.auth().signInWithRedirect(provider))
    // } else if (this.state.addingContact) {
    //   return (
    //     <AddContact />)
    // } else {
    //   return (
    //     <Contacts password={this.state.password} username={this.state.username} addingContactFn={this.addingContactFn.bind(this)} />)
    // }
  }
}

export default Dashboard
