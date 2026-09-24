import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/theme';

type Props = PropsWithChildren<{
  title: string;
  action?: ReactNode;
  scroll?: boolean;
}>;

export function Screen({ title, action, scroll = true, children }: Props) {
  const content = (
    <>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View style={styles.accent} />
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
        </View>
        {action}
      </View>
      {children}
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill]}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: 20, paddingBottom: 36, gap: 20 },
  fill: { flex: 1 },
  header: {
    minHeight: 72,
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 4,
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: COLORS.primaryStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  accent: { width: 8, height: 32, borderRadius: 4, backgroundColor: COLORS.accent },
  title: { color: COLORS.inverted, fontSize: 28, lineHeight: 34, fontWeight: '800', letterSpacing: -0.4 },
});
