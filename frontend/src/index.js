import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from '@reach/router'

import './index.css'

import Navbar from './components/Navbar'
import Index from './fragments/Index'

const App = () => (
  <>
    <Navbar />
    <Router>
      <Index path='/:id' />
    </Router>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
