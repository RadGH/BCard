import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function renderEditor() {
  return render(
    <MemoryRouter initialEntries={['/editor']}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe('Demo Data Flow', () => {
  it('clicking Use Demo Data populates form fields', async () => {
    const user = userEvent.setup();
    renderEditor();

    const demoBtn = screen.getByText('Use Demo Data');
    await user.click(demoBtn);

    // After demo data, first name input should have a value
    const firstNameInput = screen.getByPlaceholderText('Sarah') as HTMLInputElement;
    expect(firstNameInput.value).not.toBe('');
  });

  it('demo data populates multiple fields', async () => {
    const user = userEvent.setup();
    renderEditor();

    await user.click(screen.getByText('Use Demo Data'));

    const emailInput = screen.getByPlaceholderText('sarah@nexusdyn.com') as HTMLInputElement;
    expect(emailInput.value).toContain('@');

    const phoneInput = screen.getByPlaceholderText('(415) 555-0142') as HTMLInputElement;
    expect(phoneInput.value).toMatch(/\(\d{3}\)/);
  });
});

describe('Person Save Flow', () => {
  it('Save Person button appears for new person', () => {
    renderEditor();
    expect(screen.getByText('Save Person')).toBeInTheDocument();
  });

  it('can save a person after entering data', async () => {
    const user = userEvent.setup();
    renderEditor();

    // Enter some data
    const firstNameInput = screen.getByPlaceholderText('Sarah');
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Test');

    const lastNameInput = screen.getByPlaceholderText('Chen');
    await user.clear(lastNameInput);
    await user.type(lastNameInput, 'User');

    // Click save person
    await user.click(screen.getByText('Save Person'));

    // Should show save name input
    const nameInput = screen.getByPlaceholderText('Test User');
    expect(nameInput).toBeInTheDocument();

    // Save with default name
    const saveButton = screen.getAllByText('Save').find(
      el => el.tagName === 'BUTTON' && el.closest('.flex.gap-2')
    );
    expect(saveButton).toBeDefined();
    await user.click(saveButton!);

    // Now the person should be in the dropdown
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    const personOption = Array.from(options).find(o => o.textContent === 'Test User');
    expect(personOption).toBeDefined();
  });
});

describe('Template Switching Preserves Data', () => {
  it('changing template tab and selecting keeps fields', async () => {
    const user = userEvent.setup();
    renderEditor();

    // Enter data
    const firstNameInput = screen.getByPlaceholderText('Sarah');
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Preserved');

    // Switch to templates tab
    await user.click(screen.getByText('Templates'));

    // Switch back to fields
    await user.click(screen.getByText('Fields'));

    // Data should still be there
    const input = screen.getByPlaceholderText('Sarah') as HTMLInputElement;
    expect(input.value).toBe('Preserved');
  });
});
