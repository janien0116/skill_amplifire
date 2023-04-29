import React, { useEffect, useState, useContext } from 'react'
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { logo, studentPlaceholder } from '../assets'
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';
import axios from 'axios';

const StudentNavbar = () => {
    const { showErrorHandlingMessage, setIsAuthenticated } = useContext(ErrorHandlingModalContext)

    const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));
    const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));

    const navigate = useNavigate();

    useEffect(() => {
        console.log(studentId);
    }, [])

    const handleStudentLogout = async (e) => {
        e.preventDefault();

        const url = "http://127.0.0.1:5000/api/students/logout";

        const requestBody = {
            data: {
                _id: studentId,
            }
        };
        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        };

        try {
            const response = await axios.post(url, requestBody, config);
            showErrorHandlingMessage(response.data.message)
            localStorage.removeItem('token');
            localStorage.removeItem('studentId');
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg);
        }
    }

    return (
        <div>
            <Navbar bg="light" expand="lg" className='py-0'>
                <Container>
                    <Navbar.Brand><img src={logo} alt="Logo" width="200" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            <Nav.Item className='me-3'>
                                <Nav.Link href={`/student/${studentId}`} className="navbar-font" aria-current="page">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='me-3'>
                                <Nav.Link href={`/student/${studentId}/courses`} className="navbar-font" aria-current="page">Courses</Nav.Link>
                            </Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className='rounded-pill p-0'>
                                    <img src={studentPlaceholder} alt="Student" width={50} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='fs-6'>
                                    <Dropdown.Item href={`/student/${studentId}/profile`}>Profile</Dropdown.Item>
                                    <Dropdown.Item href={`/student/${studentId}/mylessons`}>My Class</Dropdown.Item>
                                    <Dropdown.Item onClick={handleStudentLogout}>Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default StudentNavbar