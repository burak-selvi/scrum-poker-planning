import React from 'react';
import TableWrapper from './TableWrapper';

export default function StoryList({ stories, statuses, currentStory, setCurrentStory }) {
  console.log('Stories', stories)
  console.log('Statuses', statuses)

  const columns = [
    {
      title: 'Story',
      rowMapper: (row) => row.name
    },
    {
      title: 'Story Point',
      rowMapper: (row) => row.point
    },
    {
      title: 'Status',
      rowMapper: (row) => statuses.find(status => status.value === row.status)?.name
    }
  ];

  const items = [
    { id: 1, story: 'Story 1', point: '90', status: 'Active' },
    { id: 2, story: 'Story 2', point: '80', status: 'Not Voted' },
    { id: 3, story: 'Story 3', point: '70', status: 'Not Voted' },
    { id: 4, story: 'Story 4', point: '60', status: 'Not Voted' },
    { id: 5, story: 'Story 5', point: '50', status: 'Not Voted' },
    { id: 6, story: 'Story 6', point: '40', status: 'Not Voted' },
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
