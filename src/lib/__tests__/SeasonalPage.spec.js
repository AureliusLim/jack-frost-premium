import { JSDOM } from 'jsdom';
import Sections from '/src/routes/(admin)/admin/sections/+page.svelte';

jest.setTimeout(10000); // Set the default timeout to 10000 milliseconds (10 seconds)

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
// Mock the fetch function and its response based on the scenario
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Profile Test', () => {
  it('renders the section page', () => {
    const page = new Sections({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    expect(document.querySelector('button[class = "add-section-btn"]')).toBeInTheDocument();
    expect(document.querySelector('AddIcon[label = "Add Section"]')).toBeInTheDocument();


    page.$destroy();
  });

  it('negative edit section', () => {
    const page = new Sections({
      target: document.body,
      props: {
        isOpen: true
      }
    });

    const addSectionButton = document.querySelector('button[class = "add-section-btn"]');
    const sectionTable = document.querySelector('AddIcon[label = "Add Section"]');

    addSectionButton.click();

    // TO-ADD: Add Test section


    // TO-ADD: Edit Test Section

    page.$destroy();
  });

});
