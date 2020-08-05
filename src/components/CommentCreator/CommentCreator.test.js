import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentCreator from './CommentCreator';

describe('<CommentCreator />', () => {
  test('it should mount', () => {
    render(<CommentCreator />);
    
    const commentCreator = screen.getByTestId('CommentCreator');

    expect(commentCreator).toBeInTheDocument();
  });
});