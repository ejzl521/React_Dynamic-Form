# 리액트에서 Formik으로 설문조사 등록화면 만들기
![11](https://user-images.githubusercontent.com/55455103/140498110-1e4ea4e3-527d-49bb-986e-48153c1c1be2.gif)


# 기능
- formik을 이용해서 form의 상태 관리 및 dynamic form 구현 (ex: 문항 추가, 문제 추가 및 삭제, 객관식 주관식 전환)
- yup을 이용해서 form에 대한 validation 검사
- 설문조사의 결과를 json 형태로 내보냄

# +++ 기능 추가
- 객관식 보기에 사진을 넣는 기능 추가!
- 객관식 보기에 넣는 사진을 미리 볼 수 있음
- 이미지 업로더 소스코드(https://github.com/ejzl521/Image_Uploader_React) 변형해서 formik의 state에 이미지 파일, 미리 보기 url 저장
- 문항이 하나도 없어도 제출이 되는 부분 보완 (최소 한 문제 이상 제출해야 submit이 가능하도록 validation schema 보완)

![사진기능4](https://user-images.githubusercontent.com/55455103/143774762-8c8dd0e6-b6d6-48fe-a55d-f240308e8904.gif)


# Formik 사용법 ↓↓↓
- https://duckgugong.tistory.com/218

# yup 사용법 ↓↓↓
- https://duckgugong.tistory.com/219

# ant desgin 사용법 ↓↓↓
- https://duckgugong.tistory.com/236

# 설치해야할 라이브러리 ↓↓↓
- react-router-dom
- formik, yup (dynamic form 구현, validation을 위한 form의 state 관리 및 검증)
- scss
- ant design (css 프레임 워크)

