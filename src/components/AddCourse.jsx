import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Col, Nav, Row, Tab, Form, Button, Stack } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';

const AddCourse = () => {
    const data = require("../assets/curriculums.json");
    const curriculums = data;

    const { instructorId } = useParams();

    const navigate = useNavigate();

    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext);

    const [thumbnail, setThumbnail] = useState(null);
    const [courseTitle, setCourseTitle] = useState("");
    const [description, setDescription] = useState("");
    const [curriculum, setCurriculum] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [outputDescription, setOutputDescription] = useState("");
    const [outputLinks, setOutputLinks] = useState([]);
    const [amount, setAmount] = useState(0);
    const [teacherToken, setTeacherToken] = useState(localStorage.getItem('teacherToken'))


    const handleUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setThumbnail(selectedFile);
        } else {
            alert('Please select an image file');
        }
    }

    const handleDelete = () => {
        setThumbnail(null);
    }

    const handleInputLinksChange = (event, index) => {
        const { value } = event.target;
        const updatedOutputLinks = [...outputLinks];
        updatedOutputLinks[index] = value;
        setOutputLinks(updatedOutputLinks);
    };

    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("instructorId", instructorId);
        formData.append("videoThumbnail", thumbnail);
        formData.append("title", courseTitle);
        formData.append("description", description);
        formData.append("curriculum", curriculum);
        formData.append("category", category);
        formData.append("level", level);
        formData.append("outputDescription", outputDescription);
        outputLinks.forEach((link) => formData.append("outputLink", link));
        formData.append("amount", amount);

        const config = {
            headers: {
                Authorization: `Bearer ${teacherToken}`,
                "Content-Type": "multipart/form-data",
            },
        };

        const url = `http://127.0.0.1:5000/api/instructors/${instructorId}`;

        try {
            const response = await axios.post(url, formData, config);
            const data = response.data;
            showErrorHandlingMessage(data.msg)
            navigate(`/instructor/${instructorId}/analytics`)
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg)
        }
    };


    return (
        <div>
            <Tab.Container defaultActiveKey="first">
                <Row>
                    <Col sm={3} className='instructor-sidetab'>
                        <Nav variant="pills" className="flex-column">
                            <p className='fs-4 mt-3 ms-2'>Add a course</p>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className='fs-5'>Video Lesson</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className='fs-5'>Course Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className='fs-5'>Set Outputs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth" className='fs-5'>Publish Course</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} className='px-5'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <p className='fs-2'>Video Lesson</p>
                                <div className='fs-6'>
                                    <p><i className="bi bi-fire me-3"></i>Ensure that you provide a minimum of 20 minutes of video content and a total of at least three pieces.</p>
                                    <p><i className="bi bi-fire me-3"></i>Provide a separate introductory video that gives an overview of the course.</p>
                                    <p><i className="bi bi-fire me-3"></i>Adhere to our standards for high-quality audio and video production.</p>
                                    <p><i className="bi bi-fire me-3"></i>Restrict self-promotion to only the first and last video lessons.</p>
                                </div>
                                <Button className='px-5 fs-5 my-5'>
                                    <label htmlFor="fileInput">Upload Video Lesson</label>
                                    <input id="fileInput" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                                </Button>
                                <Stack direction='vertical' gap={3}>
                                    {thumbnail && (
                                        <div className='video-lesson'>
                                            <span>{thumbnail.name.split('/').pop()}</span>
                                            <Button variant="warning" onClick={handleDelete}><i className="bi bi-trash3"></i></Button>
                                        </div>
                                    )}
                                </Stack>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <p className='fs-2'>Course Details</p>
                                <p>To help students discover your class on our platform and comprehend what they will learn, what they will require, and what to expect, include comprehensive class details. Please note that all components in this section are mandatory.</p>
                                <p className='fs-4'>Course Title</p>
                                <Form.Control type="text" placeholder="Keep your title between 30 and 70 characters" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} /><br />
                                <p className='fs-4'>Course Description</p>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                                <Form.Select aria-label="Select Curriculum" className='fs-5 fw-bold' value={curriculum} onChange={(e) => {
                                    setCurriculum(e.target.value);
                                    setCategory("");
                                }}>
                                    <option value="">Choose Curriculum</option>
                                    {curriculums.map((curriculum) => (
                                        <option key={curriculum.value} value={curriculum.value}>{curriculum.label}</option>
                                    ))}
                                </Form.Select><br />
                                <Stack direction='horizontal' gap={5}>
                                    <Form.Select aria-label="Select Category" className='fs-5 fw-bold' value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Course Category</option>
                                        {curriculums.find((c) => c.value === curriculum)?.categories.map((category) => (
                                            <option key={category.value} value={category.value}>{category.label}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Select aria-label="Select Level" className='fs-5 fw-bold' value={level} onChange={(e) => setLevel(e.target.value)}>
                                        <option value="">Choose Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </Stack>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <p className='fs-2'>Set Outputs</p>
                                <p>By specifying output details for students, you can guarantee that they have truly grasped the material and are well-equipped to obtain certification.</p>
                                <p className='fs-4'>Project Description</p>
                                <Form.Control as="textarea" rows={3} value={outputDescription} onChange={(e) => setOutputDescription(e.target.value)} /><br />
                                <p className='fs-4'>Assessment Link 1</p>
                                <Form.Control type="text" placeholder="Add website link for some assessments you prefer" onChange={(event) => handleInputLinksChange(event, 0)} /><br />
                                <br />
                                <p className='fs-4'>Assessment Link 2</p>
                                <p>Add additional assessment links if you have more</p>
                                <Form.Control type="text" placeholder="Add website link for more assessments" onChange={(event) => handleInputLinksChange(event, 1)} /><br />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <p className='fs-2'>Publish Your Course</p>
                                <p>By specifying output details for students, you can guarantee that they have truly grasped the material and are well-equipped to obtain certification.</p>
                                <Form.Label className='fs-4 mt-5'>Set Amount</Form.Label>
                                <Form.Control type="text" className='w-25' placeholder="Enter the amount" value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
                                <div className="text-center">
                                    <Button variant='primary' type="submit" className='rounded-pill px-5 fs-4 mb-5' onClick={handleSubmitCourse}>Publish Course</Button>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default AddCourse