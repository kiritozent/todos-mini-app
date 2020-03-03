/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './TodosItem.css';
import { StoreContext } from '../../store';
import Spinner from '../Spinner/Spinner';

const TodosItem = props => {
  const { state, actions } = useContext(StoreContext);

  const { item } = props;
  const inputRef = useRef();
  const [title, setTitle] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (onEdit) {
      inputRef.current.focus();
    } else {
      setTitle(item.title);
    }
  }, [onEdit]);

  useEffect(() => {
    if (item) {
      setOnEdit(false);
      setTitle(item.title);
    }
  }, [item]);

  useEffect(() => {
    if (!state.deleteTodos.fetching) {
      setDeleteLoading(false);
    }
  }, [state.deleteTodos.fetching]);

  const onPatchTodos = () => {
    const data = {
      ...item,
      title,
    };

    actions.patchTodosRequest(data);
  };

  const onDeleteTodos = () => {
    Modal.confirm({
      title: 'Are you sure delete this todo?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      okButtonProps: {
        loading: deleteLoading,
        onClick: () => {
          setDeleteLoading(true);
          actions.deleteTodosRequest(item);
          Modal.destroyAll();
        },
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  if (onEdit)
    return (
      <Form.Item
        className="FormItem"
        validateStatus="validating"
        hasFeedback={state.patchTodos.fetching}
      >
        <Input
          ref={inputRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => setOnEdit(false)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onPatchTodos();
            }
          }}
          disabled={state.patchTodos.fetching}
        />
      </Form.Item>
    );
  return (
    <div className="TodosItemContainer">
      <div
        className="TodosItem"
        onClick={() => {
          if (!state.patchTodos.fetching) {
            setOnEdit(true);
          }
        }}
        style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
      >
        {title}
      </div>
      {deleteLoading ? (
        <Spinner size="small" />
      ) : (
        <DeleteOutlined
          className="DeleteIcon"
          role="button"
          onClick={() => {
            if (!state.deleteTodos.fetching) {
              onDeleteTodos();
            }
          }}
        />
      )}
    </div>
  );
};

TodosItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TodosItem;
