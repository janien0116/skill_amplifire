import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import AddCourse from '../../components/AddCourse'
import { useParams } from 'react-router-dom';

const InstructorPage = () => {
    const {instructorId} = useParams();

    const [instructor, setInstructor] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('teacherToken'));

    useEffect(() => {
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get(`http://127.0.0.1:5000/api/instructors/${instructorId}`, requestOptions)
            .then(response => setInstructor(response.data))
            .catch(error => console.error(error));
    }, []);
    return (
        <div className='page'>
            <Container className='d-flex flex-column justify-content-center align-items-center text-center my-5'>
                <p class="display-6 w-75">Congratulations {instructor.instructorName}! You can now share your expertise to the world.</p>
                <p class="fs-2 w-75 my-5 text-green">Begin earning by adding a course now! Earn badges to enhance your visibility and attract students.</p>
            </Container>
            <Container className='mt-5 mb-3' id="instructor-tab">
                <AddCourse />
            </Container>
        </div>
    )
}

export default InstructorPage