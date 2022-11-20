import React, { useReducer, useEffect, useState } from "react";
import { SendOutlined, MoreOutlined, ApartmentOutlined, LockOutlined, UserSwitchOutlined, UnlockOutlined } from "@ant-design/icons";
import { suffix, itemRender } from '../../../../components/Pagination/pagination';
import { List_staff } from '../../../../components/Array_List/arrList'
import { List, setbanAcountInnit } from '../../../../Reducer/InitReducer/Staff/ListStaff';
import { setBanAccountStaff, getListStaffs } from '../../../../Reducer/Reducers/Staff/listStaff';
import { getStaff, BanAccUserStaff } from '../../../../Reducer/Fetch_API/getlistStaff';
import { Image, Empty, Breadcrumb, Pagination, Input, Space, Dropdown, Menu } from 'antd';
import AddAccountUser from "./Add_account_user/addAccountUser";
import SeenAccountStaff from "./SeenAccountStaff/SeenAccountStaff";
import { API_GET_URL_IMAGE } from '../../../../api/index';
import './list_account.scss';
const { Search } = Input;
function App() {
  const [modalAdd, setModalAdd] = useState(false);
  const [seenModal, setSeenModal] = useState(false);
  const [list, setList] = useState({});
  const [state, dispatch] = useReducer(getListStaffs, List);
  const [stateban, dispatchBan] = useReducer(setBanAccountStaff, setbanAcountInnit);
  const [pag, setPag] = useState({
    show: [],
    all: [],
    total: 0,
  });

  useEffect(() => {
    getStaff(dispatch);
  }, [stateban])
  useEffect(() => {
    { state.all && setPag(state) }
  }, [state])

  const onSearch = (value) => getStaff(dispatch, value);

  const pagenumberPagination = (page, pageSize) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    state.all && setPag({ show: pag.all.slice(start, end), all: state.all, total: state.total });
  }

  const onChangeSeen = (value) => {
    setList(value)
    setSeenModal(true)
  }

  return (
    <>
      <Breadcrumb className='label-breadcrumb'>
        <Breadcrumb.Item>DANH SÁCH NHÂN VIÊN ({state.all.length} Nhân viên)</Breadcrumb.Item>
      </Breadcrumb>
      <div className="div-right">
        <div className="type-input">
          <Space direction="vertical">
            <Search
              placeholder="Tìm nhân viên..."
              onSearch={onSearch}
              suffix={suffix}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        <button type="button" className="btn btn-success" onClick={() => setModalAdd(true)}> <i className="bi bi-plus"></i>Thêm nhân viên</button>
        <button type="button" className="btn btn-warning" onClick={() => window.location.reload()}><i className="bi bi-arrow-clockwise"></i>Làm mới trang</button>
      </div>
      <div className="table-responsive table-responsive-data2" >
        <table className="table table-data2">
          <thead>
            <tr>
              {List_staff.map((value, index) => {
                return (
                  <th key={index}>{value.name}</th>
                )
              })}
            </tr>
          </thead>
          {pag.show && pag.show.map((value, index) => {
            return (
              <tbody key={index}>
                <tr className="tr-shadow">
                  <td>
                    <label className="au-checkbox">
                      <input type="checkbox" />
                      <span className="au-checkmark"></span>
                    </label>
                  </td>
                  <td>{value.ten}</td>
                  <td>
                    <Image
                      width={50}
                      src={value.image != "" ? API_GET_URL_IMAGE + value.image : 'https://joeschmoe.io/api/v1/random'}
                    />
                  </td>
                  <td>
                    <span className="block-email">{value.email}</span>
                  </td>
                  <td className="desc">{value.sdt}</td>
                  <td>{value.date || <span style={{ color: 'red' }}>Chưa cập nhật</span>}</td>
                  <td>
                    <span className="status--process">{value.gioitinh && value.gioitinh === "1" ? <p style={{ color: 'blue' }}>Nam</p> : value.gioitinh === "2" ? <p style={{ color: '#fd00c6' }}>Nữ</p> : "Khác"}</span>
                  </td>
                  <td >{value.chucvu === "Giám đốc" ? <span className="giam-doc">Giám đốc</span> : value.chucvu === "" || value.chucvu === null || value.chucvu === undefined ?  <span>Nhân Viên</span> : <span>{value.chucvu}</span>}</td>
                  <td>
                    <div className="table-data-feature">
                      <button className="item" data-toggle="tooltip" data-placement="top" title="Xem chi tiết" onClick={() => onChangeSeen(value)}>
                        <SendOutlined style={{ color: 'blue' }} />
                      </button>
                      <Dropdown overlay={
                        <Menu
                          onClick={(e) => BanAccUserStaff({ dispatchBan, e, value })}
                          items={[
                            {
                              label: 'Tài khoản',
                              key: '1',
                              icon: <UserSwitchOutlined />,
                              children: [
                                {
                                  key: '2',
                                  label: 'Khoá tài khoản',
                                  icon: <LockOutlined />,
                                  danger: true,
                                },
                                {
                                  key: '3',
                                  label: 'Mở khoá tài khoản',
                                  icon: <UnlockOutlined />,
                                },
                              ],
                            },
                            {
                              label: 'Phân quyền',
                              key: '4',
                              icon: <ApartmentOutlined />,
                              children: [
                                {
                                  key: '5',
                                  label: 'Phó giám đốc',
                                },
                                {
                                  key: '6',
                                  label: 'Quản lý',
                                },
                                {
                                  key: '7',
                                  label: 'Trưởng phòng',
                                },
                                {
                                  key: '8',
                                  label: 'Phó phòng',
                                },
                                {
                                  key: '9',
                                  label: 'Nhân viên',
                                },
                                {
                                  key: '10',
                                  label: 'Kế Toán',
                                },
                                {
                                  key: '11',
                                  label: 'Nhân sự',
                                },
                                {
                                  key: '12',
                                  label: 'Khác...',
                                },
                              ],
                            },
                          ]}
                        />
                      } trigger={['click']} arrow={{ pointAtCenter: true, }}>
                        <button className="item" data-toggle="tooltip" data-placement="top" title="Menu">
                          <MoreOutlined />
                        </button>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
                <tr className="spacer"></tr>
              </tbody>
            )
          })}
        </table>
        {state.show == "" && <div className="noData"> <div className="datatr"><Empty description={
          <span>
            Không có dữ liệu
          </span>
        } /></div></div>}
        <div className="pagination-bg">
          <Pagination itemRender={itemRender}
            defaultCurrent={1}
            defaultPageSize={5}
            total={state.total}
            showSizeChanger={true}
            pageSizeOptions={[5, 10, 15, 20]}
            onChange={pagenumberPagination}
          />
        </div>
      </div>
      {modalAdd && <AddAccountUser setModalAdd={setModalAdd} modalAdd={modalAdd} />}
      {seenModal && <SeenAccountStaff setSeenModal={setSeenModal} seenModal={seenModal} list={list} />}
    </>
  );
}

export default App;