import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function SettingsScreen({ navigation }) {
  const { state, updateSettings } = useApp();
  const { settings } = state;

  const SettingSlider = ({ label, value, unit, min, max, step = 1, onDecrease, onIncrease, color = '#6C63FF' }) => (
    <View style={styles.sliderRow}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <View style={styles.sliderControls}>
        <TouchableOpacity
          style={[styles.sliderBtn, { borderColor: color }]}
          onPress={onDecrease}
          disabled={value <= min}
        >
          <Ionicons name="remove" size={18} color={value <= min ? '#333' : color} />
        </TouchableOpacity>
        <View style={styles.sliderValueWrap}>
          <Text style={[styles.sliderValue, { color }]}>{value}</Text>
          <Text style={styles.sliderUnit}>{unit}</Text>
        </View>
        <TouchableOpacity
          style={[styles.sliderBtn, { borderColor: color }]}
          onPress={onIncrease}
          disabled={value >= max}
        >
          <Ionicons name="add" size={18} color={value >= max ? '#333' : color} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Eye Reset Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconWrap}>
            <Ionicons name="eye-outline" size={22} color="#6C63FF" />
          </View>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Eye Reset</Text>
            <Text style={styles.sectionSub}>Based on the 20-20-20 rule</Text>
          </View>
          <Switch
            value={settings.eyeResetEnabled}
            onValueChange={(val) => updateSettings({ eyeResetEnabled: val })}
            trackColor={{ false: '#1C1C2E', true: 'rgba(108, 99, 255, 0.4)' }}
            thumbColor={settings.eyeResetEnabled ? '#6C63FF' : '#555'}
          />
        </View>

        {settings.eyeResetEnabled && (
          <View style={styles.sectionContent}>
            <SettingSlider
              label="Screen time before lock"
              value={settings.eyeScrollInterval}
              unit="min"
              min={5}
              max={120}
              step={5}
              onDecrease={() =>
                updateSettings({ eyeScrollInterval: Math.max(5, settings.eyeScrollInterval - 5) })
              }
              onIncrease={() =>
                updateSettings({ eyeScrollInterval: Math.min(120, settings.eyeScrollInterval + 5) })
              }
            />
            <SettingSlider
              label="Look-away duration"
              value={settings.eyeLookAwayDuration}
              unit="sec"
              min={10}
              max={120}
              step={5}
              onDecrease={() =>
                updateSettings({ eyeLookAwayDuration: Math.max(10, settings.eyeLookAwayDuration - 5) })
              }
              onIncrease={() =>
                updateSettings({ eyeLookAwayDuration: Math.min(120, settings.eyeLookAwayDuration + 5) })
              }
            />
            <View style={styles.defaultNote}>
              <Ionicons name="information-circle-outline" size={14} color="#555566" />
              <Text style={styles.defaultNoteText}>
                Default: 20 min scrolling → 20 sec looking away (20-20-20 rule)
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Walking Reset Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIconWrap, { backgroundColor: 'rgba(0, 210, 140, 0.12)' }]}>
            <Ionicons name="walk-outline" size={22} color="#00D28C" />
          </View>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Walk Reset</Text>
            <Text style={styles.sectionSub}>Get moving to unlock your apps</Text>
          </View>
          <Switch
            value={settings.walkResetEnabled}
            onValueChange={(val) => updateSettings({ walkResetEnabled: val })}
            trackColor={{ false: '#1C1C2E', true: 'rgba(0, 210, 140, 0.4)' }}
            thumbColor={settings.walkResetEnabled ? '#00D28C' : '#555'}
          />
        </View>

        {settings.walkResetEnabled && (
          <View style={styles.sectionContent}>
            <SettingSlider
              label="Screen time before lock"
              value={settings.walkScrollInterval}
              unit="min"
              min={5}
              max={180}
              step={5}
              color="#00D28C"
              onDecrease={() =>
                updateSettings({ walkScrollInterval: Math.max(5, settings.walkScrollInterval - 5) })
              }
              onIncrease={() =>
                updateSettings({ walkScrollInterval: Math.min(180, settings.walkScrollInterval + 5) })
              }
            />
            <SettingSlider
              label="Steps required"
              value={settings.walkStepCount}
              unit="steps"
              min={20}
              max={500}
              step={10}
              color="#00D28C"
              onDecrease={() =>
                updateSettings({ walkStepCount: Math.max(20, settings.walkStepCount - 10) })
              }
              onIncrease={() =>
                updateSettings({ walkStepCount: Math.min(500, settings.walkStepCount + 10) })
              }
            />
            <View style={styles.defaultNote}>
              <Ionicons name="information-circle-outline" size={14} color="#555566" />
              <Text style={styles.defaultNoteText}>
                100 steps ≈ 1 minute of walking
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Monitored Apps */}
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('AppSelector')}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIconWrap, { backgroundColor: 'rgba(255, 107, 53, 0.12)' }]}>
            <Ionicons name="apps-outline" size={22} color="#FF6B35" />
          </View>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>Monitored Apps</Text>
            <Text style={styles.sectionSub}>
              {settings.monitoredApps.length} app{settings.monitoredApps.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#8E8E93" />
        </View>
      </TouchableOpacity>

      {/* How It Works */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIconWrap, { backgroundColor: 'rgba(255, 214, 10, 0.12)' }]}>
            <Ionicons name="help-circle-outline" size={22} color="#FFD60A" />
          </View>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>How It Works</Text>
          </View>
        </View>
        <View style={styles.howItWorks}>
          <View style={styles.howStep}>
            <View style={styles.howStepNum}>
              <Text style={styles.howStepNumText}>1</Text>
            </View>
            <Text style={styles.howStepText}>
              Choose which apps to monitor and enable eye/walk resets
            </Text>
          </View>
          <View style={styles.howStep}>
            <View style={styles.howStepNum}>
              <Text style={styles.howStepNumText}>2</Text>
            </View>
            <Text style={styles.howStepText}>
              Tap "Start Protection" on the home screen
            </Text>
          </View>
          <View style={styles.howStep}>
            <View style={styles.howStepNum}>
              <Text style={styles.howStepNumText}>3</Text>
            </View>
            <Text style={styles.howStepText}>
              When your screen time limit hits, your selected apps lock
            </Text>
          </View>
          <View style={styles.howStep}>
            <View style={styles.howStepNum}>
              <Text style={styles.howStepNumText}>4</Text>
            </View>
            <Text style={styles.howStepText}>
              Complete the required reset (look away / walk) to unlock
            </Text>
          </View>
        </View>
      </View>

      {/* Camera Permission Note */}
      <View style={styles.permNote}>
        <Ionicons name="camera-outline" size={16} color="#555566" />
        <Text style={styles.permNoteText}>
          Eye Reset uses your front camera to verify you're looking away. Camera data stays on-device and is never stored or transmitted.
        </Text>
      </View>

      <View style={styles.permNote}>
        <Ionicons name="fitness-outline" size={16} color="#555566" />
        <Text style={styles.permNoteText}>
          Walk Reset uses your device's built-in pedometer. No GPS tracking is used.
        </Text>
      </View>

      {/* Version */}
      <Text style={styles.version}>StrideReset v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  section: {
    backgroundColor: '#13131F',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1C1C2E',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  sectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(108, 99, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleWrap: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#1C1C2E',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  sliderLabel: {
    flex: 1,
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  sliderControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderValueWrap: {
    alignItems: 'center',
    minWidth: 60,
  },
  sliderValue: {
    fontSize: 20,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  sliderUnit: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: -2,
  },
  defaultNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1C1C2E',
  },
  defaultNoteText: {
    flex: 1,
    color: '#555566',
    fontSize: 12,
    lineHeight: 17,
  },
  howItWorks: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  howStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  howStepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 214, 10, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  howStepNumText: {
    color: '#FFD60A',
    fontSize: 12,
    fontWeight: '700',
  },
  howStepText: {
    flex: 1,
    color: '#8E8E93',
    fontSize: 13,
    lineHeight: 19,
  },
  permNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  permNoteText: {
    flex: 1,
    color: '#555566',
    fontSize: 12,
    lineHeight: 17,
  },
  version: {
    textAlign: 'center',
    color: '#333344',
    fontSize: 12,
    marginTop: 16,
  },
});
