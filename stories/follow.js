import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Follow from '../src/follow';

storiesOf('Forms', module)
  .add('Follow with followers', () => {
    const following = [
      {"handle":"@philt3r", "userHash": "wegwtrwrt"},
      {"handle":"Test 2", "userHash": "dddd"}
    ];
    return getFollow(following);
  })
  .add('Follow with no followers', () => {
    const following = [];
    return getFollow(following);
  });

function getFollow(following) {

  return (
      <Follow following={following} follow={action('clicked Follow Button')} unfollow={action('clicked Unfollow Button')}/>
  );
}
