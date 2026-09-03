/**
 * Production Email Service & Compose URL Generator
 * Configured for: zenithstudio26@gmail.com
 */

export const TARGET_EMAIL = 'zenithstudio26@gmail.com';

export interface EmailBriefPayload {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  description: string;
  ticketId?: string;
}

/**
 * Format markdown brief for email payload
 */
export function formatProjectBriefMarkdown(data: EmailBriefPayload): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return [
    `# Project Inquiry: ${data.projectType || 'Software System'}`,
    `Reference Ticket: ${data.ticketId || '#ZEN-' + Math.floor(1000 + Math.random() * 9000)}`,
    `Date: ${dateStr}`,
    ``,
    `Client Name: ${data.name || 'Not specified'}`,
    `Client Email: ${data.email || 'Not specified'}`,
    `Target Timeline: ${data.timeline || 'Flexible'}`,
    ``,
    `Project Requirements & Workflow:`,
    `${data.description || 'Workflow optimization and system engineering.'}`,
    ``,
    `---`,
    `Dispatched to: ${TARGET_EMAIL}`,
    `Via: Zenith Studio Portal`
  ].join('\n');
}

/**
 * Generate official Web Gmail compose URL (opens in browser tab without needing OS mail app)
 */
export function getGmailComposeUrl(subject: string, body: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    TARGET_EMAIL
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate official Web Outlook compose URL
 */
export function getOutlookComposeUrl(subject: string, body: string): string {
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    TARGET_EMAIL
  )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate standard mailto URL
 */
export function getMailtoUrl(subject: string, body: string): string {
  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Trigger Web Gmail in a new tab
 */
export function openInGmail(subject: string, body: string): Window | null {
  const url = getGmailComposeUrl(subject, body);
  return window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Trigger default OS mail client safely
 */
export function openInDefaultMailClient(subject: string, body: string): void {
  const url = getMailtoUrl(subject, body);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Direct cloud dispatch to zenithstudio26@gmail.com via FormSubmit AJAX service
 */
export async function sendEmailViaFormSubmit(data: EmailBriefPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        projectType: data.projectType,
        timeline: data.timeline,
        ticketId: data.ticketId || '#ZEN-' + Math.floor(1000 + Math.random() * 9000),
        message: data.description,
        _subject: `New Lead: ${data.name || 'Client'} - ${data.projectType || 'Project Inquiry'}`,
        _replyto: data.email,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, message: result.message || 'Inquiry successfully delivered!' };
  } catch (err: any) {
    console.warn('FormSubmit direct cloud dispatch failed:', err);
    return {
      success: false,
      message: err?.message || 'Could not dispatch via cloud endpoint. Fallback to Gmail Web ready.',
    };
  }
}

/**
 * Local storage inquiry backup
 */
export function saveLocalInquiry(payload: EmailBriefPayload): void {
  try {
    const existing = JSON.parse(localStorage.getItem('zenith_saved_inquiries') || '[]');
    existing.unshift({
      ...payload,
      createdAt: new Date().toISOString(),
    });
    // Keep last 15
    localStorage.setItem('zenith_saved_inquiries', JSON.stringify(existing.slice(0, 15)));
  } catch {
    // Ignore localStorage errors
  }
}
