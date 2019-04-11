import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authHeader, removeAuth } from '../Authentication'

class Questions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: null
        };
    }

    async componentDidMount() {
        console.log(authHeader());
        let questions = (await axios.get('http://localhost:8081/', authHeader())).data;
        if (questions.success === false) {
            questions = [];
            removeAuth();
            console.error('http://localhost:8081/ service failed ');
        }
        this.setState({
            questions
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.questions === null && <p>Loading Questions...</p>}
                    {this.state.questions && this.state.questions.map(question => (
                        <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                            <Link to={`/question/${question.id}`}>
                                <div className="card text-white bg-success mb-3">
                                    <div className="card-header">
                                        <span>Answers: {question.answers}</span>

                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">{question.title}</h4>
                                        <p className="card-text">{question.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                    }
                </div>
            </div>
        );
    }
}

export default Questions;