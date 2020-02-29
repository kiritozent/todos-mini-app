import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'antd';
import Spinner from '../Spinner/Spinner';

const { Column } = Table;

function TodosTable(props) {
  const { dataSource, loading, onClick } = props;
  return (
    <Table
      dataSource={dataSource}
      loading={{
        indicator: <Spinner size="large" />,
        spinning: loading,
      }}
      onRow={(record, index) => ({ onClick: () => onClick(record) })}
      pagination={false}
      useFixedHeader
      rowKey={row => row.id.toString()}
      style={{
        height: '100%',
      }}
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
        render={(text, record) => <Checkbox checked={record.completed} />}
        width={32}
        title={<Checkbox checked={false} />}
      />
      <Column title="Todos" dataIndex="title" key="title" />
    </Table>
  );
}

TodosTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TodosTable;
