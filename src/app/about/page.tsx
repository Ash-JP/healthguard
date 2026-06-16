export const metadata = {
  title: 'About Us | Healthguard Ecosystem',
  description: 'Learn about Healthguard, your enterprise partner for holistic hospital supply ecosystems.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-10" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Healthguard</h1>
          <p className="text-xl text-primary-foreground/80">
            Pioneering the concept of Interactive Hospital Supply Ecosystems. We don't just sell products; we equip workflows.
          </p>
        </div>
      </section>

      <section className="container py-24 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            To provide enterprise-grade, workflow-integrated medical equipment solutions to the world's leading healthcare institutions. We believe that procurement should be tied directly to the clinical pathways and departmental workflows they support.
          </p>

          <h2 className="text-3xl font-bold text-primary mb-6 mt-12">The Ecosystem Approach</h2>
          <p className="text-lg text-muted-foreground">
            Traditional B2B catalogs are archaic. A CSSD Manager does not need to sift through irrelevant surgical tools; they need a cohesive, end-to-end sterilization suite. Healthguard categorizes our premium equipment precisely how your hospital operates.
          </p>
        </div>
      </section>
    </>
  );
}
