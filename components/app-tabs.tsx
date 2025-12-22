import { cn } from '@gluestack-ui/utils/nativewind-utils';
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { CheckCircle, CircleDot, Clock, ListTodo, LucideIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Box } from './ui/box';
import { Grid, GridItem } from './ui/grid';
import { Icon } from './ui/icon';
import { Pressable } from './ui/pressable';
import { Text } from './ui/text';

const TAB_CONFIG = [
  {
    name: 'all',
    href: '/',
    text: 'All',
    icon: ListTodo,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'in-progress',
    href: '/in-progress',
    text: 'In Progress',
    icon: CircleDot,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
  },
  {
    name: 'overdue',
    href: '/overdue',
    text: 'Overdue',
    icon: Clock,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
  },
  {
    name: 'done',
    href: '/done',
    text: 'Done',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500',
  },
];

interface TabLayout {
  x: number;
  width: number;
}

type TabLayoutsMap = Map<number, TabLayout>;

const TabLayoutContext = React.createContext<{
  setTabLayout: (index: number, layout: TabLayout) => void;
  setFocusedIndex: (index: number, color: string) => void;
} | null>(null);

export const AppTabs = () => {
  return (
    <Tabs>
      <TabList asChild>
        <CustomTabList>
          {TAB_CONFIG.map((tab, index) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon} color={tab.color} bgColor={tab.bgColor} tabIndex={index}>
                {tab.text}
              </TabButton>
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
      <TabSlot className="h-full" />
    </Tabs>
  );
};

interface TabButtonProps extends Omit<TabTriggerSlotProps, 'tabIndex'> {
  icon?: LucideIcon;
  color?: string;
  bgColor?: string;
  tabIndex: number;
}

export function TabButton({
  children,
  isFocused,
  icon,
  color,
  bgColor,
  tabIndex,
  ...props
}: TabButtonProps) {
  const IconComponent = icon || CircleDot;
  const context = React.useContext(TabLayoutContext);

  useEffect(() => {
    if (isFocused && bgColor) {
      context?.setFocusedIndex(tabIndex, bgColor);
    }
  }, [isFocused, tabIndex, bgColor, context]);

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View className="flex items-center justify-center space-y-1">
        <Icon
          as={IconComponent}
          className={cn('size-6', isFocused ? color : 'text-typography-700')}
          size="xl"
        />
        <Text className={cn('text-center text-sm', isFocused && color)}>{children}</Text>
      </View>
    </Pressable>
  );
}

const springConfig = {
  stiffness: 1200,
  damping: 120,
};

export function CustomTabList(props: TabListProps) {
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const tabLayoutsRef = useRef<TabLayoutsMap>(new Map());
  const [indicatorColor, setIndicatorColor] = useState('bg-blue-400');

  const setTabLayout = useCallback((index: number, layout: TabLayout) => {
    tabLayoutsRef.current.set(index, layout);
  }, []);

  const handleFocusedIndex = useCallback(
    (index: number, color: string) => {
      setIndicatorColor(color);
      const layout = tabLayoutsRef.current.get(index);

      if (layout) {
        if (!isInitialized) {
          // First render - set without animation
          indicatorX.value = layout.x;
          indicatorWidth.value = layout.width;
          setIsInitialized(true);
        } else {
          // Subsequent renders - animate
          indicatorX.value = withSpring(layout.x, springConfig);
          indicatorWidth.value = withSpring(layout.width, springConfig);
        }
      }
    },
    [isInitialized, indicatorX, indicatorWidth]
  );

  const contextValue = React.useMemo(
    () => ({
      setTabLayout,
      setFocusedIndex: handleFocusedIndex,
    }),
    [setTabLayout, handleFocusedIndex]
  );

  const wrappedChildren = React.Children.map(props.children, (child, index) => {
    const handleLayout = (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setTabLayout(index, { x, width });
    };

    return (
      <GridItem _extra={{ className: 'col-span-1' }} onLayout={handleLayout}>
        {child}
      </GridItem>
    );
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: indicatorWidth.value,
    };
  });

  return (
    <TabLayoutContext.Provider value={contextValue}>
      <Box
        {...props}
        className="w-full flex-row items-center justify-center rounded-t-lg border-b border-background-100 bg-background-0 p-2">
        <View className="relative w-full">
          <Grid className="gap-2 rounded py-2" _extra={{ className: 'grid-cols-4' }}>
            {wrappedChildren}
          </Grid>
          <Animated.View
            style={[animatedIndicatorStyle]}
            className={cn('absolute -bottom-2 h-1 rounded-t-full', indicatorColor)}
          />
        </View>
      </Box>
    </TabLayoutContext.Provider>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
