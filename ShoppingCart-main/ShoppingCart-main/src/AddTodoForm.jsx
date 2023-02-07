import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {

  const [ task, setTask ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); 
    setTask('');
    onAddTodo(task);
  }

  function onTyping(e) {
    setTask(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="btn-chat-submit" placeholder='Enter Message' name="message" value={task} onChange={onTyping}/>
      <button type="submit" className="btn-send">Send</button>
    </form>
  );
}

export default AddTodoForm;
