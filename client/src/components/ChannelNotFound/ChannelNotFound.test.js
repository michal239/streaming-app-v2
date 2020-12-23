import React from 'react';
import { render } from '@testing-library/react';
import faker from 'faker';
import '@testing-library/jest-dom/extend-expect';

import ChannelNotFound from './ChannelNotFound';

describe('ChannelNotFound component', () => {
  it('renders passed name', () => {
    const username = faker.internet.userName();

    const { getByText } = render(<ChannelNotFound username={username} />);

    expect(getByText(username)).toBeInTheDocument();
  })

  it('matches snapshot', () => {
    const { container } = render(<ChannelNotFound />);

    expect(container).toMatchSnapshot();
  })
})