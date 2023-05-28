import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, Pagination, FloatingLabel, Stack, Placeholder, Row } from 'react-bootstrap'
import { courseThumbnail } from '../../assets'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorHandlingModalContext from '../../contexts/ErrorHandlingModalContext';
import CustomButton from '../../components/CustomButton';
import ConfirmationDialog from '../../components/ConfirmDialog';

const StudentCourses = () => {

    const { studentId } = useParams();

    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext);

    const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}`)
            .then(response => {
                setCourses(response.data);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    const handleAddtoCourseplan = (course) => {
        let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/courses`;

        const requestOptions = {
            category: course.category,
            course: course.title,
            amountPaid: course.amount,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        };
        axios.put(url, requestOptions, config)
            .then((response) => {
                const data = response.data;
                showErrorHandlingMessage(data.msg);
            })
            .catch((error) => showErrorHandlingMessage(error.response.data.msg));
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const filtered = courses.filter((course) => {
            const searchTermRegex = new RegExp(searchTerm, 'gi');
            const hasCurriculum = course.curriculum && course.curriculum.match(searchTermRegex);
            const hasTitle = course.title && course.title.match(searchTermRegex);
            const hasInstructor = course.instructorName && course.instructorName.match(searchTermRegex);
            return hasCurriculum || hasTitle || hasInstructor;
        });


        setFilteredCourses(filtered);
        setFilterBy('');
    }

    const handleSearchOnFilter = (e, filter) => {
        e.preventDefault();

        const filtered = courses.filter((course) => {
            const searchTermRegex = new RegExp(searchTerm, 'gi');
            return (
                course[filter].match(searchTermRegex)
            );
        });

        setFilteredCourses(filtered);
        setFilterBy(filter);
    }

    const handleRatingFilter = (e, rating) => {
        e.preventDefault();

        const filtered = courses.filter((course) => {
            return (
                course.rating === rating
            );
        });

        setFilteredCourses(filtered);
        setFilterBy('rating');
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setFilteredCourses([]);
    }

    const showRatingFilter = () => {
        const dropdownItems = [];
        for (let i = 1; i <= 5; i++) {
            const stars = [];
            for (let j = 1; j <= i; j++) {
                stars.push(<i key={j} className="star-filter bi bi-star-fill"></i>);
            }
            dropdownItems.push(
                <Dropdown.Item key={i} onClick={(e) => handleRatingFilter(e, i)}>
                    {stars}
                </Dropdown.Item>
            );
        }
        return dropdownItems;
    }

    const renderRatingStars = (reviews) => {
        const rating = Math.round(parseFloat(reviews));
        const stars = [];

        for (let i = 1; i <= rating; i++) {
            stars.push(<i key={i} className="star-filter bi bi-star-fill text-yellow"></i>);
        }

        for (let i = stars.length + 1; i <= 5; i++) {
            stars.push(<i key={i} className="star-filter bi bi-star text-yellow"></i>);
        }

        return stars;
    }

    const newData = filteredCourses.length > 0 ? filteredCourses : courses;

    return (
        <div className='page my-5'>
            <Container className='d-flex justify-content-end mt-3'>
                <Link to={`/student/${studentId}/custom-courses`}>
                    <Button>Go to Custom Course Plan</Button>
                </Link>
            </Container>
            <Container className='mt-5'>
                <Stack direction='vertical' gap={5}>
                    <Form className='fs-5' onSubmit={handleSearchSubmit}>
                        <Stack direction='horizontal' gap={3}>
                            <FloatingLabel controlId="floatingInput" label="Search your preferred course" className="m-0 w-100">
                                <Form.Control type="search" placeholder="Search Course" className='mt-2' value={searchTerm}
                                    onChange={handleInputChange} />
                            </FloatingLabel>
                            <Button variant="success" type='submit' className='px-3 py-2'><i className="bi bi-search"></i></Button>
                            <Dropdown>
                                <Dropdown.Toggle variant="color4" className="py-2 px-4">
                                    Filter by
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" onClick={(e) => handleSearchOnFilter(e, 'curriculum')}>
                                        Curriculum
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={(e) => handleSearchOnFilter(e, 'title')}>
                                        Course Title
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={(e) => handleSearchOnFilter(e, 'instructorName')}>
                                        Instructor
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="color6" className="py-2 px-3">
                                    Rating
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {showRatingFilter()}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Stack>
                    </Form>
                    {isLoading ? (
                        <Stack direction='vertical' gap={3}>
                            {[...Array(3)].map((_, rowIndex) => (
                                <Row key={rowIndex}>
                                    {[...Array(3)].map((_, colIndex) => (
                                        <Col key={colIndex}>
                                            <Card style={{ width: '25rem' }}>
                                                <Card.Img variant="top" src={courseThumbnail} />
                                                <Card.Body>
                                                    <Placeholder as={Card.Title} animation="glow">
                                                        <Placeholder xs={6} />
                                                    </Placeholder>
                                                    <Placeholder as={Card.Text} animation="glow">
                                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                                    </Placeholder>
                                                    <Placeholder.Button variant="primary" xs={6} />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Stack>
                    ) : (
                        <Stack direction='vertical' gap={4}>
                            {newData.reduce((rows, course, index) => {
                                const totalRows = Math.floor(index / 3)

                                if (!rows[totalRows]) {
                                    rows[totalRows] = []
                                }
                                rows[totalRows].push(
                                    <Col key={index}>
                                        <Card className='course-card'>
                                            <Card.Img variant="top" fluid src={course.videoThumbnail ? `${process.env.REACT_APP_API_URL}${course.videoThumbnail}` : courseThumbnail} alt='Video Thumbnail' className='course-img'/>
                                            <Card.Body className='d-flex flex-column justify-content-end'>
                                                <Card.Title>{course.title}</Card.Title>
                                                <Card.Text>
                                                    <p className='mb-0'><i class="card-icon bi bi-cash-stack me-2"></i>{course.level}</p>
                                                    <div className="d-flex justify-content-between">
                                                        <p className='mb-0'><i className="card-icon bi bi-person-video2 me-2"></i>{course.instructorName}</p>
                                                        <div className='d-flex align-items-center'>
                                                            {renderRatingStars(course.averageRating)}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between flex-wrap">
                                                        <p className='mb-0'><i class="card-icon bi bi-book-half me-2"></i>{course.curriculum}</p>
                                                        <p className='mb-0'><i class="card-icon bi bi-journal-bookmark-fill me-2"></i>{course.category}</p>
                                                    </div>
                                                    <p><i class="card-icon bi bi-cash-stack me-2"></i>$ {course.amount}</p>
                                                </Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <Button variant="primary" onClick={() => handleAddtoCourseplan(course)}>Add to Course Plan</Button>
                                                    <CustomButton course={course} />
                                                </div>
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
                        </Stack>
                    )}
                </Stack>
            </Container >
        </div>
    )
}

export default StudentCourses