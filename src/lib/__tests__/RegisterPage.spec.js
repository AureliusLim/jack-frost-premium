import { JSDOM } from 'jsdom';
import Register from '.../routes/register/+page.svelte'

jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
// Mock the fetch function and its response based on the scenario
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Register Test', () => {
  it('renders the register form', () => {
    const page = new Register({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    // Check if the register form elements are rendered
    expect(document.querySelector('input[id="firstName"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="lastName"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="contactNumber"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="street"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="cityProvince"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="buildingNumber"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="postalCode"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="password"]')).toBeInTheDocument();
    expect(document.querySelector('input[id="confirmpassword"]')).toBeInTheDocument();
    expect(document.querySelector('button[class="cancel-button"]')).toBeInTheDocument();   
    expect(document.querySelector('button[class="reg-button"]')).toBeInTheDocument();  

    page.$destroy();
  });

  it('displays error message on failed register', async () => {
      const page = new Register({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    // Check if the register form elements are rendered
    const firstnameInput = document.querySelector('input[id="firstName"]');
    const lastnameInput = document.querySelector('input[id="lastName"]');
    const contactNumberInput = document.querySelector('input[id="contactNumber"]');
    const streetInput = document.querySelector('input[id="street"]');
    const cityProvinceInput = document.querySelector('input[id="cityProvince"]');
    const buildingNumberInput = document.querySelector('input[id="buildingNumber"]');
    const postalCodeInput = document.querySelector('input[id="postalCode"]');
    const emailInput = document.querySelector('input[id="email"]');
    const passwordInput = document.querySelector('input[id="password"]');
    const confirmPasswordInput = document.querySelector('input[id="confirmpassword"]');
    const registerButton = document.querySelector('button[class="reg-button"]');  

    firstnameInput.value = 'John';
    lastnameInput.value = 'Doe';
    contactNumberInput.value = '09171234567';
    streetInput.value = 'Earnhardt Drive';
    cityProvinceInput.value = 'Kentucky';
    buildingNumberInput.value = '3867';
    postalCodeInput.value = '40242';
    emailInput.value = 'john@gmail.com';
    passwordInput.value = 'john\'spassword1';
    confirmPasswordInput.value 'john\'spassword1';

    registerButton.click();


    // Wait for the register logic to complete
    mockFetch.mockResolvedValue({ // pretend that the credentials are invalid
      ok: false,
      status: 200,
      // Add other necessary response properties
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(document.querySelector('.error')).toBeInTheDocument(); // Access registerFailed through component.$$.props

    page.$destroy();
  });


});
