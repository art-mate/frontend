import React, { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';
import { v4 as uuidv4 } from 'uuid';
import { BiUpload } from 'react-icons/bi';

const UploadContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const UploadFormWrap = styled.div`
  width: 55%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  min-width: 600px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 5px 13px rgba(0, 0, 0, 0.3);
  background: ${(props) => props.themeProps.navBar};
`;

const UploadForm = styled.form`
  min-width: 550px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 20px;
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
  margin-top: 20px;
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
  width: 100%;
  height: 550px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  min-width: 550px;
  width: 60%;
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
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Preview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 550px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const FileWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.themeProps.body};
  cursor: pointer;
  border-radius: 8px;
  border: 4px dashed ${(props) => props.themeProps.text};
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const CancelButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: none;
  color: white;
  background: #000000;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const SubmitButton = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: none;
  color: white;
  background: #cf2020;
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
  const [year, setYear] = useState('');

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
      year: year,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      likes: [],
      cart: [],
      comment: [],
    };
    await dbService
      .collection('goods')
      .add(GoodsObj)
      .then(() => alert('굿즈 등록이 완료되었습니다.'))
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
    } else if (name === 'year') {
      setYear(value);
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

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <UploadContainer>
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
            <label htmlFor="year">제작년도</label>
            <input
              name="year"
              value={year}
              onChange={onChange}
              type="text"
              maxLength={10}
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
          <FileUploadContainer>
            {attachment ? (
              <ContentsWrap>
                <Preview>
                  <img src={attachment} alt="attachment" />
                </Preview>
              </ContentsWrap>
            ) : (
              <FileWrap onClick={handleFileClick} themeProps={theme}>
                <BiUpload size={70} />
                <p style={{ marginTop: '20px' }}>
                  여기서 사진을 업로드하고 미리보기로 보실 수 있습니다.
                </p>
              </FileWrap>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={hiddenFileInput}
              style={{ display: 'none' }}
            />
          </FileUploadContainer>
          <SubmitButton type="submit" value="등록" />
        </UploadForm>
        <ButtonContainer>
          <Link to="/">
            <CancelButton>취소</CancelButton>
          </Link>
        </ButtonContainer>
      </UploadFormWrap>
    </UploadContainer>
  );
};

export default GoodsUpload;
