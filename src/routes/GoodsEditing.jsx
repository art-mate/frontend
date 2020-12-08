import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { dbService } from '../fBase';

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
  min-width: 600px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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

const GoodsEditing = ({ location }) => {
  const { myGoods, goodsId } = location.state;
  const history = useHistory();

  const [newGoods, setNewGoods] = useState(myGoods.name);
  const [newArtist, setNewArtist] = useState(myGoods.artist);
  const [newPrice, setNewPrice] = useState(myGoods.price);
  const [newDescription, setNewDescription] = useState(myGoods.description);
  const [newYear, setNewYear] = useState(myGoods.year);

  const { theme } = useContext(ThemeContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    const GoodsObj = {
      name: newGoods,
      artist: newArtist,
      price: newPrice,
      description: newDescription,
      year: newYear,
    };
    await dbService
      .doc(`goods/${goodsId}`)
      .update(GoodsObj)
      .then(() => alert('수정이 완료되었습니다.'))
      .then(() => history.push('/profile'))
      .catch((error) => alert(error.message));
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'goods') {
      setNewGoods(value);
    } else if (name === 'artist') {
      setNewArtist(value);
    } else if (name === 'description') {
      setNewDescription(value);
    } else if (name === 'price') {
      setNewPrice(value);
    } else if (name === 'year') {
      setNewYear(value);
    }
  };

  return (
    <UploadContainer>
      <UploadFormWrap themeProps={theme}>
        <ContentWrap>굿즈 수정</ContentWrap>
        <UploadForm onSubmit={onSubmit}>
          <InputWrap>
            <label htmlFor="artist">아티스트명</label>
            <input
              name="artist"
              value={newArtist}
              onChange={onChange}
              type="text"
              maxLength={10}
            />
          </InputWrap>
          <InputWrap>
            <label htmlFor="굿즈명">굿즈명</label>
            <input
              name="goods"
              value={newGoods}
              onChange={onChange}
              type="text"
              maxLength={50}
            />
          </InputWrap>
          <InputWrap>
            <label htmlFor="year">제작년도</label>
            <input
              name="year"
              value={newYear}
              onChange={onChange}
              type="text"
              maxLength={10}
            />
          </InputWrap>
          <InputWrap>
            <label htmlFor="price">희망가격</label>
            <input
              name="price"
              value={newPrice}
              onChange={onChange}
              type="text"
            />
          </InputWrap>
          <DescriptionWrap>
            <label htmlFor="description">작품설명</label>
            <textarea
              name="description"
              value={newDescription}
              onChange={onChange}
              type="text"
              maxLength={120}
            />
          </DescriptionWrap>
          <FileUploadContainer>
            <img src={myGoods.attachmentUrl} alt="attachment" />
          </FileUploadContainer>
          <SubmitButton type="submit" value="수정" />
        </UploadForm>
        <ButtonContainer>
          <Link to="/profile">
            <CancelButton>취소</CancelButton>
          </Link>
        </ButtonContainer>
      </UploadFormWrap>
    </UploadContainer>
  );
};

export default GoodsEditing;
