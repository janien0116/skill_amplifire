import React from 'react'
import { Button, Col, Container, Form, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { teacherPlaceholder } from '../../assets'

const InstructorProfile = () => {
    return (
        <div className='page'>
            <Container className='my-5'>
                <Stack direction='vertical' gap={5}>
                    <div className='d-flex justify-content-between p-0'>
                        <p className='fs-2'>Your Profile</p>
                        <Button variant="secondary" className='fs-6' id='edit-profile'>Edit Profile</Button>
                    </div>
                    <Row>
                        <Col lg={3} className='bg-light p-4 text-center rounded'>
                            <img src={teacherPlaceholder} alt="Student Profile" className='img-fluid' />
                            <p className='fs-4'>Instructor Name</p>
                            <p><i>Add Bio</i></p>
                            <Button variant="secondary" className='fs-6'>Link Portfolio Website</Button>
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
                            <p className='fs-5'>Badge</p>
                            <div className='d-flex justify-content-between mb-5'>
                                <p><i class="fs-1 bi bi-clipboard2-check-fill" style={{ color: 'teal' }}></i></p>
                                <p><i class="fs-1 bi bi-fire" style={{ color: 'tomato' }}></i></p>
                                <p><i class="fs-1 bi bi-shield-fill-check" style={{ color: 'darkblue' }}></i></p>
                                <p><i class="fs-1 bi bi-award-fill"></i></p>
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
                                                <Form.Label className='fs-5'>Add your keywords</Form.Label>
                                                <Form.Control type="text" placeholder="Enter keyword" />
                                                <Form.Text className="text-muted">
                                                    Put some keywords for students to easily find you
                                                </Form.Text>
                                            </Form.Group>
                                            <Button variant="secondary" type="submit" className='fs-5 px-3 mt-4'>Save Changes</Button>
                                        </Form>
                                    </Tab>
                                    <Tab eventKey="achievements" title="My Credibility">
                                        <Stack direction='vertical' gap={4} className='p-5'>
                                            <div>
                                                <p className='fs-4'>Add Credentials</p>
                                                <p>Upload your credentials to earn badges and to improve your Skill Amplifire's credibility</p>
                                            </div>
                                            <div id="no-certificate">
                                                <p>No credentials to preview</p>
                                                <Button variant="secondary"><i class="bi bi-filetype-pdf me-2"></i>Upload Credential</Button>
                                            </div>
                                            <div id="yes-certificate">
                                                <p className='fs-4'>My Credentials</p>
                                                <Stack direction='horizontal' gap={3}>
                                                    <div className='video-lesson' id="certificate1">
                                                        <Button variant="warning"><i class="bi bi-trash3"></i></Button>
                                                    </div>
                                                    <div className='video-lesson' id="certificate2">
                                                        <Button variant="warning"><i class="bi bi-trash3"></i></Button>
                                                    </div>
                                                    <div className='video-lesson' id="certificate3">
                                                        <Button variant="warning"><i class="bi bi-trash3"></i></Button>
                                                    </div>
                                                </Stack>
                                            </div>
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

export default InstructorProfile