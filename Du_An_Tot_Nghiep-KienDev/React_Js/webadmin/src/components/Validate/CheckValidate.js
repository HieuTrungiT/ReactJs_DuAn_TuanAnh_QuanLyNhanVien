const numbers = /^(09|03|05|07|08|84)[0-9]{8,10}$/g;
const passwordRegex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
const FormatName = /^[a-z A-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{8,}$/i;

export const Validate_Name =[
    {
        required: true,
        message: 'Tên không được bỏ trống !'
    },
    {
        pattern : FormatName,
        message: 'Tên không được có ký đặc biệt và lớn hơn 8 ký tự !'
    },

]

export const Validate_Name_Project =[
    {
        required: true,
        message: 'Tên dự án không được bỏ trống !'
    },
    {
        min : 9,
        message: 'Tên dự án phải lớn hơn 8 ký tự !'
    },

]

export const Validate_Email =[
    {
        required: true,
        message: 'Email không được bỏ trống !'
    },
    {
        type : "email",
        message: 'Email sai định dạng !'
    },

]

export const Validate_Phone =[
    {
        required: true,
        message: 'Số điện thoại không được bỏ trống !'
    },
    {
        pattern : numbers,
        message: 'Số điện thoại sai định dạng !'
    },

]
export const Validate_Password =[
    {
        required: true,
        message: 'Mật Khẩu không được bỏ trống !'
    },
    {
        pattern : passwordRegex,
        message: 'Mật khẩu ít nhất 8 kí tự, có 1 chữ số, chữ hoa, chữ thường và kí tự đặc biệt !'
    },

]

export const Validate_Re_Password =[
    {
        required: true,
        message: 'Nhập lại mật khẩu không được bỏ trống !'
    },
    ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('Nhập lại mật khẩu không chính xác !');
        },
      }),
]

export const Validate_Re_Password_Change =[
    {
        required: true,
        message: 'Nhập lại mật khẩu không được bỏ trống !'
    },
    ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('passwordNew') === value) {
            return Promise.resolve();
          }
          return Promise.reject('Nhập lại mật khẩu không chính xác !');
        },
      }),
]

export const Validate_Checker =[
    {
        required: true,
        type: "boolean",
        message: 'Bạn chưa đồng ý điều khoản và dịch vụ !'
    },

]
export const Validate_Captcha =[
    {
        required: true,
        type: "boolean",
        message: 'Captcha không được bỏ trống !'
    },
]

export const Validate_Gender =[
    {
        required: true,
        message: 'Giới tính không được bỏ trống !'
    },
]

export const Validate_Address =[
    {
        required: true,
        message: 'Địa chỉ không được bỏ trống !'
    },
]

export const Validate_Date =[
    {
        required: true,
        message: 'Ngày sinh không được bỏ trống !'
    },
]

export const Validate_required =[
    {
        required: true,
        message: 'Trường này không được bỏ trống !'
    },
]