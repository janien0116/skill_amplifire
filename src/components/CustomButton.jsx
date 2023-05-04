import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ErrorHandlingModalContext from '../contexts/ErrorHandlingModalContext';

const CustomButton = ({ course }) => {
  const { studentId } = useParams();

  const { showErrorHandlingMessage } = useContext(ErrorHandlingModalContext);

  const [isLoading, setLoading] = useState(false);
  const [isAdded, setAdded] = useState(false);
  const [storedToken, setStoredToken] = useState(localStorage.getItem('token'));

  const handleAddtoCourseCart = () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/students/${studentId}/courses`;

    const requestOptions = {
      studentId: studentId,
      courseTitle: course.title,
      instructorName: course.instructorName,
      curriculum: course.curriculum,
      category: course.category,
      level: course.level,
      amount: course.amount,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    };

    axios.post(url, requestOptions, config)
      .then(() => {
        setAdded(true);
      })
      .catch((error) => {
        setLoading(false);
        showErrorHandlingMessage(error.response.data.msg);
      });
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading || isAdded}
      onClick={!isLoading && !isAdded ? handleAddtoCourseCart : null}
    >
      {isAdded ? 'Course Added' : isLoading ? 'Loading…' : 'Add to Custom'}
    </Button>
  );
}


export default CustomButton;
