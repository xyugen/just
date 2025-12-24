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
      <Box className="flex flex-col gap-2 bg-transparent">
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
                          <Text className="ml-8 truncate" size="sm">
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

export default InProgressScreen;
