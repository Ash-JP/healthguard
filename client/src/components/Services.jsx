import React from 'react';

export default function Services() {
  const servicesList = [
    {
      title: "Contract Manufacturing (CDMO)",
      description: "Comprehensive end-to-end commercial-scale manufacturing of oral solids (tablets, capsules) and external preparations."
    },
    {
      title: "Formulation Development",
      description: "Formulation optimization and scale-up studies driven by our R&D wing to ensure stability, bioavailability, and scale compatibility."
    },
    {
      title: "Analytical & Quality Testing",
      description: "Rigorous quality control processes including stability testing, method validation, and microbiological assays."
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ color: '#212529', marginBottom: '1rem' }}>Our Services</h1>
      <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
        HealthGuard offers customized pharmaceutical manufacturing services to distribute finished dosage forms globally.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {servicesList.map((service, index) => (
          <div 
            key={index} 
            style={{ 
              padding: '1.5rem', 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              backgroundColor: '#f8f9fa' 
            }}
          >
            <h3 style={{ color: '#0f5132', marginTop: 0, marginBottom: '0.75rem' }}>{service.title}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#495057' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
