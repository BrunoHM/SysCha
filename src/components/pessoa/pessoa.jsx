import 'modules/bootstrap/dist/css/bootstrap.min.css'
import './pessoa.css'

import React, {Component, useState} from 'react'
import {Button, Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Modal, Pagination, Row, Table} from 'react-bootstrap'
import axios from 'axios'

import Menu from '../menu/menu'

export default class pessoa extends Component {
    
    constructor() {
        super();

        this.state = {
            teste: false,
            modalUpdate: [],
            pessoas: [],
            numeroPaginas: [],
            filtros: [],
            registrosPorPagina: 0,
            dropDownRegistroPorPagina: [15,30,50,100],
            paginaAtual: 1
        };

        this.handleClick      = this.handleClick.bind(this);
        this.handleDelete     = this.handleDelete.bind(this);
        this.handleUpdate     = this.handleUpdate.bind(this);
        this.aplicaFiltros    = this.aplicaFiltros.bind(this);
        this.atualizaTabela   = this.atualizaTabela.bind(this);
        this.setNumeroPaginas = this.setNumeroPaginas.bind(this);        
    }
    
    componentDidMount() {
        this.aplicaFiltros();
        this.setMaxRegistrosPagina(15);
    }

    aplicaFiltros(){
        const elementoPai = document.getElementsByClassName('input-group');

        this.filtros = [];

        if(elementoPai.length > 0){
            this.filtros.nome      = elementoPai[0].children[0].value;
            this.filtros.sobrenome = elementoPai[1].children[0].value;
        } else {
            this.filtros.nome      = "";
            this.filtros.sobrenome = "";
        }
       
        this.carregaPessoas();
    }

    carregaPessoas = async () => {

        const response = await axios.post('http://localhost:8080/pessoas', {
            nome : this.filtros.nome,
            sobrenome : this.filtros.sobrenome
        });

        this.setState({ pessoas : response.data });
        this.setNumeroPaginas();
    };

    handleClick(event) {
        this.setState({
            paginaAtual: Number(event.target.id)
        });
    }

    handleDelete = async (pessoa) => {
        
        const response = await axios.delete('http://localhost:8080/deletePessoa', {
            data: {
                id: pessoa.id,
                nome: pessoa.nome,
                sobrenome: pessoa.sobrenome
            }
        });
        
        this.atualizaTabela(response.data);
    }

    handleUpdate = async (pessoa) => {
        console.log("Passo 1 >"+pessoa.id);
        
        this.setState({
            teste: !this.state.teste
        })

    }

    atualizaTabela(response) {
        if(response) {
            this.carregaPessoas();
        }
    }

    setNumeroPaginas() {
        const {pessoas} = this.state;
        
        this.numeroPaginas = [];

        for (let i = 1; i <= Math.ceil(pessoas.length / this.registrosPorPagina); i++) {
            this.numeroPaginas.push(i);
        }

        this.setState({
            numeroPaginas : this.numeroPaginas
        });
    }

    setMaxRegistrosPagina(maxValPagina){
        this.registrosPorPagina = maxValPagina;

        this.setState({
           registrosPorPagina : maxValPagina
        });
        
        document.getElementById('dropDownBtn').innerText = "Registros por página: "+maxValPagina;
        this.setNumeroPaginas();
    }

    render() {
        const {pessoas, paginaAtual, registrosPorPagina, dropDownRegistroPorPagina, modalUpdate} = this.state;

        const indiceUltimaPessoa   = paginaAtual * registrosPorPagina;
        const indicePrimeiraPessoa = indiceUltimaPessoa - registrosPorPagina;
        const listaAtualPessoas    = pessoas.slice(indicePrimeiraPessoa, indiceUltimaPessoa);

        if(this.state.teste){
            console.log("Hawl !");
            
            this.modalUpdate = (
                <Container variant="dark">
                    <Modal.Dialog variant="dark">
                        <Modal.Header variant="dark" closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body variant="dark">
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer variant="dark">
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Container>
            )
        }

        return (
            <Container fluid className='p-0 m-0 FHeight'>
                
                <Menu/>

                <Container fluid className='col-10 mt-2 mb-1'>
                    <Row className='col-2 mb-3'>
                        <Col className='pl-0'>
                            <span className='text-light'>Filtro:</span>
                        </Col>
                    </Row>

                    <Row className='col-10'>
                        <InputGroup className='col-2'>
                            <FormControl
                                placeholder='Nome'
                                aria-label='Nome'
                                aria-describedby='nome da pessoa'
                            />
                        </InputGroup>
                        <InputGroup className='col-2 ml-4'>
                            <FormControl
                                placeholder='sobrenome'
                                aria-label='sobrenome'
                                aria-describedby='sobrenome da pessoa'
                            />
                        </InputGroup>
                        
                        <DropdownButton className='ml-4 p-0 border border-light btn btn-dark' variant="dark" id="dropDownBtn" title="Registros por página">
                            {dropDownRegistroPorPagina.map( dropDownItem => (
                                <Dropdown.Item key={dropDownItem} onClick={this.setMaxRegistrosPagina.bind(this, dropDownItem)} >{dropDownItem}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        
                        <Button variant="dark" onClick={this.aplicaFiltros} className='col-3 p-0 offset-1 border border-light'>Pesquisar</Button>
                    </Row>
                </Container>

                <Col className='p-0 h-75'>
                    <div className='table-responsive h-100'>
                        <Table striped bordered hover variant="dark" className='col-11 mt-4 h-100'>
                            <thead>
                                <tr>
                                    <th className='p-1 text-center'>Id</th>
                                    <th className='p-1 text-center'>Nome</th>
                                    <th className='p-1 text-center'>Sobrenome</th>
                                    <th className='p-1 text-center'>Ações</th>
                                </tr>
                            </thead>

                            <tbody className='d-tfg'>
                                {listaAtualPessoas.map( (listaAtualPessoas, index) => (
                                    <tr key={index}>
                                        <td className='tableTdId' >{listaAtualPessoas.id}</td>
                                        <td className='tableTdNome' >{listaAtualPessoas.nome}</td>
                                        <td className='tableTdSobreNome' >{listaAtualPessoas.sobrenome}</td>
                                        <td className='tableTdAcao text-center'>
                                            <a className='glyphicon glyphicon-pencil ml-3' aria-hidden='true' onClick={this.handleUpdate.bind(this, listaAtualPessoas)}/>
                                            <a className='glyphicon glyphicon-trash ml-3' aria-hidden='true' onClick={this.handleDelete.bind(this, listaAtualPessoas)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        {this.modalUpdate}
                    </div>
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
