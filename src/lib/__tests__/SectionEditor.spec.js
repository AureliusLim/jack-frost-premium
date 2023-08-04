import { JSDOM } from 'jsdom';
import SectionEditor from "$lib/components/Modal/SectionEditor.svelte";
jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)
const mockFetch = jest.fn();
global.fetch = mockFetch;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
const onSubmit = jest.fn(e => e.preventDefault());

// Function to create the Svelte component manually
function createSectionTable(sections) {
  const component = new SectionEditor({
    target: document.body, // You can choose any target element or use a virtual DOM like `jsdom`
    props: { sectionName: sections.name },
  });

  return component;
}

describe('SectionEditor', () => {
  it('should successfully edit section name', async () => {
    const sections = [
      { id: 1, name: 'Christmas', isActivated: true },
      { id: 2, name: 'Section 2', isActivated: true },
      // Add more sample sections as needed
    ];

    const component = createSectionTable(sections);

   

    // Update the input value with a new name
    const newNameInput = document.querySelector('input[id="sectionName"]');
    newNameInput.value = 'New Section Name';

    // Find the submit button and click it
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.click()
    mockFetch.mockResolvedValue({ // pretend that the credentials are invalid
      ok: true,
      status: 200,
      // Add other necessary response properties
    });

   
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
   

    // Ensure the isSuccess variable is true
    expect(component.isSuccess).toBe(true);
  });

  it('should fail to edit section name', async () => {
    const sections = [
      { id: 1, name: 'Section 1', isActivated: true },
      { id: 2, name: 'Section 2', isActivated: true },
      // Add more sample sections as needed
    ];

    const component = createSectionTable(sections);

  
    const newNameInput = document.querySelector('input[id="sectionName"]');
    newNameInput.value = 'Christmas';
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.click()
    mockFetch.mockResolvedValue({ // pretend that the credentials are invalid
      ok: false,
      status: 200,
      // Add other necessary response properties
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Ensure the isSuccess variable is initially false
    expect(component.isSuccess).toBe(false);
  });
});
