import axios from "axios";

export function RestApi() {
  return <></>;
}

const token = sessionStorage.getItem("Token");

// signup
export function apiSignupByAxiosPost(
  loginId,
  password,
  name,
  birthDate,
  gender,
  nationality,
  email,
  phoneNum
) {
  return axios.post(
    "http://localhost:8080/api/signup",
    {
      loginId: loginId,
      password: password,
      name: name,
      birthDate: birthDate,
      gender: gender,
      nationality: nationality,
      email: email,
      phoneNum: phoneNum,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// login
export function apiLoginByAxiosPost(loginId, password) {
  return axios.post(
    "http://localhost:8080/api/login",
    {
      loginId: loginId,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
// withdrawal
export function apiWithdrawalByAxiosPost(withdrawalReason) {
  return axios.post(
    "http://localhost:8080/api/withdrawal",
    { withdrawalReason: withdrawalReason },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function loginUser(loginId, password) {
  return apiLoginByAxiosPost(loginId, password).then((response) => {
    const token = response.data.token;
    const loginId = response.data.loginId;

    sessionStorage.setItem("Token", token);
    sessionStorage.setItem("LoginId", loginId);

    return response;
  });
}

// user 정보
export function apiGetCurrentUserInfo() {
  const loginId = sessionStorage.getItem("LoginId");
  if (!token) {
    return Promise.reject("No Token or LoginId available.");
  }
  return axios.get(`http://localhost:8080/api/dashboard/${loginId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 강사 정보 조회
export function apiGetAllInstructors() {
  return axios.get("http://localhost:8080/api/instructor/list", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 현재 로그인한 토큰 주인의 정보 조회
export function apiGetCurrentMemberInfo() {
  return axios.get("http://localhost:8080/api/dashboard/loginId", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --- exam question ---
// 모든 시험 문제 조회
export function apiGetAllExamQuestions() {
  return axios.get("http://localhost:8080/api/exam-questions/list", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ADMIN이 loginId로 얻는 정보 조회
export function apiGetMemberInfo(loginId) {
  return axios.get(`http://localhost:8080/api/member/${loginId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 특정 시험 문제 조회
export function apiGetQuestionsForExam(examId) {
  return axios.get(`http://localhost:8080/api/exam-questions/list/${examId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 시험 문제 저장
export function apiPostQuestionsForExam(
  examId,
  questionText,
  options,
  correctOptionIndex
) {
  return axios.post(
    "http://localhost:8080/api/exam-questions/save",
    {
      examId: examId,
      questionText: questionText,
      options: options,
      correctOptionIndex: correctOptionIndex,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// 시험 문제 수정
export function apiPutQuestionsForExam(
  examQuestionId,
  examId,
  questionText,
  options,
  correctOptionIndex
) {
  return axios.put(
    `http://localhost:8080/api/exam-questions/update/${examQuestionId}`,
    {
      examId: examId,
      questionText: questionText,
      options: options,
      correctOptionIndex: correctOptionIndex,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// 시험 문제 삭제
export function apiDeleteQuestionsForExam(examQuestionId) {
  return axios.delete(
    `http://localhost:8080/api/exam-questions/delete/${examQuestionId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// --- subject ---
// 모든 subject 조회
export function apiGetAllSubject() {
  return axios.get("http://localhost:8080/api/subject", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// subjectId 당 조회
export function apiGetSubject(subjectId) {
  return axios.get(`http://localhost:8080/api/subject/${subjectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// subject 저장
export function apiPostSubject(subjectData) {
  return axios.post("http://localhost:8080/api/subject/save", subjectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// subject 수정
export function apiPutSubject(subjectId, subjectData) {
  return axios.put(
    `http://localhost:8080/api/subject/update/${subjectId}`,
    subjectData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
// subject 삭제
export function apiDeleteSubject(subjectId, subjectData) {
  return axios.delete(
    `http://localhost:8080/api/subject/delete/${subjectId}`,
    subjectData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// --------------- Course Rest API ---------------
// 모든 코스 조회
export function apiGetAllCourses() {
  return axios.get("http://localhost:8080/api/course/list", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 서브젝트에 따라 코스 조회
export function apiGetCourseBySubject(subjectId) {
  return axios.get(`http://localhost:8080/api/course/subject/${subjectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 특정 코스 조회
export function apiGetCourse(courseId) {
  return axios.get(`http://localhost:8080/api/course/list/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 코스 저장
export function apiPostCourse(courseData) {
  return axios.post("http://localhost:8080/api/course/save", courseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 코스 수정
export function apiPutCourse(courseId, courseData) {
  return axios.put(
    `http://localhost:8080/api/course/update/${courseId}`,
    courseData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// 코스 삭제
export function apiDeleteCourse(courseId) {
  return axios.delete(`http://localhost:8080/api/course/delete/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --------------- QnABoard Rest API ---------------
//QnA 전체 조회
export function apiGetAllQnABoards() {
  return axios.get(`http://localhost:8080/api/qna-boards/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// memberId를 통해 해당 member가 쓴 QnA 댓글 조회
export function apiGetQnABoardsByMemberId(memberId) {
  return axios.get(
    `http://localhost:8080/api/qna-boards/list/member/${memberId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// courseId를 통해 해당하는 course의 QnA 댓글 조회
export function apiGetQnABoardsByCourseId(courseId) {
  return axios.get(
    `http://localhost:8080/api/qna-boards/list/course/${courseId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

//  //QNA 댓글 작성(USER) > 코스마다 차단하여 알맞은 코스에 작성할 수 있게 하는 건 IMPL
export function apiCreateQnABoard(courseId, memberId, qnaId, questionText) {
  return axios.get(
    `http://localhost:8080/api/qna-boards/member/${memberId}`,
    {
      courseId: courseId,
      memberId: memberId,
      qnaId: qnaId,
      questionText: questionText,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

//QNA 수정
export function apiUpdateQnABoard(courseId, memberId, qnaId, questionText) {
  return axios.get(
    `http://localhost:8080/api/qna-boards/${qnaId}`,
    {
      courseId: courseId,
      memberId: memberId,
      qnaId: qnaId,
      questionText: questionText,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

//QNA 삭제
export function apiDeleteQnABoard(qnaId, memberId) {
  return axios.get(`http://localhost:8080/api/qna-boards/${qnaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --------------- QnAReply Rest API ---------------
//QnA 답변 전체 조회
export function apiGetAllQnAReplies() {
  return axios.get(`http://localhost:8080/api/qna-replies/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

//memberId 별로 QnA 답변 전체 조회
export function apiGetQnARepliesByMemberId(memberId) {
  return axios.get(
    `http://localhost:8080/api/qna-replies/list/member/${memberId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

//QnA 답변 작성
export function apiCreateQnAReply(replyId, memberId, qnaId, replyText) {
  return axios.get(
    `http://localhost:8080/api/qna-replies`,
    {
      replyId: replyId,
      memberId: memberId,
      qnaId: qnaId,
      replyText: replyText,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

//QnA 답변 수정
export function apiUpdateQnAReply(replyId, memberId, qnaId, replyText) {
  return axios.get(
    `http://localhost:8080/api/qna-replies/${replyId}`,
    {
      replyId: replyId,
      memberId: memberId,
      qnaId: qnaId,
      replyText: replyText,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

//QnA 답변 삭제
export function apiDeleteQnAReply(replyId, memberId) {
  return axios.get(`http://localhost:8080/api/qna-replies/${replyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --------------- Content Rest API ---------------
// courseId로 content 조회
export function apiGetContentByCourse(courseId) {
  return axios.get(`http://localhost:8080/api/content/course/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// content생성, 수정, 삭제 관리자페이지

// Cart
// cart 생성
export function apiCreateCart(courseId) {
  return axios.post(
    `http://localhost:8080/api/cart?courseId=${courseId}`,
    {
      courseId: courseId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
// cart 조회
export function apiGetCurrentUserCart() {
  return axios.get("http://localhost:8080/api/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// cart 수량 업데이트
export function apiUpdateQuantityCart(courseId, quantityChange) {
  return axios.put(
    `http://localhost:8080/api/cart/${courseId}/${quantityChange}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
// cart 아이템 삭제
export function apiDeleteCourseFromCart(courseId) {
  return axios.delete(`http://localhost:8080/api/cart/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// Order
// order 생성
export function apiCreateOrder(orderDto) {
  return axios.post("http://localhost:8080/api/order", orderDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// Order Detail
// orderDetail 조회
export function apiGetOrderDetail() {
  return axios.get(`http://localhost:8080/api/order-details`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// 관리자 orderDetail 조회
export function apiGetAllOrderDetails() {
  return axios.get("http://localhost:8080/api/order-details/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

//CourseHistory
export function apiGetMyCourseHistroies() {
  return axios.get("http://localhost:8080/api/course-histories", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// TodoList
// TodoList 조회
export function apiGetMyTodoList(memberId) {
  return axios.get(`http://localhost:8080/api/todolist/member/${memberId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// TodoList 저장
export function apiPostMyTodoList(todoData) {
  return axios.post("http://localhost:8080/api/todolist/save", todoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// TodoList 수정
export function apiPutMyTodoList(taskId) {
  return (
    axios.put(`http://localhost:8080/api/todolist/update/${taskId}`),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
// TodoList 삭제
export function apiDeleteMyTodoList(taskId) {
  return (
    axios.delete(`http://localhost:8080/api/todolist/delete/${taskId}`),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
