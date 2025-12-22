import { Container } from '@/components/Container';
import React from 'react';
import { useColorScheme } from 'react-native';

import { AppTabs } from '@/components/app-tabs';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <Container>
        <AppTabs />
      </Container>
    </GluestackUIProvider>
  );
}
