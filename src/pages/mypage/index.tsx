import NavBar from '@common/NavBar';
import MyPageTab from 'components/mypage/MyPageTab';
import ProfileCard from 'components/mypage/ProfileCard';
import ProfileHeader from 'components/mypage/ProfileHeader';
import { useEffect } from 'react';
import styled from 'styled-components';
import wrapper, {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import { mypageSlice } from '@slices/mypage/mypageSlice';
import axios from 'axios';
import { userInfo } from '@slices/user/userThunk';
import Spinner from '@common/Spinner';
import { router } from 'next/client';
import { toast } from 'react-toastify';
const Mypage = ({ data }: any) => {
  const dispatch = useAppDispatch();

  const me = useAppSelector((state: RootState) => state.user.me);
  useEffect(() => {
    dispatch(userInfo());
  }, []);

  useEffect(() => {
    if (data.message === 'Request failed with status code 401' || !me?.id) {
      router.push('/').then((r) =>
        toast('로그인이 필요합니다.', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    }
  }, [me]);

  const ssrRender = () => {
    if (data.message === 'Request failed with status code 401' || !me?.id) {
      return <Spinner />;
    } else {
      return (
        <Wrapper>
          <HeaderContainer className="fixed top-0">
            <ProfileHeader />
          </HeaderContainer>
          <ProfileCard />
          <ContentContainer>
            <MyPageTab />
          </ContentContainer>
          <NavContainer className="fixed">
            <NavBar />
          </NavContainer>
        </Wrapper>
      );
    }
  };

  return <>{ssrRender()}</>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      if (cookie && req) {
        axios.defaults.headers.common['Cookie'] = cookie;
      }
      const { payload } = await store.dispatch(userInfo());
      const data = payload;
      return { props: { data } };
    }
);

export default Mypage;

const Wrapper = styled.div`
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const HeaderContainer = styled.div`
  background: #ffffff;
  z-index: 2;
`;

const NavContainer = styled.div`
  width: 343px;
  &.fixed {
    position: fixed;
    bottom: 0px;
  }
`;
const ContentContainer = styled.div`
  margin-bottom: 85px;
`;
