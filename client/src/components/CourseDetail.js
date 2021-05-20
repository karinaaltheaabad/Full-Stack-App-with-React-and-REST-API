import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const CourseDetail = ({ context }) => {
    
    const { id } = useParams();
    const [course, setCourse] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {        
        context.data.getCourse(id)
            .then(response => {
                setCourse(response);
            })
            .catch(error => console.log('Error fetching and parsing data', error))
            .finally(() => setIsLoading(false));
    }, [context.data, id])

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                    <Link to='/' className="button">Delete Course</Link>
                    <Link to='/' className="button button-secondary">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                {
                    isLoading
                    ? <p>Loading...</p>
                    : <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By {course.User.firstName} {course.User.lastName}</p>
                                <p>{course.description}</p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                {
                                    course.materialsNeeded !== null && 
                                    <ul className="course--detail--list">
                                        {
                                            course.materialsNeeded.split('*').map((material,i) => {
                                                if (material !== '') {
                                                    return(
                                                        <li key={i}>{material}</li>
                                                    )
                                                } 
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                    </form>
                }
            </div>
        </main>
    )
}

export default CourseDetail;