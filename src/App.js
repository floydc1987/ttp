import React, { Component } from 'react';
import store from 'store';
import List from './List';
import './App.css';

/*Component that stores all of the state and is the root node for the application.*/
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: store.get('list') || [], /*local storage*/
      value: '' /*This is what clears the input when the to do list item is submittred*/
    }
  }

  /* This event handles when the change in text input occurrs*/
  handleChange(event) {
    let value = event.target.value; /*Variable set up to capitalize*/
    value = value.charAt(0).toUpperCase() + value.slice(1); /*capitalizes the first letter of the string passed in from the input*/
    this.setState({value});
  }
  /* When the formm/text input is submitted*/
  handleSubmit(event) {
    event.preventDefault(); /*preventDefault stops the form from trying to submit to the server*/
    if(!this.state.value) { /*Prevents adding blank list items*/
      return;
    }
    /*Inserts new to do items to the top of the to do list - by creating new object called item, it stores new items and then inserts them at the top of the list with 
    the spread fuction*/
    const item = {
      task: this.state.value,
      isCompleted: false,
    };
    this.setState({
      list: [item,...this.state.list],
      value: '', /*This is what clears the input when the to do list item is submittred*/
    })
  }

/*When the checkbox is clicked, this event removes the item from the to do list and adds it to the end*/
  handleCompleted(item) {
    item.isCompleted = true;
    let list = this.state.list.filter(i => i !== item).concat(item); /*filtering out anything that returns false*/
    this.setState({list});
  }

/*local storage - saves the list in the browser locally - items that are completed will be removed upon refresh*/
  componentDidUpdate(prevProps, prevState) {
    if(prevState.list !== this.state.list) {
      store.set('list', this.state.list.filter(item => !item.isCompleted));
    }
  }

  /*JSX*/
  render() {
    
    return (
      <div className='container'>
        <h1 className="App-title">To Do List</h1>
        <div className='column'>
          <form id='inputText' className="Input" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="things">
              Things To Do:
            </div>
            <br /> 
            <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
            <button>Add Task</button>
          </form>
        </div>
        <div className='column'>
          <List items={this.state.list} onCompleted={(item) => this.handleCompleted(item)}/>
        </div>
      </div>
    );
  }
}


export default App;


