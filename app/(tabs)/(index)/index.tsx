import { TabScrollView } from '@/components/tab-scroll-view';
import TodoList from '@/components/task/todo-list';
import { Box } from '@/components/ui/box';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import { Divider } from '@/components/ui/divider';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import DaySection from '@/interface/DaySection';
import { Check } from 'lucide-react-native';
import { Fragment } from 'react';

const HomeScreen = () => {
  const daySections: DaySection[] = [
    {
      date: 'Nov 6 • Wednesday',
      tasks: [
        {
          id: '1',
          label: 'Submit Project Proposal',
          description: 'Complete and submit the final project proposal for th...',
        },
        {
          id: '2',
          label: 'Set handover notes',
        },
        {
          id: '3',
          label: 'Yoga Class',
          description: 'Attend the evening Yoga session at the wellness cent...',
        },
      ],
    },
    {
      date: 'Nov 4 • Monday',
      tasks: [
        {
          id: '4',
          label: 'Team Meeting',
          description: 'Weekly sync with the development team at 10:00 AM...',
        },
        {
          id: '5',
          label: 'Review Pull Requests',
        },
        {
          id: '6',
          label: 'Grocery Shopping',
          description: 'Pick up groceries for the week at the local market...',
        },
      ],
    },
    {
      date: 'Nov 3 • Sunday',
      tasks: [
        {
          id: '7',
          label: 'Team Meeting',
          description: 'Weekly sync with the development team at 10:00 AM...',
        },
        {
          id: '8',
          label: 'Review Pull Requests',
        },
        {
          id: '9',
          label: 'Grocery Shopping',
          description: 'Pick up groceries for the week at the local market...',
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

export default HomeScreen;
