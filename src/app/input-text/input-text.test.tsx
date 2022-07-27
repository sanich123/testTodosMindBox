import { render, screen } from '@testing-library/react';
import { mockTasks } from '../../utils/mocks';
import InputText from './input-text';

const setText = jest.fn();
describe('input-text', () => {
  it('Should render correctly', () => {
    render(<InputText tasks={mockTasks} text={'I love yellow'} setText={setText} />);
    expect(screen.getByDisplayValue(/yellow/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your task now/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/вашу задачу/i)).toBeInTheDocument();
  });
});
