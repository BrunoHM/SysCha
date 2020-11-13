import React from 'react'
import {Container} from 'react-bootstrap'

import Menu from '../menu/menu'
import Sobre from '../sobre/sobre'

import './inicio.css'

export default props => (
    <Container fluid className='p-0 m-0 darkBG'>
        <Menu/>
        <Sobre/>
    </Container>
)