import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Requirements from './Requirements';

describe('<Requirements />', () => {
  test('it should mount', () => {
    render(<Requirements />);
    
    const requirements = screen.getByTestId('Requirements');

    expect(requirements).toBeInTheDocument();
  });
});