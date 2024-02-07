import styled from "styled-components";

// RestApi에 연결해서 사용해야 함
// 	// 콘텐츠 클릭 시 ContentHistory 생성
// 	@PostMapping("/create")
// 	public ResponseEntity<ResponseDto<ContentHistory>> createContentHistory(@RequestBody Member member, @RequestBody Content content) {
// 		ResponseDto<ContentHistory> contentHistory = contentHistoryService.createContentHistory(member, content);
// 		return new ResponseEntity<>(contentHistory, HttpStatus.CREATED);
// 	}

// 	// 학습 완료 버튼 클릭 시 isCompleted 필드 업데이트
// 	@PutMapping("/complete")
// 	public ResponseEntity<ResponseDto<ContentHistory>> completeContentHistory(@RequestBody Member member, @RequestBody Content content) {
// 		ResponseDto<ContentHistory> contentHistory = contentHistoryService.completeContentHistory(member, content);
// 		return new ResponseEntity<>(contentHistory, HttpStatus.OK);
// 	}

export function ContentComponent() {
  return (
    <>
      <button>play</button>
      모달로 "강의 시청이 완료되었습니다 <br /> 과제를 바로 푸실? (y / n) n -
      기존 페이지로 이동, y - 과제 페이지로 이동" y/n 둘 다 상세페이지에는 수강
      듣기에서 수강 완료로 변경 과제 페이지는 커리큘럼에 나와 있는 과제와
      연결해서 진행 - 완료되면 상세페이지에서 완료로 변경
    </>
  );
}
