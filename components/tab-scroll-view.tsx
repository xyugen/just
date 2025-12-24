import { useTabScroll } from '@/components/filter-tabs';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewProps } from 'react-native';

interface TabScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export const TabScrollView = ({ children, onScroll, ...props }: TabScrollViewProps) => {
  const { setScrolled } = useTabScroll();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrolled(offsetY > 0);

    // Call the parent's onScroll if provided
    onScroll?.(event);
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16} {...props}>
      {children}
    </ScrollView>
  );
};
