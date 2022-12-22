import { Card, List, Breadcrumb, Space, Input, Popconfirm } from 'antd';
import { suffix } from '../../../../components/Pagination/pagination';
import React, { useState, useEffect, useReducer } from 'react';
import AddManageTypeProject from './AddManageTypeProject';
import DelManageTypeProject from './DelManageTypeProject';
import { FullStateManagament } from '../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../Reducer/Fetch_API/ApiTypeProject';
import moment from 'moment';
import { MOMENT_DATE_TIME } from '../../../../components/DateTime/DateTime';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './ManageTypeProject.scss';
const { Search } = Input;
function ManageTypeProject() {
  const [state, dispatch] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament);
  const [stateDel, dispatchDel] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [data, getData] = useState([]);

  useEffect(() => {
    typeAPI.getListTypeProject(dispatch)
  }, [stateDel]);

  const confirm = (e) => {
    typeAPI.setDelTypeProject({ dispatchDel, e })
  };

  const update = (item) => {
    setModalDel(true);
    getData(item)
  }

  return (
    <>
      <Breadcrumb className='label-breadcrumb'>
        <Breadcrumb.Item>QUẢN LÝ LOẠI DỰ ÁN</Breadcrumb.Item>
      </Breadcrumb>
      <div className="div-right">
        <div className="type-input">
          <Space direction="vertical">
            <Search
              placeholder="Tìm loại dự án..."
              // onSearch={onSearch}
              suffix={suffix}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        <button type="button" className="btn btn-success" onClick={() => setModalAdd(true)} > <i className="bi bi-plus"></i>Thêm loại dự án</button>
        <button type="button" className="btn btn-warning" onClick={() => window.location.reload()}><i className="bi bi-arrow-clockwise"></i>Làm mới trang</button>
      </div>
      <List
        style={{ marginTop: '30px' }}
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={state.data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.tenduan} headStyle={{ backgroundColor: '#5c6cfa', color: '#ffffff' }}
              bodyStyle={{ height: '150px', maxHeight: '150px' }}
              extra={<>
                <EditOutlined className='icon-edit-ManageTypeProject' onClick={() => update(item)} />
                <Popconfirm
                  title="Bạn chắc chắn muốn xoá loại dự án này ?"
                  onConfirm={() => confirm(item.id)}
                  okText="Xoá"
                  cancelText="Huỷ"
                >
                  <DeleteOutlined className='icon-del-ManageTypeProject' />
                </Popconfirm>
              </>}>
              <div>{item.motaduan === "" || item.motaduan === null || item.motaduan === undefined || item.motaduan === "undefined" ? "Chưa cập nhật" : item.motaduan}</div>
              <div style={{ marginTop: '10px' }}>Cập nhật : {moment(item.date).format(MOMENT_DATE_TIME)}</div>
            </Card>
          </List.Item>
        )}
      />
      {modalAdd && <AddManageTypeProject setModalAdd={setModalAdd} modalAdd={modalAdd} />}
      {modalDel && <DelManageTypeProject setModalDel={setModalDel} modalDel={modalDel} data={data} />}
    </>
  )
}
export default ManageTypeProject;