import { JSDOM } from 'jsdom';
import LoginModal from '../components/Modal/LoginModal.svelte';

jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
// Mock the fetch function and its response based on the scenario
const mockFetch = jest.fn();
global.fetch = mockFetch;
console.error = jest.fn();
console.warn = jest.fn();
console.log= jest.fn();
describe('Login Modal Tests', () => {
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

    emailInput.value = 'testaccount@gmail.com';
    passwordInput.value = 'incorrectpassword';
    submitButton.click();
    // Wait for the login logic to complete
    mockFetch.mockResolvedValue({ 
      ok: false,
      status: 200,
      // Add other necessary response properties
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(document.querySelector('.error')).toBeInTheDocument(); // Access loginFailed through component.$$.props

    modal.$destroy();
  });

  it('error message is absent on successful login', async () => {
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

    emailInput.value = 'john@gmail.com';
    passwordInput.value = 'john\'spassword';
    submitButton.click();
    mockFetch.mockResolvedValue({ 
      ok: true,
      status: 200,
      // Add other necessary response properties
    });

    
    expect(document.querySelector('.error')).not.toBeInTheDocument();

    modal.$destroy();
  });
});
