import { render, screen } from '@testing-library/react';
import App from './App';
import Bisection from './components/RoE/Bisection';

test('renders learn react link', () => {
  render(<App />);

});

test('renders Bisection', () => {
  render(<Bisection />);

});
