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
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection('paints')
      .add({
        paintName: paint,
        artist: artist,
        price: price,
        description: description,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      })
      .then(() => alert('완료'))
      .catch((error) => alert(error.message));
    setPaint('');
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'paint') {
      setPaint(value);
    } else if (name === 'artist') {
      setArtist(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'price') {
      setPrice(value);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };
    reader.readAsDataURL(file);
  };

  return (
    <PaintUploadModal>
      <form onSubmit={onSubmit}>
        <input
          name="artist"
          value={artist}
          onChange={onChange}
          type="text"
          placeholder="아티스트명"
          maxLength={10}
        />
        <input
          name="paint"
          value={paint}
          onChange={onChange}
          type="text"
          placeholder="작품명"
          maxLength={50}
        />
        <input
          name="description"
          value={description}
          onChange={onChange}
          type="text"
          placeholder="작품설명"
          maxLength={120}
        />
        <input
          name="price"
          value={price}
          onChange={onChange}
          type="text"
          placeholder="희망가격"
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="등록" />
      </form>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </PaintUploadModal>
  );
};

export default PaintUpload;
