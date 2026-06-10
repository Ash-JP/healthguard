"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    // Call Next.js API route directly
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to submit message');
        }
        return res.json();
      })
      .then((data) => {
        setStatus({ success: true, message: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        setStatus({ success: false, message: err.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ color: '#212529', marginBottom: '1rem' }}>Contact Us</h1>
      <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
        For inquiries regarding B2B pricing, distributorships, or custom batch manufacturing, please complete the form below.
      </p>

      {status && (
        <div style={{
          padding: '1rem',
          backgroundColor: status.success ? '#d1e7dd' : '#f8d7da',
          color: status.success ? '#0f5132' : '#721c24',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: status.success ? '1px solid #badbcc' : '1px solid #f5c6cb'
        }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="name" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ced4da' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ced4da' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="subject" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ced4da' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="message" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Message *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ced4da', resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.75rem',
            backgroundColor: '#0f5132',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: '0.5rem'
          }}
        >
          {submitting ? 'Sending inquiry...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
