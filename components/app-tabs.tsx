import { cn } from '@gluestack-ui/utils/nativewind-utils';
import { usePathname } from 'expo-router';
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { CircleDot, CirclePlus, House, LucideIcon, Search } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from './ui/box';
import { Grid, GridItem } from './ui/grid';
import { Icon } from './ui/icon';
import { Pressable } from './ui/pressable';
import { Text } from './ui/text';

const TAB_CONFIG = [
  {
    name: 'home',
    href: '/',
    text: 'Home',
    icon: House,
  },
  {
    name: 'create',
    href: '/create',
    text: 'Create',
    icon: CirclePlus,
  },
  {
    name: 'search',
    href: '/search',
    text: 'Search',
    icon: Search,
  },
];

export const AppTabs = () => {
  return (
    <Tabs>
      <TabHeader />
      <TabSlot className="h-full bg-slate-400" />
      <TabList asChild>
        <CustomTabList>
          {TAB_CONFIG.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon}>{tab.text}</TabButton>
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
    </Tabs>
  );
};

export const TabHeader = () => {
  const pathname = usePathname();

  // Find the current tab based on the pathname
  const currentTab = useMemo(() => {
    return TAB_CONFIG.find((tab) => tab.href === pathname) || TAB_CONFIG[0];
  }, [pathname]);

  return (
    <Box className="border-b border-background-200 bg-background-0 p-2">
      <Text className="text-center font-bold text-typography-900">{currentTab.text}</Text>
    </Box>
  );
};

interface TabButtonProps extends Omit<TabTriggerSlotProps, 'tabIndex'> {
  icon?: LucideIcon;
}

export function TabButton({ children, isFocused, icon, ...props }: TabButtonProps) {
  const IconComponent = icon || CircleDot;

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View className="flex items-center justify-center space-y-1">
        <Icon
          as={IconComponent}
          className={cn('size-6', isFocused ? 'text-primary-500' : 'text-typography-500')}
          size="xl"
        />
        <Text
          className={cn(
            'text-center text-sm',
            isFocused ? 'font-bold text-primary-500' : 'text-typography-500'
          )}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const wrappedChildren = React.Children.map(props.children, (child) => {
    return <GridItem _extra={{ className: 'col-span-1' }}>{child}</GridItem>;
  });

  // Determine the number of tabs for grid columns
  const tabConfigLength = TAB_CONFIG.length;

  return (
    <Box
      {...props}
      className="w-full flex-row items-center justify-center rounded-b-lg border-t border-background-100 bg-background-0 p-2">
      <View className="relative w-full">
        <Grid className="gap-2 rounded" _extra={{ className: cn(`grid-cols-${tabConfigLength}`) }}>
          {wrappedChildren}
        </Grid>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
