'use client';

import { useActionState, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FadeIn from '@/components/motion/FadeIn';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { sendEmailAction } from '@/app/actions/sendEmail';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [productQuery, setProductQuery] = useState('');
  
  const [state, formAction, isPending] = useActionState(sendEmailAction, null);

  useEffect(() => {
    const product = searchParams.get('product');
    if (product) {
      setProductQuery(`I am interested in requesting a quote for: ${product}`);
    }
  }, [searchParams]);

  return (
    <form action={formAction}>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group col-span-2 sm:col-span-1">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" id="name" name="name" className="form-input" required placeholder="John Doe" />
        </div>
        
        <div className="form-group col-span-2 sm:col-span-1">
          <label htmlFor="email" className="form-label">Work Email</label>
          <input type="email" id="email" name="email" className="form-input" required placeholder="john@hospital.com" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="facility" className="form-label">Facility/Hospital Name</label>
        <input type="text" id="facility" name="facility" className="form-input" required placeholder="General Hospital" />
      </div>

      <div className="form-group">
        <label htmlFor="inquiry" className="form-label">Inquiry Details</label>
        <textarea 
          id="inquiry" 
          name="inquiry" 
          className="form-textarea" 
          rows="5" 
          required 
          defaultValue={productQuery}
          placeholder="Please describe your requirements..."
        ></textarea>
      </div>

      {state?.status === 'error' && (
        <div className="mb-4 p-4 bg-error-bg text-error-text rounded-md text-sm border border-red-200">
          {state.message}
        </div>
      )}

      {state?.status === 'success' && (
        <div className="mb-4 p-4 bg-success-bg text-success-text rounded-md border border-green-200">
          <p className="font-medium text-green-800">Success!</p>
          <p className="text-sm">{state.message}</p>
        </div>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={isPending || state?.status === 'success'}>
        {isPending ? <div className="spinner"></div> : 'Submit Inquiry'}
      </Button>
    </form>
  );
}
