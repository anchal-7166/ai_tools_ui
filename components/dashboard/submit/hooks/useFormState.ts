'use client';

import { useState } from 'react';
import { FormData, PricingPlan, Screenshot, Integration } from '../renders/types';

// ── Helpers ───────────────────────────────────────────────────────────────
export const toSlug = (v: string) =>
  v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const uid = () => Math.random().toString(36).slice(2, 9);

export const INITIAL_FORM: FormData = {
  name: '', slug: '', tagline: '', description: '', longDescription: '', logo: '',
  websiteUrl: '', demoUrl: '', documentationUrl: '', videoUrl: '',
  aiModel: '', platformType: [], targetAudience: [], searchKeywords: [],
  categoryIds: [], tagIds: [], useCaseIds: [], industryIds: [],
  pricingPlans: [{ id: uid(), name: 'Free', type: 'FREE', currency: 'USD', features: [] }],
  screenshots: [], integrations: [], submissionNote: '',
};

export function useFormState() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  // ── Generic setter ────────────────────────────────────────────────────
  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  // ── Toggle item in array ──────────────────────────────────────────────
  const toggleArr = <T,>(key: keyof FormData, val: T) => {
    setForm(f => {
      const arr = f[key] as T[];
      return {
        ...f,
        [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val],
      };
    });
  };

  // ── Pricing plan helpers ──────────────────────────────────────────────
  const setPlan = (id: string, patch: Partial<PricingPlan>) =>
    set('pricingPlans', form.pricingPlans.map(p => p.id === id ? { ...p, ...patch } : p));

  const addPlan = () =>
    set('pricingPlans', [
      ...form.pricingPlans,
      { id: uid(), name: '', type: 'SUBSCRIPTION', currency: 'USD', features: [] },
    ]);

  const removePlan = (id: string) =>
    set('pricingPlans', form.pricingPlans.filter(p => p.id !== id));

  const addFeature = (planId: string) => {
    const p = form.pricingPlans.find(p => p.id === planId)!;
    setPlan(planId, { features: [...p.features, ''] });
  };

  const setFeature = (planId: string, idx: number, val: string) => {
    const p = form.pricingPlans.find(p => p.id === planId)!;
    const f = [...p.features]; f[idx] = val;
    setPlan(planId, { features: f });
  };

  const removeFeature = (planId: string, idx: number) => {
    const p = form.pricingPlans.find(p => p.id === planId)!;
    setPlan(planId, { features: p.features.filter((_, i) => i !== idx) });
  };

  // ── Screenshot helpers ────────────────────────────────────────────────
  const addScreenshot = () =>
    set('screenshots', [...form.screenshots, { url: '', caption: '', order: form.screenshots.length }]);

  const setScreenshot = (idx: number, patch: Partial<Screenshot>) =>
    set('screenshots', form.screenshots.map((s, i) => i === idx ? { ...s, ...patch } : s));

  const removeScreenshot = (idx: number) =>
    set('screenshots', form.screenshots.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })));

  // ── Integration helpers ───────────────────────────────────────────────
  const addIntegration = () =>
    set('integrations', [...form.integrations, { name: '', description: '', logo: '', url: '' }]);

  const setIntegration = (idx: number, patch: Partial<Integration>) =>
    set('integrations', form.integrations.map((s, i) => i === idx ? { ...s, ...patch } : s));

  const removeIntegration = (idx: number) =>
    set('integrations', form.integrations.filter((_, i) => i !== idx));

  // ── Validation — matches CreateSubmissionDto rules ────────────────────
  const stepValid = [
    // Step 1: name required, tagline required (max 200), description min 50
    form.name.length > 0 && form.tagline.length > 0 && form.tagline.length <= 200 && form.description.length >= 50,
    // Step 2: no required fields
    true,
    // Step 3: at least 1 category (categoryIds is validated on server too)
    form.categoryIds.length > 0,
    // Step 4: at least 1 pricing plan, all plans have name + type
    form.pricingPlans.length > 0 && form.pricingPlans.every(p => p.name && p.type),
    // Step 5: no required fields
    true,
    // Step 6: review
    true,
  ];

  const allValid    = stepValid.every(Boolean);
  const completeness = Math.round((stepValid.filter(Boolean).length / stepValid.length) * 100);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setStep(1);
  };

  return {
    step, setStep,
    form, set, toggleArr, resetForm,
    // pricing
    setPlan, addPlan, removePlan, addFeature, setFeature, removeFeature,
    // screenshots
    addScreenshot, setScreenshot, removeScreenshot,
    // integrations
    addIntegration, setIntegration, removeIntegration,
    // validation
    stepValid, allValid, completeness,
  };
}