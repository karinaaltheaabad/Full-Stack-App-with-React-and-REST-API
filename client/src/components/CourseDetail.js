import React, {useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory, useParams } from 'react-router-dom';

const CourseDetail = ({ context }) => {
    
    const { id } = useParams();
    const history = useHistory();
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

    const deleteCourse = useCallback(() => {
        const { emailAddress } = context.authenticatedUser;
        const { password } = context.authenticatedUser;

        context.data.deleteCourse(id, course, emailAddress, password)
            .then(() => {
                console.log(`${course.title} is successfully deleted!`);
                history.push('/');
            })
            .catch( err => {
                console.log(err);
                history.push('/error')
            })
    }) 

    

    return (
        <main>
            <div className="actions--bar">
                    {
                        isLoading 
                        ? <p>Loading...</p>
                        :   context.authenticatedUser && (context.authenticatedUser.id == course.User.id)
                            ?   <div className="wrap"> 
                                    <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                                    <button onClick={deleteCourse} className="button">Delete Course</button>
                                    <Link to='/' className="button button-secondary">Return to List</Link>
                                </div>
                            :   <div className="wrap"> 
                                    <Link to='/' className="button button-secondary">Return to List</Link>
                                </div>
                    }
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
                                <ReactMarkdown>{course.description}</ReactMarkdown>
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
                                                    <li key={i}><ReactMarkdown>{material}</ReactMarkdown></li>
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