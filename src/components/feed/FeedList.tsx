import {
  getCurationPostListsThunk,
  getMoreCurationPostListsThunk,
} from '@slices/curation/curationPostSlice';
import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import styled from 'styled-components';
import GetCurationCard from './GetCurationCard';
import { useSelector } from 'react-redux';
import { userInfo } from '@slices/user/userThunk';
import Spinner from '@common/Spinner';

interface Props {
  hasNext: Boolean;
  percent: number;
}

const FeedList = ({ hasNext, percent }: Props) => {
  const curations = useAppSelector(
    (state: RootState) => state.curation.data.results
  );

  // 인증 정보 확인
  const dispatch = useAppDispatch();
  const me = useSelector((state: RootState) => state.user.me);
  useEffect(() => {
    dispatch(userInfo());
  }, []);

  // 처음에 게시물 한번 가져옴
  useEffect(() => {
    dispatch(getCurationPostListsThunk());
  }, []);

  // hasNext === true

  useEffect(() => {
    // 더 가져오는 thunk 실행
    if (hasNext) {
      dispatch(getMoreCurationPostListsThunk());
    }
    if (percent === 100) {
      dispatch(getMoreCurationPostListsThunk());
    }
  }, [hasNext, percent]);

  return (
    <Wrapper>
      {curations?.map((curation) => {
        return (
          <>
            <GetCurationCard
              key={curation.id + `${new Date()}`}
              area={curation.location}
              isDrink={curation.drink}
              when={curation.time}
              personnel={curation.member_count}
              additionalText={curation.description}
              usernickname={curation.user.nickname}
              profileImg={curation.user.profile_img}
              mukbti={curation.user.mbti}
              createAt={curation.created_at}
              commentNum={curation.comment_count}
              scrapFlag={curation.scrap_flag}
              user={curation.user.id}
              post={curation.id}
            />
          </>
        );
      })}
    </Wrapper>
  );
};

export default FeedList;

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  overflow: scroll;
  border: 2px dotted red;
`;

const GotoDetailButton = styled.button``;
