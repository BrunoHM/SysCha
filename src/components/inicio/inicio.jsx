import React from 'react'
import {Container} from 'react-bootstrap'

import Menu from '../Menu/Menu'
import Sobre from '../sobre/sobre'

import './inicio.css'

export default props => (
    <Container fluid className='p-0 m-0 darkBGa'>
        <Menu/>
        <Sobre/>
    </Container>
)