import Task from '@/interface/Task';
import * as React from 'react';
import { Box } from '../ui/box';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '../ui/checkbox';
import { Text } from '../ui/text';
import { Check } from 'lucide-react-native';

interface TaskProps {
  task: Task;
}

const Todo: React.FC<TaskProps> = ({ task }) => {
  return (
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
  );
};

export default Todo;
