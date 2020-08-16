import React from 'react';
import TableWrapper from './TableWrapper';

export default function StoryList({ stories, statuses }) {

  const columns = [
    {
      title: 'Story',
      rowMapper: (row) => row.name
    },
    {
      title: 'Story Point',
      rowMapper: (row) => row.point ? row.point : '-'
    },
    {
      title: 'Status',
      rowMapper: (row) => statuses.find(status => status.value === row.status)?.name
    }
  ];

  return (
    <React.Fragment>
      <p>Story List</p>
      <TableWrapper
        columns={columns}
        items={stories}
      />
    </React.Fragment>
  )
}
