import { Button } from 'antd';
import "./imageuploader.scss";
import { PictureTwoTone } from "@ant-design/icons";
const ImageUploader = (props) => {

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      props.upload_img(e.target.files[0], fileReader.result)
    }
    
  }


  return (
    <div className="uploader-wrapper">
      <input type="file" accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e)=>e.target.value = null}
        ref={refParam => inputRef = refParam}
        style={{ display: "none" }}
      />
      <div className="img-wrapper">
        {props.loaded === false ? (
          <PictureTwoTone className="default-img" />
        ) : (
          <img src={props.preview_URL} alt="" />
        )}
      </div>

      <div className="upload-button">
        {
          props.loaded === false ? (
            <Button type="primary" onClick={() => inputRef.click()}>
              사진 추가
            </Button>
          ) : (
            <Button type="primary" onClick={() => inputRef.click()}>
              사진 변경
            </Button>
          )
        }
      </div>
    </div>
  );
}

export default ImageUploader;