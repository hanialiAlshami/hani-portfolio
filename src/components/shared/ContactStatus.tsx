'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactStatus({ isEn }: { isEn: boolean }) {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status');
  const error = searchParams?.get('error');

  return (
    <>
      {status === 'sent' && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            {isEn
              ? 'Thank you! Your message has been sent. I will get back to you soon.'
              : 'شكراً لك! تم إرسال رسالتك بنجاح. سأرد عليك قريباً.'}
          </p>
        </div>
      )}
      {(error === 'invalid' || error === 'send-failed') && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            {error === 'invalid'
              ? (isEn ? 'Please fill out all required fields correctly.' : 'يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.')
              : (isEn ? 'Failed to send. Please try again later.' : 'فشل الإرسال. حاول مجدداً لاحقاً.')}
          </p>
        </div>
      )}
    </>
  );
}
