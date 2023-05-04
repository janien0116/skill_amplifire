import React, { useEffect, useState } from 'react'
import { Col, Nav } from 'react-bootstrap'
import { teacherPlaceholder } from '../assets';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AnalyticsSidebar = () => {
    const {instructorId} = useParams();

    const [instructor, setInstructor] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('teacherToken'));

    useEffect(() => {
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`${process.env.REACT_APP_API_URL}/instructors/${instructorId}`, requestOptions)
            .then(response => setInstructor(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleClick = () => window.scrollTo(0, 0);

    return (
            <Col sm={2} className='instructor-sidetab pt-5'>
                <Nav variant="pills" className="flex-column pt-2 px-1"  id="instructor-sidebar">
                    <img src={teacherPlaceholder} className='img-fluid' alt='Tecaher'/>
                    <p className='mb-4 text-center fs-5'>{instructor.instructorName}</p>
                    <Nav.Item>
                        <Nav.Link eventKey="first" className='fs-5' onClick={handleClick}>Analytics</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second" className='fs-5' onClick={handleClick}>Add Course</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="third" className='fs-5' onClick={handleClick}>Courses</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="fourth" className='fs-5' onClick={handleClick}>Review Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="fifth" className='fs-5' onClick={handleClick}>Community</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
    )
}

export default AnalyticsSidebar