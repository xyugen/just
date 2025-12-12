import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AppTabs } from 'components/app-tabs';
import { Container } from 'components/Container';
import React from 'react';
import { useColorScheme } from 'react-native';

import '../global.css';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Container>
        <AppTabs />
      </Container>
    </ThemeProvider>
  );
}
