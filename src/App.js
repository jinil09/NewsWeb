import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useState , useEffect } from 'react';

function App() {

  const [mydata,setdata]= useState([]);

  const apiget = ()=>{
    fetch('https://inshortsapi.vercel.app/news?category=all')
    .then((response)=>response.json())
    .then((json)=>{
      console.log(json)
      setdata(json.data)
    });
  }  

  useEffect(()=>{

    apiget();
    const interval = setInterval(() => {
      apiget();
    }, 500000);
    return ()=> clearInterval(interval)
  },[]);


  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">News Monkey</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="">ALL</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Sports
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Politic</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container fluid>

      <Row xs={1} md={3} className="g-4 m-3">
        
          {mydata.map(

            (value)=>{
              return(
                <>
                    <Col className="container-fluid mt-4">
                    <Card>
                    <Card.Img variant="top" width="300px" height="350px" src={value.imageUrl} />
                    <Card.Body>
                      <Card.Title>{value.title}</Card.Title>
                      <Card.Text>
                        {value.content}
                      </Card.Text>
                    </Card.Body>
                    <footer className='blockquote-footer m-1'>
                      published on : {value.date} , {value.time}; 
                    </footer>
                  </Card>
                  </Col>             
                </>
              )
            }
          )}

      </Row>

    </Container>

    </>
  );
}

export default App;
