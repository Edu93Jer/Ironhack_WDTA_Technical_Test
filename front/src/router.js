import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './pages/SignIn'
import Home from './pages/Home'

const AppRouter = () => (
  <Router>
    <Route exact component={SignIn} path="/" />
    <Route exact component={Home} path="/home" />
  </Router>
)

export default AppRouter;