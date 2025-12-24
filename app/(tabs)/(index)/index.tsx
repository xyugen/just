import { TabScrollView } from '@/components/tab-scroll-view';
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
import { Check } from 'lucide-react-native';
import { Fragment, useState } from 'react';

interface Task {
  id: string;
  label: string;
  description?: string;
}

interface DaySection {
  date: string;
  tasks: Task[];
}

const HomeScreen = () => {
  const [values, setValues] = useState(['Design']);

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
      <Box className="flex flex-col gap-2 overflow-hidden rounded-t-2xl bg-transparent">
        {daySections.map((section, sectionIndex) => (
          <Box key={sectionIndex} className="h-fit bg-background-0">
            <Text className="border-b border-background-200 p-4 font-medium">{section.date}</Text>
            <Box className="p-4">
              <CheckboxGroup
                value={values}
                onChange={(keys) => {
                  setValues(keys);
                }}>
                <VStack space="md">
                  {section.tasks.map((task, taskIndex) => (
                    <Fragment key={task.id}>
                      {taskIndex > 0 && <Divider />}
                      <Box>
                        <Checkbox value={task.id} size="lg">
                          <CheckboxIndicator className="rounded-full border-2 border-primary-400 bg-primary-100">
                            <CheckboxIcon as={Check} className="rounded-full" />
                          </CheckboxIndicator>
                          <CheckboxLabel>{task.label}</CheckboxLabel>
                        </Checkbox>
                        {task.description && (
                          <Text className="ml-8" numberOfLines={1} size="sm">
                            {task.description}
                          </Text>
                        )}
                      </Box>
                    </Fragment>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Box>
          </Box>
        ))}
      </Box>
    </TabScrollView>
  );
};

export default HomeScreen;
