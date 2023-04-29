import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, ProgressBar, Stack, Placeholder, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
    manageDB, curriculumHolder
} from '../../assets';
import EnrollCurriculumContext from '../../contexts/EnrollCurriculumContext';
import Curriculums from '../../components/Curriculums'
import axios from 'axios'
import ConfirmationDialog from '../../components/ConfirmDialog';
import ErrorHandlingModalContext from '../../contexts/ErrorHandlingModalContext';

const StudentPage = () => {
    const { curriculum, coursePlanPrice, courseSets, showCoursePlan } = useContext(EnrollCurriculumContext);
    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext)

    const { studentId } = useParams();

    const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));
    const [coursePlan, setCoursePlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCurriculumLoading, setIsCurriculumLoading] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(true);
    const [curriculumImage, setCurriculumImage] = useState(null);
    const [now, setNow] = useState(0);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchCoursePlan();
        fetchStudentProgress();
    }, []);

    const fetchCoursePlan = () => {
        let url = `http://127.0.0.1:5000/api/students/${studentId}/courseplan`;

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        };
        axios.get(url, config)
            .then((response) => {
                setCoursePlan(response.data);
                setIsLoading(false);
                setIsEnrolled(true);
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
            .catch((error) => {
                console.error(error);
                setIsEnrolled(false);
            });
    }

    const fetchStudentProgress = () => {
        let url = `http://127.0.0.1:5000/api/students/${studentId}/progress`;

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
                setNow(Math.ceil((progress / courseCount) * 100));
            })
            .catch(error => console.error(error));
    }

    const handleClick = () => window.scrollTo(0, 0);

    const handleEnrollCoursePlan = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        let url = `http://127.0.0.1:5000/api/students/${studentId}`;

        const data = {
            studentId: studentId,
            curriculum: curriculum,
            courseSet: courseSets.map(({ category, beginnerLevel, intermediateLevel, advancedLevel }) => ({
                category,
                courses: [beginnerLevel?.title, intermediateLevel?.title, advancedLevel?.title]
            })),
            amountPaid: coursePlanPrice
        };
        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        };
        setIsCurriculumLoading(true);
        axios.post(url, data, config)
            .then((response) => {
                const data = response.data
                showErrorHandlingMessage(data.msg);
                fetchCoursePlan();
            })
            .then(() => {
                setIsCurriculumLoading(false);
                setIsEnrolled(true);
            })
            .catch((error) => {
                showErrorHandlingMessage(error.response.data.msg)
            });
    };

    const handleDeleteCourseplan = () => {
        let url = `http://127.0.0.1:5000/api/students/${studentId}/courseplan`;

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        };
        setIsLoading(true)
        axios.delete(url, config)
            .then((response) => {
                const data = response.data;
                showErrorHandlingMessage(data.msg);
                setIsLoading(false);
            })
            .then(() => {
                setIsEnrolled(false);
            })
            .catch((error) => showErrorHandlingMessage(error.response.data.msg));
    }

    const handleConfirm = () => {
        handleDeleteCourseplan();
        setShowConfirmationDialog(false);
    }

    const handleCancel = () => setShowConfirmationDialog(false);

    return (
        <div className='page'>
            <Stack direction='vertical' gap={5} className='mb-5'>
                <p className="display-6 my-5 text-center">Welcome To Your Learning Portal</p>
                {isEnrolled ? (isLoading ? (
                    <Container className='mb-5 d-flex flex-column align-items-center'>
                        <Card style={{ width: '50rem' }}>
                            <Card.Img variant="top" src={curriculumHolder} />
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={4} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={12} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={4} />
                            </Card.Body>
                        </Card>
                    </Container>
                ) : (
                    <Container className='mb-5 d-flex flex-column align-items-center'>
                        <p className='fs-2'>My Class</p>
                        <Card key={coursePlan.id} style={{ width: '50rem', cursor: 'pointer' }}>
                            <Link to={`/student/${studentId}/mylessons`}>
                                <Card.Img variant="top" src={curriculumImage} />
                                <Card.Body>
                                    <Card.Title className='mb-3'>{coursePlan.curriculum}</Card.Title>
                                    <ProgressBar variant="success" animated now={now} label={`${now}%`} />
                                </Card.Body>
                            </Link>
                            <Card.Footer>
                                <Button onClick={() => setShowConfirmationDialog(true)}>Unenroll Course Plan</Button>
                            </Card.Footer>
                        </Card>
                    </Container>
                )
                ) : (
                    <> {isCurriculumLoading ? (
                        <Container className='d-flex justify-content-center align-items-center spinner'>
                            <Spinner animation="grow" variant="primary" />
                            <Spinner animation="grow" variant="secondary" />
                            <Spinner animation="grow" variant="success" />
                            <Spinner animation="grow" variant="danger" />
                        </Container>
                    ) : (
                        <Curriculums />
                    )}

                        <Container className='d-flex justify-content-center'>
                            <Button variant='success' className="px-5 rounded-pill fs-4" style={{ display: showCoursePlan ? 'block' : 'none' }} onClick={handleEnrollCoursePlan}>Enroll Course Plan</Button>
                        </Container>
                        <div className='text-center my-5'>
                            <Link to={`/student/${studentId}/courses`}>
                                <Button variant='dark' className='px-5 rounded-pill fs-4 me-5' onClick={handleClick}>Customize Course Plan</Button>
                            </Link>
                            <Link to={`/student/${studentId}/custom-courses`}>
                                <Button variant='warning' className='px-5 rounded-pill fs-4' onClick={handleClick}>Go to Course Cart</Button>
                            </Link>
                        </div>
                    </>
                )}
            </Stack >
            <ConfirmationDialog
                show={showConfirmationDialog}
                message="Are you certain you wish to withdraw from this Course Plan? Charges have already been applied, and any work or progress made will not be saved."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div >
    )
}

export default StudentPage