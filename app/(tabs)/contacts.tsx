import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DesignSystem from '@/constants/DesignSystem';

export default function ContactsScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Contacts Library</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Scanned Business Cards</ThemedText>
      </ThemedView>

      {/* Content */}
      <ThemedView style={styles.content}>
        <ThemedView style={styles.placeholderCard}>
          <ThemedText style={styles.placeholderIcon}>📇</ThemedText>
          <ThemedText style={styles.placeholderTitle}>No Contacts Yet</ThemedText>
          <ThemedText style={styles.placeholderText}>
            Scan your first business card to get started. Your contacts will appear here with search, filtering, and management capabilities.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: DesignSystem.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DesignSystem.colors.border,
  },
  headerTitle: {
    fontSize: DesignSystem.typography.fontSizes.xl,
    fontWeight: DesignSystem.typography.fontWeights.semibold,
    color: DesignSystem.colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: DesignSystem.typography.fontSizes.md,
    color: DesignSystem.colors.text.secondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DesignSystem.spacing.xl,
  },
  placeholderCard: {
    backgroundColor: DesignSystem.colors.surface,
    borderRadius: DesignSystem.borderRadius.lg,
    padding: DesignSystem.spacing.xl,
    alignItems: 'center',
    maxWidth: 300,
    ...DesignSystem.shadows.sm,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: DesignSystem.spacing.md,
  },
  placeholderTitle: {
    fontSize: DesignSystem.typography.fontSizes.lg,
    fontWeight: DesignSystem.typography.fontWeights.semibold,
    color: DesignSystem.colors.text.primary,
    marginBottom: DesignSystem.spacing.sm,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: DesignSystem.typography.fontSizes.md,
    color: DesignSystem.colors.text.secondary,
    textAlign: 'center',
    lineHeight: DesignSystem.typography.lineHeights.normal,
  },
});
