'use client';

import { useState } from 'react';

const profileData = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  bio: 'AI enthusiast and indie developer. I build tools that help people work smarter. Open to collaborations and feedback.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  twitter: 'johndoe',
  github: 'johndoe',
  joinedAt: '2024-06-12',
  avatar: 'JD',
  role: 'Developer',
  toolsPublished: 9,
  totalViews: '23.5k',
  avgRating: 4.8,
  savedTools: 24,
};

const tabs = ['General', 'Security', 'Notifications', 'Danger Zone'];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('General');
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: profileData.name,
    username: profileData.username,
    email: profileData.email,
    bio: profileData.bio,
    location: profileData.location,
    website: profileData.website,
    twitter: profileData.twitter,
    github: profileData.github,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    reviewApproved: true,
    reviewRejected: true,
    newComment: true,
    newReview: false,
    newsletter: false,
    productUpdates: true,
  });

  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handleSave = () => {
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = (disabled = false): React.CSSProperties => ({
    backgroundColor: disabled ? 'var(--color-bg-secondary)' : 'var(--color-bg-tertiary)',
    border: '1px solid var(--color-border)',
    color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
    cursor: disabled ? 'not-allowed' : 'text',
  });

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

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-center justify-between">

        {saved && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg animate-fade-in"
            style={{
              backgroundColor: 'rgba(138, 18, 18, 0.12)',
              border: '1px solid var(--color-primary)',
            }}
          >
            <svg className="w-4 h-4" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-primary-light)' }}>
              Changes saved
            </span>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div style={sectionStyle}>
        <div className="flex items-start gap-5 flex-wrap">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                color: 'var(--color-text-primary)',
              }}
            >
              {profileData.avatar}
            </div>
            {isEditing && (
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '2px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'var(--color-primary-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
                title="Change avatar"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {form.name}
              </h2>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: 'rgba(138, 18, 18, 0.12)',
                  color: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary)',
                }}
              >
                {profileData.role}
              </span>
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              @{form.username}
            </p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {form.bio}
            </p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {form.location && (
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {form.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {new Date(profileData.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shrink-0"
            style={
              isEditing
                ? {
                    background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                    color: 'var(--color-text-primary)',
                  }
                : {
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }
            }
            onMouseEnter={(e) => {
              if (!isEditing) {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.borderColor = 'var(--color-border-light)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isEditing) {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }
            }}
          >
            {isEditing ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {[
            { label: 'Tools Published', value: profileData.toolsPublished },
            { label: 'Total Views', value: profileData.totalViews },
            { label: 'Avg. Rating', value: profileData.avgRating },
            { label: 'Saved Tools', value: profileData.savedTools },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
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
              color: activeTab === tab
                ? tab === 'Danger Zone' ? 'var(--color-error)' : 'var(--color-text-primary)'
                : 'var(--color-text-muted)',
              border: activeTab === tab ? '1px solid var(--color-border)' : '1px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── GENERAL TAB ── */}
      {activeTab === 'General' && (
        <div className="space-y-4 animate-fade-in">

          {/* Personal Info */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Username</label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    @
                  </span>
                  <input
                    type="text"
                    value={form.username}
                    disabled={!isEditing}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    style={{ ...inputStyle(!isEditing), paddingLeft: '1.75rem' }}
                    onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label style={labelStyle}>Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  style={{ ...inputStyle(!isEditing), resize: 'vertical', minHeight: '80px' }}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Location</label>
                <input
                  type="text"
                  value={form.location}
                  disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Website</label>
                <input
                  type="url"
                  value={form.website}
                  disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Social Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  key: 'twitter',
                  label: 'X / Twitter',
                  prefix: 'x.com/',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  key: 'github',
                  label: 'GitHub',
                  prefix: 'github.com/',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <div key={social.key}>
                  <label style={labelStyle}>{social.label}</label>
                  <div className="flex items-center">
                    <div
                      className="flex items-center gap-2 px-3 shrink-0 text-xs"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderTop: '1px solid var(--color-border)',
                        borderBottom: '1px solid var(--color-border)',
                        borderLeft: '1px solid var(--color-border)',
                        borderRight: 'none',
                        color: 'var(--color-text-muted)',
                        height: '2.25rem',
                        borderRadius: '0.5rem 0 0 0.5rem',
                      }}
                    >
                      <span style={{ color: 'var(--color-text-muted)' }}>{social.icon}</span>
                      {social.prefix}
                    </div>
                    <input
                      type="text"
                      value={(form as any)[social.key]}
                      disabled={!isEditing}
                      onChange={(e) => setForm({ ...form, [social.key]: e.target.value })}
                      style={{
                        ...inputStyle(!isEditing),
                        borderRadius: '0 0.5rem 0.5rem 0',
                        borderLeft: 'none',
                      }}
                      onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action row */}
          {isEditing && (
            <div className="flex items-center gap-3 justify-end animate-fade-in">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
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
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                  color: 'var(--color-text-primary)',
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── SECURITY TAB ── */}
      {activeTab === 'Security' && (
        <div className="space-y-4 animate-fade-in">

          {/* Change Password */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Change Password
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'current', label: 'Current Password' },
                { key: 'newPass', label: 'New Password' },
                { key: 'confirm', label: 'Confirm New Password' },
              ].map((field) => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={(passwords as any)[field.key]}
                    onChange={(e) => setPasswords({ ...passwords, [field.key]: e.target.value })}
                    style={inputStyle()}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                  color: 'var(--color-text-primary)',
                }}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div style={sectionStyle}>
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Active Sessions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {[
                { device: 'Chrome on macOS', location: 'San Francisco, CA', time: 'Active now', current: true },
                { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false },
                { device: 'Firefox on Windows', location: 'New York, NY', time: '3 days ago', current: false },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: `1px solid ${session.current ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                    >
                      <svg className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                          {session.device}
                        </p>
                        {session.current && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                            style={{
                              backgroundColor: 'rgba(138, 18, 18, 0.12)',
                              color: 'var(--color-primary-light)',
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {session.location} · {session.time}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      className="text-xs font-medium ml-2 shrink-0 transition-colors"
                      style={{ color: 'var(--color-error)' }}
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── NOTIFICATIONS TAB ── */}
      {activeTab === 'Notifications' && (
        <div style={sectionStyle} className="animate-fade-in">
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Email Notifications
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            {[
              { key: 'reviewApproved', label: 'Tool approved', desc: 'When your submitted tool gets approved by admin' },
              { key: 'reviewRejected', label: 'Tool rejected', desc: 'When your submitted tool is rejected with feedback' },
              { key: 'newComment', label: 'New comment', desc: 'When someone comments on your tool' },
              { key: 'newReview', label: 'New review', desc: 'When someone leaves a rating or review' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Weekly roundup of top tools and platform news' },
              { key: 'productUpdates', label: 'Product updates', desc: 'New features and improvements to the platform' },
            ].map((item, i, arr) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-3"
                style={{
                  borderBottom: i < arr.length - 1 && !(i === arr.length - 2 && arr.length % 2 === 0)
                    ? '1px solid var(--color-border)'
                    : 'none',
                }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {item.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
                {/* Toggle */}
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, [item.key]: !(notifications as any)[item.key] })
                  }
                  className="shrink-0 ml-6"
                  style={{
                    width: '2.5rem',
                    height: '1.375rem',
                    backgroundColor: (notifications as any)[item.key]
                      ? 'var(--color-primary)'
                      : 'var(--color-bg-tertiary)',
                    border: `1px solid ${(notifications as any)[item.key] ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                    borderRadius: '9999px',
                    transition: 'background-color 0.2s',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: (notifications as any)[item.key] ? 'calc(100% - 18px)' : '2px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-text-primary)',
                      transition: 'left 0.2s',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DANGER ZONE TAB ── */}
      {activeTab === 'Danger Zone' && (
        <div className="space-y-4 animate-fade-in">

          {/* Export data */}
          <div style={sectionStyle}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Export Your Data
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Download a copy of all your tools, reviews, and account data in JSON format.
                </p>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-all"
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
                Export Data
              </button>
            </div>
          </div>

          {/* Delete account */}
          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: 'rgba(220, 38, 38, 0.04)',
              border: '1px solid rgba(220, 38, 38, 0.25)',
            }}
          >
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-error)' }}>
              Delete Account
            </h3>
            <p className="text-xs mt-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Permanently delete your account and all associated data including tools, reviews, and profile
              information. This action{' '}
              <span style={{ color: 'var(--color-text-secondary)' }}>cannot be undone</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label style={{ ...labelStyle, color: 'var(--color-error)' }}>
                  Type <span style={{ fontFamily: 'monospace' }}>DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  style={{
                    ...inputStyle(),
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-error)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)'; }}
                />
              </div>
              <div>
                <button
                  disabled={deleteConfirm !== 'DELETE'}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full"
                  style={{
                    backgroundColor: deleteConfirm === 'DELETE' ? 'var(--color-error)' : 'var(--color-bg-tertiary)',
                    color: deleteConfirm === 'DELETE' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    border: `1px solid ${deleteConfirm === 'DELETE' ? 'var(--color-error)' : 'var(--color-border)'}`,
                    cursor: deleteConfirm === 'DELETE' ? 'pointer' : 'not-allowed',
                    opacity: deleteConfirm === 'DELETE' ? 1 : 0.5,
                  }}
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}