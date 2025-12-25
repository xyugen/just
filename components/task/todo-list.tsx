import DaySection from '@/interface/DaySection';
import React, { Fragment, useState } from 'react';
import { Box } from '../ui/box';
import { CheckboxGroup } from '../ui/checkbox';
import { Divider } from '../ui/divider';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';
import Todo from './task';

interface TodoListProps {
  daySections: DaySection[];
}

const TodoList: React.FC<TodoListProps> = ({ daySections }) => {
  const [values, setValues] = useState([]);

  return (
    <Box className="flex flex-col gap-2 overflow-hidden rounded-b-2xl rounded-t-2xl bg-transparent">
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
                    <Todo task={task} />
                  </Fragment>
                ))}
              </VStack>
            </CheckboxGroup>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TodoList;
