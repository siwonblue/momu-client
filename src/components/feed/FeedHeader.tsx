import styled from 'styled-components';

const FeedHeader = () => {
  return (
    <div>
      <HeaderContainer>
        <TextContainer>Request</TextContainer>
        <ButtonContainer>
          <FilterButton>
            <FilterText>필터</FilterText>
            <FilterIcon src={'img/filtericon.png'} />
          </FilterButton>
        </ButtonContainer>
      </HeaderContainer>
      <Line></Line>
    </div>
  );
};
export default FeedHeader;

const HeaderContainer = styled.div`
  margin: 0 -16px;
  padding: 0;
  width: 375px;
  height: 68px;
  line-height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  padding-left: 20px;
  height: 42px;
  font-family: 'Prompt';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;

  color: #191919;
`;

const ButtonContainer = styled.div`
  padding-right: 20px;
`;
const FilterButton = styled.button`
  background-color: transparent;
  width: 76px;
  height: 36px;

  border: 1.5px solid #191919;
  align-items: center;
  display: flex;
  align-items: center;
`;

const FilterText = styled.div`
  position: absolute;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  margin-left: 12px;
`;

const FilterIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 42px;
`;

const Line = styled.div`
  border-bottom: 2px solid #191919;
  width: calc(100% + 16px * 2);
  margin: 0 16px 0 -16px;
`;
