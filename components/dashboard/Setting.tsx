'use client';

import { useState } from 'react';

const tabs = ['Appearance', 'Privacy', 'API Access', 'Billing'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Appearance');

  // Appearance
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Privacy
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showEmail: false,
    showTools: true,
    allowIndexing: true,
    showActivity: false,
  });

  // API
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Key', key: 'sk-prod-••••••••••••••••3f9a', created: '2025-01-10', lastUsed: '2025-02-19', active: true },
    { id: 2, name: 'Development Key', key: 'sk-dev-••••••••••••••••8c2e', created: '2025-02-01', lastUsed: '2025-02-18', active: true },
    { id: 3, name: 'Testing Key', key: 'sk-test-••••••••••••••••1a4d', created: '2025-02-12', lastUsed: 'Never', active: false },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [revokeId, setRevokeId] = useState<number | null>(null);
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  // Billing
  const [plan] = useState('Pro');

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-tertiary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem',
    color: 'var(--color-text-muted)',
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    padding: '1.25rem',
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{
        width: '2.5rem',
        height: '1.375rem',
        backgroundColor: value ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
        border: `1px solid ${value ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
        borderRadius: '9999px',
        transition: 'background-color 0.2s',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: value ? 'calc(100% - 18px)' : '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-text-primary)',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );

  const SettingRow = ({
    label,
    desc,
    children,
    noBorder = false,
  }: {
    label: string;
    desc?: string;
    children: React.ReactNode;
    noBorder?: boolean;
  }) => (
    <div
      className="flex items-center justify-between gap-6 py-3"
      style={{ borderBottom: noBorder ? 'none' : '1px solid var(--color-border)' }}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const fakeKey = `sk-live-${'x'.repeat(16)}${Math.random().toString(36).slice(2, 6)}`;
    setCreatedKey(fakeKey);
    setApiKeys((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newKeyName,
        key: `sk-live-••••••••••••••••${fakeKey.slice(-4)}`,
        created: new Date().toISOString().slice(0, 10),
        lastUsed: 'Never',
        active: true,
      },
    ]);
    setNewKeyName('');
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Manage your platform preferences and configurations
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-lg"
        style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'var(--color-bg-card)' : 'transparent',
              color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              border: activeTab === tab ? '1px solid var(--color-border)' : '1px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── APPEARANCE TAB ── */}
      {activeTab === 'Appearance' && (
        <div className="space-y-4 animate-fade-in">

          {/* Theme */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['dark', 'light', 'system'] as const).map((t) => {
                const isSelected = theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className="relative p-4 rounded-lg text-left transition-all"
                    style={{
                      backgroundColor: isSelected ? 'rgba(138, 18, 18, 0.08)' : 'var(--color-bg-tertiary)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    }}
                  >
                    {/* Mini preview */}
                    <div
                      className="w-full h-12 rounded mb-2 overflow-hidden flex flex-col gap-1 p-1.5"
                      style={{
                        backgroundColor: t === 'light' ? '#f5f5f5' : t === 'system' ? '#1a1a2e' : '#000000',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div className="w-3/4 h-1.5 rounded-full" style={{ backgroundColor: t === 'light' ? '#d4d4d4' : '#333' }} />
                      <div className="w-1/2 h-1.5 rounded-full" style={{ backgroundColor: t === 'light' ? '#e5e5e5' : '#222' }} />
                      <div className="w-2/3 h-1.5 rounded-full" style={{ backgroundColor: t === 'light' ? '#e5e5e5' : '#222' }} />
                    </div>
                    <p
                      className="text-xs font-semibold capitalize"
                      style={{ color: isSelected ? 'var(--color-primary-light)' : 'var(--color-text-secondary)' }}
                    >
                      {t}
                    </p>
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        <svg className="w-2.5 h-2.5" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>Display</h3>
            <SettingRow label="Compact Mode" desc="Reduce spacing and padding across the UI">
              <Toggle value={compactMode} onChange={() => setCompactMode(!compactMode)} />
            </SettingRow>
            <SettingRow label="Animations" desc="Enable transitions and motion effects" noBorder>
              <Toggle value={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} />
            </SettingRow>
          </div>

          {/* Locale */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Locale</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="Europe/London">GMT (London)</option>
                  <option value="Europe/Paris">CET (Paris)</option>
                  <option value="Asia/Kolkata">IST (India)</option>
                  <option value="Asia/Tokyo">JST (Tokyo)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                color: 'var(--color-text-primary)',
              }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* ── PRIVACY TAB ── */}
      {activeTab === 'Privacy' && (
        <div className="space-y-4 animate-fade-in">

          {/* Visibility */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Profile Visibility
            </h3>
            <SettingRow label="Public profile" desc="Allow others to view your profile page">
              <Toggle value={privacy.showProfile} onChange={() => setPrivacy({ ...privacy, showProfile: !privacy.showProfile })} />
            </SettingRow>
            <SettingRow label="Show email address" desc="Display your email on your public profile">
              <Toggle value={privacy.showEmail} onChange={() => setPrivacy({ ...privacy, showEmail: !privacy.showEmail })} />
            </SettingRow>
            <SettingRow label="Show published tools" desc="List your tools on your public profile" noBorder>
              <Toggle value={privacy.showTools} onChange={() => setPrivacy({ ...privacy, showTools: !privacy.showTools })} />
            </SettingRow>
          </div>

          {/* Discovery */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Discovery
            </h3>
            <SettingRow label="Search engine indexing" desc="Allow search engines to index your profile and tools">
              <Toggle value={privacy.allowIndexing} onChange={() => setPrivacy({ ...privacy, allowIndexing: !privacy.allowIndexing })} />
            </SettingRow>
            <SettingRow label="Show activity feed" desc="Let others see when you save or review tools" noBorder>
              <Toggle value={privacy.showActivity} onChange={() => setPrivacy({ ...privacy, showActivity: !privacy.showActivity })} />
            </SettingRow>
          </div>

          {/* Data */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Data & Cookies
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              We use essential cookies to operate the platform and optional analytics cookies to improve your experience. You can manage your preferences below.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.borderColor = 'var(--color-border-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                Essential Only
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                  color: 'var(--color-text-primary)',
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── API ACCESS TAB ── */}
      {activeTab === 'API Access' && (
        <div className="space-y-4 animate-fade-in">

          {/* Info banner */}
          <div
            className="flex items-start gap-3 p-4 rounded-lg"
            style={{
              backgroundColor: 'rgba(138, 18, 18, 0.06)',
              border: '1px solid var(--color-primary)',
            }}
          >
            <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-primary-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              API keys grant programmatic access to your account. Keep them{' '}
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>secret</span> — never share or expose them in client-side code.
            </p>
          </div>

          {/* Create new key */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Create New API Key
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Key name (e.g. My App)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreateKey(); }}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              />
              <button
                onClick={handleCreateKey}
                disabled={!newKeyName.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold shrink-0 transition-all"
                style={{
                  background: newKeyName.trim()
                    ? 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))'
                    : 'var(--color-bg-tertiary)',
                  color: newKeyName.trim() ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  border: newKeyName.trim() ? 'none' : '1px solid var(--color-border)',
                  cursor: newKeyName.trim() ? 'pointer' : 'not-allowed',
                  opacity: newKeyName.trim() ? 1 : 0.5,
                }}
              >
                Generate
              </button>
            </div>

            {/* Newly created key display */}
            {createdKey && (
              <div
                className="mt-4 p-3 rounded-lg animate-fade-in"
                style={{
                  backgroundColor: 'rgba(138, 18, 18, 0.06)',
                  border: '1px solid var(--color-primary)',
                }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-primary-light)' }}>
                  Copy your key now — it won't be shown again.
                </p>
                <div className="flex items-center gap-2">
                  <code
                    className="flex-1 text-xs px-3 py-2 rounded-lg font-mono break-all"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {createdKey}
                  </code>
                  <button
                    onClick={() => { navigator.clipboard.writeText(createdKey); }}
                    className="p-2 rounded-lg transition-all shrink-0"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-muted)',
                      border: '1px solid var(--color-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.borderColor = 'var(--color-border-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                    }}
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCreatedKey(null)}
                    className="p-2 rounded-lg transition-all shrink-0"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-muted)',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-error)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                    }}
                    title="Dismiss"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Existing keys */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Your API Keys
            </h3>
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: `1px solid ${apiKey.active ? 'var(--color-border)' : 'var(--color-border)'}`,
                    opacity: apiKey.active ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Active dot */}
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: apiKey.active ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {apiKey.name}
                      </p>
                      <code
                        className="text-xs font-mono"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {apiKey.key}
                      </code>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-6 shrink-0 text-right">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Created</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{apiKey.created}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Last Used</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{apiKey.lastUsed}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setRevokeId(apiKey.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all"
                    style={{
                      backgroundColor: 'rgba(220, 38, 38, 0.08)',
                      color: 'var(--color-error)',
                      border: '1px solid rgba(220, 38, 38, 0.2)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)'; }}
                  >
                    Revoke
                  </button>
                </div>
              ))}

              {apiKeys.length === 0 && (
                <p className="text-sm py-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
                  No API keys yet. Generate one above.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── BILLING TAB ── */}
      {activeTab === 'Billing' && (
        <div className="space-y-4 animate-fade-in">

          {/* Current Plan */}
          <div style={sectionStyle}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  Current Plan
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {plan}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: 'rgba(138, 18, 18, 0.12)',
                      color: 'var(--color-primary-light)',
                      border: '1px solid var(--color-primary)',
                    }}
                  >
                    Active
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  $29/month · Renews March 20, 2026
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                    e.currentTarget.style.borderColor = 'var(--color-border-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  Cancel Plan
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Upgrade to Enterprise
                </button>
              </div>
            </div>

            {/* Plan features */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {[
                { label: 'Tools Published', value: '25', limit: '/ 25' },
                { label: 'API Requests', value: '50k', limit: '/ mo' },
                { label: 'Team Members', value: '5', limit: '/ 5' },
                { label: 'Storage', value: '10 GB', limit: '' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                  <p className="mt-1">
                    <span className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.value}</span>
                    {item.limit && (
                      <span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>{item.limit}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div style={sectionStyle}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Payment Method</h3>
              <button
                className="text-xs font-medium transition-colors"
                style={{ color: 'var(--color-primary-light)' }}
              >
                + Add new
              </button>
            </div>
            <div
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-primary)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-7 rounded flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                >
                  VISA
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Visa ending in 4242</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Expires 08/2027</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(138, 18, 18, 0.12)',
                    color: 'var(--color-primary-light)',
                  }}
                >
                  Default
                </span>
                <button
                  className="text-xs font-medium transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-error)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Billing history */}
          <div style={sectionStyle}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Billing History</h3>
              <button
                className="text-xs font-medium flex items-center gap-1 transition-colors"
                style={{ color: 'var(--color-primary-light)' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
            <div className="space-y-0">
              {[
                { date: 'Feb 20, 2026', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'Paid' },
                { date: 'Jan 20, 2026', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'Paid' },
                { date: 'Dec 20, 2025', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'Paid' },
                { date: 'Nov 20, 2025', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'Paid' },
              ].map((invoice, i, arr) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{invoice.desc}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(138, 18, 18, 0.08)',
                        color: 'var(--color-primary-light)',
                        border: '1px solid var(--color-primary)',
                      }}
                    >
                      {invoice.status}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {invoice.amount}
                    </span>
                    <button
                      className="text-xs font-medium flex items-center gap-1 transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revoke API Key Modal */}
      {revokeId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setRevokeId(null)}
        >
          <div
            className="w-full max-w-md rounded-xl p-6 space-y-4 animate-fade-in"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Revoke API Key?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {apiKeys.find((k) => k.id === revokeId)?.name}
                </p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              This key will be <strong style={{ color: 'var(--color-text-primary)' }}>immediately disabled</strong>. Any apps using it will lose access. This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setRevokeId(null)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setApiKeys((prev) => prev.filter((k) => k.id !== revokeId));
                  setRevokeId(null);
                }}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Revoke Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}