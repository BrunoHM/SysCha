import 'modules/bootstrap/dist/css/bootstrap.min.css'
import './pessoa.css'

import React, {Component} from 'react'
import {Button, Col, Container, FormControl, InputGroup, Pagination, Row, Table} from 'react-bootstrap'

import Menu from '../menu/menu'
import api from '../api/api'

export default class pessoa extends Component {
    constructor() {
        super();
 
        this.state = {
            pessoas: [],
            numeroPaginas: [],
            paginaAtual: 1,
            registrosPorPagina: 4
        };

        this.handleClick      = this.handleClick.bind(this);
        this.handleDelete     = this.handleDelete.bind(this);
        this.setNumeroPaginas = this.setNumeroPaginas.bind(this);
    }
    
    componentDidMount() {
        this.carregaPessoas();
    }

    carregaPessoas = async () => {
        const response = await api.get('http://localhost:8080/pessoas');

        this.setState({ pessoas : response.data });
        this.setNumeroPaginas();
    };

    handleClick(event) {
        this.setState({
            paginaAtual: Number(event.target.id)
        });
    }

    handleDelete() {
        console.log("Passo 1");
    }

    setNumeroPaginas() {
        const {pessoas, registrosPorPagina} = this.state;
        
        this.numeroPaginas = [];

        for (let i = 1; i <= Math.ceil(pessoas.length / registrosPorPagina); i++) {
            this.numeroPaginas.push(i);
        }

        this.setState({
            numeroPaginas : this.numeroPaginas
        });
    }

    render() {
        const {pessoas, paginaAtual, registrosPorPagina} = this.state;

        const indiceUltimaPessoa   = paginaAtual * registrosPorPagina;
        const indicePrimeiraPessoa = indiceUltimaPessoa - registrosPorPagina;
        const listaAtualPessoas    = pessoas.slice(indicePrimeiraPessoa, indiceUltimaPessoa);

        return (
            <Container fluid className='p-0 m-0 FHeight'>
                
                <Menu/>
                <Container fluid className='col-10 mt-3 pb-3 border-bottom border-info'>
                    <Row className='col-2 mb-3'>
                        <Col className='pl-0'>
                            <span className='text-light'>Filtro:</span>
                        </Col>
                    </Row>

                    <Row className='col-8'>
                        <InputGroup className='col-3'>
                            <FormControl
                                placeholder='Nome'
                                aria-label='Nome'
                                aria-describedby='nome da pessoa'
                            />
                        </InputGroup>
                        <InputGroup className='col-3 ml-4'>
                            <FormControl
                                placeholder='sobrenome'
                                aria-label='sobrenome'
                                aria-describedby='sobrenome da pessoa'
                            />
                        </InputGroup>
                        
                        <Button variant="dark" onClick={this.carregaPessoas} className='col-3 offset-1 border border-light'>Pesquisar</Button>
                    </Row>
                </Container>

                <Col className='p-0'>
                    <Table striped bordered hover responsive variant="dark" className='col-11 mt-4'>
                        <thead>
                            <tr>
                                <th className='p-1 text-center'>Id</th>
                                <th className='p-1 text-center'>Nome</th>
                                <th className='p-1 text-center'>Sobrenome</th>
                                <th className='p-1 text-center'>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listaAtualPessoas.map( (listaAtualPessoas, index) => (
                                <tr key={index}>
                                    <td className='tableTdId' >{listaAtualPessoas.id}</td>
                                    <td className='tableTdNome' >{listaAtualPessoas.nome}</td>
                                    <td className='tableTdSobreNome' >{listaAtualPessoas.sobrenome}</td>
                                    <td className='tableTdAcao text-center'>
                                        <a className='glyphicon glyphicon-pencil ml-3' aria-hidden='true' />
                                        <a className='glyphicon glyphicon-trash ml-3' aria-hidden='true'/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Container fluid className='text-center'>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                            {this.state.numeroPaginas.map( number => (
                                <Pagination.Item variant="outline-warning" key={number} id={number} onClick={this.handleClick} >
                                    {number}
                                </Pagination.Item>
                            ))}
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </Container>

            </Container>
        )
    }
}
