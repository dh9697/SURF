import styled from "styled-components";
import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";

const Container = styled.div`
  width: 100%;
  padding: 0 20%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  margin-top: 10px;
  font-size: 1.5rem;
`;

const InputBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 50px;
`;

const Date = styled.div`
  width: 100px;
  text-align: center;
  line-height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background-color: #3182f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RealTimeBox = styled.div`
  height: 100px;
  background-color: #3182f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RealTimeText = styled.div`
  color: white;
  font-weight: bold;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const AccumBox = styled.div`
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Col = styled.col`
  width: ${({ width }) => width};
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #3182f6;
  color: white;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export function TodayResolutions() {
  const { user } = useContext(AuthContext);
  const [resolution, setResolution] = useState("");
  const [realTimeResolution, setRealTimeResolution] = useState("");
  const [accumulatedResolutions, setAccumulatedResolutions] = useState([]);

  const handleButtonClick = () => {
    setRealTimeResolution(resolution);
    setAccumulatedResolutions([...accumulatedResolutions, resolution]);
    setResolution("");
  };

  const handleInputChange = (e) => {
    setResolution(e.target.value);
  };

  return (
    <Container>
      <InnerWrapper>
        <Title>오늘의 각오</Title>
        <InputBox>
          <Date>2월 13일</Date>
          <Input
            type="text"
            placeholder="오늘의 각오를 적어 주세요!"
            value={resolution}
            onChange={handleInputChange}
          />
          <Button onClick={handleButtonClick}>파이팅</Button>
        </InputBox>
        <RealTimeBox>
          <RealTimeText>{realTimeResolution}</RealTimeText>
        </RealTimeBox>
        <AccumBox>
          <Title>지금까지 오늘의 각오</Title>
          <Table>
            <colgroup>
              <Col width="130px" />
              <Col width="300px" />
              <Col width="130px" />
              <Col width="130px" />
            </colgroup>
            <tbody>
              {accumulatedResolutions
                .slice(0)
                .reverse()
                .map((res, index) => (
                  <tr key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{res}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>2/13</TableCell>
                  </tr>
                ))}
            </tbody>
          </Table>
        </AccumBox>
      </InnerWrapper>
    </Container>
  );
}
