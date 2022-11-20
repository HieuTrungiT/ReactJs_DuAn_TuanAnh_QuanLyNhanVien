import { AudioOutlined } from "@ant-design/icons";

export const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

export const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <div>Trước</div>;
    }
    if (type === 'next') {
      return <div>Sau</div>;
    }
    return originalElement;
  };