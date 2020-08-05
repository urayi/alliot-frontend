import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentInfo from './CommentInfo';

describe('<CommentInfo />', () => {
  test('it should mount', () => {
    render(<CommentInfo />);
    
    const commentInfo = screen.getByTestId('CommentInfo');

    expect(commentInfo).toBeInTheDocument();
  });
});