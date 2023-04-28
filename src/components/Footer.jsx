import React from 'react';
import { logo } from '../assets/index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from 'react-bootstrap';

const Footer = () => {
    return (
        <div id='footer'>
            <Container>
                <Row className='pt-5'>
                    <Col>
                        <img src={logo} alt="Logo" width="200" />
                    </Col>
                    <Col>
                        <p className='mb-4 fs-5 fw-bold'>Company</p>
                        <p>About</p>
                        <p>Courses</p>
                        <p>Instructors</p>
                        <p>Testimonials</p>
                        <p>FAQ</p>
                        <p>Contact Us</p>
                    </Col>
                    <Col>
                        <p className='mb-4 fs-5 fw-bold'>Community</p>
                        <p>Forums</p>
                        <p>Blogs</p>
                        <p>Become an Instructor</p>
                        <p>Testimonials</p>
                    </Col>
                    <Col>
                        <p className='mb-4 fs-5 fw-bold'>Socials</p>
                        <p className='display-5'>
                            <Stack direction="horizontal" gap={3}>
                                <i class="bi bi-facebook" style={{ color: '#1877f2' }}></i>
                                <i class="bi bi-twitter" style={{ color: '#1DA1F2' }}></i>
                                <i class="bi bi-instagram" style={{ color: '#C94793' }}></i>
                                <i class="bi bi-linkedin" style={{ color: '#0A66C2' }}></i>
                            </Stack>
                        </p>
                    </Col>
                </Row>
                <div className='pt-1' style={{ borderTop: '1px solid #ccc' }}>
                    <Stack direction="horizontal" gap={3}>
                        <p>&copy; 2023 Skill Amplifire. All rights reserved.</p>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </Stack>
                </div>
            </Container>
        </div>
    )
}

export default Footer