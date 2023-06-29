import {render} from '@testing-library/svelte'
import Layout from './+layout.svelte';

test('renders login button when user is not logged in', () => {
  const { getByText } = render(Layout, { email: '' });
  const loginButton = getByText('Login');
  expect(loginButton).toBeInTheDocument();
});


test('renders logout button when user is logged in', () => {
  const { getByText } = render(Layout, { email: 'example@example.com' });
  const logoutButton = getByText('Logout');
  expect(logoutButton).toBeInTheDocument();
});