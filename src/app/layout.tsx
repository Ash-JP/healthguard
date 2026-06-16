import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Healthguard | Premium Medical Ecosystem',
  description: 'Global B2B interactive ecosystem for premium medical supplies and surgical equipment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-2xl text-primary tracking-tight">
              Healthguard
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-accent">Home</Link>
              <Link href="/about" className="transition-colors hover:text-accent">About Us</Link>
              <Link href="/departments" className="transition-colors hover:text-accent">Ecosystem</Link>
              <Link href="/contact" className="transition-colors hover:text-accent">Contact</Link>
            </nav>
            <Button variant="default" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/contact">Request Catalog</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <footer className="border-t bg-secondary/30 mt-auto py-12">
          <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-primary">Healthguard</h3>
              <p className="text-muted-foreground text-sm">Premium interactive medical supply ecosystems for top-tier healthcare facilities worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ecosystem</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/departments/cssd" className="hover:text-accent transition-colors">CSSD Workflow</Link></li>
                <li><Link href="/departments/endoscopy" className="hover:text-accent transition-colors">Endoscopy Suite</Link></li>
                <li><Link href="/departments/radiology" className="hover:text-accent transition-colors">Radiology</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-accent transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="container mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Healthguard Ecosystem. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
