import React, { useState } from 'react';
import styled from 'styled-components';

const PaintUpload = () => {
  const [paint, setpaint] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setpaint(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name={paint}
          onChange={onChange}
          type="text"
          placeholder="작품명"
          maxLength={120}
        />
        <input type="submit" value="Paint" />
      </form>
    </div>
  );
};

export default PaintUpload;
