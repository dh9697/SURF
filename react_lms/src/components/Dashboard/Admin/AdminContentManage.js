import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  apiDeleteContent,
  apiGetAllCourses,
  apiGetContentByCourse,
  apiPostContentByCourse,
  apiUpdateContent,
} from "../../RestApi";

const Container = styled.div`
  color: #454545;
  & h2 {
    margin-bottom: 2rem;
  }
`;

const ContentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  & label {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    font-size: 14px;
    font-weight: 900;
    & select {
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #fff;
      cursor: pointer;
    }
    & input {
      border: 1px solid #ddd;
      padding: 0.5rem;
      border-radius: 5px;
    }
  }
`;

const Button = styled.button`
  border: none;
  color: #f3f3f3;
  background-color: #3182f6;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  &.submitButton {
    margin: 2rem auto;
    padding: 10px 5rem;
  }
`;

const Contents = styled.div``;
const ContentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  align-items: start;
  justify-content: center;
  & .gridItem {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    & .contentText {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-top: 1rem;
      & .contentTitle {
        font-size: 1rem;
        font-weight: 900;
      }
    }
    & .buttonBox {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin: 2rem 0;
    }
  }
`;
const ImgBox = styled.div`
  width: 300px;
  & img {
    width: 100%;
  }
`;

export function AdminContentManage() {
  const [contents, setContents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [contentDto, setContentDto] = useState({
    courseId: "",
    contentId: "",
    contentTitle: "",
    description: "",
    contentDuration: 0,
    contentImg: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseResponse = await apiGetAllCourses();
        setCourses(courseResponse.data.data);
      } catch (err) {
        console.log("코스 조회 실패: ", err);
      }
    };
    fetchCourses();
    fetchContentsByCourse(selectedCourseId);
  }, [selectedCourseId]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const fetchContentsByCourse = async (courseId) => {
    if (!courseId) return;
    try {
      const contentResponse = await apiGetContentByCourse(courseId);
      setContents(contentResponse.data.data);
      console.log(contentResponse.data.data);
    } catch (err) {
      console.log("컨텐츠 조회 실패: ", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCourseContentDto = {
      ...contentDto,
      courseId: selectedCourseId,
    };
    if (contentDto.contentId) {
      // 수정
      apiUpdateContent(contentDto.contentId, selectedCourseContentDto)
        .then((response) => {
          setContentDto(response.data.data);
          fetchContentsByCourse(selectedCourseId);
        })
        .catch((err) => {
          console.log("컨텐츠 수정 실패: ", err);
        });
    } else {
      // 등록
      apiPostContentByCourse(selectedCourseId, selectedCourseContentDto)
        .then((response) => {
          setContentDto(response.data.data);
          fetchContentsByCourse(selectedCourseId);
        })
        .catch((err) => {
          console.log("컨텐츠 등록 실패: ", err);
        });
    }

    setContentDto({
      courseId: "",
      contentId: "",
      contentTitle: "",
      description: "",
      contentDuration: 0,
      contentImg: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContentDto((prevDto) => ({
      ...prevDto,
      [name]: value,
    }));
  };

  const handleEdit = (content) => {
    setContentDto(content);
  };

  const handleDelete = (contentId) => {
    apiDeleteContent(contentId)
      .then(() => {
        fetchContentsByCourse(selectedCourseId);
      })
      .catch((err) => {
        console.log("컨텐츠 삭제 실패: ", err);
      });
  };

  return (
    <>
      <Container>
        <h2>강의 관리</h2>
        <ContentForm onSubmit={handleSubmit}>
          <label>
            강좌 분류
            <select onChange={handleCourseChange} value={selectedCourseId}>
              <option>강좌를 선택해주세요.</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </label>
          <label>
            강의 이름
            <input
              type="text"
              name="contentTitle"
              value={contentDto.contentTitle}
              onChange={handleInputChange}
            />
          </label>
          <label>
            강의 설명
            <input
              type="text"
              name="description"
              value={contentDto.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            강의 시간
            <input
              type="text"
              name="contentDuration"
              value={contentDto.contentDuration}
              onChange={handleInputChange}
            />
          </label>
          <label>
            강의 썸네일
            <input
              type="text"
              name="contentImg"
              value={contentDto.contentImg}
              onChange={handleInputChange}
            />
          </label>
          <Button className="submitButton" type="submit">
            {contentDto.contentId ? "컨텐츠 수정" : "컨텐츠 등록"}
          </Button>
        </ContentForm>
        <Contents>
          <h2>등록된 강의 목록</h2>
          <ContentsGrid>
            {contents.map((content) => (
              <div className="gridItem" key={content.contentId}>
                <ImgBox>
                  <img src={content.contentImg} alt="컨텐츠 썸네일" />
                </ImgBox>
                <div className="contentText">
                  <p className="contentTitle">
                    {content.contentTitle}
                    <span>({content.contentDuration}분)</span>
                  </p>
                  <p>{content.description}</p>
                  <p></p>
                </div>
                <div className="buttonBox">
                  <Button onClick={() => handleEdit(content)}>수정</Button>
                  <Button onClick={() => handleDelete(content.contentId)}>
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </ContentsGrid>
        </Contents>
      </Container>
    </>
  );
}
