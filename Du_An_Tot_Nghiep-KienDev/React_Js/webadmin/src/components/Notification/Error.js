import { notification } from 'antd';

export const ErrForgotPW = () => {
  notification.error({
    message: 'Sao chép thất bại',
    description:
      'Bạn thử yêu cầu mật khẩu lần nữa xong thực hiện lại .',
  });
};
