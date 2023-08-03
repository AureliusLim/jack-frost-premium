import { JSDOM } from 'jsdom';
import CouponsPage from '/src/routes/(admin)/admin/coupons/+page.svelte';
// import CouponsForm from '...routes/(admin)/admin/coupons/form/+page.svelte'
// import CouponsTable from '../components/Coupons/CouponsTable.svelte/+page.svelte'

jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
// Mock the fetch function and its response based on the scenario
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Coupons Test', () => {
  it('renders the whole coupon page', () => {
    const page = new CouponsPage({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    // Check if the coupons page is rendered
    expect(document.querySelector('button[id="add_coupons"]')).toBeInTheDocument();
    expect(document.querySelector('CouponsTable[id="table"]')).toBeInTheDocument();

    page.$destroy();
  });

  it('displays error message on failed edit of coupon', async () => {
    const page = new CouponsPage({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    const addCouponButton = document.querySelector('button[id="add_coupons"]');

    addCouponButton.click();

    // TO-EDIT: Not sure if this is the correct way of accessing these variables

    const couponNameInput = document.querySelector('Couponform["couponName"]');
    const codeInput = document.querySelector('Couponform["code"]');
    const discountedAmountInput = ocument.querySelector('Couponform["discountedAmount"]');
    const productRequirementInput = document.querySelector('Couponform["productRequirement"]'); 
    const orderCountRequirementInput = document.querySelector('Couponform["orderCountRequirement"]');
    const isActivatedInput = document.querySelector('Couponform["isActivated"]'); 

    couponNameInput.value = 'Test2 Coupon';
    codeInput.value = 'HSAJW21';
    discountedAmountInput.value = '20';

    // TO-ADD: unique input, not sure how to change value

    // Select White Rock
    // Order Requirement 0 

    // TO-EDIT: Click Save button
    const saveButton = document.querySelector('saveCoupon');

    // TO-ADD: Need to press the edit button specific to the generated Coupon ID but how


    // Wait for the register logic to complete
    mockFetch.mockResolvedValue({ // pretend that the credentials are invalid
      ok: false,
      status: 200,
      // Add other necessary response properties
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(document.querySelector('.error')).toBeInTheDocument(); 
    
    page.$destroy();
  });


});
