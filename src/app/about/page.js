export const metadata = {
  title: "About Us | HealthGuard Pharmaceuticals",
  description: "Learn about HealthGuard's corporate standards, quality management guidelines, and regulatory GMP credentials.",
};

export default function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ color: '#212529', marginBottom: '1rem' }}>About HealthGuard</h1>
      <p>
        HealthGuard is a state-of-the-art pharmaceutical manufacturing company dedicated to producing safe, effective, and high-quality medicines for global markets. We operate with strict adherence to quality compliance regulations.
      </p>
      
      <h2 style={{ color: '#0f5132', marginTop: '2rem', marginBottom: '0.5rem' }}>Our Mission</h2>
      <p>
        To improve global health outcomes by developing, manufacturing, and distributing pharmaceutical solutions that meet the highest international guidelines.
      </p>
      
      <h2 style={{ color: '#0f5132', marginTop: '2rem', marginBottom: '0.5rem' }}>Regulatory Compliance</h2>
      <p>
        Our manufacturing sites operate under strict quality management systems (QMS). We strive to conform to general manufacturing standards:
      </p>
      <ul>
        <li>WHO-GMP Compliant Manufacturing Facilities</li>
        <li>ISO 9001:2015 Certification</li>
        <li>State-of-the-art Quality Assurance and Quality Control laboratories</li>
      </ul>
    </div>
  );
}
