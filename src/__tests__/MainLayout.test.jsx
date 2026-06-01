import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from '../layout/MainLayout';

const mockGetCurrentPosition = jest.fn();

const setupGeolocation = (available = true) => {
  if (available) {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: mockGetCurrentPosition,
      },
      configurable: true,
      writable: true,
    });
  } else {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
      writable: true,
    });
  }
};

beforeEach(() => {
  jest.useFakeTimers();
  mockGetCurrentPosition.mockClear();
  setupGeolocation(true);
});

afterEach(() => {
  jest.useRealTimers();
});

describe('MainLayout footer date tests', () => {
  test('1. Render MainLayout and confirm a footer element is present in the DOM', () => {
    render(<MainLayout><div>content</div></MainLayout>);
    const footerEl = document.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
  });

  test('2. Confirm the footer contains a string representation of today date', () => {
    const today = new Date();
    jest.setSystemTime(today);
    render(<MainLayout><div>content</div></MainLayout>);
    const footerEl = document.querySelector('footer');
    const expectedDateString = today.toLocaleDateString();
    expect(footerEl).toBeInTheDocument();
    expect(footerEl.textContent).toContain(expectedDateString);
  });

  test('3. Confirm the footer date does not show yesterday or tomorrow date', () => {
    const today = new Date();
    jest.setSystemTime(today);
    render(<MainLayout><div>content</div></MainLayout>);
    const footerEl = document.querySelector('footer');

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayString = yesterday.toLocaleDateString();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString = tomorrow.toLocaleDateString();

    const todayString = today.toLocaleDateString();

    expect(footerEl.textContent).toContain(todayString);

    if (yesterdayString !== todayString) {
      expect(footerEl.textContent).not.toContain(yesterdayString);
    }

    if (tomorrowString !== todayString) {
      expect(footerEl.textContent).not.toContain(tomorrowString);
    }
  });

  test('4. Confirm the footer still renders the correct date when the component re-renders', () => {
    const today = new Date();
    jest.setSystemTime(today);
    const { rerender } = render(<MainLayout><div>content</div></MainLayout>);
    const expectedDateString = today.toLocaleDateString();

    let footerEl = document.querySelector('footer');
    expect(footerEl.textContent).toContain(expectedDateString);

    rerender(<MainLayout><div>updated content</div></MainLayout>);
    footerEl = document.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
    expect(footerEl.textContent).toContain(expectedDateString);
  });

  test('5. Confirm the footer is visible and contains at least the four-digit current year', () => {
    const today = new Date();
    jest.setSystemTime(today);
    render(<MainLayout><div>content</div></MainLayout>);
    const footerEl = document.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
    const currentYear = today.getFullYear().toString();
    expect(footerEl.textContent).toContain(currentYear);
    expect(currentYear).toMatch(/^\d{4}$/);
  });
});
