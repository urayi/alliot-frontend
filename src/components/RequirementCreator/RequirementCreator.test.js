import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequirementCreator from './RequirementCreator';

describe('<RequirementCreator />', () => {
  test('it should mount', () => {
    render(<RequirementCreator />);
    
    const requirementCreator = screen.getByTestId('RequirementCreator');

    expect(requirementCreator).toBeInTheDocument();
  });
});