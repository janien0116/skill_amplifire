import React, { createContext, useContext, useRef, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalFooter,
  Form,
  Button,
  Row,
  Col,
  Stack,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
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
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailNotSent, setIsEmailNotSent] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext);

  const navigate = useNavigate();
  const form = useRef();

  const handleChanged = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseSignup = () => setShowSignup(false);
  const handleShowLogin = () => {
    setShowLogin(true);
    handleCloseSignup();
  };
  const handleCloseTeacherSignup = () => setShowTeacherSignup(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/signup`;

    axios
      .post(url, {
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

  const handleCloseDialog = () => setShowDialog(false);
  const handleShowDialog = () => setShowDialog(true);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          handleShowDialog();
          setIsEmailSent(true);
        },
        (error) => {
          console.log(error.text);
          setIsEmailNotSent(true);
        }
      );
  };

  return (
    <SignUpModalContext.Provider
      value={{
        showSignup,
        setShowSignup,
        showLogin,
        setShowLogin,
        showTeacherSignup,
        setShowTeacherSignup,
      }}
    >
      <Modal
        show={showSignup}
        onHide={handleCloseSignup}
        dialogClassName="modal-60w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className="modal-background">
          <Modal.Title className="fw-bold">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="signup-modal">
          <Row className="pe-3 m-0">
            <Col
              lg={5}
              className="d-flex flex-column justify-content-center align-items-center"
              id="signup-message"
            >
              <p className="fs-2">
                Ready to Amplifire Your Skill?
                <i className="bi bi-fire ms-1" style={{ fontSize: "1em" }}></i>
              </p>
              <p>
                Join thousands of learners and unleash your potential with our
                curated curriculums and courses!
              </p>
            </Col>
            <Col lg={7} id="signup-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Full Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      name="fullName"
                      onChange={handleChanged}
                      autoFocus
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="jdoe@20"
                      name="userName"
                      onChange={handleChanged}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email Address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="email"
                      onChange={handleChanged}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChanged}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Stack direction="horizontal" gap={4}>
                    <Form.Label>Choose Payment Method</Form.Label>
                    <Form.Check
                      inline
                      label="Credit Card"
                      name="paymentMethod"
                      value="Credit Card"
                      type="radio"
                      onChange={handleChanged}
                      checked={student.paymentMethod === "Credit Card"}
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="Paypal"
                      name="paymentMethod"
                      value="Paypal"
                      type="radio"
                      onChange={handleChanged}
                      checked={student.paymentMethod === "Paypal"}
                      id={`inline-radio-2`}
                    />
                  </Stack>
                </Form.Group>
                <div className="d-flex flex-column justify-content-center align-items-center my-4">
                  <Button variant="primary" type="submit" className="px-5">
                    Sign Up
                  </Button>
                  <p className="my-3">Already a Student?</p>
                  <p className="text-center">
                    <Link onClick={handleShowLogin}>Log In</Link>
                  </p>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <ModalFooter className="modal-background"></ModalFooter>
      </Modal>
      <Modal
        show={showTeacherSignup}
        onHide={handleCloseTeacherSignup}
        dialogClassName="modal-60w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className="modal-background">
          <Modal.Title className="fw-bold">Instructor Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="signup-modal fs-6 p-5">
          <p className="fs-4">Become an Instructor</p>
          <p>
            Join our team of passionate instructors and share your knowledge
            with aspiring freelancers and career-driven individuals.
          </p>
          <Stack direction="vertical" gap={3}>
            <Form ref={form} onSubmit={sendEmail}>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>
                  Full Name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="John Doe" name="applicant_name"/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Email address<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name="applicant_email"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>
                  Years of Experience<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control placeholder="1-20" type="number" name="applicant_yoe"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>
                  Portfolio Website Link<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="https://portfolio.me" name="applicant_site"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>
                  Your Cover Letter<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Add cover letter for this application"
                  style={{ height: "300px" }}
                  name="applicant_cover_letter"
                />
              </Form.Group>
              <Form.Group className="mt-4 text-center">
                <Button className="fs-5 px-3" type="submit">
                  Send Application
                </Button>
              </Form.Group>
            </Form>
          </Stack>
        </Modal.Body>
        <ModalFooter className="modal-background"></ModalFooter>
      </Modal>
      <Modal show={showDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Application Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body id="email-notif">
          Thank you for submitting your application to Skill Amplifire. We have
          received your email and appreciate your interest. Rest assured, we
          will carefully review your application and provide updates on its
          status via email.
          <i class="bi bi-emoji-smile"></i>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {children}
    </SignUpModalContext.Provider>
  );
};

export default SignUpModalContext;
