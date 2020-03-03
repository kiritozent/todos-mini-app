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
import { DEFAULT_REDUCERS } from '../../data/const';

const TodosItem = props => {
  const {
    item,
    patchTodos,
    deleteTodos,
    patchTodosRequest,
    deleteTodosRequest,
  } = props;
  const inputRef = useRef();
  const [title, setTitle] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (onEdit) {
      inputRef.current.focus();
    } else if (item) {
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
    if (!deleteTodos.fetching) {
      setDeleteLoading(false);
    }
  }, [deleteTodos.fetching]);

  function onPatchTodos() {
    const data = {
      ...item,
      title,
    };

    patchTodosRequest(data);
  }

  function onDeleteTodos() {
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
          deleteTodosRequest(item);
          Modal.destroyAll();
        },
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  if (onEdit)
    return (
      <Form.Item
        className="TodosFormItem"
        validateStatus="validating"
        hasFeedback={patchTodos.fetching}
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
        />
      </Form.Item>
    );
  return (
    <div className="TodosItemContainer">
      <div
        className="TodosItem"
        onClick={() => {
          setOnEdit(true);
        }}
        style={{
          textDecoration: item && item.completed ? 'line-through' : 'none',
        }}
      >
        {title}
      </div>
      {deleteLoading ? (
        <Spinner size="small" />
      ) : (
        <DeleteOutlined
          className="DeleteIcon"
          role="button"
          onClick={onDeleteTodos}
        />
      )}
    </div>
  );
};

TodosItem.propTypes = {
  item: PropTypes.object,
  patchTodos: PropTypes.object,
  deleteTodos: PropTypes.object,
  patchTodosRequest: PropTypes.func,
  deleteTodosRequest: PropTypes.func,
};

TodosItem.defaultProps = {
  item: null,
  patchTodos: DEFAULT_REDUCERS,
  deleteTodos: DEFAULT_REDUCERS,
  patchTodosRequest: () => {},
  deleteTodosRequest: () => {},
};

export default TodosItem;
