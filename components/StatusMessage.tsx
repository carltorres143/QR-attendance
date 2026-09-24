import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/theme';

export function StatusMessage({ text, success = false }: { text: string; success?: boolean }) {
  return (
    <View accessibilityLiveRegion="polite" style={[styles.box, success ? styles.successBox : styles.errorBox]}>
      <Ionicons name={success ? 'checkmark-circle-outline' : 'alert-circle-outline'} size={21} color={success ? COLORS.success : COLORS.danger} />
      <Text style={[styles.text, success ? styles.successText : styles.errorText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  successBox: { borderColor: COLORS.success, backgroundColor: COLORS.successSoft },
  errorBox: { borderColor: COLORS.danger, backgroundColor: COLORS.dangerSoft },
  text: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  successText: { color: COLORS.success },
  errorText: { color: COLORS.danger },
});
