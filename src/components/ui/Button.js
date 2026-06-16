import styles from './Button.module.css';
import Link from 'next/link';

export default function Button({ children, variant = 'primary', href, className = '', ...props }) {
  const baseClass = `${styles.btn} ${styles[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}
