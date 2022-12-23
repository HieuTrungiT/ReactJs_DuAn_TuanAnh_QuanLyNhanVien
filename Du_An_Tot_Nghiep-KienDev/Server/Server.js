var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require('fs');
var cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser')

// Export the Express API
module.exports = app;

//Socket.io
const http = require('http');
const { log } = require('console');
const server = http.createServer(app);
// const {Server } = require('socket.io');

// const io = new  Server(server);

//đây là cors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }))

// express
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));

//kết nối csdl
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'du_an_tot_nghiep',
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//Lưu hình ảnh vào file public/images và edit tên ảnh
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'public/images')  //Đường link uploads ảnh
  },
  filename: (req, file, callBack) => {
    const myArray = file.originalname.split(".");
    let imgname = new Date().getTime().toString() + "." + myArray[myArray.length - 1];  // Đặt lại tên image thành date + time + .(đuôi ảnh)
    callBack(null, `${imgname}`)
  }
})

// SET STORAGE
let upload = multer({ storage: storage })

// Hiện thị hình ảnh mục image
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World Babe!')
})

//Fix hình ảnh :D
app.get('/images', function (req, res) {
  res.send('hình ảnh!');
});

//Phần Realtime
const socketIo = require("socket.io")(server, {
  cors: {  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.
    origin: "*",
  }
});

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});



//Phần Tài Khoản
//SignUp
app.post("/dangky", (req, res) => {
  var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      res.send({ success: false });
    } else {
      res.send({ success: true });
      var sql = "INSERT INTO account ( email, pass, ten, sdt , timelogin , lockacc , gioitinh) values('" + req.body.email + "' ,  '" + req.body.password + "' ,'" + req.body.fullName + "' ,'" + req.body.phoneNumber + "' ,'" + req.body.timeRegister + "','" + '1' + "','" + '0' + "'  );"
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });
});
// SignIn
app.post("/dangnhap", (req, res) => {
  var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' AND pass= '" + req.body.passWord + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }

    if (result.length > 0) {
      let idUser  = result[0].id;
      console.log();
      var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' AND lockacc = '9999' ";
      con.query(sql, function (err, result, fields) {
        if (result.length > 0) {
          res.send({ success: false, message: "Ban!" });
        } else {
          var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' AND lockacc = '1' ";
          con.query(sql, function (err, result, fields) {
            if (result.length > 0) {
              res.send({ success: false, message: "LOCK!" });
            }
            else {
              var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' AND phanquyen = '9999' ";
              con.query(sql, function (err, result, fields) {

                if (result.length > 0) {
                  var sql = "UPDATE account SET timelogin = '" + req.body.dateTime + "' where email = '" + req.body.email + "'";
                  con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    res.send({ idUser:idUser,success: true, message: "ADMIN!" });
                  });
                }
                else {
                  var sql = "UPDATE account SET timelogin = '" + req.body.dateTime + "' where email = '" + req.body.email + "'";
                  con.query(sql, function (err, result, fields) {

                    if (err) throw err;
                    res.send({ idUser:idUser,success: true, message: "USER!" });
                  });
                }
              });
            }
          });
        }
      });
    } else {
      res.send({ success: false, message: "False!" });
    }
  });
});
//Hiển thị thông tin tài khoản tại email
app.get('/getAccouWhereId', function (req, res) {
  console.log(req.query);
  con.query("SELECT * FROM `account` WHERE email ='" + req.query.email + "'", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//Hiển thị thông tin tài khoản
app.get('/showaccount', function (req, res) {
  con.query("SELECT * FROM `account` order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
//thông tin tài khoản cá nhân
app.post('/getaccountme', function (req, res) {
  var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }

  })
});

//Thời gian đăng nhập
app.post('/new-login', function (req, res) {
  var sql = "UPDATE account SET timelogin = '" + req.body.datetime + "' where email = '" + req.body.email + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send("sua_thanh_cong");
    }
  });
});
//Quên Mật Khẩu
app.post("/quen-mat-khau", (req, res) => {
  var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' AND lockacc = '" + '0' + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      res.send({ success: true });

      var sql = "SELECT * FROM quenmatkhau WHERE email= '" + req.body.email + "' ";
      con.query(sql, function (err, result, fields) {
        if (err) {
          res.send({ success: false, message: "Database không có kết nối!" });
        }
        if (result.length > 0) {
          var sql = "SELECT * FROM quenmatkhau WHERE email= '" + req.body.email + "' AND duyet= '" + '0' + "' ";
          con.query(sql, function (err, result, fields) {
            if (result.length > 0) {
              var sql = "UPDATE quenmatkhau SET thoigian = '" + req.body.dateTime + "' , duyet =('" + '1' + "') where email = '" + req.body.email + "'";
              con.query(sql, function (err, result, fields) {
                if (err) throw err;
              });

            } else {
              var sql = "UPDATE quenmatkhau SET thoigian = '" + req.body.dateTime + "' where email = '" + req.body.email + "'";
              con.query(sql, function (err, result, fields) {
                if (err) throw err;
              });
            }
          });

        } else {
          var sqlite = "INSERT INTO quenmatkhau ( email, duyet, thoigian) values('" + req.body.email + "' ,  '" + '1' + "' ,'" + req.body.dateTime + "'  );"
          con.query(sqlite, function (err, result, fields) {
            if (err) throw err;
          });
        }
      });

    } else {
      res.send({ success: false, message: "Sai tài khoản!" });
    }
  });
});

//Update avatar thông tin cá nhân
app.post('/getaccountme/edituploadfile', upload.single('file'), (req, res, next) => {
  const file = req.file;
  const form = req.body;
  if (file == "" || file == undefined) {
    if (form.file == "" || form.file == "undefined" || form.file == null || form.file == undefined) {
      var sql = "UPDATE account SET ten = ('" + form.ten + "'), sdt = ('" + form.sdt + "'), date = ('" + form.date + "'), gioitinh=('" + form.gioitinh + "'), diachi = ('" + form.diachi + "') where email = ('" + form.email + "')";
      con.query(sql, [imgsrc], function (err, result, fields) {
        if (err) throw err;
        res.send(file);
      })
    } else {
      var imgsrc = 'http://localhost:3001/images/' + form.file;
      var sql = "UPDATE account SET image = ('" + form.file + "'), ten = ('" + form.ten + "'), sdt = ('" + form.sdt + "'), date = ('" + form.date + "'), gioitinh=('" + form.gioitinh + "'), diachi = ('" + form.diachi + "') where email = ('" + form.email + "')";
      con.query(sql, [imgsrc], function (err, result, fields) {
        if (err) throw err;
        res.send(file);
      })
    }
  } else {
    var imgsrc = 'http://localhost:3001/images/' + file.filename;
    var sql = "UPDATE account SET image = ('" + file.filename + "'), ten = ('" + form.ten + "'), sdt = ('" + form.sdt + "'), date = ('" + form.date + "'), gioitinh=('" + form.gioitinh + "'), diachi = ('" + form.diachi + "') where email = ('" + form.email + "')";
    con.query(sql, [imgsrc], function (err, result, fields) {
      if (err) throw err;
      res.send(file);
    })
  }
})
//Del avatar thông tin cá nhân
app.post('/getaccountme/deleteuploadfile', upload.single('file'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})
//Đổi Mật Khẩu
app.post("/doi-mat-khau", (req, res) => {
  var sql = "SELECT * FROM account WHERE email= '" + req.body.email + "' AND pass= '" + req.body.passwordOld + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      var sql = "UPDATE account SET pass = '" + req.body.rePasswordNew + "' where email = '" + req.body.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Sua_Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "False!Pass_Sai" });
    }
  });
})
//Search nhân viên
app.post('/search-staff', function (req, res) {
  var sql = "SELECT * FROM account WHERE email LIKE '" + req.body.name + `%` + "' or ten LIKE '" + req.body.name + `%` + "' or gioitinh LIKE '" + req.body.name + `%` + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }
  })
});
//Add User New Admin
app.post("/dangkyStaff", (req, res) => {
  const body = req.body;
  var sql = "SELECT * FROM account WHERE email= '" + body.emailstaff + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      res.send({ success: false, message: 'Da_Co_tai_Khoan' });
    } else {
      res.send({ success: true });
      var sql = "INSERT INTO account ( email, pass, ten, sdt , timelogin , lockacc , gioitinh) values('" + body.emailstaff + "' ,  '" + body.passwordstaff + "' ,'" + body.namestaff + "' ,'" + body.phonestaff + "' ,'" + body.timeRegister + "','" + '0' + "','" + body.genderstaff + "'  );"
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
      });
    }
  });
});
//Ban account
app.post("/ban-account", (req, res) => {
  const body = req.body;
  var sql = "SELECT * FROM account WHERE email= '" + body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "UPDATE account SET lockacc = '" + '9999' + "' where email = '" + body.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "Khong_tim_thay_tai_khoan!" });
    }
  })
});
//UnBan account
app.post("/un-ban-account", (req, res) => {
  const body = req.body;
  var sql = "SELECT * FROM account WHERE email= '" + body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "UPDATE account SET lockacc = '" + '0' + "' where email = '" + body.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "Khong_tim_thay_tai_khoan!" });
    }
  })
});
//Update account
app.post("/update-quyen-account", (req, res) => {
  const body = req.body;
  var sql = "SELECT * FROM account WHERE email= '" + body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "UPDATE account SET chucvu = '" + body.keychucvu + "' where email = '" + body.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "Khong_tim_thay_tai_khoan!" });
    }
  })
});

//Newaccount
app.post('/new-account-staff', function (req, res) {
  var sql = "SELECT * FROM account WHERE lockacc LIKE '" + '1' + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }
  })
});
// Chấp thuận tài khoản
app.post('/new-account-agr', function (req, res) {
  var sql = "SELECT * FROM account WHERE email LIKE '" + req.body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "UPDATE account SET lockacc = '" + '0' + "' where email = '" + req.body.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "Khong_tim_thay_tai_khoan!" });
    }
  })
});
// Huỷ tài khoản
app.post('/new-account-cancel', function (req, res) {
  var sql = "SELECT * FROM account WHERE email LIKE '" + req.body.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "delete from account where email = '" + req.body.email + "' ";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "Khong_ton_tai_tai_khoan!" });
    }
  })
});
//lấy danh sách tài khoản bị cấm or chưa duyệt
app.get('/getlistaccountbanorduyet', function (req, res) {
  var sql = "SELECT * FROM account WHERE lockacc LIKE '" + '1' + "' or lockacc LIKE '" + '9999' + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }
  })
});
//lấy danh sách tài khoản theo chức vụ
app.post('/getlistaccountchucvu', function (req, res) {
  if (req.body.position == 'Nhân viên') {
    var sql = "SELECT * FROM account WHERE chucvu LIKE '" + req.body.position + "' or chucvu LIKE '" + "" + "' ";
    con.query(sql, function (err, result, fields) {
      if (err) {
        res.send({ success: false, message: "Database không có kết nối!" });
      } if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ success: false, message: "False!" });
      }
    })
  } else {
    var sql = "SELECT * FROM account WHERE chucvu LIKE '" + req.body.position + "' ";
    con.query(sql, function (err, result, fields) {
      if (err) {
        res.send({ success: false, message: "Database không có kết nối!" });
      } if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ success: false, message: "False!" });
      }
    })
  }
});

//lấy danh sách tài khoản quên mật khẩu
app.get('/getListAccountUserForgotPw', function (req, res) {
  var sql = "SELECT * FROM quenmatkhau WHERE duyet LIKE '" + '1' + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }
  })
});
//lấy lại mật khẩu
app.post('/setPassAccount', function (req, res) {
  const getReq = req.body;
  var sql = "SELECT * FROM quenmatkhau WHERE email LIKE '" + getReq.email + "' ";
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  const ChangeNewPass = makeid(15) + '1@az';

  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "UPDATE quenmatkhau SET done = '" + '2' + "' , Passnew = '" + ChangeNewPass + "' where email = '" + getReq.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        var sql = "UPDATE account SET pass = '" + ChangeNewPass + "' where email = '" + getReq.email + "'";
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          if (result.affectedRows == 1) {
            res.send({ success: true, message: "Thanh_Cong!" });
          }
        });
      });
    } else {
      res.send({ success: false, message: "Khong_ton_tai_tai_khoan!" });
    }
  })
});
//xoá thông tin account
app.post('/setDelPassAccount', function (req, res) {
  const getReq = req.body;
  var sql = "SELECT * FROM quenmatkhau WHERE email LIKE '" + getReq.email + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      var sql = "UPDATE quenmatkhau SET done = '" + '0' + "' , duyet = '" + '0' + "' where email = '" + getReq.email + "'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.affectedRows == 1) {
          res.send({ success: true, message: "Thanh_Cong!" });
        }
      });
    } else {
      res.send({ success: false, message: "Khong_ton_tai_tai_khoan!" });
    }
  })
});

//Quản lý dự án
//Thêm loại dự án
app.post("/quanly/them-quan-ly-loai-du-an", (req, res) => {
  const bodys = req.body;
  var sql = "SELECT * FROM loaiduan WHERE tenduan= '" + bodys.nameTypeProject + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      res.send({ success: false, message: "trung_ten" });
    } else {
      res.send({ success: true });
      if (bodys.describeTypeProject == "" || bodys.describeTypeProject == null && bodys.describeTypeProject == undefined) {
        var sql = "INSERT INTO loaiduan ( tenduan, date) values('" + bodys.nameTypeProject + "' ,'" + bodys.timeRegister + "');"
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
        });
      } else {
        var sql = "INSERT INTO loaiduan ( tenduan, 	motaduan, date) values('" + bodys.nameTypeProject + "' ,  '" + bodys.describeTypeProject + "' ,'" + bodys.timeRegister + "');"
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
        });
      }
    }
  });
});
//Xoá loại dự án
app.post("/quanly/xoa-quan-ly-loai-du-an", (req, res) => {
  const bodys = req.body;
  var sql = "delete from loaiduan where id = (" + bodys.id + ")";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send({ success: true, message: "Ok!" });
    } else {
      res.send({ success: false, message: "Khong_co_du_lieu!" });
    }
  });
});
//Lấy danh sách loại dự án
app.get('/quanly/danh-sach-quan-ly-loai-du-an', function (req, res) {
  var sql = "SELECT * FROM loaiduan order by id desc ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }
  })
});
//Sửa loại dự án
app.post("/quanly/sua-quan-ly-loai-du-an", (req, res) => {
  const bodys = req.body;
  if (bodys.describeTypeProject == undefined) {
    var sql = "UPDATE loaiduan SET tenduan = ('" + bodys.nameTypeProject + "'), date =('" + bodys.timeRegister + "') where id = (" + bodys.id + ")";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.send({ success: true, message: "Ok!" });
      }
    });
  } else {
    var sql = "UPDATE loaiduan SET tenduan = ('" + bodys.nameTypeProject + "'), motaduan =('" + bodys.describeTypeProject + "'), date =('" + bodys.timeRegister + "') where id = (" + bodys.id + ")";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.send({ success: true, message: "Ok!" });
      }
    });
  }
});


//Phần báo cáo
//Show báo cáo
app.get('/showwork', function (req, res) {
  con.query("SELECT * FROM `baocao` order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
//gửi báo cáo
app.post('/addwork', function (req, res) {
  var sql = "insert into baocao (tenbaocao , nguoigui , nguoinhan , noidung , ghichubaocao , date , ketquabaocao , danhgia) values ('" + req.body.name_word + "' , '" + req.body.sender + "' , '" + req.body.receiver + "' , '" + req.body.text_title + "', '" + req.body.text_note + "', '" + req.body.date + "', '" + req.body.final_result + "', '" + req.body.evaluate + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send('ok');
    }
  });
})
//Sửa Báo Cáo
app.post('/editwork/editid', function (req, res) {
  var sql = "UPDATE baocao SET tenbaocao = ('" + req.body.name_word + "'), nguoigui =('" + req.body.sender + "'), nguoinhan =('" + req.body.receiver + "'), noidung =('" + req.body.text_title + "'), ghichubaocao =('" + req.body.text_note + "'), date =('" + req.body.date + "'), ketquabaocao =('" + req.body.final_result + "'), danhgia =('" + req.body.evaluate + "') where id = (" + req.body.id + ")";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send('ok');
    }
  });
})
//Xoá Báo cáo
app.post('/deleteword', function (req, res) {
  var sql = "delete from baocao where id = (" + req.body.id + ")";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send('ok');
    }
  });
})

//Quản Lý Nhóm
app.get('/getListManagerGr', function (req, res) {
  con.query("SELECT * FROM `account` WHERE chucvu = '" + "Giám đốc" + "' AND lockacc = '" + "0" + "' or chucvu = '" + "Trưởng phòng" + "' AND lockacc = '" + "0" + "' or chucvu = '" + "Phó giám đốc" + "' AND lockacc = '" + "0" + "' or chucvu = '" + "Quản lý" + "' AND lockacc = '" + "0" + "' or chucvu = '" + "Phó phòng" + "' AND lockacc = '" + "0" + "' order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
//Hiển thị thông tin tài khoản đã mở
app.get('/getListManagerGrAccountUnlock', function (req, res) {
  con.query("SELECT * FROM `account` Where lockacc = '" + " 0 " + "' order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
//Thêm Nhóm Mới
app.post("/getListManagerGr/them-nhom-moi", (req, res, next) => {
  const bodys = req.body;
  var sql = "SELECT * FROM danhsachnhom WHERE tennhom= '" + bodys.namGroup + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    }
    if (result.length > 0) {
      res.send({ success: false, message: "trung_ten" });
    } else {
      var sql = "INSERT INTO danhsachnhom ( slugs, tennhom, nguoiquanlyduan, image, nhanviennhom, mota, ngaytao, newupdate) values('" + bodys.slug + "' ,'" + bodys.namGroup + "' ,'" + bodys.LeaderGroup + "','" + bodys.avtatar + "','" + "[" + bodys.userGroup + "]" + "','" + bodys.commentGroup + "','" + bodys.date + "','" + bodys.date + "');"
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send({ success: true });
      });
    }
  });
});
//Chi tiết nhóm
app.post("/getListManagerGr/chi-tiet-nhom", (req, res, next) => {
  var sql = "SELECT * FROM danhsachnhom WHERE slugs= '" + req.body.slugs + "' ";
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ success: false, message: "Database không có kết nối!" });
    } if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ success: false, message: "False!" });
    }

  })
});
//Danh sách nhóm
app.get('/getListGrType', function (req, res) {
  con.query("SELECT * FROM `danhsachnhom` order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/getGroup', function (req, res) {
  con.query("SELECT * FROM `danhsachnhom` WHERE id = " + req.query.idGroup, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});



//Phần báo cáo
//Show báo cáo
app.get('/showwork', function (req, res) {
  con.query("SELECT * FROM `baocao` order by id desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
  });
});
//gửi báo cáo
app.post('/addwork', function (req, res) {
  var sql = "insert into baocao (tenbaocao , nguoigui , nguoinhan , noidung , ghichubaocao , date , ketquabaocao , danhgia) values ('" + req.body.name_word + "' , '" + req.body.sender + "' , '" + req.body.receiver + "' , '" + req.body.text_title + "', '" + req.body.text_note + "', '" + req.body.date + "', '" + req.body.final_result + "', '" + req.body.evaluate + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send('ok');
    }
  });
})
//Sửa Báo Cáo
app.post('/editwork/editid', function (req, res) {
  var sql = "UPDATE baocao SET tenbaocao = ('" + req.body.name_word + "'), nguoigui =('" + req.body.sender + "'), nguoinhan =('" + req.body.receiver + "'), noidung =('" + req.body.text_title + "'), ghichubaocao =('" + req.body.text_note + "'), date =('" + req.body.date + "'), ketquabaocao =('" + req.body.final_result + "'), danhgia =('" + req.body.evaluate + "') where id = (" + req.body.id + ")";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send('ok');
    }
  });
})
//Xoá Báo cáo
app.post('/deleteword', function (req, res) {
  var sql = "delete from baocao where id = (" + req.body.id + ")";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send('ok');
    }
  });
})

// Show Dự án
app.get('/showDuAn', function (req, res) {
  con.query("SELECT * FROM `duan`", function (err, result, fields) {

    if (err) throw err;
    res.send(result);
  });
});

//Phần Bang Chấm Công
//Show C.việc
app.get('/getBangChamCong', function (req, res) {

  con.query("SELECT * FROM `bangchamcong` WHERE emailuser = '" + req.query.emailUser + "'", function (err, result, fields) {

    if (err) throw err;
    res.send(result);
  });
});

//thêm C.Việc
app.post('/addbangchamcong', (req, res) => {
  var sql = "insert into bangchamcong ( ngay,nhanvien,congviec,vaitro,hoatdong,nhiemvu,gio,tuxa,duyet,ghichu,lydo,emailuser) values('" + req.body.date + "','" + req.body.tenNhanVien + "','" + req.body.data.congviec + "','" + req.body.data.vaitro + "','" + req.body.data.hoatdong + "','" + req.body.data.nhiemvu + "','" + req.body.data.gio + "','" + req.body.data.tuxa + "','" + req.body.data.duyet + "','" + req.body.data.ghichu + "','" + req.body.data.lydo + "','" + req.body.email + "')";
  console.log(sql)
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send("ok")
    }
  });
})
app.post('/updatebangchamcong', (req, res) => {
  let id = req.body.idBangChamCong;
  var sql = "UPDATE bangchamcong SET gio='" + req.body.data.gio + "',vaitro='" + req.body.data.vaitro + "',hoatdong='" + req.body.data.hoatdong + "',ghichu='" + req.body.data.ghichu + "',lydo='" + req.body.data.lydo + "',nhiemvu='" + req.body.data.nhiemvu + "' WHERE id = " + id + "";
  console.log(req.body);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.affectedRows == 1) {
      res.send("ok")
      console.log("oke");
    }
  });
})
// Xóa C.Việc
app.post('/deletebangchamcong', (req, res) => {
  var idXoaa = req.body.id;
  console.log(idXoaa);
  var sql = "DELETE FROM bangchamcong WHERE id =" + idXoaa + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {

      res.send("ok");
    }
  });
})



// Team Tuan ANh

// Timekeeping
app.post('/uploadTimekeepingNoImage', (req, res) => {

  var sql = "INSERT INTO `timekeepings`(`date`,`notes`,`nameImg`,`idUser`) VALUES ('" + req.body.data.dateToday + "','" + req.body.data.notes + "','" + req.body.data.nameFile + "','"+req.body.data.idUser+"')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok");
      console.log("upload Timekeeping successful!");
    }
  });
})

app.post("/uploadTimekeepingImage", upload.single("file", ""), (req, res, next) => {
  // code lưu ảnh lên SQL
  const files = req.file;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  const data = req.body
  const nameImg = files.filename;
  console.log(data);
  console.log(nameImg);
  var sql = "INSERT INTO `timekeepings`(`date`,`notes`,`nameImg`,`idUser`) VALUES ('" + data.dateToday + "','" + data.notes + "','" + nameImg + "','" + data.idUser + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok");
      console.log("upload Timekeeping successful!");
    }
  });

});
app.get('/getAllTimekeeping', function (req, res) {
  con.query("SELECT * FROM `timekeepings` order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
// get Timekeeping
app.get('/getTimekeeping', function (req, res) {

  con.query("SELECT * FROM `timekeepings` WHERE idUser = '" + req.query.idUser + "'order by id desc", function (err, result, fields) {

    if (err) throw err;
    res.send(result);
  });
});
app.get('/getTimekeepingWhereId', function (req, res) {
  con.query("SELECT * FROM `timekeepings` WHERE id = '" + req.query.idTimeKeeping + "'order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/confirmTimeKeepings', (req, res) => {
  const data = req.body
  console.log(data.data.id);
  var sql = "UPDATE `timekeepings` SET `accuracy`='" + data.data.accuracy + "'WHERE id =" + data.data.id;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok");
      console.log("upload off work successful!");
    }
  });
})
// OffWork
app.post('/uploadOffWork', (req, res) => {
  var sql = "INSERT INTO `timekeepings`(`date_off_work_to`,`date_off_work_form`,`commitment`,`reason`,`status`,`idUser`) VALUES ('" + req.body.data.dateTo + "','" + req.body.data.dateFrom + "','" + req.body.data.commitment + "','" + req.body.data.reason + "','1','" + req.body.data.idUser + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send("ok");
      console.log("upload off work successful!");
    }
  });
})



// Work user tag
app.get('/getWorkUserTags', function (req, res) {
  con.query("SELECT * FROM `work_users_tag` WHERE idUser = '" + req.query.idUser + "'order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/UploadUserTag', (req, res) => {
  const data = req.body

  var sql = "INSERT INTO `work_users_tag`(`idUser`, `idWork`, `status`) VALUES ('" + data.data.idUser + "','" + data.data.idWork + "','0')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send(result);
    }
  });
})
app.get('/destroyWorkUserTags', function (req, res) {
  con.query("DELETE FROM `work_users_tag` WHERE idWork = " + req.query.idWork, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});


app.post('/UploadWork', (req, res) => {
  const data = req.body
  var sql = "INSERT INTO `work_project`(`nameWork`,`deadlineFrom`, `deadlineTo`,`idGroup`,`group`, `criticalLevel`,`idPorjectType`) VALUES ('" + data.data.nameWork + "','" + data.data.deadlineFrom + "','" + data.data.deadlineTo + "','[" + data.data.idGroup + "]','" + data.data.group + "','" + data.data.criticalLevel + "','" + data.data.idPorjectType + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send(result);
    }
  });
})
app.post('/UpdateWork', (req, res) => {
  const data = req.body
  var sql = "UPDATE `work_project` SET `nameWork`='"+data.data.nameWork+"',`deadlineTo`='"+data.data.deadlineTo+"',`deadlineFrom`='"+data.data.deadlineFrom+"',`group`='" + data.data.group + "',`criticalLevel`='" + data.data.criticalLevel + "',`idPorjectType`='"+data.data.idPorjectType+"',`idGroup`='[" + data.data.idGroup + "]' WHERE id=" + data.data.idWork;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {
      res.send(result);
    }
  });
})
app.get('/destroyWorkObject', function (req, res) {
  con.query("DELETE FROM `work_project` WHERE id = " + req.query.idWork, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/getWorks', function (req, res) {

  con.query("SELECT * FROM `work_project` order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
// Work object to user
app.get('/getWorkObjects', function (req, res) {

  con.query("SELECT * FROM `work_project` WHERE id = '" + req.query.idWork + "'order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// get list work user tag where idWork
app.get('/getWorkUserTagWhereIdWork', function (req, res) {

  con.query("SELECT * FROM `work_users_tag` WHERE idWork = '" + req.query.idWork + "'order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/getAccount', function (req, res) {

  con.query("SELECT * FROM `account` WHERE id = " + req.query.idUser, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// get work user tag where id
app.get('/getWorkUserTag', function (req, res) {

  con.query("SELECT * FROM `work_users_tag` WHERE id = '" + req.query.idWorkTag + "'order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// get work_report where id User
app.get('/getWorkReportWhereIdUser', function (req, res) {
  con.query("SELECT * FROM `work_report` WHERE idUser = '" + req.query.idUser + "'order by id desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// get work_report where id
app.get('/getWorkReportWhereId', function (req, res) {
  con.query("SELECT * FROM `work_report` WHERE id = " + req.query.idReport, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/UpdateStateUserTag', function (req, res) {
  console.log(req.body.data.idUserTag);
  con.query("UPDATE `work_users_tag` SET `status`='"+req.body.data.State+"' WHERE id =" + req.body.data.idUserTag, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// uploadReportWork
app.post('/uploadReportWorkNoImage', (req, res) => {
  var sql = "INSERT INTO `work_report`( `idUser`, `idWorkUserTag`, `dateReport`, `workDone`, `workInprogress`, `workToto`, `workQuestions`, `nameFile`) VALUES ('" + req.body.data.idUser + "','" + req.body.data.idWorkUserTag + "','" + req.body.data.dateReport + "','" + req.body.data.workDone + "','" + req.body.data.workInprogress + "','" + req.body.data.workToto + "','" + req.body.data.workQuestions + "','" + req.body.data.nameFile + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {

      var sqlUpdateWorkUserTag = "UPDATE `work_users_tag` SET `status`='" + req.body.data.stateReport + "' WHERE id='" + req.body.data.idWorkUserTag + "'";
      con.query(sqlUpdateWorkUserTag, function (err, result, fields) {
        if (err) throw err;
        res.send("ok");
        console.log("Update tag");
      });

    }
  });
})

app.post("/uploadReportImage", upload.single("file", ""), (req, res, next) => {
  // code lưu ảnh lên SQL
  const files = req.file;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  const data = req.body

  const nameImg = files.filename;
  var sql = "INSERT INTO `work_report`( `idUser`,`idWorkUserTag`, `dateReport`, `workDone`, `workInprogress`, `workToto`, `workQuestions`, `nameFile`) VALUES ('" + data.idUser + "','" + data.idWorkUserTag + "','" + data.dateReport + "','" + data.workDone + "','" + data.workInprogress + "','" + data.workToto + "','" + data.workQuestions + "','" + nameImg + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {

      var sqlUpdateWorkUserTag = "UPDATE `work_users_tag` SET `status`='" + data.stateReport + "' WHERE id='" + data.idWorkUserTag + "'";
      con.query(sqlUpdateWorkUserTag, function (err, result, fields) {
        if (err) throw err;
        res.send("ok");
        console.log("Update tag");
      });

    }
  });
});

app.post('/updateReportWork', (req, res) => {
  console.log(req.body);
  console.log("updateRep");

  var sql = "UPDATE `work_users_tag` SET `status`='" + req.body.data.status + "' WHERE id = '" + req.body.data.idWorkTagUser + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result === "ok" || result.affectedRows === 1) {


    }
  });
})





// ERR 404
app.use(function (req, res, next) {
  res.status(404);
  res.send('404: err');
});

//server
app.listen(3001, function () {
  console.log('Example app listening on port 3001! "http://localhost:3001"  ');
});


