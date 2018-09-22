/* global localStorage */

import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
// import firebase from './firebase'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
// import tasks from './tasks.json'
import AddTask from './AddTask'
import Task from './Task'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Dashboard} />
          <Route path='/add' component={AddTask} />
          <Route path='/task/:id' render={(props) => <Task {...props} />} />
          {/* <Route path='/edit/:id' render={(props) => <EditTask {...props} />} /> */}
          {/* <Route path='/login' component={LoginPage} /> */}
          {/* <Route path='/register' component={Register} /> */}
        </div>
      </Router>
    )
  }
}

export default App
