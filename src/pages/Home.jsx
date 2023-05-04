import React, { useContext, useEffect, useState } from 'react'
import heroImage from '../assets/images/hero-image.png';
import teacherOne from '../assets/images/alex.jpg';
import teacherThree from '../assets/images/mosh.jpg';
import teacherFour from '../assets/images/kenjee.jpg';
import { Accordion, Button, Card, Col, Container, Figure, ListGroup, Row, Stack, Image } from 'react-bootstrap';
import { courseThumbnail, logoSymbol } from '../assets';
import SignUpModalContext from '../contexts/SignUpModalContext';
import CurriculumCarousel from '../components/CurriculumCarousel';
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const { setShowSignup } = useContext(SignUpModalContext);
    const { setShowTeacherSignup } = useContext(SignUpModalContext);
    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext)
    const [featuredCourses, setFeaturedCourses] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}`)
            .then(response => {
                const sortedCourses = response.data.sort((a, b) => b.averageRating - a.averageRating);
                const featured = sortedCourses.slice(0, 6);
                setFeaturedCourses(featured);
            })
            .catch((error) => showErrorHandlingMessage(error.response.data.msg));
    }, []);

    const handleEnrollClick = () => setShowSignup(true);
    const handleClick = () => window.scrollTo(0, 0);
    const handleShowTeacherSignup = () => setShowTeacherSignup(true);

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
        <div className='page'>
            <Container className='pt-3'>
                <Container className="text-center mt-5" id="hero-section">
                    <p className="display-5">Unleash Your Potential</p>
                    <p className="display-5">with Our Dynamic Curriculums</p>
                    <p className="fs-5">Our academy provides top-notch training for freelancers, job hunters, and career mastery seekers. Choose from our curated curriculums and individual courses to take your career to new heights.</p>
                    <Button variant='primary' className="px-5 rounded-pill fs-4" onClick={handleEnrollClick}>Enroll Now</Button>
                    <img src={heroImage} alt='Hero' className="img-fluid mb-5" />
                </Container>
                <Container className="text-center" id="main">
                    <Stack direction='vertical' gap={5}>
                        <p class="display-6 mt-5">Why Choose Skill Amplifire?</p>
                        <div className='d-flex'>
                            <ListGroup className='fs-5 text-start w-75' id='benefits-list'>
                                <Stack direction='vertical' gap={3}>
                                    <Stack direction='horizontal' className='position-relative'>
                                        <div className='icon-container'><i className="bi bi-fire"></i></div>
                                        <ListGroup.Item variant="danger" className='ms-5'>Learn at your own pace, on your own time.</ListGroup.Item>
                                    </Stack>
                                    <Stack direction='horizontal' className='position-relative'>
                                        <div className='icon-container'><i className="bi bi-fire"></i></div>
                                        <ListGroup.Item variant="info" className='ms-5'>Get lifetime access to course materials and updates.</ListGroup.Item>
                                    </Stack>
                                    <Stack direction='horizontal' className='position-relative'>
                                        <div className='icon-container'><i className="bi bi-fire"></i></div>
                                        <ListGroup.Item variant="primary" className='ms-5'>Access a wide variety of courses to enhance your career potential.</ListGroup.Item>
                                    </Stack>
                                    <Stack direction='horizontal' className='position-relative'>
                                        <div className='icon-container'><i className="bi bi-fire"></i></div>
                                        <ListGroup.Item variant="dark" className='ms-5'>Receive certifications upon completion of each course or curriculum.</ListGroup.Item>
                                    </Stack>
                                    <Stack direction='horizontal' className='position-relative'>
                                        <div className='icon-container'><i className="bi bi-fire"></i></div>
                                        <ListGroup.Item variant="light" className='ms-5'>Advance your skills and stay up-to-date with industry trends and best practices.</ListGroup.Item>
                                    </Stack>
                                    <Stack direction='horizontal' className='position-relative'>
                                        <div className='icon-container'><i className="bi bi-fire"></i></div>
                                        <ListGroup.Item variant="secondary" className='ms-5'>Customize your learning path with curated curriculums based on your interests.</ListGroup.Item>
                                    </Stack>
                                </Stack>
                            </ListGroup>
                            <Col lg={4} className='d-flex align-items-center'>
                                <Image src={logoSymbol} fluid width={420} alt="Benefits Section" className='rounded-3 ms-4' />
                            </Col>
                        </div>
                        <div className="mt-5 d-flex flex-column align-items-center" id="curriculum-section">
                            <p className="display-6 mt-5">Choose from our Comprehensive Curriculums</p>
                            <p className='fs-5 mb-5'>Unlock Your Full Potential with Our Comprehensive Curriculums - Designed to Take You from Beginner to Expert in Your Chosen Field!</p>
                            <div id='home-carousel'>
                                <CurriculumCarousel />
                            </div>
                        </div>
                        <div className="my-5" id="courses-section">
                            <p className="display-6">Featured Courses</p>
                            <p className="fs-5 mb-5">Check out our top-rated featured courses, based on the reviews and feedback of our students.</p>
                            <Stack direction='vertical' gap={4}>
                                {featuredCourses.reduce((resultArray, item, index) => {
                                    const totalRows = Math.floor(index / 3)

                                    if (!resultArray[totalRows]) {
                                        resultArray[totalRows] = []
                                    }
                                    resultArray[totalRows].push(
                                        <Col key={index}>
                                            <Card>
                                                <Card.Img variant="top" src={courseThumbnail} />
                                                <Card.Body>
                                                    <Card.Title className='fw-bold'>{item.title}</Card.Title>
                                                    <Card.Text>
                                                        <div className="d-flex justify-content-between">
                                                            <p className='fs-5'>{item.instructorName}</p>
                                                            <p>{renderRatingStars(item.averageRating)}</p>
                                                        </div>
                                                        <p className='fs-5'>${item.amount}</p>
                                                    </Card.Text>
                                                    <div className="d-flex justify-content-center">
                                                        <Button variant="primary" className='fs-5 rounded-pill py-2 px-4' onClick={handleEnrollClick}>Buy Course</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )

                                    return resultArray
                                }, []).map((threeCol) => (
                                    <Stack direction='horizontal' gap={5}>
                                        {threeCol}
                                    </Stack>
                                ))}
                                <div className="justify-content-center mb-5">
                                    <Link to={"/courses"} onClick={handleClick}><Button variant='primary' className='px-5 rounded-pill fs-4 w-50'>Browse Courses</Button></Link>
                                </div>
                            </Stack>
                        </div>
                        <Container className='my-5' id="instructor-section">
                            <Stack direction='vertical' gap={4}>
                                <div>
                                    <p className="display-5">Become an Instructor</p>
                                    <p className="fs-5 mb-5">Join our team of experts and share your knowledge with the world.</p>
                                </div>
                                <Row className='justify-content-center mb-5'>
                                    <Col>
                                        <img src={teacherOne} alt='Alex Cattoni' className='img-fluid rounded-pill mb-2' width="300" />
                                        <p className="fs-2 lh-1">Alex Cattoni</p>
                                        <p className="fs-5 lh-1">Marketing Expert</p>
                                    </Col>
                                    <Col>
                                        <img src={teacherThree} alt='Mosh Hamedani' className='img-fluid rounded-pill mb-2' width="300" />
                                        <p className="fs-2 lh-1">Mosh Hamedani</p>
                                        <p className="fs-5 lh-1">Senior Web Developer</p>
                                    </Col>
                                    <Col>
                                        <img src={teacherFour} alt='Ken Jee' className='img-fluid rounded-pill mb-2' width="300" />
                                        <p className="fs-2 lh-1">Ken Jee</p>
                                        <p className="fs-5 lh-1">Data Scientist</p>
                                    </Col>
                                    <p className="mt-5 fs-5">Share your expertise with the world through our instructor program. Create and upload courses to reach students globally.</p>
                                    <Button variant='primary' className="px-5 rounded-pill fs-4 w-25" onClick={handleShowTeacherSignup}>Apply Now</Button>
                                </Row>
                            </Stack>
                        </Container>
                        <Container className="my-5" id="testimonial-section">
                            <Stack direction='vertical' gap={5} className='d-flex flex-column justify-content-center align-items-center'>
                                <p className="display-6 mb-5">What Our Students Are Saying</p>
                                <Figure className='w-75'>
                                    <blockquote className="blockquote">
                                        <p>"I've always wanted to pursue a career in web development but didn't know where to start. Skill Amplifire has been a game-changer for me. The curriculum was well-organized, the instructors were knowledgeable, and the community was supportive. Thanks to Skill Amplifier, I landed my first freelance project and I'm now on my way to building a successful career in web development."</p>
                                    </blockquote>
                                    <Figure.Caption className="blockquote-footer fs-4 text-black">
                                        Alice Parker <cite title="Source Title">Aspiring Feelancer</cite>
                                    </Figure.Caption>
                                </Figure>
                                <Figure className='w-75'>
                                    <blockquote className="blockquote">
                                        <p>"I initially signed up for a single course on data analytics, but I was so impressed with the quality of the course and the support I received from the Skill Amplifier team that I ended up enrolling in several more courses. The curriculum is relevant and up-to-date, the instructors are engaging and approachable, and the platform is user-friendly. I highly recommend Skill Amplifier to anyone looking to upskill or pursue a new career."</p>
                                    </blockquote>
                                    <Figure.Caption className="blockquote-footer fs-4 text-black">
                                        Jackson Lee <cite title="Source Title">Data Analyst</cite>
                                    </Figure.Caption>
                                </Figure>
                            </Stack>
                        </Container>
                        <Container className="my-5 w-75">
                            <p className="display-6 mb-5">Frequently Asked Questions</p>
                            <Accordion flush className='fs-5'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>What courses do you offer?</Accordion.Header>
                                    <Accordion.Body>
                                        We offer a wide range of courses in fields such as web development, design, data analytics, and more. Check out our course catalog for more information.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>How much do your courses cost?</Accordion.Header>
                                    <Accordion.Body>
                                        Our courses vary in price depending on the length and depth of the content. We strive to offer affordable options for all learners. Check the course pages for pricing information.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Can I access course materials after I complete the course?</Accordion.Header>
                                    <Accordion.Body>
                                        Yes! Once you enroll in a course, you will have lifetime access to the course materials and updates.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>What payment methods do you accept?</Accordion.Header>
                                    <Accordion.Body>
                                        We accept a variety of payment methods, including major credit cards and PayPal.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Do you offer certificates of completion?</Accordion.Header>
                                    <Accordion.Body>
                                        Yes, we offer certificates of completion for most courses. Check the course page for more information.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>How do I get started?</Accordion.Header>
                                    <Accordion.Body>
                                        Head over to our curriculums or courses catalog and find a course that interests you. From there, you can enroll and start learning!
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Container>
                    </Stack>
                </Container>
            </Container>
        </div>
    )
}

export default Home