// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ---- Phone number auto-formatting ----
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/\D/g, '').substring(0, 10);
  let formatted = '';

  if (digits.length > 0) formatted = '(' + digits.substring(0, 3);
  if (digits.length >= 3) formatted += ') ' + digits.substring(3, 6);
  if (digits.length >= 6) formatted += '-' + digits.substring(6, 10);

  e.target.value = formatted;
});

// ---- Form submission ----
const form = document.getElementById('quoteForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    // Submit to Zapier webhook (handles both email and SMS)
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert('Something went wrong. Please try again or call us directly.');
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
});
