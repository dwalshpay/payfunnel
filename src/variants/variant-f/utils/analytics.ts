import type { AssessmentStep, Tier } from '../types';

// Analytics event names
export const ANALYTICS_EVENTS = {
  // Funnel progression
  ASSESSMENT_START: 'variant_f_assessment_start',
  SECTION_START: 'variant_f_section_start',
  SECTION_COMPLETE: 'variant_f_section_complete',
  ASSESSMENT_COMPLETE: 'variant_f_assessment_complete',

  // Key qualification events
  EXPENSE_SELECTED: 'variant_f_expense_selected',
  PAIN_POINT_SELECTED: 'variant_f_pain_point_selected',

  // Results events
  REPORT_VIEW: 'variant_f_report_view',
  SCORE_REVEALED: 'variant_f_score_revealed',
  EMAIL_SUBMIT: 'variant_f_email_submit',

  // Conversion
  ACCOUNT_CREATE_CLICK: 'variant_f_account_create_click',
  STRATEGY_CALL_BOOK: 'variant_f_strategy_call_book',
} as const;

// Event context type
export interface AnalyticsContext {
  section?: number;
  step?: AssessmentStep;
  score?: number;
  tier?: Tier;
  painPoint?: string;
  monthlyExpenses?: string;
  industry?: string;
  percentile?: number;
  annualPoints?: number;
}

/**
 * Track an analytics event
 * This is a placeholder - integrate with your analytics provider
 */
export function trackEvent(
  eventName: string,
  context: AnalyticsContext = {}
): void {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, context);
  }

  // TODO: Integrate with your analytics provider
  // Examples:
  // - Google Analytics: gtag('event', eventName, context);
  // - Mixpanel: mixpanel.track(eventName, context);
  // - Amplitude: amplitude.track(eventName, context);
  // - Segment: analytics.track(eventName, context);

  // Placeholder for analytics integration
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    (window as { dataLayer: unknown[] }).dataLayer?.push({
      event: eventName,
      ...context,
    });
  }
}

/**
 * Track assessment start
 */
export function trackAssessmentStart(): void {
  trackEvent(ANALYTICS_EVENTS.ASSESSMENT_START);
}

/**
 * Track section start
 */
export function trackSectionStart(section: number, step: AssessmentStep): void {
  trackEvent(ANALYTICS_EVENTS.SECTION_START, { section, step });
}

/**
 * Track section complete
 */
export function trackSectionComplete(section: number, step: AssessmentStep): void {
  trackEvent(ANALYTICS_EVENTS.SECTION_COMPLETE, { section, step });
}

/**
 * Track expense selection (key qualification signal)
 */
export function trackExpenseSelected(monthlyExpenses: string): void {
  trackEvent(ANALYTICS_EVENTS.EXPENSE_SELECTED, { monthlyExpenses });
}

/**
 * Track pain point selection (key qualification signal)
 */
export function trackPainPointSelected(painPoint: string): void {
  trackEvent(ANALYTICS_EVENTS.PAIN_POINT_SELECTED, { painPoint });
}

/**
 * Track assessment complete with full context
 */
export function trackAssessmentComplete(context: {
  score: number;
  tier: Tier;
  percentile: number;
  annualPoints: number;
  painPoint?: string;
  monthlyExpenses?: string;
  industry?: string;
}): void {
  trackEvent(ANALYTICS_EVENTS.ASSESSMENT_COMPLETE, context);
}

/**
 * Track report view
 */
export function trackReportView(score: number, tier: Tier): void {
  trackEvent(ANALYTICS_EVENTS.REPORT_VIEW, { score, tier });
}

/**
 * Track email submission
 */
export function trackEmailSubmit(tier: Tier): void {
  trackEvent(ANALYTICS_EVENTS.EMAIL_SUBMIT, { tier });
}

/**
 * Track account creation click
 */
export function trackAccountCreateClick(tier: Tier, score: number): void {
  trackEvent(ANALYTICS_EVENTS.ACCOUNT_CREATE_CLICK, { tier, score });
}

/**
 * Track strategy call booking (gold tier)
 */
export function trackStrategyCallBook(score: number): void {
  trackEvent(ANALYTICS_EVENTS.STRATEGY_CALL_BOOK, { score, tier: 'gold' });
}
