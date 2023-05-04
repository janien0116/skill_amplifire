import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Container, Col, Card, Row, Stack, Placeholder } from 'react-bootstrap'
import { courseThumbnail } from '../assets'
import EnrollCurriculumContext from '../contexts/EnrollCurriculumContext';
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';
import axios from 'axios';
import CustomButton from './CustomButton';

const Curriculums = () => {
    const { showContainer, setShowContainer } = useContext(EnrollCurriculumContext);
    const { showCoursePlan, setShowCoursePlan } = useContext(EnrollCurriculumContext);
    const { curriculum, setCurriculum } = useContext(EnrollCurriculumContext);
    const { coursePlanPrice, setCoursePlanPrice } = useContext(EnrollCurriculumContext);
    const { courseSets, setCourseSets } = useContext(EnrollCurriculumContext);
    const { isLoading, setIsLoading } = useContext(EnrollCurriculumContext);
    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext)

    const [categories, setCategories] = useState([]);
    const [beginnerLevel, setBeginnerLevel] = useState({});
    const [intermediateLevel, setIntermediateLevel] = useState({});
    const [advancedLevel, setAdvancedLevel] = useState({});
    const [courses, setCourses] = useState([]);


    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}`, { signal: controller.signal },)
            .then(response => {
                const sortedCourses = response.data.sort((a, b) => b.averageRating - a.averageRating);
                setCourses(sortedCourses);
                setIsLoading(false);
            })
            .catch((error) => showErrorHandlingMessage(error.response.data.msg));

        return () => {
            controller.abort();
        };
    }, []);

    const generateCoursePlan = (e) => {
        setShowContainer(false);
        setShowCoursePlan(true)

        const curriculumFilter = e.target.innerText;

        const filteredCurriculumData = courses.filter((course) => {
            return course.curriculum === curriculumFilter;
        });

        const groupedByCategory = {};
        filteredCurriculumData.forEach((curriculum) => {
            const category = curriculum.category;
            if (!groupedByCategory[category]) {
                groupedByCategory[category] = [];
            }
            groupedByCategory[category].push(curriculum);
        });

        const filteredCategories = Object.keys(groupedByCategory).map((category) => {
            return {
                category: category,
                beginnerLevel: groupedByCategory[category].find((curriculum) => curriculum.level === 'Beginner'),
                intermediateLevel: groupedByCategory[category].find((curriculum) => curriculum.level === 'Intermediate'),
                advancedLevel: groupedByCategory[category].find((curriculum) => curriculum.level === 'Advanced'),
            };
        });

        const courseSets = filteredCategories.map((category) => {
            return {
                [category.category]: [
                    category.beginnerLevel?.title,
                    category.intermediateLevel?.title,
                    category.advancedLevel?.title,
                ],
            };
        });

        const beginnerCourses = {};
        const intermediateCourses = {};
        const advancedCourses = {};

        let totalPrice = 0;

        filteredCategories.forEach((category) => {
            beginnerCourses[category.category] = category.beginnerLevel;
            intermediateCourses[category.category] = category.intermediateLevel;
            advancedCourses[category.category] = category.advancedLevel;

            if (category.beginnerLevel) {
                totalPrice += parseFloat(category.beginnerLevel.amount);
            }
            if (category.intermediateLevel) {
                totalPrice += parseFloat(category.intermediateLevel.amount);
            }
            if (category.advancedLevel) {
                totalPrice += parseFloat(category.advancedLevel.amount);
            }
        });

        setCurriculum(curriculumFilter);
        setCategories(filteredCategories);
        setBeginnerLevel(beginnerCourses);
        setIntermediateLevel(intermediateCourses);
        setAdvancedLevel(advancedCourses);
        setCoursePlanPrice((totalPrice * 0.8).toFixed(2));
        setCourseSets(filteredCategories);
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

    return (
        <div>
            <p className='fs-2 text-center mb-5'>Create Course Plan by Choosing a Curriculum</p>
            <Container className="d-flex justify-content-center flex-wrap mb-3">
                <Button variant='color1' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Front End Web Development</Button>
                <Button variant='color2' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Back End Web Development</Button>
                <Button variant='color3' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>UI / UX Web Design</Button>
                <Button variant='primary' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Content Creation</Button>
                <Button variant='info' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Data Analytics</Button>
                <Button variant='color4' className="text-white fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Social Media Marketing</Button>
                <Button variant='color5' className="text-white fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Graphic Design in General</Button>
                <Button variant='light' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Mobile Game Development</Button>
                <Button variant='color6' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Bookkeeping</Button>
                <Button variant='color7' className="text-white fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Responsive Web Design</Button>
                <Button variant='danger' className="text-white fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Machine Learning</Button>
                <Button variant='warning' className="fs-5 rounded-pill py-2 px-4 me-2 mb-3" onClick={(e) => generateCoursePlan(e)}>Relational Database</Button>
            </Container>

            <Container className='mt-5'>
                <Container style={{ display: showContainer ? 'block' : 'none' }}>
                    <div className="d-flex justify-content-center align-items-center mb-5" id='no-curriculum'>
                        <p className="fs-4">Choose desired curriculum to generate course plan</p>
                    </div>
                </Container>
                <Container>
                    {isLoading ? (
                        <Stack direction='vertical' gap={3} style={{ display: showCoursePlan ? 'block' : 'none' }}>
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
                        <Stack direction="vertical" gap={4} style={{ display: showCoursePlan ? 'block' : 'none' }}>
                            {categories.map((category) => (
                                <Row className="mb-4" key={category.category}>
                                    <p className='display-6'>{curriculum}</p>
                                    <p className="fs-2">{category.category}</p>
                                    <Stack direction="horizontal" gap={5}>
                                        <Col>
                                            {category.beginnerLevel?.title && (
                                                <Card className="p-1">
                                                    <Card.Img variant="top" src={courseThumbnail} />
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="fs-6 mb-0 fw-bold">{category.beginnerLevel.title}</p>
                                                            <p className="fs-6 mb-0">{category.beginnerLevel.level}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="fs-6 fw-bold">{category.beginnerLevel.instructorName}</p>
                                                            <p>{renderRatingStars(category.beginnerLevel.averageRating)}</p>
                                                        </div>
                                                    </Card.Body>
                                                    <CustomButton course={category.beginnerLevel} />
                                                </Card>
                                            )}
                                        </Col>
                                        <Col>
                                            {category.intermediateLevel?.title && (
                                                <Card className="p-1">
                                                    <Card.Img variant="top" src={courseThumbnail} />
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="fs-6 fw-bold">{category.intermediateLevel.title}</p>
                                                            <p className="fs-6">{category.intermediateLevel.level}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="fs-6 fw-bold">{category.intermediateLevel.instructorName}</p>
                                                            <p>{renderRatingStars(category.intermediateLevel.averageRating)}</p>
                                                        </div>
                                                    </Card.Body>
                                                    <CustomButton course={category.intermediateLevel} />
                                                </Card>
                                            )}
                                        </Col>
                                        <Col>
                                            {category.advancedLevel?.title && (
                                                <Card className="p-1">
                                                    <Card.Img variant="top" src={courseThumbnail} />
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="fs-6 fw-bold">{category.advancedLevel.title}</p>
                                                            <p className="fs-6">{category.advancedLevel.level}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="fs-6 fw-bold">{category.advancedLevel.instructorName}</p>
                                                            <p>{renderRatingStars(category.advancedLevel.averageRating)}</p>
                                                        </div>
                                                    </Card.Body>
                                                    <CustomButton course={category.advancedLevel} />
                                                </Card>
                                            )}
                                        </Col>
                                    </Stack>
                                </Row>
                            ))
                            }
                            <div className='text-center'>
                                <p className='fs-4 mt-3'>Course Plan Price: ${coursePlanPrice}</p>
                            </div>
                        </Stack>
                    )}
                </Container>
            </Container>
        </div >
    )
}

export default Curriculums