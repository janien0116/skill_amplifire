import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Tab, Form, Modal, Stack, ButtonGroup, Nav, ProgressBar, Image, Spinner } from 'react-bootstrap'
import {
    frontEnd,
    backEnd,
    webDesign,
    contentCreate,
    dataAnalyst,
    socialMarket,
    graphicDesign,
    gameDev,
    bookKeeping,
    responsiveWeb,
    machineLearning,
    manageDB, curriculumHolder, lessonPlaceholder
} from '../../assets';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ErrorHandlingModalContext from '../../contexts/ErrorHandlingModalContext';

const StudentLessons = () => {
    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext);

    const { studentId } = useParams();

    const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [coursePlan, setCoursePlan] = useState([]);
    const [categories, setCategories] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [courses, setCourses] = useState([]);
    const [curriculumImage, setCurriculumImage] = useState(null);
    const [studentOutput, setStudentOutput] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [now, setNow] = useState(0);
    const [activeKey, setActiveKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCoursePlan = () => {
            let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/courseplan`;

            const requestOptions = {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
                _id: studentId
            };
            setIsLoading(true);
            axios.get(url, requestOptions)
                .then(response => {
                    const data = response.data;
                    setCoursePlan(data);
                    const categories = data.courseSet.map(courseSet => ({
                        id: courseSet._id,
                        category: courseSet.category,
                        courses: courseSet.courses.map(course => ({
                            id: course._id,
                            title: course.title,
                            outputDescription: course.outputDescription,
                            outputLink: course.outputLink,
                            instructorName: course.instructorName,
                        }))
                    }));
                    setCategories(categories);
                    const allCourses = categories.reduce((acc, curr) => acc.concat(curr.courses), []);
                    setCourses(allCourses);
                    setIsLoading(false);
                    if (response.data.curriculum === "Front End Web Development") {
                        setCurriculumImage(frontEnd)
                    } else if (response.data.curriculum === "Back End Web Development") {
                        setCurriculumImage(backEnd)
                    } else if (response.data.curriculum === "UI / UX Web Design") {
                        setCurriculumImage(webDesign)
                    } else if (response.data.curriculum === "Content Creation") {
                        setCurriculumImage(contentCreate)
                    } else if (response.data.curriculum === "Data Analytics") {
                        setCurriculumImage(dataAnalyst)
                    } else if (response.data.curriculum === "Social Media Marketing") {
                        setCurriculumImage(socialMarket)
                    } else if (response.data.curriculum === "Graphic Design in General") {
                        setCurriculumImage(graphicDesign)
                    } else if (response.data.curriculum === "Mobile Game Development") {
                        setCurriculumImage(gameDev)
                    } else if (response.data.curriculum === "Bookkeeping") {
                        setCurriculumImage(bookKeeping)
                    } else if (response.data.curriculum === "Machine Learning") {
                        setCurriculumImage(machineLearning)
                    } else if (response.data.curriculum === "Relational Database") {
                        setCurriculumImage(manageDB)
                    } else if (response.data.curriculum === "Responsive Web Design") {
                        setCurriculumImage(responsiveWeb)
                    } else setCurriculumImage(curriculumHolder)
                })
                .catch(error => console.error(error));
        }
        fetchCoursePlan();
        fetchStudentProgress();
    }, []);

    const fetchStudentProgress = () => {
        let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/progress`;

        const requestOptions = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        };

        axios.get(url, requestOptions)
            .then((response) => {
                const data = response.data;
                let courseCount = parseInt(data.noOfCourses);
                let progress = parseInt(data.progress);
                setNow(Math.floor((progress / courseCount) * 100));
            })
            .catch(error => console.error(error));
    }

    const handleRating = (rate) => setRating(rate)

    const handleCloseRating = () => setShowRatingModal(false);

    const handleShowRatingModal = (e) => {
        e.preventDefault();
        let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/project`;

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${storedToken}`,
            },
        };
        const formData = new FormData();
        formData.append("instructorName", instructorName);
        formData.append("courseId", courseId);
        formData.append("studentOutput", studentOutput);

        axios.put(url, formData, config)
            .then((response) => showErrorHandlingMessage(response.data.msg))
            .then(() => {
                setShowRatingModal(true);
                fetchStudentProgress();
            })
            .catch((error) => showErrorHandlingMessage(error.response.data.msg));
    }

    const handleFileChange = (event) => {
        setStudentOutput(event.target.files[0]);
    };

    const handleClick = () => window.scrollTo(0, 0);

    const handleSubmitRating = (e) => {
        e.preventDefault();
        let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/rate`;

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        };
        const data = {
            studentId: studentId,
            courseId: courseId,
            rating: rating
        };
        axios.post(url, data, config)
            .then(() => {
                handleClick();
                handleCloseRating();
                setRating(0);
                handleCompleteAndContinue();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleCompleteAndContinue = () => {
        const nextIndex = courses.findIndex((course) => course.id === activeKey) + 1;
        if (nextIndex < courses.length) {
            const nextCourse = courses[nextIndex];
            setActiveKey(nextCourse.id);
        }
    };
    return (
        <div className='page'>
            {isLoading ? (
                <Container className='d-flex justify-content-center align-items-center spinner'>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                </Container>
            ) : (
                <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                    <Row>
                        <Col sm={3} className='pe-0 bg-light'>
                            <Nav variant="pills" className="flex-column pb-3" id="student-sidebar">
                                <div>
                                    {curriculumImage && (
                                        <Image src={curriculumImage} fluid alt='Curriculum' />
                                    )}
                                </div>
                                <p className='fs-4 text-center my-2 px-2 text-secondary'>{coursePlan.curriculum}</p>
                                <ProgressBar variant="success" animated now={now} label={`${now}%`} className='mt-2' />
                                {categories.map(category => (
                                    <div key={category.id}>
                                        <p className='fs-4 my-4 ps-2'>{category.category}</p>
                                        {category.courses.map(course => (
                                            <Nav.Item key={course.id} onClick={() => {
                                                setInstructorName(course.instructorName);
                                                setCourseId(course.id);
                                                handleClick();
                                            }}>
                                                <Nav.Link eventKey={course.id} className='fs-5'>{course.title}</Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </div>
                                ))}
                                <Nav.Item>
                                    <Nav.Link variant='success' eventKey="last" className='fs-5'>Complete Course Plan</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9} className='bg-dark'>
                            <Tab.Content>
                                {categories.map(category => (
                                    <>
                                        {category.courses.map(course => (
                                            <Tab.Pane key={course.id} eventKey={course.id} className='pt-2 pe-2 text-center text-white'>
                                                <Image src={lessonPlaceholder} className='img-fluid mb-5' alt='Lesson' />
                                                <Stack direction='horizontal' gap={5} className='px-2 mb-5'>
                                                    <p className='fs-4'>{course.title}</p>
                                                    <p className='fs-4 ms-auto'>Instructor: {course.instructorName}</p>
                                                </Stack>
                                                <p className='fs-4'>Course Assessment</p>
                                                <p className='fs-5 mb-5'>Answer questions provided by the instructor below to continue your course plan</p>
                                                <Container className='mb-5'>
                                                    <p className='fs-5'>{course.outputDescription}</p>
                                                    <p><a href={course.outputLink}>{course.outputLink}</a></p>
                                                </Container>
                                                <p className='fs-5 mb-3'>Upload Output</p>
                                                <Form onSubmit={handleShowRatingModal}>
                                                    <Stack direction='horizontal' gap={3} className='px-4 mb-5'>
                                                        <Form.Control type="file" size='lg' accept=".pdf,.txt,.docx" className='w-75' onChange={handleFileChange} required />
                                                        <Button type='submit' variant='success' className='fs-5'>Complete and Continue</Button>
                                                    </Stack>
                                                </Form>
                                            </Tab.Pane>
                                        ))}
                                    </>
                                ))}
                                <Tab.Pane id="last-lesson-tabpane" eventKey="last">
                                    <Container className='text-center'>
                                        <p class="display-6 my-5 text-center text-white">Congratulations on finishing this Course Plan!</p>
                                        <p class="display-6 my-5 text-center text-white">You can now download your Certificate.</p>
                                        <Button variant='success' className='fs-5 px-5'>Download Certificate</Button>
                                    </Container>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            )}

            <Modal show={showRatingModal} onHide={handleCloseRating}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate this course</Modal.Title>
                </Modal.Header>
                <Modal.Body id="rating-modal">
                    <Form>
                        <Container className='d-flex flex-column align-items-center'>
                            <ButtonGroup className="mb-3">
                                <Button variant='transparent' className='btn-rating p-0 pe-3' onClick={() => handleRating(1)}><i className={`bi bi-star${rating >= 1 ? "-fill" : ""} text-yellow`}></i></Button>
                                <Button variant='transparent' className='btn-rating p-0 pe-3' onClick={() => handleRating(2)}><i className={`bi bi-star${rating >= 2 ? "-fill" : ""} text-yellow`}></i></Button>
                                <Button variant='transparent' className='btn-rating p-0 pe-3' onClick={() => handleRating(3)}><i className={`bi bi-star${rating >= 3 ? "-fill" : ""} text-yellow`}></i></Button>
                                <Button variant='transparent' className='btn-rating p-0 pe-3' onClick={() => handleRating(4)}><i className={`bi bi-star${rating >= 4 ? "-fill" : ""} text-yellow`}></i></Button>
                                <Button variant='transparent' className='btn-rating p-0' onClick={() => handleRating(5)}><i className={`bi bi-star${rating >= 5 ? "-fill" : ""} text-yellow`}></i></Button>
                            </ButtonGroup>
                            <Button variant='success' className='rounded-pill px-4' type="submit" onClick={handleSubmitRating}>Submit Rating</Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default StudentLessons