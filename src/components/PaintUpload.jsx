import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService } from '../fBase';

const PaintUpload = () => {
  const [paint, setPaint] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection('paints')
      .add({
        paint,
        createdAt: Date.now(),
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
    <div>
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
    </div>
  );
};

export default PaintUpload;
