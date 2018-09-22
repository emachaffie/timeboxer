/* global localStorage */
import React, { Component } from 'react'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom'
// import tasks from './tasks.json'
import AddTask from './AddTask'
import TaskList from './TaskList'
import request from 'superagent'
import firebase from './firebase'

class Dashboard extends Component {
  constructor (props) {
    // let database = firebase.database()
    super()
    this.state = {
      loggedIn: true,
      tasks: [],
      addingTask: false
      // user: firebase.auth().currentUser
    }
    this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
    this.deleteTaskFn = this.deleteTaskFn.bind(this)
    this.getTasks = this.getTasks.bind(this)
    this.addingTaskFn = this.addingTaskFn.bind(this)
  }

  componentDidMount () {
    console.log('ComponentMounted')
    this.getTasks()
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

  addingTaskFn () {
    if (this.state.addingTask) {
      this.setState({
        addingTask: false
      })
    } else {
      this.setState({
        addingTask: true
      })
    }
  }

  getTasks () {
    request
      .get('http://localhost:8000/tasks')
      .then(response => {
        let taskArray = response.body
        this.setState({tasks: taskArray})
      })
  }

  deleteTaskFn (event) {
    let taskId = event.target.id
    console.log(event.target.id)
    request
      .delete(`http://localhost:8000/tasks/${taskId}`)
      .then(
        // Set state as function that does a FILTER
      )
  }

  render () {
    // if (!this.loggedIn) {
    //   return <Register />
    // } else
    return (
      <div className='dashboardDiv'>
        <h1>Timeboxer</h1>
        <p>Knock out your to-do list!</p>
        {this.state.addingTask ? <AddTask addingTaskFn={this.addingTaskFn} /> : <button className='addTaskButton' onClick={this.addingTaskFn}>Add Task</button>}
        <TaskList tasks={this.state.tasks} deleteTaskFn={this.deleteTaskFn} />
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
