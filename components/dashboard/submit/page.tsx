'use client';

import { useState } from 'react';
import FormNavigation from './FormNavigation';
import { useFormState }   from './hooks/useFormState';
import { useSubmitTool }  from './hooks/useSubmitTool';
import StepIndicator from './StepIndicator';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Details from './steps/Step2Details';
import Step3Categories from './steps/Step3Categories';
import Step4Pricing from './steps/Step4Pricing';
import Step5Media from './steps/Step5Media';
import Step6Review from './steps/Step6Review';


export default function SubmitToolPage() {

  // ── Form state (pure local state — no API calls) ──────────────────────
  const {
    step, setStep,
    form, set, toggleArr, resetForm,
    setPlan, addPlan, removePlan, addFeature, setFeature, removeFeature,
    addScreenshot, setScreenshot, removeScreenshot,
    addIntegration, setIntegration, removeIntegration,
    allValid, completeness,
  } = useFormState();

  // ── API data + submission mutation ────────────────────────────────────
  const {
    categories, tags, industries, useCases,
    platformTypeOptions, targetAudienceOptions,
    pricingTypeOptions, billingCycleOptions,
    taxonomyLoading,
    mutate, isPending, isSuccess, submitError,
    buildPayload, validateBeforeSubmit,
  } = useSubmitTool();

  // ── Pre-flight client-side errors (UUID validation etc.) ─────────────
  const [preflightErrors, setPreflightErrors] = useState<string[]>([]);

  // ── Handle submit — pre-flight check → build DTO → fire mutation ──────
  const handleSubmit = () => {
    if (!allValid || isPending) return;

    // Run client-side UUID validation BEFORE the API call.
    // Catches stale IDs that would be rejected by the backend @IsUUID() validators.
    const errors = validateBeforeSubmit(form);
    if (errors.length > 0) {
      setPreflightErrors(errors);
      return;
    }
    setPreflightErrors([]);

    const payload = buildPayload(form);
    mutate(payload);
  };

  // ── Success screen ────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
          <svg className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: '#fff' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Tool Submitted!
        </h2>
        <p className="text-xs sm:text-sm max-w-sm mb-6 sm:mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          <strong style={{ color: 'var(--color-primary-light)' }}>{form.name}</strong>{' '}
          has been sent for review. You'll hear back within 2–3 business days.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={resetForm}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
            Submit Another
          </button>
          <a href="/dashboard/pending"
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
            View Pending
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-5">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Submit a Tool
          </h1>
          <p className="text-xs sm:text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Fill in the details below. Your tool will be reviewed within 2–3 business days.
          </p>
        </div>

        {/* Completeness ring */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] sm:text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              Completeness
            </p>
            <p className="text-lg sm:text-xl font-bold" style={{ color: 'var(--color-primary-light)' }}>
              {completeness}%
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 relative shrink-0">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-bg-tertiary)" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-primary-light)" strokeWidth="4"
                strokeDasharray={`${(completeness / 100) * 113} 113`} strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Step Indicator ──────────────────────────────────────────────── */}
      <StepIndicator step={step} onStepClick={setStep} />

      {/* ── Active Step ─────────────────────────────────────────────────── */}
      {step === 1 && (
        <Step1BasicInfo form={form} set={set} />
      )}

      {step === 2 && (
        <Step2Details
          form={form}
          set={set}
          toggleArr={toggleArr}
          platformTypeOptions={platformTypeOptions}
          targetAudienceOptions={targetAudienceOptions}
        />
      )}

      {step === 3 && (
        <Step3Categories
          form={form}
          toggleArr={toggleArr}
          categories={categories}
          tags={tags}
          industries={industries}
          useCases={useCases}
          loading={taxonomyLoading}
        />
      )}

      {step === 4 && (
        <Step4Pricing
          form={form}
          setPlan={setPlan}
          addPlan={addPlan}
          removePlan={removePlan}
          addFeature={addFeature}
          setFeature={setFeature}
          removeFeature={removeFeature}
          pricingTypeOptions={pricingTypeOptions}
          billingCycleOptions={billingCycleOptions}
        />
      )}

      {step === 5 && (
        <Step5Media
          form={form}
          addScreenshot={addScreenshot}
          setScreenshot={setScreenshot}
          removeScreenshot={removeScreenshot}
          addIntegration={addIntegration}
          setIntegration={setIntegration}
          removeIntegration={removeIntegration}
        />
      )}

      {step === 6 && (
        <Step6Review
          form={form}
          set={set}
          categories={categories}
          submitError={submitError}
          preflightErrors={preflightErrors}
        />
      )}

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <FormNavigation
        step={step}
        allValid={allValid}
        isPending={isPending}
        onPrev={() => setStep(s => Math.max(1, s - 1))}
        onNext={() => setStep(s => Math.min(6, s + 1))}
        onSubmit={handleSubmit}
      />
    </div>
  );
}