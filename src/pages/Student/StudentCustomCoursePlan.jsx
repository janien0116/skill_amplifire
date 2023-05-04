import React, { useState, useContext, useEffect } from 'react'
import { Button, Card, Col, Container, Spinner, Form, Pagination, Row, Stack } from 'react-bootstrap'
import { courseThumbnail } from '../../assets'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorHandlingModalContext from '../../contexts/ErrorHandlingModalContext';

const StudentCustomCoursePlan = () => {
    const { studentId } = useParams();

    const navigate = useNavigate()
    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext)
    const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [coursePlanPrice, setCoursePlanPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/courses`;

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        };
        axios.get(url, config)
            .then(response => {
                setSelectedCourses(response.data);
                const totalAmount = response.data.reduce((acc, course) => acc + course.amount, 0);
                setCoursePlanPrice(totalAmount);
            })
            .catch(error => console.error(error));

    }, []);

    const handleEnrollCoursePlan = () => {
        const courseSet = selectedCourses.map(course => ({
            category: course.category,
            courses: course.courseTitle
        }));

        let url = `${process.env.REACT_APP_API_URL}/students/${studentId}`
        const data = {
            curriculum: selectedCourses[0].curriculum,
            courseSet: courseSet,
            amountPaid: coursePlanPrice
        };
        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        };
        setIsLoading(true);
        axios.post(url, data, config)
            .then((response) => {
                showErrorHandlingMessage(response.data.msg);
                setIsLoading(false);
            })
            .catch((error) => {
                showErrorHandlingMessage(error.response.data.msg);
                navigate(`/student/${studentId}`);
            });

    };

    return (
        <div className='page'>
            <Container className='my-5'>
                {isLoading ? (
                    <Container className='d-flex justify-content-center align-items-center spinner'>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                    </Container>
                ) : (
                    <Stack direction='vertical' gap={4}>
                        <p className='display-6'>Your Custom Course Plan</p>
                        {selectedCourses.reduce((rows, course, index) => {
                            const totalRows = Math.floor(index / 3)

                            if (!rows[totalRows]) {
                                rows[totalRows] = []
                            }
                            rows[totalRows].push(
                                <Col key={index}>
                                    <Card className='custom-course-card'>
                                        <Card.Img variant="top" src={courseThumbnail} />
                                        <Card.Body className='d-flex flex-column justify-content-end'>
                                            <Card.Title>{course.courseTitle}</Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <p className='mb-0'><i className="card-icon bi bi-person-video2 me-2"></i>{course.instructorName}</p>
                                                    <p className='mb-0'><i class="card-icon bi bi-cash-stack me-2"></i>{course.level}</p>
                                                </div>
                                                <div className="d-flex justify-content-between flex-wrap">
                                                    <p className='mb-0'><i class="card-icon bi bi-book-half me-2"></i>{course.curriculum}</p>
                                                    <p className='mb-0'><i class="card-icon bi bi-journal-bookmark-fill me-2"></i>{course.category}</p>
                                                </div>
                                                <p><i class="card-icon bi bi-cash-stack me-2"></i>$ {course.amount}</p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                            return rows
                        }, []).map((threeCol) => (
                            <Stack direction='horizontal' gap={5}>
                                {threeCol}
                            </Stack>
                        ))}
                        <Container className='d-flex flex-column align-items-center justify-content-center my-5'>
                            <p className='fs-4 mt-3'>Course Plan Price: ${parseFloat(coursePlanPrice).toFixed(2)}</p>
                            <Button variant='success' className="px-5 rounded-pill fs-4" onClick={handleEnrollCoursePlan}>Enroll Custom Courses</Button>
                        </Container>
                    </Stack>
                )}

            </Container >
        </div>
    )
}

export default StudentCustomCoursePlan