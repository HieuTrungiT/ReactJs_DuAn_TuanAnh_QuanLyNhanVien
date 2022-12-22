import { message } from 'antd';

const key = 'updatable';
export const ErrorRegister = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! email đã được sử dụng',
      key,
      duration: 2,
    });
  }, 1000);
};


export const Fasle_gr_listDetail = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Thông tin nhóm không tồn tại trên hệ thống',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorAdd = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Tên dự án đã được sử dụng',
      key,
      duration: 2,
    });
  }, 1000);
};
export const ErrorAddProject = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Tên dự án đã tồn tại',
      key,
      duration: 2,
    });
  }, 1000);
};
export const ErrorAdds = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Tên nhóm đã tồn tại',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorLogin = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Sai tài khoản hoặc mật khẩu',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorForgotPW = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Email không trùng khớp trên hệ thống',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorAccountBan = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Tài khoản này đã bị khoá. Vui lòng liên hệ Admin để biết thêm chi tiết',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorAccountPassFalse = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Mật khẩu không chính xác',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorAccountLOCK = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại ! Tài khoản này chưa được duyệt. Vui lòng liên hệ Admin để duyệt',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorFALSE = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Thất bại !',
      key,
      duration: 2,
    });
  }, 1000);
};

export const ErrorFALSEHeThong = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.error({
      content: 'Xoá thất bại ! Không có dữ liệu trên hệ thống ',
      key,
      duration: 2,
    });
  }, 1000);
};