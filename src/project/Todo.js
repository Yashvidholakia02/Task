import './Todo.css';
import axios from 'axios';
import React, { Component } from 'react';

export class Todolist extends Component {
  state = {
    data: '',
    listdata: [],
    isLoading: true,
  };

  // Fetch tasks when the component is mounted
  componentDidMount() {
    axios
      .get('http://localhost:3000/tasks')  // Fetching data from the json-server
      .then((response) => {
        console.log('Fetching Data', response.data);
        this.setState({ listdata: response.data, isLoading: false });
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        this.setState({ isLoading: false });
      });
  }

  // Handle input field change
  handleInputChange = (e) => {
    this.setState({ data: e.target.value });
  };

  // Handle form submit (add a new task)
  handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = { title: this.state.data.trim() };

    if (newTask.title) {
      axios
        .post('http://localhost:3000/tasks', newTask)  // Add the task to the list
        .then((response) => {
          // Update the state to include the new task
          this.setState((prevState) => ({
            listdata: [...prevState.listdata, response.data],
            data: '',  // Clear input field after submit
          }));
        })
        .catch((error) => console.log('Error adding task', error));
    }
  };

  // Handle task deletion
  handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`)  // Remove the task with the specific ID
      .then(() => {
        // Remove the deleted task from the list
        this.setState((prevState) => ({
          listdata: prevState.listdata.filter((task) => task.id !== id),
        }));
      })
      .catch((error) => console.log('Error deleting task', error));
  };

  render() {
    const { data, listdata, isLoading } = this.state;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <h1 className="container">Todo List</h1>
            <input
              type="text"
              placeholder="Enter Task"
              className="input_text"
              value={data}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button type="submit" className="todo_btn">
              Add
            </button>
          </div>
        </form>

        
        {isLoading && <p>Loading tasks...</p>}

        
        {!isLoading && (
          <ul className="ul_main">
            {listdata.map((item) => (
              <li key={item.id} className="listitem">
                {item.title}
                <img
                  src="/delete.png"
                  alt="delete"
                  height={20}
                  onClick={() => this.handleDelete(item.id)} 
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
