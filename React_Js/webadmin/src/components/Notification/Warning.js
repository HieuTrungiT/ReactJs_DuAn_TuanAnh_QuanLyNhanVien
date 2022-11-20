import { message } from 'antd';

const key = 'updatable';
export const WarningRegister = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.warning({
      content: 'Lỗi mạng ! Không có kết nối',
      key,
      duration: 2,
    });
  }, 1000);
};

export const WarningCaptcha = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.warning({
      content: 'Bạn chưa tick captcha',
      key,
      duration: 2,
    });
  }, 1000);
};