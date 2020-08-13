import React from 'react';
import TableWrapper from './TableWrapper';

export default function StoryList() {
  const columns = [
    {
      title: 'Story',
      rowMapper: (row) => row.story
    },
    {
      title: 'Story Point',
      rowMapper: (row) => row.point
    },
    {
      title: 'Status',
      rowMapper: (row) => row.status
    }
  ];

  const items = [
    { story: 'Story 1', point: '90', status: 'Active' },
    { story: 'Story 2', point: '80', status: 'Not Voted' },
    { story: 'Story 3', point: '70', status: 'Not Voted' },
    { story: 'Story 4', point: '60', status: 'Not Voted' },
    { story: 'Story 5', point: '50', status: 'Not Voted' },
    { story: 'Story 6', point: '40', status: 'Not Voted' },
  ];



  return (
    <React.Fragment>
      <p>Story List</p>
      <TableWrapper
        columns={columns}
        items={items}
      />
    </React.Fragment>
  )
}
