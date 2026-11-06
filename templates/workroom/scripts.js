const copyEmailButton = document.getElementById('copy-email');
const copyEmailStatus = document.getElementById('copy-email-status');
let copyEmailReset;

copyEmailButton.addEventListener('click', async () => {
  clearTimeout(copyEmailReset);
  copyEmailButton.disabled = true;
  try {
    await navigator.clipboard.writeText(copyEmailButton.dataset.email);
    copyEmailButton.textContent = 'Copied!';
    copyEmailStatus.textContent = 'Email address copied to clipboard.';
    copyEmailReset = setTimeout(() => {
      copyEmailButton.textContent = 'Copy email';
      copyEmailStatus.textContent = '';
    }, 3000);
  } catch {
    copyEmailButton.textContent = 'Copy email';
    copyEmailStatus.textContent = `Copy this address: ${copyEmailButton.dataset.email}`;
  } finally {
    copyEmailButton.disabled = false;
  }
});
