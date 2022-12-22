import { notification } from 'antd';

export const SuccessForgotPW = () => {
  setTimeout(() => {
    notification.success({
      message: 'Sao chép thành công',
      description:
        'Bấm tổ hợp Ctrl + V (Trên PC) hoặc bấm giữ (Trên Mobile) để dán.',
    });
  }, 3000);
};
