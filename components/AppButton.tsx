import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { COLORS } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

type Props = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export function AppButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: Props) {
  const blocked = disabled || loading;
  const primary = variant === 'primary';
  const iconColor = primary ? COLORS.accent : variant === 'danger' ? COLORS.danger : COLORS.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: blocked, busy: loading }}
      disabled={blocked}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        primary ? styles.primary : styles.secondary,
        variant === 'danger' && styles.danger,
        blocked && styles.disabled,
        pressed && !blocked && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={primary ? COLORS.accent : COLORS.primary} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={20} color={iconColor} /> : null}
          <Text style={[styles.label, primary && styles.primaryLabel, variant === 'danger' && styles.dangerLabel]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryStrong,
    shadowColor: COLORS.primaryStrong,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  secondary: { backgroundColor: COLORS.accentSoft, borderColor: COLORS.accentStrong },
  danger: { backgroundColor: COLORS.dangerSoft, borderColor: COLORS.danger, borderWidth: 1.5 },
  label: { color: COLORS.primaryStrong, fontSize: 16, fontWeight: '800' },
  primaryLabel: { color: COLORS.inverted },
  dangerLabel: { color: COLORS.danger },
  disabled: { opacity: 0.42 },
  pressed: { opacity: 0.72 },
});
