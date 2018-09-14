/* global localStorage */
import React, { Component } from 'react'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Route, Link, NavLink } from 'react-router-dom'
// import tasks from './tasks.json'
import AddTask from './AddTask.js'
import request from 'superagent'

class Dashboard extends Component {
  constructor (props) {
    // let database = firebase.database()
    super()
    this.state = {
      loggedIn: true,
      tasks: []
      // user: firebase.auth().currentUser
    }
    this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.getTasks = this.getTasks.bind(this)
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

  getTasks () {
    request
      .get('http://localhost:8000/tasks')
      .then(response => {
        let taskArray = response.body
        this.setState({tasks: taskArray})
      })
  }

  deleteTask (event) {
    let taskId = event.target.id
    console.log(event.target.id)
    request
      .delete(`http://localhost:8000/tasks/${taskId}`)
      .then(
        this.setState(prevState => ({
          tasks: prevState.tasks.filter(task => task.id !== taskId)})
        )
        // this.setState(prevState => ({
        //   tasks: prevState.tasks.filter(task => task.id !== taskId)})
        // )
      )
      .then(
        this.getTasks()
      )
  }

  render () {
    return (
      <div className='dashboardDiv'>
        <h1>Timeboxer</h1>
        <p>Knock out your to-do list!</p>
        <button className='addTaskButton' onClick={() => this.props.history.push('/add')}>Add Task</button>
        {this.state.tasks.map((task, i) => (
          <div key={task.id} className='singleTaskDiv'>
            <h3 className='taskDescription' onClick={() => this.props.history.push('/task')}>{task.task}</h3>
            <p>Time Allocated: {task.timeNeeded} min.</p>
            <p>Time Left: {task.timeLeft} min.</p>
            <button>Edit</button>
            <button id={task.id} className='deleteButton' onClick={this.deleteTask}>Delete</button>
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
