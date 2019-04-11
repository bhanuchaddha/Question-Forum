import React, { Component } from 'react'
import axios from 'axios'
import { authHeader, removeAuth } from '../Authentication'
import AnswerForm from '../AnswerForm';
import UpdateQuestionModel from '../UpdateQuestionModel';



class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: null
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        let question = (await axios.get(`http://localhost:8081/${params.questionId}`, authHeader())).data;
        if (question.success === false) {
            question = {};
            removeAuth();
            console.error(`http://localhost:8081/${params.questionId} service failed `);
        }
        this.setState({
            question
        })
    }

    render() {
        const { question } = this.state;
        if (question === null) return <p>Loading Question</p>;
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <UpdateQuestionModel className="float-right" question={this.state.question}></UpdateQuestionModel>
                        <h1 className="display-3">{question.title}</h1>
                        <p className="lead">{question.description}</p>
                        <hr className="my-4" />
                        <p>Answers:</p>
                        {
                            question.answers.map((answer, idx) => (
                                <p className="lead" key={idx}>{answer.answer}</p>
                            ))
                        }
                        <AnswerForm questionId={question.id}></AnswerForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Question;