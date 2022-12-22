import { Breadcrumb } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './ListTypeManageListGrMember.scss';
import { Link } from "react-router-dom";
import React, { useReducer, useEffect } from 'react';
import { FullStateManagament } from '../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../Reducer/Fetch_API/ApiTypeProject';
import moment from 'moment';
import * as date from '../../../../components/DateTime/DateTime';
import { API_GET_URL_IMAGE } from '../../../../api/index';

function ListTypeGrMem() {
    const [state, dispatch] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    useEffect(() => {
        typeAPI.getListDataGr(dispatch)
    }, []);

    return (
        <>
            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>QUẢN LÝ NHÓM
                    <Link to="/quan-ly-nhom/them-nhom-moi">
                        <PlusCircleOutlined className='type-btn-add' style={{ fontSize: '21px' }} />
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            {state?.dataGr?.length > 0 && state?.dataGr.map((value, index) => {
                return (
                    <article className="flex bg-white transition hover:shadow-xl mb-4" key={index}>
                        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                            <time
                                datetime={`${moment(value.ngaytao).format(date.MOMENT_DATE)}`}
                                className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                            >
                                <span>{moment(value.ngaytao).format(date.MOMENT_DATE_YEAR)}</span>
                                <span className="w-px flex-1 bg-gray-900/10"></span>
                                <span>{moment(value.ngaytao).format(date.MOMENT_DATES)} tháng {moment(value.ngaytao).format(date.MOMENT_MONTH)}</span>
                            </time>
                        </div>

                        <div className="hidden sm:block sm:basis-56">
                            <img
                                alt="Guitar"
                                src={API_GET_URL_IMAGE + value.image}
                                className="aspect-square h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                                <a className="no-underline" href="#">
                                    <h3 className="font-bold uppercase text-gray-900 ">
                                        {value.tennhom}
                                    </h3>
                                </a>

                                <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
                                    {value.mota}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
                                    Thời gian cập nhật gần nhất: {moment(value.newupdate).format(date.MOMENT_DATE_TIME_SURE)}
                                </p>
                            </div>

                            <div className="sm:flex sm:items-end sm:justify-end">
                                <Link
                                    to={`/quan-ly-nhom/${value.slugs}`}
                                    className="no-underline block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                                >
                                    XEM CHI TIẾT
                                </Link>
                            </div>
                        </div>
                    </article>
                )
            })}

        </>
    );
}

export default ListTypeGrMem;