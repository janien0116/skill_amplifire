import React, { useContext } from 'react'
import Curriculums from '../components/Curriculums'
import CurriculumCarousel from '../components/CurriculumCarousel';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignUpModalContext from '../contexts/SignUpModalContext';
import EnrollCurriculumContext from '../contexts/EnrollCurriculumContext';

const Curriculum = () => {
    const handleClick = () => window.scrollTo(0, 0);
    const { setShowSignup } = useContext(SignUpModalContext);
    const handleEnrollClick = () => setShowSignup(true);
    const { showCoursePlan, isLoading } = useContext(EnrollCurriculumContext);

    return (
        <Container className='pt-3 page'>
            <Container className="mb-5 text-center" id="curriculum-section">
                <p class="display-6 mt-5">Our Comprehensive Curriculums</p>
                <p class="fs-5 my-5 px-5">Discover the best courses in your field with our unique, data-driven approach to course plan creation. You can generate a course plan by choosing a curriculum.</p>
                <CurriculumCarousel />
            </Container>
            <Curriculums />
                <Container className="d-flex flex-column align-items-center text-center my-5">
                    <p className="fs-2 mt-5">Prefer to customize your learning experience?</p>
                    <p className="fs-5">Build your own curriculum by selecting individual courses that suit your needs. Click the button below to start browsing our course catalog and find the perfect fit for you.</p>
                    <Link to={"/courses"} onClick={handleClick}><Button className="btn btn-primary px-5 rounded-pill fs-5 my-3">Browse Courses</Button></Link>
                </Container >
        </Container >
    )
}

export default Curriculum