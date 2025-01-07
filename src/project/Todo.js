import './Todo.css';
import React, { Component } from 'react';

export class Todolist extends Component {

  state={
    data:'',
    listdata:[]
  };  

  handleInputChange=(e)=>{
    this.setState({data:e.target.value})
  }
  handleFormSubmit=(e)=>{
        e.preventDefault();
        if (this.state.data.trim()) {
            this.setState(prevState => ({
              listdata: [...prevState.listdata, prevState.data],
              data: '' 
            }));
  }
}
handleDelete=(index)=>{
    this.setState(prevState=>({
        listdata:prevState.listdata.filter((item,i)=>{
            return i!==index;
        })
    }))

}
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}> 
          <div>
            <h1 className="container">Todo List</h1>
            <input type="text" 
            placeholder="Enter Task" 
            className="input_text"
            value={this.state.data}
            onChange={this.handleInputChange} />
          </div>  
          <div>
             <button type="submit" className='todo_btn'>Add</button>
          </div>
          
        </form>
        <ul className='ul_main'>
            {this.state.listdata.map((item,index)=>(
                <li key={index} className='listitem'>{item} 
                <img src="/delete.png" 
                alt="delete" 
                height={20}
                onClick={()=>this.handleDelete(index)}></img>
                </li>
            ))}
        </ul>
      </div>
    );
  }
}
