import { JSDOM } from 'jsdom';
import LoginModal from '../components/Modal/LoginModal.svelte';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('LoginModal', () => {
  it('renders the login form', () => {
    const modal = new LoginModal({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    // Check if the login form elements are rendered
    expect(document.querySelector('input[type="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
    expect(document.querySelector('button[type="submit"]')).toBeInTheDocument();

    modal.$destroy();
  });

  it('displays error message on failed login', async () => {
    const modal = new LoginModal({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    // Simulate a failed login attempt
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('button[type="submit"]');

    emailInput.value = 'test@example.com';
    passwordInput.value = 'incorrectpassword';
    submitButton.click();

    // Check if the error message is displayed
    expect(document.querySelector('.error-message')).toBeInTheDocument();

    modal.$destroy();
  });

  it('closes the modal on successful login', async () => {
    const modal = new LoginModal({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    // Simulate a successful login attempt
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('button[type="submit"]');

    emailInput.value = 'test@example.com';
    passwordInput.value = 'correctpassword';
    submitButton.click();

    // Check if the modal is closed
    expect(document.querySelector('.modal')).not.toBeInTheDocument();

    modal.$destroy();
  });
});
