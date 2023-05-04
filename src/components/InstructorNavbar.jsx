import React, { useEffect, useState, useContext } from 'react'
import { logo, teacherPlaceholder } from '../assets/index'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';
import axios from 'axios';


const InstructorNavbar = () => {
    const navigate = useNavigate();

    const { showErrorHandlingMessage, setIsAuthenticated } = useContext(ErrorHandlingModalContext)

    const [instructorId, setInstructorId] = useState(localStorage.getItem('instructorId'));
    const [token, setToken] = useState(localStorage.getItem('teacherToken'));

    useEffect(() => {
        console.log(token);
    }, [])

    const handleTeacherLogout = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/instructors/logout`;

        const requestBody = {
            data: {
                _id: instructorId,
            }
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(url, requestBody, config);
            showErrorHandlingMessage(response.data.message)
            localStorage.removeItem('teacherToken');
            localStorage.removeItem('instructorId');
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light py-0">
                <Container>
                    <Navbar.Brand className="navbar-brand"><img src={logo} alt="Logo" width="200" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            <Nav.Item className="me-3">
                                <Nav.Link href={`/instructor/${instructorId}/analytics`} className="navbar-font" aria-current="page">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='rounded-pill p-0'>
                                        <Image src={teacherPlaceholder} alt="Instructor" width={50} fluid />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='fs-6'>
                                        <Dropdown.Item href={`/instructor/${instructorId}/myclass`}>My Class</Dropdown.Item>
                                        <Dropdown.Item href={`/instructor/${instructorId}/profile`}>Edit Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleTeacherLogout}>Log Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </nav>
        </div>
    )
}

export default InstructorNavbar