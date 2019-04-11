import React, { Component } from 'react'
import axios from 'axios';
import { authHeader } from './Authentication'


export default class UpdateQuestionModel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: this.props.question
    };

  }

  editQuestion = (event) => {
    event.preventDefault();
    console.log(this)
    axios.patch(`http://localhost:8081/${this.state.question.id}`,
      {
        title: this.state.question.title,
        description: this.state.question.description
      },
      authHeader()
    )
      .then(tokens => {
        console.log(`Question ${this.state.question.id} is updated`)
      });
  }

  handleChange = event => {
    console.log("before", this.state.question)

    this.setState({
      question: { ...this.state.question, [event.target.id]: event.target.value }
    });
    console.log("after", this.state.question)
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#questionEditModal">Edit</button>
        <div className="modal fade" id="questionEditModal" tabIndex="-1" role="dialog" aria-labelledby="questionEditModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="questionEditModalLabel">Edit Question</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={this.state.question.title} onChange={this.handleChange} rows="6"></input>

                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" value={this.state.question.description} onChange={this.handleChange} rows="6"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.editQuestion}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}











// <!-- Button trigger modal -->
// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//   Launch demo modal
// </button>
