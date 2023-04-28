import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { logo } from '../assets/index'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Modal, ModalFooter, Nav, Navbar, Row } from 'react-bootstrap';
import SignUpModalContext from '../contexts/SignUpModalContext';
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';

const DefaultNavbar = () => {
  const { setShowSignup } = useContext(SignUpModalContext);
  const { showLogin, setShowLogin } = useContext(SignUpModalContext);
  const { setShowTeacherSignup } = useContext(SignUpModalContext);
  const { showErrorHandlingMessage, setIsAuthenticated } = useContext(ErrorHandlingModalContext)

  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('teacherToken'));
    console.log(localStorage.getItem('studentId'));
    console.log(localStorage.getItem('instructorId'));
  },[])

  const navigate = useNavigate();

  const handleShowSignup = () => {
    setShowSignup(true);
    handleCloseLogin();
  };
  const handleShowLogin = () => {
    setShowLogin(true);
    handleCloseTeacherLogin();
  };
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowTeacherSignup = () => {
    setShowTeacherSignup(true);
    handleCloseTeacherLogin();
  };
  const handleShowTeacherLogin = () => {
    setShowTeacherLogin(true);
    handleCloseLogin();
  };
  const handleCloseTeacherLogin = () => setShowTeacherLogin(false);

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const url = "http://127.0.0.1:5000/api/student-login";

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(url, requestBody);
      if (response.status === 200) {
        const loginData = await response.data;
        localStorage.setItem('token', loginData.access_token);
        localStorage.setItem('studentId', loginData._id);
        showErrorHandlingMessage(response.data.msg);
        setIsAuthenticated(true);
        navigate(`/student/${loginData._id}`);
      } else {
        navigate("/");
        setIsAuthenticated(false);
        showErrorHandlingMessage(response.data.msg)
      }

      if (response.status === 400) {
       showErrorHandlingMessage(response.data.msg)
       navigate("/");
      }
    } catch (error) {
      showErrorHandlingMessage(error.response.data.msg);
    }
  };

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:5000/api/instructor-login";

    const requestBody = {
      email: teacherEmail,
      password: teacherPassword,
    };

    try {
      const response = await axios.post(url, requestBody);
      if (response.status === 200) {
        const loginTeacherData = await response.data;
        localStorage.setItem('teacherToken', loginTeacherData.access_token);
        localStorage.setItem('instructorId', loginTeacherData._id);
        setIsAuthenticated(true);
        showErrorHandlingMessage(response.data.message);
        navigate(`/instructor/${loginTeacherData._id}`);
      } else {
        showErrorHandlingMessage(response.data.message)
        setIsAuthenticated(false);
        navigate("/");
      }

      if (response.status === 400) {
        showErrorHandlingMessage(response.data.message)
        navigate("/");
      }
    } catch (error) {
      showErrorHandlingMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className='py-0'>
        <Container>
          <Navbar.Brand><Link to={"/"}><img src={logo} alt="Logo" width="200" /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mb-2 mb-lg-0">
              <Nav.Item className="me-4">
                <Nav.Link aria-current="page" className="navbar-font" href="/curriculums">Curriculum</Nav.Link>
              </Nav.Item>
              <Nav.Item className="me-4">
                <Nav.Link aria-current="page" className="navbar-font" href="/courses">Courses</Nav.Link>
              </Nav.Item>
              <Nav.Item className="me-4">
                <Nav.Link onClick={handleShowLogin} className="navbar-font">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant='primary' className="px-4 fs-5 rounded-pill" onClick={handleShowSignup}>Sign Up</Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showLogin} onHide={handleCloseLogin} dialogClassName="modal-50w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title className="fw-bold">Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <Row className='m-0 '>
            <Col lg={5} className='d-flex flex-column justify-content-center align-items-center' id='login-message'>
              <p className='fs-2'>Welcome Back to Skill Amplifire!<i className="bi bi-fire" style={{ fontSize: "1em" }}></i></p>
              <p>Unlock your potential and continue your learning journey with Skill Amplifire.</p>
            </Col>
            <Col lg={7} id='login-form'>
              <Form>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </FloatingLabel>
                <div className='d-flex flex-column justify-content-center align-items-center my-4'>
                  <Button variant="primary"
                    onClick={handleStudentLogin}
                    className='px-5'>
                    Log In
                  </Button>
                  <p className='my-3'>Not yet Skill Amplifired?</p>
                  <p className='text-center'><Link onClick={handleShowSignup}>Sign Up</Link></p>
                </div>
              </Form>
              <p className='text-center'><Link onClick={handleShowTeacherLogin}>Log In as Instructor</Link></p>
            </Col>
          </Row>
        </Modal.Body>
        <ModalFooter className='modal-background'></ModalFooter>
      </Modal>
      <Modal show={showTeacherLogin} onHide={handleCloseTeacherLogin} dialogClassName="modal-40w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton className='modal-background'>
          <Modal.Title className="fw-bold">Log In as Instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body id='signup-modal'>
          <Row className='p-5'>
            <Form>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setTeacherEmail(e.target.value)} required />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setTeacherPassword(e.target.value)} required />
              </FloatingLabel>
              <div className='d-flex flex-column justify-content-center align-items-center my-4'>
                <Button variant="primary" onClick={handleTeacherLogin} className='px-5'>
                  Log In
                </Button>
                <p className='my-3'>Want to teach at Skill Amplifire?</p>
                <p className='text-center'><Link onClick={handleShowTeacherSignup}>Sign Up</Link></p>
              </div>
            </Form>
            <p className='text-center'><Link onClick={handleShowLogin}>Log In as Student</Link></p>
          </Row>
        </Modal.Body>
        <ModalFooter className='modal-background'></ModalFooter>
      </Modal>
    </div>
  )
}

export default DefaultNavbar