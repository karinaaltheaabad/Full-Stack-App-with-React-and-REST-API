import React, { Component } from 'react';
import Form from './Form'

class CreateCourse extends Component {

    state = {
        courseTitle: '',
        courseDescription: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    
    render() {
        const {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        
        return (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <div className="main--flex">
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Create Course"
                            elements={() => ( 
                                <React.Fragment>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input 
                                    id="courseTitle" 
                                    name="courseTitle" 
                                    type="text"
                                    value={courseTitle} 
                                    onChange={this.change} />
                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea 
                                    id="courseDescription" 
                                    name="courseDescription" 
                                    type="text"
                                    value={courseDescription} 
                                    onChange={this.change} />
                                </React.Fragment>
                        )} />
                        <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text"
                            value={estimatedTime} 
                            onChange={this.change} />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            type="text"
                            value={materialsNeeded} 
                            onChange={this.change} />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
            return {
            [name]: value
            };
        });
    }
    
    submit = () => {
        //destructure context prop from this.props
        const { context } = this.props; 

        //unpack properties from the state object (this.state) into distinct variables
        const {
            courseTitle, 
            courseDescription, 
            estimatedTime,
            materialsNeeded,
        } = this.state; 

        //new course payload that will be passed to createUser() method
        const course = {
            courseTitle, 
            courseDescription, 
            estimatedTime,
            materialsNeeded,
        };

        //creates a new course
        context.data.createCourse(course)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors })
                } else {
                    console.log(`${courseTitle} is successfully created!`);
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })
    } 
    
    cancel = () => {
        this.props.history.push('/');
    }
}


export default CreateCourse; 