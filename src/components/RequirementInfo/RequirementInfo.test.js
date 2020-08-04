import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequirementInfo from './RequirementInfo';

describe('<RequirementInfo />', () => {
  test('it should mount', () => {
    render(<RequirementInfo />);
    
    const requirementInfo = screen.getByTestId('RequirementInfo');

    expect(requirementInfo).toBeInTheDocument();
  });
});