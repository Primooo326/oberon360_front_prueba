import React, { useState } from 'react';
import { Tooltip, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

export default function PhotographicRecord({
  label,
  handleChange,
  defaultFile,
}: {
  label: string;
  handleChange: (event: any) => void;
  defaultFile: UploadFile<any> | null;
}) {
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [imageToLoad, setImageToLoad] = useState(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
    handleChange(file);
  };

  const props: UploadProps = {
    name: 'file',
    listType: 'picture',
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/multer/process`,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        handlePreview(info.file);
      }
    },
    itemRender: () => <></>,
  };

  return (
    <>
      {!imageToLoad && defaultFile ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 116,
            cursor: 'pointer',
          }}
          onClick={() => setImageToLoad(true)}
        >
          <Tooltip title="Reemplazar imagen">
            <img
              alt="study-file"
              style={{ width: '80%', height: 74 }}
              src={defaultFile?.url}
            />
          </Tooltip>
        </div>
      ) : (
        <Dragger {...props}>
          <div style={{ height: 78 }}>
            {previewTitle === '' ? (
              <CameraOutlined style={{ fontSize: 50, color: '#003268' }} />
            ) : (
              <img
                alt="study-file"
                style={{ width: '80%', height: 74 }}
                src={previewImage}
              />
            )}
            <p style={{ color: '#003268' }}>
              {previewTitle !== '' ? null : label}
            </p>
          </div>
        </Dragger>
      )}
    </>
  );
}
