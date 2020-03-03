import React, { useState, useRef, useEffect } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { FileAddOutlined } from '@ant-design/icons';
import './AddTodos.css';
import { DEFAULT_REDUCERS } from '../../data/const';

const AddTodos = props => {
  const { postTodos, postTodosRequest } = props;
  const addTodosInputRef = useRef();
  const [todosText, setTodosText] = useState();

  useEffect(() => {
    if (postTodos.payload) {
      setTodosText('');
    }
  }, [postTodos.payload]);

  function onAddTodos() {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      title: todosText,
      completed: false,
      userId: user.id,
    };
    postTodosRequest(data);
  }

  return (
    <Form.Item
      className="FormItem"
      validateStatus="validating"
      hasFeedback={postTodos.fetching}
    >
      <Input
        ref={addTodosInputRef}
        value={todosText}
        placeholder="Add new todos"
        onChange={e => setTodosText(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onAddTodos();
          }
        }}
        disabled={postTodos.fetching}
        prefix={<FileAddOutlined />}
      />
    </Form.Item>
  );
};

AddTodos.propTypes = {
  postTodos: PropTypes.object,
  postTodosRequest: PropTypes.func,
};

AddTodos.defaultProps = {
  postTodos: DEFAULT_REDUCERS,
  postTodosRequest: () => {},
};

export default AddTodos;
