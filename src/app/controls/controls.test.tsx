import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockTasks } from '../../utils/mocks';
import ControlsBtns from './controls';

const setFilter = jest.fn();
const setIsNeedToUpdate = jest.fn();

describe('controls-btns', () => {
  it('should render correctly', () => {
    render(<ControlsBtns setFilter={setFilter} setIsNeedToUpdate={setIsNeedToUpdate} tasks={mockTasks} isNeedToUpdate />);
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    const activeBtn = screen.getByText(/active/i);
    userEvent.click(activeBtn);
    expect(setFilter).toHaveBeenCalled();
  });
});
