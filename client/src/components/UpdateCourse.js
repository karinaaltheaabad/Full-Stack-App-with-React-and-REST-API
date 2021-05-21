import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';

class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    componentDidMount() {
        this.props.context.data.getCourse(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    title: response.title,
                    description: response.description, 
                    estimatedTime: response.estimatedTime,
                    materialsNeeded: response.materialsNeeded
                })
            })
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;
        
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <div className="main--flex">
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
                            elements={() => ( 
                                <React.Fragment>
                                    <label htmlFor="title">Course Title</label>
                                    <input 
                                    id="title" 
                                    name="title" 
                                    type="text"
                                    value={title} 
                                    onChange={this.change} />
                                    <label htmlFor="description">Course Description</label>
                                    <textarea 
                                    id="description" 
                                    name="description" 
                                    type="text"
                                    value={description} 
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
        const { emailAddress } = context.authenticatedUser;
        const { password } = context.authenticatedUser;
        const id = this.props.match.params.id; 

        //unpack properties from the state object (this.state) into distinct variables
        const {
            title, 
            description, 
            estimatedTime,
            materialsNeeded,
        } = this.state; 

        //new course payload that will be passed to createUser() method
        const course = {
            title, 
            description, 
            estimatedTime,
            materialsNeeded,
        };

        //creates a new course
        context.data.updateCourse(id, course, emailAddress, password)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors })
                } else {
                    console.log(`${title} is successfully updated!`);
                    this.props.history.push(`courses/${id}`)
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/notfound');
            })
    } 

    cancel = () => {
        this.props.history.push('/');
    }
}


export default withRouter(UpdateCourse); 