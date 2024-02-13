import styled from "styled-components";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../../../AuthContext";
import {
  apiGetContentByCourse,
  apiPostStartContentHistory,
  apiPutCompleteContentHistory,
} from "../../../RestApi";
import { Icon } from "@iconify/react";
import thumbnail from "../../../image/Thumbnail.jpg";
import { formatTimeSeconds } from "../../../Util/util";
import { CourseCurriculem } from "../../CourseCurriculum";

const Container = styled.div`
  width: 100%;
  & .contentComplete {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    padding: 1rem;
    background-color: rgb(30, 30, 30);
    color: #f1f1f1;
    & button {
      cursor: pointer;
      background-color: #3182f6;
      border: 0;
      border-radius: 5px;
      color: white;
      padding: 8px 32px;
    }
  }
`;
const VideoTitle = styled.div`
  background-color: rgb(30, 30, 30);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #f1f1f1;
  & h1 {
    font-size: 1rem;
  }
  & .backIcon {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
const Video = styled.div`
  width: 100%;
  background-color: black;
  height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  & figure {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f1f1f1;
    width: 1000px;
    height: 400px;
    margin: 0 auto;
    & img {
      width: 100%;
      object-fit: cover;
    }
  }
`;
const StartVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  & .startButton {
    font-size: 5rem;
    color: #f1f1f1;
    cursor: pointer;
  }
`;
const VideoBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  & div {
    display: flex;
    gap: 2rem;
    padding: 1rem 1.5rem;
    align-items: center;
    cursor: pointer;
  }
`;

const VideoIcon = styled(Icon)`
  font-size: 20px;
`;
const Curriculem = styled.div`
  & .title {
    font-size: 18px;
    position: relative;
    & .contentInfo {
      position: absolute;
      bottom: 5px;
      left: 5rem;
      font-size: 12px;
      font-weight: 400;
    }
  }
  & .content {
    display: flex;
    padding: 1rem;
  }
`;
export const StyledCourseCurriculem = styled(CourseCurriculem)`
  &.active {
    color: red;
  }
`;

export function ContentComponent() {
  const { user } = useContext(AuthContext);
  const { courseId, contentId } = useParams();
  const location = useLocation(); // 현재 페이지의 경로
  const [prevPath, setPrevPath] = useState(""); //이전 주소 저장
  const [contents, setContents] = useState([]);
  const [soundStatus, setSoundStatus] = useState("high");
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    setPrevPath(location.pathname);
  }, [location.pathname]);
  const handleClick = () => {
    window.history.back();
  };

  // 해당 코스 컨텐츠 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContents(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);
  // 현재 content 정보만 조회
  const matchingContent = contents.find(
    (content) => content.contentId === Number(contentId)
  );
  console.log(matchingContent);

  // 수강 시작
  const handleStartContent = () => {
    if (contents) {
      const memberId = user.memberId;
      apiPostStartContentHistory(memberId, contentId)
        .then((response) => {
          setIsVisible(false);
        })
        .catch((err) => {
          console.log("contentHistory 생성 중 오류 발생", err);
        });
    }
  };

  // 수강 완료
  const handleCompleteContent = () => {
    if (contents) {
      const memberId = user.memberId;
      apiPutCompleteContentHistory(memberId, contentId)
        .then((response) => {
          handleClick();
        })
        .catch((err) => {
          console.log("contentHistory 업데이트 중 오류 발생", err);
        });
    }
  };

  const toggleSound = () => {
    setSoundStatus(soundStatus === "high" ? "off" : "high");
  };

  return (
    <Container>
      <VideoTitle>
        <Icon
          onClick={handleClick}
          icon={"eva:arrow-back-fill"}
          className="backIcon"
        ></Icon>
        {matchingContent && <h1>{matchingContent.course.courseName}</h1>}
      </VideoTitle>
      <Video ref={videoRef}>
        {isVisible && (
          <StartVideo>
            <Icon
              onClick={handleStartContent}
              className="startButton"
              icon={"icon-park-solid:play"}
            ></Icon>
          </StartVideo>
        )}
        <figure>
          <img src={thumbnail} alt="sample" />
        </figure>
        <VideoBar>
          <div>
            <VideoIcon
              onClick={handleStartContent}
              icon={"ph:play-fill"}
            ></VideoIcon>
            <VideoIcon
              icon={"iconoir:sound-high"}
              onClick={toggleSound}
            ></VideoIcon>
            {/* <VideoIcon icon={"iconoir:sound-off"} onClick={toggleSound}></VideoIcon> */}
            {matchingContent && (
              <p>{formatTimeSeconds(matchingContent.contentDuration)}</p>
            )}
          </div>
          <div>
            <VideoIcon
              onClick={toggleFullscreen}
              icon={"mingcute:fullscreen-fill"}
            ></VideoIcon>
          </div>
        </VideoBar>
      </Video>
      <div className="contentComplete">
        <p> 수강을 완료하셨다면 버튼을 눌러주세요. </p>
        <button onClick={handleCompleteContent} className="complete">
          수강 완료
        </button>
      </div>
      <Curriculem>
        <CourseCurriculem />
      </Curriculem>
    </Container>
  );
}
