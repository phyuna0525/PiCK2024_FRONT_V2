import { Layout } from '@/components/layout';
import { useNavigate } from 'react-router-dom';
import nextSvg from '@/assets/svg/next.svg';
import Input from '@/components/input';
import * as S from '../style';
import { getFullToday } from '@/utils/date';
import BottomButtonWrap from '@/components/Button/bottom';
import { useState } from 'react';
import { ChangeProps } from '@/apis/type';
import { UploadNotice } from '@/apis/notice';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/input/textarea';

const NoticeWrite = () => {
  const router = useNavigate();
  const [data, setData] = useState({
    title: '',
    content: '',
  });

  const { mutate: UploadNoticeMutate } = UploadNotice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const name = localStorage.getItem('name');

  const Upload = () => {
    UploadNoticeMutate(data, {
      onSuccess: () => {
        toast.success('공지가 등록되었습니다');
        router(-1);
      },
      onError: () => {
        //에러시 토스트
      },
    });
  };

  return (
    <>
      <Layout
        now={
          <>
            <p
              onClick={() => {
                router('/notice');
              }}
            >
              공지
            </p>
            <img src={nextSvg} alt="" /> <p>공지 작성하기</p>
          </>
        }
        title="공지 작성하기"
      >
        <S.NoticeWriteTop>
          <S.NoticeWrite>
            <S.NoticeBedgeTitle>작성자</S.NoticeBedgeTitle>
            <S.NoticeBedge>{name} 선생님</S.NoticeBedge>
          </S.NoticeWrite>
          <S.NoticeWrite>
            <S.NoticeBedgeTitle>작성일</S.NoticeBedgeTitle>
            <S.NoticeBedge>{getFullToday()}</S.NoticeBedge>
          </S.NoticeWrite>
        </S.NoticeWriteTop>
        <Input
          widthtype="long"
          name="title"
          onChange={handleChange}
          value={data.title}
          label="*제목"
          placeholder="공지 제목을 입력하세요"
        />
        <Textarea
          name="content"
          label="내용"
          placeholder="공지 내용을 입력하세요"
          value={data.content}
          onChange={handleChange}
        />
      </Layout>
      <BottomButtonWrap
        firstContent="공지작성"
        firstDisabled={false}
        firstOnclick={Upload}
        firstSize="standard"
        firstType="main"
      />
    </>
  );
};

export default NoticeWrite;
