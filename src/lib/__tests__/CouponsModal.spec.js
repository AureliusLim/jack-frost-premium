import { JSDOM } from 'jsdom';
import Couponform from '$lib/components/Forms/Couponform.svelte';
jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)
const mockFetch = jest.fn();
global.fetch = mockFetch;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
const onSubmit = jest.fn(e => e.preventDefault());
console.error = jest.fn();
console.warn = jest.fn();
console.log= jest.fn();
// Function to create the Svelte component manually
function createCouponTable(coupon) {
  const component = new Couponform({
    target: document.body, 
    props: { couponName: coupon.name },
  });

  return component;
}

describe('CouponForm', () => {
  it('should successfully edit coupon name', async () => {
    const coupons = [
      { id: 1, name: 'Christmas', isActivated: true },
      { id: 2, name: 'Coupon 2', isActivated: true },
  
    ];

    const component = createCouponTable(coupons);

   

    // Update the input value with a new name
    const newNameInput = document.querySelector('input[id="coupon-name"]');
    newNameInput.value = 'New Coupon Name';

    // Find the submit button and click it
    const submitButton = document.querySelector('.save-button');
    submitButton.click()
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      // Add other necessary response properties
    });

   
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
   

    // Ensure the isSuccess variable is true
    expect(component.isEdited).toBe(true);
  });

  it('should fail to edit coupon name', async () => {
    const coupons = [
      { id: 1, name: 'Christmas', isActivated: true },
      { id: 2, name: 'Coupon 2', isActivated: true },
      // Add more sample sections as needed
    ];

    const component = createCouponTable(coupons);

  
    const newNameInput = document.querySelector('input[id="coupon-name"]');
    newNameInput.value = 'Christmas';
    const submitButton = document.querySelector('.save-button');
    submitButton.click()
    mockFetch.mockResolvedValue({ 
      ok: false,
      status: 200,
      // Add other necessary response properties
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(component.isEdited).toBe(false);
  });
});
