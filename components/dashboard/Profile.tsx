'use client';

import { useChangePassword, useDeactivateAccount, useMe, useUpdateMe } from '@/lib/hooks/use-user';
import { useState, useEffect } from 'react';


const tabs = ['General', 'Security', 'Notifications', 'Danger Zone'];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('General');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const { data: me, isLoading } = useMe();
  const { mutate: updateMe, isPending: isSaving } = useUpdateMe();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
  const { mutate: deactivate, isPending: isDeactivating } = useDeactivateAccount();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    industry: '',
    jobRole: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const [notifications, setNotifications] = useState({
    reviewApproved: true,
    reviewRejected: true,
    newComment: true,
    newReview: false,
    newsletter: false,
    productUpdates: true,
  });

  // Populate form when data loads
  useEffect(() => {
    if (me) {
      setForm({
        firstName: me.firstName ?? '',
        lastName: me.lastName ?? '',
        username: me.username ?? '',
        email: me.email ?? '',
        bio: me.bio ?? '',
        industry: me.industry ?? '',
        jobRole: me.jobRole ?? '',
      });
    }
  }, [me]);

  const handleSave = () => {
    updateMe(
      {
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        username: form.username || undefined,
        bio: form.bio || undefined,
        industry: form.industry || undefined,
        jobRole: form.jobRole || undefined,
      },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleCancel = () => {
    if (me) {
      setForm({
        firstName: me.firstName ?? '',
        lastName: me.lastName ?? '',
        username: me.username ?? '',
        email: me.email ?? '',
        bio: me.bio ?? '',
        industry: me.industry ?? '',
        jobRole: me.jobRole ?? '',
      });
    }
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    setPasswordError('');
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwords.newPass.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    changePassword(
      { currentPassword: passwords.current, newPassword: passwords.newPass },
      { onSuccess: () => setPasswords({ current: '', newPass: '', confirm: '' }) }
    );
  };

  const displayName = me ? `${me.firstName ?? ''} ${me.lastName ?? ''}`.trim() || me.username || me.email : '—';
  const avatarLetter = displayName.charAt(0).toUpperCase();

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

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-44 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
        <div className="h-10 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
        <div className="h-64 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">

      {/* ── Profile Card ── */}
      <div style={sectionStyle}>
        <div className="flex items-start gap-4 sm:gap-5 flex-wrap">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-red-800  flex items-center justify-center text-xl sm:text-2xl font-bold"
              style={{
                // background: me?.avatar
                //   ? undefined
                //   : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                // color: 'var(--color-text-primary)',
                backgroundImage: me?.avatar ? `url(${me.avatar})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!me?.avatar && avatarLetter}
            </div>
            {isEditing && (
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
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
              <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {displayName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: 'rgba(138,18,18,0.12)', color: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}>
                {me?.role ?? 'USER'}
              </span>
              {me?.isVerified && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: 'rgb(34,197,94)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            {me?.username && (
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                @{me.username}
              </p>
            )}

            {me?.bio && (
              <p className="text-xs sm:text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {me.bio}
              </p>
            )}

            <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 flex-wrap">
              {me?.jobRole && (
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {me.jobRole}
                </span>
              )}
              {me?.industry && (
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {me.industry}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {me?.createdAt ? new Date(me.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
              </span>
            </div>
          </div>

          {/* Edit / Save toggle */}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isSaving}
            className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0"
            style={
              isEditing
                ? { background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff', opacity: isSaving ? 0.7 : 1 }
                : { backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }
            }
          >
            {isEditing ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isSaving ? 'Saving…' : 'Save Changes'}
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

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-5 pt-4 sm:pt-5"
          style={{ borderTop: '1px solid var(--color-border)' }}>
          {[
            { label: 'Member Since', value: me?.createdAt ? new Date(me.createdAt).getFullYear() : '—' },
            { label: 'Last Login', value: me?.lastLoginAt ? new Date(me.lastLoginAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A' },
            { label: 'Industry', value: me?.industry ?? '—' },
            { label: 'Job Role', value: me?.jobRole ?? '—' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-sm sm:text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 rounded-lg overflow-x-auto no-scrollbar"
        style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-md text-[10px] sm:text-xs font-semibold transition-all whitespace-nowrap shrink-0"
            style={{
              backgroundColor: activeTab === tab ? 'var(--color-bg-card)' : 'transparent',
              color: activeTab === tab
                ? tab === 'Danger Zone' ? 'var(--color-error)' : 'var(--color-text-primary)'
                : 'var(--color-text-muted)',
              border: activeTab === tab ? '1px solid var(--color-border)' : '1px solid transparent',
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── GENERAL TAB ── */}
      {activeTab === 'General' && (
        <div className="space-y-4 animate-fade-in">
          <div style={sectionStyle}>
            <h3 className="text-xs sm:text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" value={form.firstName} disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" value={form.lastName} disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--color-text-muted)' }}>@</span>
                  <input type="text" value={form.username} disabled={!isEditing}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    style={{ ...inputStyle(!isEditing), paddingLeft: '1.75rem' }}
                    onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={form.email} disabled
                  style={inputStyle(true)}
                  title="Email cannot be changed"
                />
                <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>Email cannot be changed.</p>
              </div>

              <div>
                <label style={labelStyle}>Industry</label>
                <input type="text" value={form.industry} disabled={!isEditing}
                  placeholder="e.g. Marketing, Development"
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Job Role</label>
                <input type="text" value={form.jobRole} disabled={!isEditing}
                  placeholder="e.g. Developer, Designer"
                  onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
                  style={inputStyle(!isEditing)}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label style={labelStyle}>Bio</label>
                <textarea rows={3} value={form.bio} disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  style={{ ...inputStyle(!isEditing), resize: 'vertical', minHeight: '80px' }}
                  onFocus={(e) => { if (isEditing) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center gap-3 justify-end animate-fade-in">
              <button onClick={handleCancel}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={isSaving}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff', opacity: isSaving ? 0.7 : 1 }}>
                {isSaving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── SECURITY TAB ── */}
      {activeTab === 'Security' && (
        <div className="space-y-4 animate-fade-in">
          <div style={sectionStyle}>
            <h3 className="text-xs sm:text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Change Password
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { key: 'current', label: 'Current Password' },
                { key: 'newPass', label: 'New Password' },
                { key: 'confirm', label: 'Confirm New Password' },
              ].map((field) => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input type="password" placeholder="••••••••"
                    value={(passwords as any)[field.key]}
                    onChange={(e) => setPasswords({ ...passwords, [field.key]: e.target.value })}
                    style={inputStyle()}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
              ))}
            </div>

            {passwordError && (
              <p className="text-xs mt-3" style={{ color: 'var(--color-error)' }}>{passwordError}</p>
            )}

            <div className="mt-4 flex justify-end">
              <button onClick={handleChangePassword} disabled={isChangingPassword}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                  color: '#fff',
                  opacity: isChangingPassword ? 0.7 : 1,
                }}>
                {isChangingPassword ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </div>

          {/* Account info snapshot */}
          <div style={sectionStyle}>
            <h3 className="text-xs sm:text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Account Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Account Status', value: me?.isActive ? 'Active' : 'Inactive' },
                { label: 'Email Verified', value: me?.isVerified ? 'Yes' : 'No' },
                { label: 'Account Created', value: me?.createdAt ? new Date(me.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—' },
                { label: 'Last Login', value: me?.lastLoginAt ? new Date(me.lastLoginAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── NOTIFICATIONS TAB ── */}
      {activeTab === 'Notifications' && (
        <div style={sectionStyle} className="animate-fade-in">
          <h3 className="text-xs sm:text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Email Notifications
          </h3>
          <div className="space-y-1">
            {[
              { key: 'reviewApproved', label: 'Tool approved', desc: 'When your submitted tool gets approved' },
              { key: 'reviewRejected', label: 'Tool rejected', desc: 'When your submitted tool is rejected with feedback' },
              { key: 'newComment', label: 'New comment', desc: 'When someone comments on your tool' },
              { key: 'newReview', label: 'New review', desc: 'When someone leaves a rating or review' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Weekly roundup of top tools and platform news' },
              { key: 'productUpdates', label: 'Product updates', desc: 'New features and improvements' },
            ].map((item, i, arr) => (
              <div key={item.key}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.label}</p>
                  <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !(notifications as any)[item.key] })}
                  className="shrink-0 ml-4 sm:ml-6"
                  style={{
                    width: '2.25rem', height: '1.25rem',
                    backgroundColor: (notifications as any)[item.key] ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                    border: `1px solid ${(notifications as any)[item.key] ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                    borderRadius: '9999px',
                    transition: 'background-color 0.2s',
                    position: 'relative',
                    cursor: 'pointer',
                  }}>
                  <span style={{
                    position: 'absolute', top: '2px',
                    left: (notifications as any)[item.key] ? 'calc(100% - 16px)' : '2px',
                    width: '12px', height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-text-primary)',
                    transition: 'left 0.2s',
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DANGER ZONE TAB ── */}
      {activeTab === 'Danger Zone' && (
        <div className="space-y-4 animate-fade-in">

          {/* Export */}
          <div style={sectionStyle}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Export Your Data</h3>
                <p className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Download a copy of all your tools, reviews, and account data in JSON format.
                </p>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-all"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}>
                Export Data
              </button>
            </div>
          </div>

          {/* Delete */}
          <div className="p-4 sm:p-5 rounded-lg"
            style={{ backgroundColor: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.25)' }}>
            <h3 className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-error)' }}>Deactivate Account</h3>
            <p className="text-[10px] sm:text-xs mt-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Deactivates your account and signs you out. Your data is preserved but your profile will be hidden.
              Type <span style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>DELETE</span> to confirm.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-end">
              <div>
                <label style={{ ...labelStyle, color: 'var(--color-error)' }}>
                  Type <span style={{ fontFamily: 'monospace' }}>DELETE</span> to confirm
                </label>
                <input type="text" value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  style={{ ...inputStyle(), backgroundColor: 'var(--color-bg-card)', border: '1px solid rgba(220,38,38,0.3)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-error)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'; }}
                />
              </div>
              <div>
                <button
                  disabled={deleteConfirm !== 'DELETE' || isDeactivating}
                  onClick={() => deactivate()}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full"
                  style={{
                    backgroundColor: deleteConfirm === 'DELETE' ? 'var(--color-error)' : 'var(--color-bg-tertiary)',
                    color: deleteConfirm === 'DELETE' ? '#fff' : 'var(--color-text-muted)',
                    border: `1px solid ${deleteConfirm === 'DELETE' ? 'var(--color-error)' : 'var(--color-border)'}`,
                    cursor: deleteConfirm === 'DELETE' ? 'pointer' : 'not-allowed',
                    opacity: deleteConfirm === 'DELETE' && !isDeactivating ? 1 : 0.5,
                  }}>
                  {isDeactivating ? 'Deactivating…' : 'Deactivate My Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}