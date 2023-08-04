import { JSDOM } from 'jsdom';
import CouponsModal from '../components/Coupons/CouponsTable.svelte';

jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
// Mock the fetch function and its response based on the scenario
const mockFetch = jest.fn();
global.fetch = mockFetch;

let name = "Test2 Coupon";
let code = "TESTC2";
let isActivated = true;
let rate = 20;
let prodRequirement = ["White Rock"];
let quantRequirement = 0;
let redeemedBy = "";

describe('Coupons Test', () => {
  it('renders the whole coupon page and attempts and fails to edit a coupon', async () => {
    const modal = new CouponsModal({
      target: document.body,
      props: {
        data: [{
          name: name, 
          code: code,
          isActivated: isActivated,
          rate: rate,
          prodRequirement: prodRequirement,
          quantRequirement: quantRequirement,
          redeemedBy: redeemedBy
        }]
      }
    });

    // Check if the coupons page is rendered
    expect(document.querySelector('table thead')).toBeInTheDocument();
    expect(document.querySelector('button[id="edit"]')).toBeInTheDocument();

    const editButton = document.querySelector('button[id="edit"]');

    editButton.click();

    name = 'Christmas Sale';
    code = "XMAS";
    isActivated = true;
    rate = 50;
    prodRequirement = ["White Rock"];
    quantRequirement = 1;
    redeemedBy = "";

    mockFetch.mockResolvedValue({ // pretend that the credentials are invalid
      ok: false,
      status: 200,
      // Add other necessary response properties
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    modal.$destroy();
  });

  
});
