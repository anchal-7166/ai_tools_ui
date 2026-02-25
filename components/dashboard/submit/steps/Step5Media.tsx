'use client';

import { cardBase, Input } from '..';
import { FormData, Integration, Screenshot } from '../renders/types';

interface Props {
  form: FormData;
  addScreenshot:    () => void;
  setScreenshot:    (idx: number, patch: Partial<Screenshot>) => void;
  removeScreenshot: (idx: number) => void;
  addIntegration:    () => void;
  setIntegration:    (idx: number, patch: Partial<Integration>) => void;
  removeIntegration: (idx: number) => void;
}

export default function Step5Media({
  form,
  addScreenshot, setScreenshot, removeScreenshot,
  addIntegration, setIntegration, removeIntegration,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">

      {/* ── Screenshots ─────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3 sm:gap-4" style={cardBase}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Screenshots</h2>
            <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Up to 10. First = hero image.</p>
          </div>
          {form.screenshots.length < 10 && (
            <button type="button" onClick={addScreenshot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold self-start hover:opacity-90"
              style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Screenshot
            </button>
          )}
        </div>

        {form.screenshots.length === 0
          ? <div className="flex flex-col items-center justify-center py-8 rounded-xl"
              style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)' }}>
              <svg className="w-7 h-7 sm:w-8 sm:h-8 mb-2" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>No screenshots yet</p>
              <p className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Add up to 10 via URL</p>
            </div>
          : <div className="flex flex-col gap-2 sm:gap-3">
              {form.screenshots.map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl items-start"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
                  <div className="w-full sm:w-20 h-12 sm:h-14 rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                    {s.url
                      ? <img src={s.url} alt="" className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      : `#${i + 1}`}
                  </div>
                  <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input value={s.url} onChange={v => setScreenshot(i, { url: v })} placeholder="Image URL" />
                    <Input value={s.caption ?? ''} onChange={v => setScreenshot(i, { caption: v })} placeholder="Caption (optional)" />
                  </div>
                  <button type="button" onClick={() => removeScreenshot(i)}
                    className="p-1 sm:p-1.5 rounded-lg shrink-0 self-start"
                    style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
        }
      </div>

      {/* ── Integrations ─────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3 sm:gap-4" style={cardBase}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Integrations</h2>
            <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Third-party services (up to 20, optional).</p>
          </div>
          {form.integrations.length < 20 && (
            <button type="button" onClick={addIntegration}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold self-start hover:opacity-90"
              style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Integration
            </button>
          )}
        </div>

        {form.integrations.length === 0
          ? <div className="flex flex-col items-center justify-center py-8 rounded-xl"
              style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)' }}>
              <svg className="w-7 h-7 sm:w-8 sm:h-8 mb-2" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>No integrations yet</p>
              <p className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Optional but recommended</p>
            </div>
          : <div className="flex flex-col gap-2 sm:gap-3">
              {form.integrations.map((intg, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl flex flex-col gap-2 sm:gap-3"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                      Integration {i + 1}
                    </span>
                    <button type="button" onClick={() => removeIntegration(i)}
                      className="p-1 rounded" style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <Input value={intg.name} onChange={v => setIntegration(i, { name: v })} placeholder="Name (e.g. Slack) *" />
                    <Input value={intg.url ?? ''} onChange={v => setIntegration(i, { url: v })} placeholder="URL (optional)" />
                    <Input value={intg.description ?? ''} onChange={v => setIntegration(i, { description: v })} placeholder="Short description" />
                    <Input value={intg.logo ?? ''} onChange={v => setIntegration(i, { logo: v })} placeholder="Logo URL (optional)" />
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}