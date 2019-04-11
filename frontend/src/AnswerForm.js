import React, { Component } from 'react'
import axios from 'axios';
import { authHeader } from './Authentication'


export default class AnswerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        };
    }

    submitAnswer = (event) => {
        event.preventDefault();
        const questionId = this.props.questionId;
        axios.post(`http://localhost:8081/answer/${questionId}`,
            { answer: this.state.answer },
            authHeader()
        )
            .then(tokens => {
                console.log("answer saved")
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="answer">Answer</label>
                    <textarea className="form-control" id="answer" value={this.state.answer} onChange={this.handleChange} rows="6"></textarea>
                </div>
                <button className="btn btn-primary" onClick={this.submitAnswer} type="button">Submit</button>
            </form>
        );
    }
}