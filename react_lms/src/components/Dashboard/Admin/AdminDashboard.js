import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import { apiGetAllSurfers } from '../../RestApi';
import { TotalSales } from './Make/TotalSales';
import { LearningStatistics } from './Make/LearningStatistics';
import { QnaStatistics } from './Make/QnaStatistics';
import { CourseReviewStatistics } from './Make/CourseReviewStatistics';
import { Icon } from '@iconify/react';
import { formatPrice } from '../../Util/util';

const Title = styled.h2`
  padding-bottom: 1rem;
`;

const Total = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding-bottom: 2rem;
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: center;
  align-items: center;
  grid-gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
  & h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  & p {
    font-size: 12px;
    color: darkgray;
  }
  & .qna-review {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const IconBox = styled.div`
  background-color: red;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  &.users {
    background-color: #fba834;
  }
  &.sales {
    background-color: #333a73;
  }
  &.volume {
    background-color: #387adf;
  }
  &.boards {
    background-color: #50c4ed;
  }
`;

const OverviewIcon = styled(Icon)`
  color: #f3f3f3;
  font-size: 1.5rem;
`;

const Content = styled.div`
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [surfers, setSurfers] = useState([]);
  const [surfersCount, setSurfersCount] = useState(0);
  const [totalSalesFromChild, setTotalSalesFromChild] = useState(0);
  const [totalVolumeFromChild, setTotalVolumeFromChild] = useState(0);
  const [totalReviewsFromChild, setTotalReviewsFromChild] = useState(0);
  const [totalQnasFromChild, setTotalQnasFromChild] = useState(0);

  useEffect(() => {
    apiGetAllSurfers()
      .then((response) => {
        setSurfers(response.data.data);
        setSurfersCount(response.data.data.length);
      })
      .catch((err) => {
        console.log('모든 이용자 조회 실패: ', err);
      });
  }, []);

  const handleTotalSalesUpdate = (value) => {
    setTotalSalesFromChild(value);
  };
  const handleTotalVolumeUpdate = (value) => {
    setTotalVolumeFromChild(value);
  };
  const handleTotalReviewsUpdate = (value) => {
    setTotalReviewsFromChild(value);
  };
  const handleTotalQnasUpdate = (value) => {
    setTotalQnasFromChild(value);
  };

  return (
    <>
      <Title>Dashboard</Title>
      <div>
        <Total>
          <Overview>
            <IconBox className="users">
              <OverviewIcon icon={'ph:user-bold'}></OverviewIcon>
            </IconBox>
            <div>
              <h2>{surfersCount}</h2>
              <p>Total users</p>
            </div>
          </Overview>
          <Overview>
            <IconBox className="sales">
              <OverviewIcon icon={'solar:dollar-linear'}></OverviewIcon>
            </IconBox>
            <div>
              <h2>{formatPrice(totalSalesFromChild)}</h2>
              <p>Total sales</p>
            </div>
          </Overview>
          <Overview>
            <IconBox className="volume">
              <OverviewIcon icon={'uil:arrow-growth'}></OverviewIcon>
            </IconBox>
            <div>
              <h2>{totalVolumeFromChild}</h2>
              <p>Total sales volume</p>
            </div>
          </Overview>
          <Overview>
            <IconBox className="boards">
              <OverviewIcon
                icon={'material-symbols:list-alt-outline'}
              ></OverviewIcon>
            </IconBox>
            <div>
              <div className="qna-review">
                <h2>{totalQnasFromChild}</h2>
                <h2>{totalReviewsFromChild}</h2>
              </div>
              <div className="qna-review">
                <p>Total qnas</p>
                <p>reviews</p>
              </div>
            </div>
          </Overview>
        </Total>
        <TotalSales onTotalSalesUpdate={handleTotalSalesUpdate} />
        <LearningStatistics onTotalVolumeUpdate={handleTotalVolumeUpdate} />
        <QnaStatistics onTotalQnasUpdate={handleTotalQnasUpdate} />
        <CourseReviewStatistics
          onTotalreviewsUpdate={handleTotalReviewsUpdate}
        />
      </div>
    </>
  );
}
