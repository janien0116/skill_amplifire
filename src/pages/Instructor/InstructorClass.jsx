import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { studentPlaceholder } from '../../assets'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const InstructorClass = () => {
    const { instructorId } = useParams();

    const [showStudents, setShowStudents] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('teacherToken'));


    useEffect(() => {
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`${process.env.REACT_APP_API_URL}/instructors/${instructorId}/students`, requestOptions)
            .then(response => setShowStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='page'>
            <Container id="instructor-class" className='my-5'>
                <p className='fs-2 mt-5'>My Class</p>
                <Stack direction='vertical' gap={3}>
                    {showStudents.map(student => (
                        <Row className='d-flex align-items-center bg-light rounded-4 ps-3' id='student-row'>
                            <Col lg={2}>
                                <img src={studentPlaceholder} width={100} className='img-fluid' alt='Student' />
                            </Col>
                            <Col lg={3}>
                                <p className='fs-5'>Name: {student.studentName}</p>
                            </Col>
                            <Col lg={4}>
                                <p className='fs-5'>Course Enrolled: {student.courseTitle}</p>
                            </Col>
                            <Col lg={3}>
                                <Stack direction='horizontal' gap={3}>
                                    <Button variant="primary" className='fs-5'>View Profile</Button>
                                    <Button variant="success" className='fs-5'>Send Feedback</Button>
                                </Stack>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Container>
        </div>
    )
}

export default InstructorClass