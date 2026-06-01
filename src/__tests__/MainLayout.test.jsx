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

  test('2. Mock current date to a known fixed date and verify footer text contains that exact date formatted as toLocaleDateString', () => {
    const fixedDate = new Date('2024-06-15T12:00:00.000Z');
    jest.setSystemTime(fixedDate);
    render(<MainLayout><div>content</div></MainLayout>);
    const footerEl = document.querySelector('footer');
    const expectedDateString = fixedDate.toLocaleDateString();
    expect(footerEl).toBeInTheDocument();
    expect(footerEl.textContent).toContain(expectedDateString);
  });

  test('3. Confirm the footer does NOT display yesterday date or a hardcoded date string unrelated to the current day', () => {
    const fixedDate = new Date('2024-06-15T12:00:00.000Z');
    jest.setSystemTime(fixedDate);
    render(<MainLayout><div>content</div></MainLayout>);
    const footerEl = document.querySelector('footer');

    const yesterday = new Date(fixedDate);
    yesterday.setDate(fixedDate.getDate() - 1);
    const yesterdayString = yesterday.toLocaleDateString();

    const tomorrow = new Date(fixedDate);
    tomorrow.setDate(fixedDate.getDate() + 1);
    const tomorrowString = tomorrow.toLocaleDateString();

    const todayString = fixedDate.toLocaleDateString();

    expect(footerEl.textContent).toContain(todayString);

    if (yesterdayString !== todayString) {
      expect(footerEl.textContent).not.toContain(yesterdayString);
    }

    if (tomorrowString !== todayString) {
      expect(footerEl.textContent).not.toContain(tomorrowString);
    }

    expect(footerEl.textContent).not.toContain('01/01/2000');
    expect(footerEl.textContent).not.toContain('January 1, 2000');
  });

  test('4. Confirm the footer still shows the correct date after the component mounts (date derived at render time from new Date())', () => {
    const fixedDate = new Date('2024-06-15T12:00:00.000Z');
    jest.setSystemTime(fixedDate);
    const { rerender } = render(<MainLayout><div>content</div></MainLayout>);
    const expectedDateString = fixedDate.toLocaleDateString();

    let footerEl = document.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
    expect(footerEl.textContent).toContain(expectedDateString);

    rerender(<MainLayout><div>updated content</div></MainLayout>);
    footerEl = document.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
    expect(footerEl.textContent).toContain(expectedDateString);
  });

  test('5. Render MainLayout with children and confirm the footer date is still correct alongside the children content', () => {
    const fixedDate = new Date('2024-06-15T12:00:00.000Z');
    jest.setSystemTime(fixedDate);
    const childText = 'Child component content';
    render(
      <MainLayout>
        <div>{childText}</div>
      </MainLayout>
    );

    const footerEl = document.querySelector('footer');
    expect(footerEl).toBeInTheDocument();

    const expectedDateString = fixedDate.toLocaleDateString();
    expect(footerEl.textContent).toContain(expectedDateString);

    const childEl = screen.getByText(childText);
    expect(childEl).toBeInTheDocument();

    const currentYear = fixedDate.getFullYear().toString();
    expect(footerEl.textContent).toContain(currentYear);
    expect(currentYear).toMatch(/^\d{4}$/);
  });
});
