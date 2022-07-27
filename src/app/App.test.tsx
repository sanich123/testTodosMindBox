import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('it should render correctly', () => {
  it('should render correctly the first time', () => {
    render(<App />);
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/there are no tasks here/i)).toBeInTheDocument();
  });
  it('should interact with user when user is typing', async () => {
    render(<App />);
    const inputText = screen.getByPlaceholderText(/type your task now/i);
    userEvent.type(inputText, 'Sorok tysyach obezyan sunuli banan');
    expect(await screen.findByDisplayValue(/Sorok tysyach obezyan/i)).toBeInTheDocument();
  });
});

