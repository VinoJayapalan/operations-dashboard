import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from '../layout/MainLayout';
import { APP_NAME } from '../constants';

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

describe('MainLayout', () => {
  test('1. renders the header element in the DOM', () => {
    render(<MainLayout><div>content</div></MainLayout>);
    const headerEl = document.querySelector('header');
    expect(headerEl).toBeInTheDocument();
  });

  test('2. displays the APP_NAME constant value as the header title text', () => {
    render(<MainLayout><div>content</div></MainLayout>);
    expect(APP_NAME).toBe('Operations Dashboard');
    expect(screen.getByText('Operations Dashboard')).toBeInTheDocument();
  });

  test('3. renders the title inside a header tag', () => {
    render(<MainLayout><div>content</div></MainLayout>);
    const headerEl = document.querySelector('header');
    const titleEl = screen.getByText('Operations Dashboard');
    expect(headerEl).toContainElement(titleEl);
  });

  test('4. renders the live clock element inside the header', () => {
    const fixedDate = new Date('2024-01-15T10:30:00');
    jest.setSystemTime(fixedDate);
    render(<MainLayout><div>content</div></MainLayout>);
    const headerEl = document.querySelector('header');
    const dateString = fixedDate.toLocaleDateString();
    const timeString = fixedDate.toLocaleTimeString();
    const clockEl = screen.getByText(`${dateString} ${timeString}`);
    expect(clockEl).toBeInTheDocument();
    expect(headerEl).toContainElement(clockEl);
  });

  test('5. renders children inside the main content area', () => {
    render(
      <MainLayout>
        <div data-testid="child-content">Child Content</div>
      </MainLayout>
    );
    const mainEl = document.querySelector('main');
    const childEl = screen.getByTestId('child-content');
    expect(mainEl).toBeInTheDocument();
    expect(mainEl).toContainElement(childEl);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('6. header is structurally separate from the main content area', () => {
    render(
      <MainLayout>
        <div data-testid="main-child">Main Content</div>
      </MainLayout>
    );
    const headerEl = document.querySelector('header');
    const mainEl = document.querySelector('main');
    expect(headerEl).toBeInTheDocument();
    expect(mainEl).toBeInTheDocument();
    expect(headerEl).not.toContainElement(mainEl);
    expect(mainEl).not.toContainElement(headerEl);
    const titleEl = screen.getByText('Operations Dashboard');
    const childEl = screen.getByTestId('main-child');
    expect(headerEl).toContainElement(titleEl);
    expect(mainEl).toContainElement(childEl);
  });

  test('7. mounts without errors when geolocation is available', () => {
    setupGeolocation(true);
    mockGetCurrentPosition.mockImplementation((successCb) => {
      successCb({
        coords: { latitude: 51.505, longitude: -0.09 },
      });
    });
    expect(() => {
      render(<MainLayout><div>content</div></MainLayout>);
    }).not.toThrow();
    expect(screen.getByText('Operations Dashboard')).toBeInTheDocument();
  });

  test('8. mounts without errors when geolocation is unavailable', () => {
    setupGeolocation(false);
    expect(() => {
      render(<MainLayout><div>content</div></MainLayout>);
    }).not.toThrow();
    expect(screen.getByText('Operations Dashboard')).toBeInTheDocument();
    const mainEl = document.querySelector('main');
    expect(mainEl).toBeInTheDocument();
  });
});
