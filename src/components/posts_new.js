import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta:{touched, error} } =field; //Means we are going to grab property meta from field.
        const className= `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className= {className}>
                <label> {field.label} </label>
                <input
                    className= "form-control"
                    type="text" //The type of input
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values){
        this.props.createPost(values, () => {
             this.props.history.push('/'); //automatically loads the page
        }); //Calling the action creating onSubmit

    }
    
    render() {
        const { handleSubmit: handleSubmit } = this.props; //handleSubmit = this.props.handleSubmit ESSENTIALLY.
        
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                    label="Title For Posts"
                    name="title"
                    component={this.renderField}
                    />
                     <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                    />
                    <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
                </div>
        );
    }

}

function validate(values) { //'values' is always the object being passed; Values correspond to names of field
    const errors = {}; //empty object error

    if(!values.title || values.title.length < 3){
        errors.title = "Enter a title that is at least 3 characters!";
    }
     if(!values.categories){
        errors.categories = 'Enter some categories';
    }
     if(!values.content){
        errors.content = 'Enter some content please';
    }


    //If errors is a empty (object), the form is fine to submit.
    //If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate, //function is passed here as validate: validate(es6) REDUCTION FORM HELPER
    form: 'PostsNewForm'
})(
    connect(null,{ createPost}) (PostsNew)
);

//Combining the connect component and reduxForm 