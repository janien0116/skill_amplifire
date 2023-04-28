import React, { useEffect, useState, useContext } from 'react'
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler, ArcElement, BarElement } from 'chart.js';
import InstructorNavbar from '../../components/InstructorNavbar'
import AnalyticsSidebar from '../../components/AnalyticsSidebar'
import { Tab, Row, Col, Button, Form, Container, Card, Stack } from 'react-bootstrap'
import AddCourse from '../../components/AddCourse'
import { courseThumbnail } from '../../assets';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ErrorHandlingModalContext from '../../contexts/ErrorHandlingModalContext';
import ConfirmationDialog from '../../components/ConfirmDialog';

ChartJS.register(
    Title, Tooltip, LineElement, BarElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler, ArcElement
)

const InstructorAnalytics = () => {
    const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext)

    const [courses, setCourses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [revenueAmount, setRevenueAmount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('teacherToken'));
    const [instructorId, setInstructorId] = useState(localStorage.getItem('instructorId'));
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const [enrolledStudents, setEnrolledStudents] = useState({
        labels: [],
        datasets: [
            {
                label: "Monthly Enrollment Statistics",
                data: [],
                backgroundColor: '#548ED6',
                borderColor: '#C94793',
                tension: 0.4,
                fill: true,
                pointStyle: 'rect',
                pointBorderColor: 'blue',
                pointBackgroundColor: '#fff',
                showLine: true
            }
        ]
    });
    const [revenueDetails, setRevenueDetails] = useState({
        labels: [],
        datasets: [{
            label: 'Top 3 Courses',
            data: [],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    });
    const [totalRatings, setTotalRatings] = useState({
        labels: [],
        datasets: [{
            label: 'My Ratings',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(201, 203, 207, 1)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            indexAxis: 'y'
        }]
    });
    useEffect(() => {
        fetchCourses();
        fetchProjects();
        fetchEnrolledStudents();
        fetchRevenue();
        fetchTotalRatings();
    }, []);
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/instructors/${instructorId}/courses`, requestOptions);
            setCourses(response.data);
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg)
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/instructors/${instructorId}/outputs`, requestOptions);
            setProjects(response.data);
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg)
        }
    }

    const fetchEnrolledStudents = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/instructors/${instructorId}/enrolled`, requestOptions);
            const data = response.data;

            const labels = data.map(item => `${item.month}/${item.year}`);
            const counts = data.map(item => item.count);

            setEnrolledStudents({
                labels: labels,
                datasets: [
                    {
                        label: "Monthly Enrollment Statistics",
                        data: counts,
                        backgroundColor: '#548ED6',
                        borderColor: '#000',
                        tension: 0.4,
                        fill: true,
                        pointStyle: 'rect',
                        pointBorderColor: 'blue',
                        pointBackgroundColor: '#fff',
                        showLine: true
                    }
                ]
            });
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg)
        }
    }

    const fetchRevenue = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/instructors/${instructorId}/revenue`, requestOptions);
            const data = response.data[0];

            const labels = data.courses.map(item => item.courseTitle);
            const counts = data.courses.map(item => parseFloat(item.totalRevenue).toFixed(2));
            const revenue = data.totalRevenue;

            setRevenueAmount(parseFloat(revenue).toFixed(2));

            setRevenueDetails({
                labels: labels,
                datasets: [{
                    label: 'My Revenue',
                    data: counts,
                    backgroundColor: [
                        '#C564DE',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                    ],
                    hoverOffset: 4
                }]
            });
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg)
        }
    }
    const fetchTotalRatings = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/instructors/${instructorId}/ratings`, requestOptions);
            const data = response.data;

            const labels = data.map(item => item.rating);
            const counts = data.map(item => item.count);

            setTotalRatings({
                labels: labels,
                datasets: [{
                    label: 'My Ratings',
                    data: counts,
                    backgroundColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                    indexAxis: 'y'
                }]
            });
        } catch (error) {
            showErrorHandlingMessage(error.response.data.msg)
        }
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

    const handleCourseDelete = () => {
        let url = `http://127.0.0.1:5000/api/instructors/${instructorId}/course`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.delete(url, config)
            .then((response) => {
                const data = response.data;
                showErrorHandlingMessage(data.msg);
            })
            .then(() => {
                fetchCourses();
            })
            .catch((error) => showErrorHandlingMessage(error.response.data.msg));
    }
    const handleConfirm = () => {
        handleCourseDelete();
        setShowConfirmationDialog(false);
    }
    const handleCancel = () => setShowConfirmationDialog(false);

    return (
        <div className='page'>
            <Tab.Container id='instructor-dashboard' defaultActiveKey="first">
                <Row>
                    <AnalyticsSidebar />
                    <Col sm={10} id='instructor-tabpane'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className='py-2'>
                                <div id='line-graph'>
                                    <p className='fs-4 pt-2'>Enrolled Students to My Class</p>
                                    <Line data={enrolledStudents} />
                                </div>
                                <Row>
                                    <Col>
                                        <p className='fs-4 my-3'>Revenue Details</p>
                                        <Row>
                                            <Col>
                                                <p className='fw-bold'>Your Top 3 Courses</p>
                                                <Doughnut data={revenueDetails} />
                                            </Col>
                                            <Col className='d-flex flex-column justify-content-center align-items-start'>
                                                <p className='fs-5 mb-0'>Total Earnings</p>
                                                <p className='fs-4 fw-bold text-green'>${revenueAmount}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p className='fs-4 my-3'>Students Feedback</p>
                                        <div>
                                            <Bar data={totalRatings} />
                                            <p className='text-center'>Number of students</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className='py-4 ps-2'>
                                <AddCourse />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third" className='py-4 px-3'>
                                <Stack direction='vertical' gap={3}>
                                    {courses.reduce((rows, course, index) => {
                                        const totalRows = Math.floor(index / 4)

                                        if (!rows[totalRows]) {
                                            rows[totalRows] = []
                                        }
                                        rows[totalRows].push(
                                            <Col key={index}>
                                                <Card className='instructor-course-card'>
                                                <Card.Img variant="top" fluid src={course.videoThumbnail ? `http://localhost:5000/${course.videoThumbnail}` : courseThumbnail} alt='Video Thumbnail' className='instructor-course-img'/>
                                                    <Card.Body>
                                                        <Card.Title>{course.title}</Card.Title>
                                                        <Card.Text>
                                                            <p>Average Rating: {renderRatingStars(course.averageRating)}</p>
                                                        </Card.Text>
                                                        <Button variant="primary" onClick={() => setShowConfirmationDialog(true)}>Delete Course</Button>
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
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth" className='py-4'>
                                <Container>
                                    <p className='fs-4'>Submitted Projects</p>
                                    <Stack direction='vertical' gap={4}>
                                        {projects.map(project => (
                                            <Container className='d-flex justify-content-between align-items-center fs-6 bg-white rounded py-2 px-3' style={{ alignItems: 'center' }}>
                                                <p className='m-0'>{project.courseTitle}</p>
                                                <p className='m-0'>By: {project.studentName}</p>
                                                <p className='m-0'>Output: <a href={`http://localhost:5000/${project.downloadLink.replace('uploads\\', '')}`} download>Download Output</a></p>
                                                <Button variant='success' className='px-4 py-2'>Grade</Button>
                                            </Container>
                                        ))}
                                    </Stack>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth" className='py-4'>

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <ConfirmationDialog
                show={showConfirmationDialog}
                message="Are you sure you want to delete this course permanently?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default InstructorAnalytics