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

const ScrollContext = React.createContext<{
  hasScrolled: boolean;
  setScrolled: (scrolled: boolean) => void;
} | null>(null);

export const useTabScroll = () => {
  const context = React.useContext(ScrollContext);
  if (!context) throw new Error('useTabScroll must be used within FilterTabs');
  return context;
};

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

export const FilterTabs = () => {
  const [hasScrolled, setScrolled] = useState(false);

  const scrollContextValue = React.useMemo(
    () => ({
      hasScrolled,
      setScrolled,
    }),
    [hasScrolled]
  );

  return (
    <ScrollContext.Provider value={scrollContextValue}>
      <Tabs>
        <TabList asChild>
          <CustomTabList>
            {TAB_CONFIG.map((tab, index) => (
              <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
                <TabButton
                  icon={tab.icon}
                  color={tab.color}
                  bgColor={tab.bgColor}
                  hasScrolled={hasScrolled}
                  tabIndex={index}>
                  {tab.text}
                </TabButton>
              </TabTrigger>
            ))}
          </CustomTabList>
        </TabList>
        <TabSlot />
      </Tabs>
    </ScrollContext.Provider>
  );
};

interface TabButtonProps extends Omit<TabTriggerSlotProps, 'tabIndex'> {
  icon?: LucideIcon;
  color?: string;
  bgColor?: string;
  hasScrolled?: boolean;
  tabIndex: number;
}

export function TabButton({
  children,
  isFocused,
  icon,
  color,
  bgColor,
  hasScrolled,
  tabIndex,
  ...props
}: TabButtonProps) {
  const IconComponent = icon || CircleDot;
  const context = React.useContext(TabLayoutContext);

  // Animated values for smooth transitions
  const iconHeight = useSharedValue(hasScrolled ? 0 : 24);
  const iconOpacity = useSharedValue(hasScrolled ? 0 : 1);

  useEffect(() => {
    if (isFocused && bgColor) {
      context?.setFocusedIndex(tabIndex, bgColor);
    }
  }, [isFocused, tabIndex, bgColor, context]);

  useEffect(() => {
    iconHeight.value = withSpring(hasScrolled ? 0 : 24, {
      damping: 140,
      stiffness: 800,
    });
    iconOpacity.value = withSpring(hasScrolled ? 0 : 1, {
      damping: 140,
      stiffness: 800,
    });
  }, [hasScrolled, iconHeight, iconOpacity]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    height: iconHeight.value,
    opacity: iconOpacity.value,
    overflow: 'hidden',
  }));

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View className="flex items-center justify-center">
        <Animated.View style={iconAnimatedStyle}>
          <Icon
            as={IconComponent}
            className={cn('size-6', isFocused ? color : 'text-typography-700')}
            size="xl"
          />
        </Animated.View>
        <Animated.Text className={cn('text-center text-sm', isFocused && color)}>
          {children}
        </Animated.Text>
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
  const pendingFocusedIndexRef = useRef<{ index: number; color: string } | null>(null);

  const setTabLayout = useCallback(
    (index: number, layout: TabLayout) => {
      tabLayoutsRef.current.set(index, layout);

      // If we have a pending focused index and this is its layout, initialize the indicator
      if (!isInitialized && pendingFocusedIndexRef.current?.index === index) {
        indicatorX.value = layout.x;
        indicatorWidth.value = layout.width;
        setIndicatorColor(pendingFocusedIndexRef.current.color);
        setIsInitialized(true);
        pendingFocusedIndexRef.current = null;
      }
    },
    [isInitialized, indicatorX, indicatorWidth]
  );

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
          pendingFocusedIndexRef.current = null;
        } else {
          // Subsequent renders - animate
          indicatorX.value = withSpring(layout.x, springConfig);
          indicatorWidth.value = withSpring(layout.width, springConfig);
        }
      } else if (!isInitialized) {
        // Layout not ready yet, store for later
        pendingFocusedIndexRef.current = { index, color };
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
        className="w-full flex-row items-center justify-center rounded-t-lg border-b border-background-100 p-2">
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
