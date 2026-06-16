import fs from 'fs/promises';
import path from 'path';

export const metadata = {
  title: "Products Catalog | HealthGuard Pharmaceuticals",
  description: "Browse our generic formulations and active molecules catalog served dynamically.",
};

async function getProducts() {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export default async function Products() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ color: '#212529', marginBottom: '1rem' }}>Products Catalog</h1>
      <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
        A list of generic formulations and molecules manufactured at our GMP-certified sites.
      </p>

      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '4px', 
          marginBottom: '1.5rem',
          border: '1px solid #f5c6cb'
        }}>
          <strong>System Error:</strong> Failed to load products. Details: {error}
        </div>
      )}

      {!error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {products.map((product: any) => (
            <div 
              key={product.id} 
              style={{ 
                padding: '1.5rem', 
                border: '1px solid #dee2e6', 
                borderRadius: '8px',
                position: 'relative',
                backgroundColor: 'white'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '0.75rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '12px',
                fontWeight: 'bold',
                backgroundColor: product.status === 'In Stock' ? '#d1e7dd' : '#fff3cd',
                color: product.status === 'In Stock' ? '#0f5132' : '#664d03'
              }}>
                {product.status}
              </span>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#212529', paddingRight: '5rem' }}>{product.name}</h3>
              <div style={{ 
                fontSize: '0.85rem', 
                color: '#0f5132', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                marginBottom: '0.75rem' 
              }}>
                {product.category}
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#495057' }}>{product.description}</p>
              <div style={{ fontSize: '0.85rem', color: '#6c757d', borderTop: '1px solid #f1f3f5', paddingTop: '0.75rem' }}>
                <strong>Packaging:</strong> {product.packaging}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
