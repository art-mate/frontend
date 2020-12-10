import React from 'react';
import styled from 'styled-components';

const CommentBox = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Comment({ commentObj }) {
  return <CommentBox>댓글</CommentBox>;
}
