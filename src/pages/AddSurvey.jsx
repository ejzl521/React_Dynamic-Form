import React from "react";
import './addsurvey.scss';
import { Formik, ErrorMessage } from "formik";
import { Input, Form, Button, Select } from "antd";
import {
  QuestionCircleTwoTone, CloseOutlined,
  DeleteFilled, PlusOutlined, DiffOutlined
} from '@ant-design/icons';
import * as Yup from "yup";
import ImageUploader from "../components/ImageUploader";

const AddSurvey = (props) => {

  const initialValues = {
    title: "",
    questions: [
      {
        type: "objective",
        title: "",
        choices: [{ text: "" }]
      },
      {
        type: "subjective",
        title: "",
      },
      {
        type: "img_objective",
        title: "",
        images: [{ file: "", preview_URL: "", loaded: false }]
      }

    ]
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('설문조사의 제목이 필요합니다!'),
    questions: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(),
        title: Yup.string().required('문제의 제목이 필요합니다!'),
        choices: Yup.array().of(
          Yup.object().shape({
            text: Yup.string().required("보기에 내용을 넣어주세요!")
          })
        ),
        images: Yup.array().of(
          Yup.object().shape({
            file: Yup.mixed().required("사진을 추가해주세요"),
            preview_URL: Yup.string(),
            loaded: Yup.boolean()
          })
        ),
      })
    ).min(1, "최소 한 문제는 등록하세요!")
  });

  return (
    <div className="survey">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          alert(JSON.stringify(data, null, 2));
        }}
      >
        {({ values, handleSubmit, handleChange, setValues }) => (
          <div className="survey-wrapper">
            <Form
              onFinish={handleSubmit}
            >
              <div className="survey-header">
                <div className="survey-title">
                  <Input
                    size="large" placeholder="설문조사 제목을 입력하세요"
                    bordered={false} name="title"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="error-message">
                  <ErrorMessage name="title" />
                </div>
              </div>
              {values.questions.map((item, index) => {
                // 객관식일때만 보기와 보기추가 버튼 사용
                let obj_container = null;
                let add_choice_button = null;

                let type = ""
                if (item.type === "objective") {
                  type = "객관식"
                } else if (item.type === "subjective") {
                  type = "주관식"
                } else if (item.type === "img_objective") {
                  type = "객관식(사진)"
                }
                // 객관식일 경우에만 객관식 보기를 담는 컨테이너와 보기 추가 버튼이 생김
                if (item.type === "objective") {
                  const choices = item.choices.map((choice, idx) =>
                    <div key={idx}>
                      <div className="obj-choice">
                        <QuestionCircleTwoTone />
                        <div className="obj-choice-input">
                          <Input
                            placeholder="보기를 입력하세요"
                            bordered={false}
                            name={`questions.${index}.choices.${idx}.text`}
                            value={values.questions[index].choices[idx].text}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                        </div>
                        <CloseOutlined
                          style={{ color: "#FF3399", cursor: "pointer" }}
                          onClick={() => {
                            const delete_choice = { ...values };
                            delete_choice.questions[index].choices.splice(idx, 1);
                            console.log(delete_choice)
                            setValues(delete_choice);
                          }}
                        />
                      </div>
                      <div className="error-message">
                        <ErrorMessage name={`questions.${index}.choices.${idx}.text`} />
                      </div>
                    </div>
                  )
                  obj_container = <div className="obj-wrapper">{choices}</div>
                  add_choice_button = (
                    <div
                      className="add-choice-button"
                      onClick={() => {
                        let add_choice = { ...values };
                        add_choice.questions[index].choices.push({ text: "" });
                        setValues(add_choice)
                      }}
                    >
                      <PlusOutlined />
                      <span>보기 추가</span>
                    </div>
                  );
                }
                // 객관식(사진)
                else if (item.type === "img_objective") {
                  const img_choices = item.images.map((image, idx) =>
                    <div key={idx}>
                      <div className="img-obj-choice">
                        <ImageUploader
                          preview_URL={image.preview_URL}
                          loaded={image.loaded}

                          upload_img={(file, preview_URL) => {
                            const upload_img_choice = { ...values };
                            upload_img_choice.questions[index].images[idx] =
                              { file: file, preview_URL: preview_URL, loaded: true };
                            setValues(upload_img_choice);
                          }}
                          
                        />
                        <CloseOutlined
                          style={{ color: "#FF3399", cursor: "pointer", fontSize: "80px" }}
                          onClick={() => {
                            const delete_img_choice = { ...values };
                            delete_img_choice.questions[index].images.splice(idx, 1);
                            setValues(delete_img_choice);
                          }}
                        />
                      </div>
                      <div className="error-message">
                        <ErrorMessage name={`questions.${index}.images.${idx}.file`} />
                      </div>
                    </div>
                  )
                  obj_container = <div className="obj-wrapper">{img_choices}</div>
                  add_choice_button = (
                    <div
                      className="add-choice-button"
                      onClick={() => {
                        let add_img_choice = { ...values };
                        add_img_choice.questions[index].images.push({ file: "", preview_URL: "", loaded: false });
                        setValues(add_img_choice);
                      }}
                    >
                      <PlusOutlined />
                      <span>보기 추가</span>
                    </div>
                  );
                }


                //객관식 주관식 공통
                return (
                  <div className="question-wrapper" key={index}>
                    <div className="question-header">
                      <div className="question-title">
                        <Input
                          size="large" placeholder={`${type}의 제목을 입력하세요`}
                          bordered={false} name={`questions.${index}.title`}
                          onChange={handleChange}
                          value={values.questions[index].title}
                          autoComplete="off"
                        />
                        <div className="error-message">
                          <ErrorMessage name={`questions.${index}.title`} />
                        </div>
                      </div>

                      <div className="choice-type">
                        <Select style={{ width: 130 }} value={item.type}
                          onChange={(value) => {
                            const changed_type = { ...values };
                            if (value === "objective") {
                              changed_type.questions[index] = { type: value, title: "", choices: [{ text: "" }] };
                            } else if (value === "subjective") {
                              changed_type.questions[index] = { type: value, title: "" }
                            } else if (value === "img_objective") {
                              changed_type.questions[index] = { type: value, title: "", images: [{ file: "", preview_URL: "", loaded: false }] }
                            }
                            setValues(changed_type)
                          }}
                        >
                          <Select.Option value="objective">객관식</Select.Option>
                          <Select.Option value="subjective">주관식</Select.Option>
                          <Select.Option value="img_objective">객관식(사진)</Select.Option>
                        </Select>
                      </div>
                    </div>
                    {obj_container}
                    <div className="question-footer">
                      <div className="delete-question-button"
                        onClick={() => {
                          const deleted_questions_list = { ...values }
                          deleted_questions_list.questions.splice(index, 1)
                          setValues(deleted_questions_list)
                        }}
                      >
                        <DeleteFilled />
                        <span>삭제하기</span>
                      </div>
                      {add_choice_button}
                    </div>
                  </div>
                )
              })}
              <div className="survey-footer">
                <div className="add-question-button"
                  onClick={() => {
                    let new_question_list = [
                      ...values.questions,
                      {
                        type: "objective",
                        title: "",
                        choices: [{ text: "" }]
                      }
                    ]
                    setValues({ ...values, questions: new_question_list })
                  }}
                >
                  <DiffOutlined />
                  <span>문제 추가</span>
                </div>
                <div className="submit-button">
                  <Button type="primary" htmlType="submit" size="large"
                    onClick={() => {
                      console.log(values);
                      validationSchema.validate(values)
                        .then((data) => {
                        })
                        .catch((err) => alert("모든 항목에 값을 넣어주세요!"))
                    }}
                  >
                    제출하기
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        
        )}
        
      </Formik>
      
    </div>
  )
}

export default AddSurvey;