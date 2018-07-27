import React, { Component } from 'react';
import './List.css';

/*Component that stores the list state.*/
class List extends Component {
	handleChecked(event, item) { /*item assocaited with li that was checked*/
		if(event.target.checked) { /*if the check box that was clicked is currently checked, thencontinue and call the callback - can ONLY be checked, not unchecked*/
			this.props.onCompleted(item); /*calling the onCompleted function on line 75 in App.js - input keeps a reference of the item and passes it along to App.js - 
			the input is nested in the <li> element*/
		}
	}

	/*JSX - also how I learned that when .map is used on a parent node, the children have to list a key property
	{item.task} = per the list item objects listed in App.js from line 10-20 - also, item is passed in as the first parameter for the map function and <li> is the first item of 
	the method.*/
  render() {
    return (
      <ul className="List">
      	{this.props.items.map((item, index) =>
      	  <li key={item.task} className={item.isCompleted ? "complete" : "incomplete"}>
      	  	<input type='checkbox' className='check' checked={item.isCompleted} onChange={(e) => this.handleChecked(e, item)} /> 
      	  	{item.task}
      	  </li>
      	)}
      </ul>
    );
  }
}

export default List;


