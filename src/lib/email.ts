import 'server-only';

import { formatPrice } from '@/lib/format';
import { optionLabel } from '@/lib/catalog';
import { site } from '@/lib/site';
import type { Inquiry, OrderRecord } from '@/lib/db';

// Resend ilə tranzaksiya məktubları (yeni sifariş / müraciət bildirişi, müştəriyə təsdiq).
// RESEND_API_KEY yoxdursa, məktub göndərilmir (yalnız jurnala yazılır). Göndərən domen Resend-də təsdiqlənməlidir.
//   RESEND_FROM         — göndərən, standart: "LuxMebel <info@luxmebelaz.com>"
//   ORDER_NOTIFY_EMAIL  — bildirişlərin gedəcəyi ünvan(lar), vergüllə; standart: site.email
const FROM = () => process.env.RESEND_FROM || `LuxMebel <${site.email}>`;
const NOTIFY_TO = () =>
  (process.env.ORDER_NOTIFY_EMAIL || site.email)
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

type Mail = { to: string[]; subject: string; html: string; replyTo?: string };

async function send(mail: Mail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[email:skipped]', mail.subject);
    return;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM(), to: mail.to, subject: mail.subject, html: mail.html, reply_to: mail.replyTo }),
    });
    if (!res.ok) console.error('[email:error]', res.status, await res.text().catch(() => ''));
  } catch (e) {
    console.error('[email:error]', e);
  }
}

const esc = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function layout(title: string, body: string): string {
  return `<!doctype html><html lang="az"><body style="margin:0;padding:0;background:#f1f0ec;font-family:Arial,Helvetica,sans-serif;color:#111;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f0ec;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td style="background:#141414;padding:22px 28px;color:#e4d093;font-size:18px;font-weight:bold;letter-spacing:2px;">LUXMEBEL</td></tr>
<tr><td style="padding:28px;"><h1 style="margin:0 0 16px;font-size:19px;">${esc(title)}</h1>${body}</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #eee;font-size:12px;color:#888;">LuxMebel · <a href="${site.url}" style="color:#888;">${site.url.replace(/^https?:\/\//, '')}</a> · ${esc(site.email)} · ${esc(site.phone)}</td></tr>
</table></td></tr></table></body></html>`;
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:4px 12px 4px 0;color:#666;font-size:14px;vertical-align:top;white-space:nowrap;">${esc(label)}</td><td style="padding:4px 0;font-size:14px;">${esc(value)}</td></tr>`;

function itemsTable(order: OrderRecord): string {
  const lines = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;font-size:14px;border-bottom:1px solid #f0f0f0;">${esc(i.name)}${i.color || i.size ? ` <span style="color:#666;">(${esc(optionLabel(i))})</span>` : ''}${i.code ? ` <span style="color:#999;">#${esc(i.code)}</span>` : ''} × ${i.qty}</td><td align="right" style="padding:6px 0;font-size:14px;border-bottom:1px solid #f0f0f0;">${esc(formatPrice(i.price * i.qty))}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">${lines}
<tr><td style="padding:10px 0;font-weight:bold;">Cəmi</td><td align="right" style="padding:10px 0;font-weight:bold;">${esc(formatPrice(order.total))}</td></tr></table>`;
}

// Mağazaya: yeni sifariş
export function notifyNewOrder(order: OrderRecord): Promise<void> {
  const c = order.customer;
  const body = `<table role="presentation" cellpadding="0" cellspacing="0">
${row('Sifariş', `№${order.orderNumber}`)}${row('Ad', c.name)}${row('Telefon', c.phone)}${c.email ? row('E-poçt', c.email) : ''}
${row('Ünvan', `${c.city}, ${c.address}`)}${order.location ? `<tr><td style="padding:4px 12px 4px 0;color:#666;font-size:14px;">Konum</td><td style="padding:4px 0;font-size:14px;"><a href="https://www.google.com/maps?q=${order.location.lat},${order.location.lng}">Xəritədə aç</a></td></tr>` : ''}${row('Ödəniş', order.payment + (order.online ? ' (ödəniş gözlənilir)' : ''))}${order.note ? row('Qeyd', order.note) : ''}
</table>${itemsTable(order)}`;
  return send({
    to: NOTIFY_TO(),
    subject: `Yeni sifariş №${order.orderNumber} — ${formatPrice(order.total)}`,
    html: layout('Yeni sifariş', body),
    replyTo: c.email,
  });
}

// Müştəriyə: sifarişin qəbulu (e-poçt yazıbsa)
export function confirmOrderToCustomer(order: OrderRecord): Promise<void> {
  const email = order.customer.email;
  if (!email) return Promise.resolve();
  const body = `<p style="margin:0 0 8px;font-size:15px;line-height:1.6;">Hörmətli ${esc(order.customer.name)},</p>
<p style="margin:0 0 8px;font-size:15px;line-height:1.6;">Sifarişiniz qəbul olundu. Komandamız sifarişi təsdiqləmək və çatdırılma vaxtını dəqiqləşdirmək üçün tezliklə sizinlə əlaqə saxlayacaq.</p>
<p style="margin:16px 0 0;font-size:14px;">Sifariş nömrəsi: <b>${esc(order.orderNumber)}</b><br>Ödəniş: ${esc(order.payment)}</p>
${itemsTable(order)}
<p style="margin:0;font-size:13px;color:#666;">Sifarişin vəziyyətini saytda “Hesabım” bölməsində izləyə bilərsiniz. Çatdırılma haqqı sifariş təsdiqlənərkən bildirilir. Sualınız varsa, bu məktuba cavab yazın və ya zəng edin: ${esc(site.phone)}.</p>`;
  return send({
    to: [email],
    subject: `Sifarişiniz qəbul olundu — №${order.orderNumber}`,
    html: layout('Sifarişiniz qəbul olundu', body),
    replyTo: site.email,
  });
}

// Mağazaya: əlaqə formasından müraciət
export function notifyInquiry(inquiry: Inquiry): Promise<void> {
  const body = `<table role="presentation" cellpadding="0" cellspacing="0">
${row('Ad', inquiry.name)}${row('Telefon', inquiry.phone)}${inquiry.space ? row('Məkan', inquiry.space) : ''}
</table><p style="margin:16px 0 0;font-size:14px;line-height:1.6;white-space:pre-line;">${esc(inquiry.message)}</p>`;
  return send({
    to: NOTIFY_TO(),
    subject: `Yeni müraciət — ${inquiry.name}`,
    html: layout('Saytdan yeni müraciət', body),
  });
}

// Mağazaya: onlayn ödəniş təsdiqləndi
export function notifyOrderPaid(orderNumber: string, total: number): Promise<void> {
  return send({
    to: NOTIFY_TO(),
    subject: `Ödəniş alındı — №${orderNumber} (${formatPrice(total)})`,
    html: layout('Onlayn ödəniş alındı', `<p style="margin:0;font-size:15px;">Sifariş №${esc(orderNumber)} üçün ${esc(formatPrice(total))} onlayn ödənildi.</p>`),
  });
}
