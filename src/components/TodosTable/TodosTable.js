import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'antd';
import Spinner from '../Spinner/Spinner';
import TodosItem from '../TodosItem/TodosItem';
import { StoreContext } from '../../store';
import AddTodos from '../AddTodos/AddTodos';
import './TodosTable.css';

const { Column } = Table;

function TodosTable(props) {
  const { actions } = useContext(StoreContext);

  const { dataSource, loading } = props;

  const onChangeCompleted = item => {
    const data = { ...item, completed: !item.completed };

    actions.patchTodosRequest(data);
  };

  return (
    <Table
      dataSource={dataSource}
      loading={{
        indicator: <Spinner size="large" />,
        spinning: loading,
      }}
      pagination={false}
      useFixedHeader
      rowKey={row => row.id.toString()}
      bodyStyle={{
        overflowY: 'scroll',
        backgroundColor: 'white',
        overflowX: 'hidden',
        height: 'calc(100vh - 118px)',
      }}
    >
      <Column
        dataIndex="completed"
        key="completed"
        filters={[
          {
            text: 'Completed',
            value: true,
          },
          {
            text: 'Incompleted',
            value: false,
          },
        ]}
        width={38}
        onFilter={(value, record) => record.completed === value}
        render={(text, record) => (
          <Checkbox
            checked={record.completed}
            onClick={() => onChangeCompleted(record)}
          />
        )}
        title=""
        align="center"
      />
      <Column
        title="Todos"
        filterIcon={<AddTodos />}
        filters={[
          // fake data for displaying ADD NEW TODOS input
          {
            text: 'Completed',
            value: true,
          },
        ]}
        filter
        dataIndex="title"
        key="title"
        render={(text, record, index) => (
          <TodosItem item={record} index={index} />
        )}
      />
    </Table>
  );
}

TodosTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TodosTable;
