/* global localStorage */

import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
import tasks from './tasks.json'

class Task extends Component {
  constructor (props) {
    super()
    this.state = {
      // taskDescription: '',
      // timeNeeded: '',
      // dueDate: moment()
      // user: firebase.auth().currentUser
    }
  }
  render () {
    return (
      <h1>Pants</h1>
    )
  }
}

export default Task
