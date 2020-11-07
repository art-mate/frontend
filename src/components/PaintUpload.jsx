import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { dbService } from '../fBase';

const PaintUploadModal = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaintUpload = ({ userObj }) => {
  const [paint, setPaint] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection('paints')
      .add({
        paint,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      })
      .then(() => alert('완료'))
      .catch((error) => alert(error.message));
    setPaint('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPaint(value);
  };

  return (
    <PaintUploadModal>
      <form onSubmit={onSubmit}>
        <input
          value={paint}
          onChange={onChange}
          type="text"
          placeholder="작품명"
          maxLength={120}
        />
        <input type="submit" value="등록" />
      </form>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </PaintUploadModal>
  );
};

export default PaintUpload;
