import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 50px;
  & .innerWrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
    gap: 2rem;
  }
`;
const DescriptionBox = styled.div`
  border: 1px solid black;
`;

const ListBox = styled.div`
  flex: 1 1 auto;
  padding-left: 40px;
`;

const List = styled.div`
  font-weight: 400;
  line-height: 1.5; //list마다의 간격 조정 가능
  letter-spacing: -0.3px;
  font-size: 16px;
  display: flex;
  align-self: baseline;
  color: #343a40;
`;

//여기는 icon png 구해서 img로 변경해야 함
const Icon = styled.div`
  margin-right: 8px;
  /* width: 16px; */
  /* height: 16px; */
`;

const ReviewBox = styled.div`
  border: 1px solid black;
`;

const InputBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 30px;
  & input {
    flex: 1;
  }
`;
const Reviews = styled.div``;
const Review = styled.div``;

export function CourseDescription() {
  return (
    <>
      <Container>
        <div className="innerWrapper">
          <DescriptionBox>
            <p>
              <strong>강의 이름이 들어가는</strong> 부분입니다
            </p>
            <p>course description 필요합니다</p>
            <ListBox>
              <List>
                <Icon>아이콘</Icon>content description 1
              </List>
              <List>
                <Icon>아이콘</Icon>content description 2
              </List>
              <List>
                <Icon>아이콘</Icon>content description 3
              </List>
              <List>
                <Icon>아이콘</Icon>content description 4
              </List>
            </ListBox>
          </DescriptionBox>
          <ReviewBox>
            <p>
              <strong>수강평</strong>
            </p>
            <InputBox>
              <input
                type="text"
                placeholder="다른 수강생들이 볼 수 있게 수강 후기와 별점을 남겨 주세요"
              />
              <button>등록</button>
            </InputBox>
            <Reviews>
              <colgroup>
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 300 + "px" }} />
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 130 + "px" }} />
              </colgroup>
              <Review>
                <tr>
                  <td>9342</td>
                  <td>당장 널 만나러 가지 않으면</td>
                  <td>이찬혁</td>
                  <td>2024-02-05</td>
                </tr>
              </Review>
            </Reviews>
          </ReviewBox>
        </div>
      </Container>
    </>
  );
}
