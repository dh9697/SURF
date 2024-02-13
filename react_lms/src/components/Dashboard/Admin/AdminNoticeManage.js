import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import { apiGetAllAnnouncements } from "../../RestApi";

const Container = styled.div`
  margin: 20px;
`;

const RecentNotice = styled.div`
  margin-bottom: 20px;
`;

const NoticeWrap = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Title = styled.input`
  width: calc(100% - 40px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Post = styled.textarea`
  width: calc(100% - 40px);
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export function AdminNoticeManage() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // 공지사항 가져오기
  useEffect(() => {
    apiGetAllAnnouncements().then((response) => {
      setAnnouncements(response.data.data);
      console.log(response.data.data); //undefined
    });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Post:", post);
    setTitle("");
    setPost("");
  };

  return (
    <Container>
      <RecentNotice>
        <p>최근 공지사항</p>
      </RecentNotice>
      <NoticeWrap>
        <p>공지사항 작성</p>
        <Title
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
        />
        <Post
          placeholder="내용을 입력하세요"
          value={post}
          onChange={handlePostChange}
        />
        <Button onClick={handleSubmit}>등록</Button>
      </NoticeWrap>
    </Container>
  );
}
