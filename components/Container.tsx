import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'android')
    return <SafeAreaView className="bg-background flex flex-1 px-4">{children}</SafeAreaView>;

  return <View className="flex flex-1">{children}</View>;
};
