'use client';

const TOTAL_STEPS = 6;

interface Props {
  step: number;
  allValid: boolean;
  isPending: boolean;   // API call in-flight
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function FormNavigation({ step, allValid, isPending, onPrev, onNext, onSubmit }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 pt-1">

      {/* Previous */}
      <button type="button" onClick={onPrev} disabled={step === 1}
        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          color: step === 1 ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
          cursor: step === 1 ? 'not-allowed' : 'pointer',
          opacity: step === 1 ? 0.5 : 1,
        }}>
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Step {step} of {TOTAL_STEPS}
      </p>

      {/* Next / Submit */}
      {step < TOTAL_STEPS ? (
        <button type="button" onClick={onNext}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:opacity-90"
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
          <span className="hidden sm:inline">Next</span>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : (
        // Submit — disabled when form invalid OR API call in-flight
        <button type="button" onClick={onSubmit} 
        // disabled={!allValid || isPending}
          className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold"
          style={{
            background: allValid && !isPending
              ? 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))'
              : 'var(--color-bg-tertiary)',
            color: allValid && !isPending ? '#fff' : 'var(--color-text-muted)',
            border: allValid && !isPending ? 'none' : '1px solid var(--color-border)',
            cursor: allValid && !isPending ? 'pointer' : 'not-allowed',
            opacity: allValid && !isPending ? 1 : 0.5,
          }}>


          {/* {isPending ? (
            <>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="hidden sm:inline">Submitting…</span>
              <span className="sm:hidden">Wait…</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Submit for Review</span>
              <span className="sm:hidden">Submit</span>
            </>
          )} */}
          Submit

        </button>
      )}
    </div>
  );
}