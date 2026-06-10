import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#212529', marginBottom: '1rem' }}>Welcome to HealthGuard</h1>
      <p style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.6' }}>
        A leading manufacturer of high-quality pharmaceutical formulations and active pharmaceutical ingredients (APIs). Committed to quality, compliance, and international standards.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/products" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0f5132',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
          View Products
        </Link>
        <Link href="/contact" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#f8f9fa',
          color: '#495057',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          textDecoration: 'none'
        }}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
