import { Avatar, Modal, List, Skeleton, Breadcrumb } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { getAccountNew, setAccountNewAgree } from '../../../../Reducer/InitReducer/Staff/ListStaff';
import { getListDataAccountNew, setListDataAccountNewAgr } from '../../../../Reducer/Reducers/Staff/listStaff';
import { getAccountUserStaffNew, setAccountUserStaffNewAgr } from '../../../../Reducer/Fetch_API/getlistStaff';
import { API_GET_URL_IMAGE_USER_OUTLINE } from '../../../../api/index';
import './userNew.scss';
const UserNew = () => {
  const [state, dispatch] = useReducer(getListDataAccountNew, getAccountNew);
  const [stateAgr, dispatchAgr] = useReducer(setListDataAccountNewAgr, setAccountNewAgree);
  useEffect(() => {
    getAccountUserStaffNew(dispatch)
  }, [stateAgr])

  const BtnClick = ({ item, key }) => {
    {
      key === '1' ?
        setAccountUserStaffNewAgr({ item, key, dispatchAgr })
        :
        setAccountUserStaffNewAgr({ item, key, dispatchAgr })
    }
  }
  return (
    <>
      <Breadcrumb className='label-breadcrumb'>
        <Breadcrumb.Item>DANH SÁCH ĐĂNG KÝ MỚI</Breadcrumb.Item>
      </Breadcrumb>
      <List
        dataSource={state.all}
        renderItem={(item) => (
          <List.Item
            actions={[<p className='Success-User-new' key="list-loadmore-edit" onClick={() => BtnClick({ item, key: '1' })}>Chấp thuận</p>, <p onClick={() => BtnClick({ item, key: '2' })} className='False-User-new' key="list-loadmore-more">Huỷ</p>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={API_GET_URL_IMAGE_USER_OUTLINE} />}
                title={<p>{item.ten}</p>}
                description={`${item.sdt}`}
              />
              <div>{item.email}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserNew;