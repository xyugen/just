import { TabScrollView } from '@/components/tab-scroll-view';
import TodoList from '@/components/task/todo-list';
import { useState } from 'react';

interface Task {
  id: string;
  label: string;
  description?: string;
}

interface DaySection {
  date: string;
  tasks: Task[];
}

const InProgressScreen = () => {
  const [values, setValues] = useState(['Design']);

  const daySections: DaySection[] = [
    {
      date: 'Nov 6 • Wednesday',
      tasks: [
        {
          id: '1',
          label: 'Submit Project Proposal',
          description: 'Complete and submit the final project proposal for',
        },
        {
          id: '2',
          label: 'Set handover notes',
        },
        {
          id: '3',
          label: 'Yoga Class',
          description: 'Attend the evening Yoga session at the wellness',
        },
      ],
    },
  ];

  return (
    <TabScrollView>
      <TodoList daySections={daySections} />
    </TabScrollView>
  );
};

export default InProgressScreen;
