import React, { Component } from "react";
import { Grid, Navbar, Jumbotron, Button } from "react-bootstrap";
import "../style/header.css";
import "bootstrap/dist/css/bootstrap.css"; // Put any other imports below so that CSS from your
import "bootstrap/dist/css/bootstrap-theme.css"; // components takes precedence over default styles.

class Head extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Home</a>
              </Navbar.Brand>
              <Navbar.Brand>
                <a href="/add">Add Products</a>
              </Navbar.Brand>
              <Navbar.Brand>
                <a href="/emailTemplate">Email Template</a>
              </Navbar.Brand>
              <Navbar.Brand>
                <a href="/validationExample">Validation Test</a>
              </Navbar.Brand>
              <Navbar.Brand>
                <a href="/about">About Me</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <a href="http://redux.js.org/docs/basics/" ><h1 style={{textAlign:"center"}}>React Redux!!!</h1></a>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default Head;
