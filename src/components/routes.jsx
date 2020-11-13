import React from 'react'
import {Redirect, Route, Router, hashHistory} from 'react-router'

import Index from './inicio/inicio'
import Pessoa from './pessoa/pessoa'
import Usuario from './usuario/usuario'

export default props => (
    <Router history={hashHistory}>
        <Route path='/inicio' component={Index} />
        <Route path='/pessoas' component={Pessoa} />
        <Route path='/usuarios' component={Usuario} />
        <Redirect from='*' to='/inicio' />
    </Router>
)
