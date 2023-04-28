import React, { createContext, useContext, useState } from "react";
import axios from 'axios';
import { Modal, ModalFooter, Form, Button, Row, Col, Stack, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorHandlingModalContext from "./ErrorHandlingModalContext";

const SignUpModalContext = createContext();

export const SignUpModalContextProvider = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showTeacherSignup, setShowTeacherSignup] = useState(false);
  const [student, setStudent] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    paymentMethod: "",
  });

  const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext);

  const navigate = useNavigate();

  const handleChanged = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseSignup = () => setShowSignup(false);
  const handleShowLogin = () => {
    setShowLogin(true);
    handleCloseSignup();
  }
  const handleCloseTeacherSignup = () => setShowTeacherSignup(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `http://127.0.0.1:5000/api/signup`;

    axios.post(url, {
      fullName: student.fullName,
      userName: student.userName,
      email: student.email,
      password: student.password,
      paymentMethod: student.paymentMethod,
    })
      .then(() => {
        handleCloseSignup();
        handleShowLogin();
      })
      .catch((error) => {
        showErrorHandlingMessage(error.response.data.msg);
      });
  };

  return (
    <SignUpModalContext.Provider value={{ showSignup, setShowSignup, showLogin, setShowLogin, showTeacherSignup, setShowTeacherSignup }}>
      <Modal show={showSignup} onHide={handleCloseSignup} dialogClassName="modal-60w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton className='modal-background'>
          <Modal.Title className="fw-bold">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='pe-3 m-0'>
            <Col lg={5} className='d-flex flex-column justify-content-center align-items-center' id='signup-message'>
              <p className='fs-2'>Ready to Amplifire Your Skill?<i className="bi bi-fire ms-1" style={{ fontSize: "1em" }}></i></p>
              <p>Join thousands of learners and unleash your potential with our curated curriculums and courses!</p>
            </Col>
            <Col lg={7} id='signup-form'>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-3">
                    <Form.Control type="text" placeholder="John Doe" name="fullName"
                      onChange={handleChanged}
                      autoFocus required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                    <Form.Control type="text" placeholder="jdoe@20"
                      name="userName"
                      onChange={handleChanged}
                      required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com"
                      name="email"
                      onChange={handleChanged}
                      required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password"
                      name="password"
                      onChange={handleChanged} 
                      required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Stack direction='horizontal' gap={4}>
                    <Form.Label>Choose Payment Method</Form.Label>
                    <Form.Check
                      inline
                      label="Credit Card"
                      name="paymentMethod"
                      value="Credit Card"
                      type="radio"
                      onChange={handleChanged}
                      checked={student.paymentMethod === 'Credit Card'}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="Paypal"
                      name="paymentMethod"
                      value="Paypal"
                      type="radio"
                      onChange={handleChanged}
                      checked={student.paymentMethod === 'Paypal'}
                      id={`inline-radio-2`}
                    />
                  </Stack>
                </Form.Group>
                <div className='d-flex flex-column justify-content-center align-items-center my-4'>
                  <Button variant="primary" type="submit" className='px-5'>
                    Sign Up
                  </Button>
                  <p className='my-3'>Already a Student?</p>
                  <p className='text-center'><Link onClick={handleShowLogin}>Log In</Link></p>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <ModalFooter className='modal-background'></ModalFooter>
      </Modal>
      <Modal show={showTeacherSignup} onHide={handleCloseTeacherSignup} dialogClassName="modal-60w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton className='modal-background'>
          <Modal.Title className="fw-bold">Instructor Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body id='signup-modal' className='fs-6 p-5'>
          <p className='fs-4'>Become an Instructor</p>
          <p>Join our team of passionate instructors and share your knowledge with aspiring freelancers and career-driven individuals.</p>
          <Stack direction='vertical' gap={3}>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Portfolio Website Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='https://portfolio.me'
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Upload Your Cover Letter</Form.Label>
                <Form.Control
                  type="file"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Add message for this application"
                  style={{ height: '100px' }}
                />
              </Form.Group>
              <Form.Group className='mt-4 text-center'>
                <Button className='fs-5 px-3' type='submit'>Send Application</Button>
              </Form.Group>
            </Form>
          </Stack>
        </Modal.Body>
        <ModalFooter className='modal-background'></ModalFooter>
      </Modal>
      {children}
    </SignUpModalContext.Provider>
  );
}

export default SignUpModalContext;
