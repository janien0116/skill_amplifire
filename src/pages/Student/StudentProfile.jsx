import React from 'react'
import StudentNavbar from '../../components/StudentNavbar'
import { Button, Col, Container, Form, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { studentPlaceholder } from '../../assets'

const StudentProfile = () => {
    return (
        <div className='page'>
            <Container className='my-5'>
                <Stack direction='vertical' gap={5}>
                    <div className='d-flex justify-content-between p-0'>
                        <p className='fs-2'>Your Profile</p>
                        <Button className='fs-6' id='edit-profile'>Edit Profile</Button>
                    </div>
                    <Row>
                        <Col lg={3} className='bg-light p-4 text-center rounded'>
                            <img src={studentPlaceholder} alt="Student Profile" className='img-fluid' />
                            <p className='fs-4'>Student Name</p>
                            <p><i>Add Bio</i></p>
                            <Button className='fs-6'>Link Portfolio Website</Button>
                            <div className='d-flex justify-content-between my-3'>
                                <div className='d-flex flex-column'>
                                    <p className='display-4 mb-0'><i class="bi bi-people"></i></p>
                                    <p>Following</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p className='display-4 mb-0'><i class="bi bi-person-hearts" style={{ color: '#1877f2' }}></i></p>
                                    <p>Followers</p>
                                </div>
                            </div>
                            <p className='fs-5'>Projects</p>
                            <div className='d-flex justify-content-between display-6 mb-5'>
                                <p><i class="bi bi-clipboard2-check-fill" style={{ color: 'teal' }}></i></p>
                                <p>0</p>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div id='div-student-tab'>
                                <Tabs
                                    defaultActiveKey="about"
                                    id="student-tab"
                                    className="mb-3"
                                    fill
                                >
                                    <Tab eventKey="about" title="About Me">
                                        <Form className='p-5'>
                                            <Form.Group className="mb-3" controlId="formDescription">
                                                <Form.Label className='fs-5'>Tell me something about yourself</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="Add description"
                                                    style={{ height: '100px' }}
                                                />
                                                <Form.Text className="text-muted">
                                                    Elaborate to attract future employers
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formSkills">
                                                <Form.Label className='fs-5'>Add your skills</Form.Label>
                                                <Form.Control type="text" placeholder="Enter a skill to add" />
                                                <Form.Text className="text-muted">
                                                    Share some skills you are good at.
                                                </Form.Text>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className='fs-5 px-3'>Save Changes</Button>
                                        </Form>
                                        <Button variant='info' className='fs-5 ms-5 px-3'>View Projects</Button>
                                    </Tab>
                                    <Tab eventKey="achievements" title="My Achievements">
                                        <Stack direction='vertical' gap={4} className='p-5'>
                                            <div>
                                                <p className='fs-4'>Course Certifications</p>
                                                <p>Earn a certificate by completing a Course or Course Plan</p>
                                            </div>
                                            <div id="no-certificate">
                                                <p>No certificate to preview</p>
                                                <Button>Enroll in a Course Plan</Button>
                                            </div>
                                            <div id="yes-certificate">
                                                <p className='fs-4'>Available Certifications</p>
                                                <Stack direction='horizontal' gap={3}>
                                                    <div className='video-lesson' id="certificate1">
                                                    </div>
                                                    <div className='video-lesson' id="certificate2">
                                                    </div>
                                                    <div className='video-lesson' id="certificate3">
                                                    </div>
                                                </Stack>
                                            </div>
                                            <Button className='w-25'>Download Certificate/s</Button>
                                        </Stack>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Stack>
            </Container>
            <div className="col">

            </div>
        </div>
    )
}

export default StudentProfile