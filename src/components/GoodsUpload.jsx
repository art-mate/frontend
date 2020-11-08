import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';
import { v4 as uuidv4 } from 'uuid';

const GoodsUploadModal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoodsUpload = ({ userObj }) => {
  const [Goods, setGoods] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const GoodsObj = {
      GoodsName: Goods,
      artist: artist,
      price: price,
      description: description,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService
      .collection('Goods')
      .add(GoodsObj)
      .then(() => alert('완료'))
      .catch((error) => alert(error.message));
    setGoods('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'Goods') {
      setGoods(value);
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
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <GoodsUploadModal>
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
          name="Goods"
          value={Goods}
          onChange={onChange}
          type="text"
          placeholder="굿즈명"
          maxLength={50}
        />
        <input
          name="description"
          value={description}
          onChange={onChange}
          type="text"
          placeholder="굿즈설명"
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
        {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px" />
            <button onClick={onClearAttachment}>업로드 취소</button>
          </div>
        )}
      </form>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </GoodsUploadModal>
  );
};

export default GoodsUpload;
