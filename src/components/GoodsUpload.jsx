import React, { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';
import { v4 as uuidv4 } from 'uuid';
import { BiUpload } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const UploadContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const UploadFormWrap = styled.div`
  width: 40%;
  min-width: 530px;
  height: 650px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.4);
  background: ${(props) => props.themeProps.navBar};
`;

const UploadForm = styled.form`
  max-width: 550px;
  min-width: 420px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 80px;
  & input {
    padding: 15px;
    width: 100%;
    margin-top: 3px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  & label {
    font-size: 0.8rem;
  }
`;

const DescriptionWrap = styled.div`
  width: 100%;
  & textarea {
    padding: 15px;
    width: 100%;
    height: 100px;
    margin-top: 3px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  & label {
    font-size: 0.8rem;
  }
`;

const FileUploadContainer = styled.div`
  width: 40%;
  height: 650px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 420px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  & a {
    width: 100%;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 40px;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Preview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const FileUploadWrap = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: #fcfcfc;
  cursor: pointer;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.5);

  & svg {
    color: #686869;
  }

  &:hover {
    background: #e0e0e0;
  }
`;

const ContentsWrap = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CaptionWrap = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadCancelButton = styled.button`
  background: none;
  border: none;
  & svg {
    color: black;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: none;
  color: white;
  background: #ff3c3c;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 30px;
`;

const SubmitButton = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: none;
  color: white;
  background: #e6328d;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 30px;
`;

const GoodsUpload = ({ userObj }) => {
  const [goods, setGoods] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState();

  const history = useHistory();

  const { theme } = useContext(ThemeContext);
  const hiddenFileInput = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const GoodsObj = {
      name: goods,
      artist: artist,
      price: price,
      description: description,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService
      .collection('goods')
      .add(GoodsObj)
      .then(() => alert('등록 완료'))
      .then(() => history.push('/'))
      .catch((error) => alert(error.message));
    setGoods('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'goods') {
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

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <UploadContainer>
      <FileUploadContainer>
        <ContentsWrap>
          {attachment ? (
            <Preview>
              <img src={attachment} alt="attachment" />
            </Preview>
          ) : (
            <FileUploadWrap onClick={handleFileClick}>
              <BiUpload size={70} />
            </FileUploadWrap>
          )}
        </ContentsWrap>
        <CaptionWrap>
          {attachment ? (
            <UploadCancelButton onClick={onClearAttachment}>
              <AiOutlineCloseCircle size={30} />
            </UploadCancelButton>
          ) : (
            <p>여기서 사진을 업로드하고 미리보기로 보실 수 있습니다.</p>
          )}
        </CaptionWrap>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
        />
      </FileUploadContainer>
      <UploadFormWrap themeProps={theme}>
        <ContentWrap>굿즈 등록</ContentWrap>
        <UploadForm onSubmit={onSubmit}>
          <InputWrap>
            <label htmlFor="artist">아티스트명</label>
            <input
              name="artist"
              value={artist}
              onChange={onChange}
              type="text"
              maxLength={10}
            />
          </InputWrap>
          <InputWrap>
            <label htmlFor="굿즈명">굿즈명</label>
            <input
              name="goods"
              value={goods}
              onChange={onChange}
              type="text"
              maxLength={50}
            />
          </InputWrap>
          <InputWrap>
            <label htmlFor="price">희망가격</label>
            <input name="price" value={price} onChange={onChange} type="text" />
          </InputWrap>
          <DescriptionWrap>
            <label htmlFor="description">작품설명</label>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              type="text"
              maxLength={120}
            />
          </DescriptionWrap>
          <SubmitButton type="submit" value="등록" />
        </UploadForm>
        <ButtonContainer>
          <Link to="/">
            <CancelButton>Cancel</CancelButton>
          </Link>
        </ButtonContainer>
      </UploadFormWrap>
    </UploadContainer>
  );
};

export default GoodsUpload;
