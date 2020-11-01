import React from 'react'
import {Redirect, Route, Router, hashHistory} from 'react-router'

import Index from './inicio/inicio'
import Pessoa from './pessoa/pessoa'

export default props => (
    <Router history={hashHistory}>
        <Route path='/inicio' component={Index} />
        <Route path='/pessoas' component={Pessoa} />
        <Redirect from='*' to='/inicio' />
    </Router>
)