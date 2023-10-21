import { FC } from 'react';

import { IFeedModalProps } from './feed-modal-props';

const FeedModalHeader: FC<IFeedModalProps> = ({ order }) => {
  return (
    <div
      className='text text_type_digits-default'
      style={{ marginTop: '10px', marginBottom: '20px' }}
    >
      #{order.number}
    </div>
  );
};

export default FeedModalHeader;
