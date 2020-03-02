import React, { useState, useContext, useRef, useEffect } from 'react';
import { Input, Form } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { StoreContext } from '../../store';
import './AddTodos.css';

const AddTodos = props => {
  const inputRef = useRef();
  const { state, actions } = useContext(StoreContext);
  const [todosText, setTodosText] = useState();

  useEffect(() => {
    if (state.postTodos.payload) {
      setTodosText('');
    }
  }, [state.postTodos.payload]);

  const onAddTodos = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      title: todosText,
      completed: false,
      userId: user.id,
    };
    actions.postTodosRequest(data);
  };

  return (
    <Form.Item
      className="FormItem"
      validateStatus="validating"
      hasFeedback={state.postTodos.fetching}
    >
      <Input
        ref={inputRef}
        value={todosText}
        placeholder="Add new todos"
        onChange={e => setTodosText(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onAddTodos();
          }
        }}
        disabled={state.postTodos.fetching}
        prefix={<FileAddOutlined />}
      />
    </Form.Item>
  );
};

export default AddTodos;
