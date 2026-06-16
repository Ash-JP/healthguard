'use server';

export async function sendEmailAction(prevState, formData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get('name');
  const email = formData.get('email');
  const facility = formData.get('facility');
  const inquiry = formData.get('inquiry');

  // Basic validation
  if (!name || !email || !facility || !inquiry) {
    return {
      status: 'error',
      message: 'Please fill out all required fields.',
    };
  }

  // Mock Success (Per User Request)
  return {
    status: 'success',
    message: 'Thank you! Your inquiry has been received. Our sales team will contact you shortly.',
  };
}
