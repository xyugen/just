import { Box } from '@/components/ui/box';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';

const InProgressScreen = () => {
  return (
    <Box className="h-full">
      <CheckboxGroup>
        <Checkbox>
          <CheckboxIndicator>
            <CheckboxIcon />
          </CheckboxIndicator>
          <CheckboxLabel />
        </Checkbox>
      </CheckboxGroup>
      <Text>InProgress</Text>
    </Box>
  );
};

export default InProgressScreen;
