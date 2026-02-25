'use client';


import { cardBase, Field, Input, Select, inputCls } from '..';
import { EnumOption, FormData, PricingPlan } from '../renders/types';

interface Props {
  form: FormData;
  setPlan:       (id: string, patch: Partial<PricingPlan>) => void;
  addPlan:       () => void;
  removePlan:    (id: string) => void;
  addFeature:    (planId: string) => void;
  setFeature:    (planId: string, idx: number, val: string) => void;
  removeFeature: (planId: string, idx: number) => void;
  // Dynamic enum options from GET /enums
  pricingTypeOptions:  EnumOption[];
  billingCycleOptions: EnumOption[];
}

// Plans that show price / billing fields
const PAID_TYPES = new Set(['SUBSCRIPTION', 'ONE_TIME', 'PAID', 'USAGE_BASED']);

export default function Step4Pricing({
  form, setPlan, addPlan, removePlan, addFeature, setFeature, removeFeature,
  pricingTypeOptions, billingCycleOptions,
}: Props) {
  return (
    <div className="p-4 sm:p-6 rounded-xl flex flex-col gap-4 sm:gap-5" style={cardBase}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Pricing Plans</h2>
          <p className="text-[10px] sm:text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>At least one plan required.</p>
        </div>
        <button type="button" onClick={addPlan}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold self-start hover:opacity-90"
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Plan
        </button>
      </div>

      {/* Plans list */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {form.pricingPlans.map((plan, pi) => {
          const showPriceFields = PAID_TYPES.has(plan.type);
          const showBillingCycle = plan.type === 'SUBSCRIPTION';
          return (
            <div key={plan.id} className="rounded-xl p-3 sm:p-5 flex flex-col gap-3 sm:gap-4"
              style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>

              {/* Plan header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide"
                  style={{ color: 'var(--color-primary-light)' }}>Plan {pi + 1}</span>
                {form.pricingPlans.length > 1 && (
                  <button type="button" onClick={() => removePlan(plan.id)} className="p-1 sm:p-1.5 rounded-lg"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Plan fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <Field label="Plan Name" required>
                  <Input value={plan.name} onChange={v => setPlan(plan.id, { name: v })} placeholder="e.g. Pro" />
                </Field>

                {/* Type — from GET /enums/pricing-types */}
                <Field label="Type" required>
                  <Select value={plan.type} onChange={v => setPlan(plan.id, { type: v as any })}>
                    {pricingTypeOptions.map(pt => (
                      <option key={pt.value} value={pt.value}>{pt.label}</option>
                    ))}
                  </Select>
                </Field>

                {/* Price fields only for paid plan types */}
                {showPriceFields && (
                  <>
                    <Field label="Price">
                      <Input type="number" value={plan.price ?? ''}
                        onChange={v => setPlan(plan.id, { price: parseFloat(v) || 0 })} placeholder="0.00" />
                    </Field>
                    <Field label="Currency">
                      <Select value={plan.currency} onChange={v => setPlan(plan.id, { currency: v })}>
                        {['USD', 'EUR', 'GBP', 'INR', 'JPY'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </Field>

                    {/* Billing cycle — from GET /enums/billing-cycles */}
                    {showBillingCycle && (
                      <Field label="Billing Cycle">
                        <Select value={plan.billingCycle ?? ''}
                          onChange={v => setPlan(plan.id, { billingCycle: v as any || undefined })}>
                          <option value="">Select cycle</option>
                          {billingCycleOptions.map(bc => (
                            <option key={bc.value} value={bc.value}>{bc.label}</option>
                          ))}
                        </Select>
                      </Field>
                    )}

                    <Field label="Trial Days">
                      <Input type="number" value={plan.trialDays ?? ''}
                        onChange={v => setPlan(plan.id, { trialDays: parseInt(v) || undefined })} placeholder="e.g. 14" />
                    </Field>
                  </>
                )}

                <Field label="Monthly Requests">
                  <Input type="number" value={plan.monthlyRequests ?? ''}
                    onChange={v => setPlan(plan.id, { monthlyRequests: parseInt(v) || undefined })} placeholder="e.g. 10000" />
                </Field>
                <Field label="Storage Limit (GB)">
                  <Input type="number" value={plan.storageLimit ?? ''}
                    onChange={v => setPlan(plan.id, { storageLimit: parseInt(v) || undefined })} placeholder="e.g. 10" />
                </Field>
              </div>

              <Field label="Plan Description">
                <Input value={plan.description ?? ''}
                  onChange={v => setPlan(plan.id, { description: v })} placeholder="Brief description of what's included" />
              </Field>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    Features
                  </label>
                  <button type="button" onClick={() => addFeature(plan.id)}
                    className="text-[10px] sm:text-xs font-semibold hover:opacity-70"
                    style={{ color: 'var(--color-primary-light)' }}>
                    + Add Feature
                  </button>
                </div>
                {plan.features.length === 0
                  ? <p className="text-[10px] sm:text-xs py-1" style={{ color: 'var(--color-text-muted)' }}>
                      No features yet — click "+ Add Feature".
                    </p>
                  : <div className="flex flex-col gap-2">
                      {plan.features.map((feat, fi) => (
                        <div key={fi} className="flex gap-2">
                          <input value={feat} onChange={e => setFeature(plan.id, fi, e.target.value)}
                            placeholder={`Feature ${fi + 1}`}
                            style={{ ...inputCls, flex: 1 }}
                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                          />
                          <button type="button" onClick={() => removeFeature(plan.id, fi)}
                            className="p-1.5 sm:p-2 rounded-lg shrink-0"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}