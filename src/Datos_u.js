import React, { useState } from 'react';
import { Table, Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const initialEntries = [
  { id: 1, date: '2023-05-01', description: 'Compra de suministros', debit: 150, credit: 0 },
  { id: 2, date: '2023-05-02', description: 'Venta de productos', debit: 0, credit: 200 },
  { id: 3, date: '2023-05-03', description: 'Pago de salarios', debit: 100, credit: 0 },
];

const AccountingEntries = () => {
  const [entries, setEntries] = useState(initialEntries);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEntries = entries.filter(entry =>
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.date.includes(searchTerm) ||
    entry.debit.toString().includes(searchTerm) ||
    entry.credit.toString().includes(searchTerm)
  );

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Partidas Contables</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Form>
            <FormGroup row>
              <Label for="search" sm={2}>Buscar</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Buscar por fecha, descripción, débito o crédito"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Débito</th>
                <th>Crédito</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.date}</td>
                  <td>{entry.description}</td>
                  <td>{entry.debit}</td>
                  <td>{entry.credit}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountingEntries;
