import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { FormField } from '@/components/FormField';
import { StatusMessage } from '@/components/StatusMessage';
import { COLORS } from '@/constants/theme';
import { signIn } from '@/lib/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setError(null);
    setLoading(true);
    const { error: authError } = await signIn(email.trim(), password);
    setLoading(false);
    if (authError) setError(authError.message);
    else router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.brandMark}><View style={styles.brandDot} /></View>
          <View style={styles.form}>
            <Text accessibilityRole="header" style={styles.title}>Sign in</Text>
            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="current-password"
              textContentType="password"
              onSubmitEditing={handleLogin}
            />
            {error ? <StatusMessage text={error} /> : null}
            <AppButton label="Sign in" onPress={handleLogin} loading={loading} />
            <Link href="/register" asChild>
              <Text accessibilityRole="link" style={styles.link}>Create account</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 18 },
  brandMark: { width: 72, height: 16, alignSelf: 'center', borderRadius: 8, backgroundColor: COLORS.primary, justifyContent: 'center', paddingHorizontal: 6 },
  brandDot: { width: 12, height: 12, alignSelf: 'flex-end', borderRadius: 6, backgroundColor: COLORS.accent },
  form: { width: '100%', maxWidth: 460, alignSelf: 'center', gap: 18, padding: 22, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card },
  title: { color: COLORS.primaryStrong, fontSize: 32, fontWeight: '800', marginBottom: 6 },
  link: { minHeight: 48, padding: 12, textAlign: 'center', color: COLORS.primary, fontSize: 15, fontWeight: '800', textDecorationLine: 'underline' },
});
