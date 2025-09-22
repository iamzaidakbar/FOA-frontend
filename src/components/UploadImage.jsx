import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const UploadImage = ({ setUploadedUrls, uploadLimit, className }) => {
  const [fileList, setFileList] = useState([]);
  

  const onChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);

    // when file is uploaded successfully
    if (file.status === "done") {
      const url = file.response.secure_url;
      console.log("✅ Cloudinary URL:", url);

      // store it in state
      setUploadedUrls((prev) => [...prev, url]);
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className={className}>
      <ImgCrop rotationSlider>
        <Upload
          action={import.meta.env.VITE_CLOUDINARY_URL}
          data={{
            upload_preset: "FOE_FE",
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < uploadLimit && "+ Upload"}
        </Upload>
      </ImgCrop>

      
    </div>
  );
};

export default UploadImage;
