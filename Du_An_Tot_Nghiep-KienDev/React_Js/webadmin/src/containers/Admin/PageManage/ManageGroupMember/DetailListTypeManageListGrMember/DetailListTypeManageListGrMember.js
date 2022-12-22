import React, { useEffect, useReducer, useState } from "react";
import { FullStateManagament } from '../../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../../Reducer/Fetch_API/ApiTypeProject';
import { Link, useParams } from 'react-router-dom';
import { API_GET_URL_IMAGE } from '../../../../../api/index';
import moment from 'moment';
import * as date from '../../../../../components/DateTime/DateTime';

function DetailListTypeManageListGrMember() {
    const [state, dispatch] = useReducer(Reducer.getListDetailGr, FullStateManagament)
    const [manage, dispatchManage] = useReducer(Reducer.getListDetailGr, FullStateManagament)
    const [User, dispatchUser] = useReducer(Reducer.getListDetailGr, FullStateManagament)
    const slug = useParams().id;

    useEffect(() => {
        typeAPI.getDataDetailListGRMember({ dispatch, slug })
    }, [])

    useEffect(() => {
        {
            state?.deltailID[0]?.nguoiquanlyduan != null === true &&
                typeAPI.getManager({ dispatchManage, id: state?.deltailID[0]?.nguoiquanlyduan })
        }
        if (state?.deltailID[0]?.nhanviennhom != null === true) {
            const lasts = state?.deltailID[0]?.nhanviennhom?.substring(0, state?.deltailID[0]?.nhanviennhom?.length - 1);
            const heads = lasts.slice(1);
            typeAPI.getManagerUser({ dispatchUser, heads })
        }
    }, [state])

    return (
        <>
            <section>
                {state?.deltailID.map((value, index) => {
                    const last = value.nhanviennhom.substring(0, value.nhanviennhom.length - 1);
                    const head = last.slice(1);
                    const ar = head.split(', ');
                    const newArr = ar[0].split(",");
                    const cvnumberArr = newArr.map(item => {
                        return Number(item);
                    })

                    return (
                        <div className="relative mx-auto max-w-screen-xl px-4 py-8" key={index}>
                            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                                    <img
                                        alt="Les Paul"
                                        src={`${API_GET_URL_IMAGE + value.image}`}
                                        className="aspect-square w-full rounded-xl object-cover"
                                    />
                                </div>

                                <div className="sticky top-0">
                                    <strong
                                        className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600"
                                    >
                                        Nhóm thành viên
                                    </strong>

                                    <div className="mt-8 flex justify-between">
                                        <div className="max-w-[35ch]">
                                            <h1 className="text-2xl font-bold">
                                                {value.tennhom}
                                            </h1>

                                            {manage.user?.manager?.map((e, key) => {
                                                return (
                                                    <p key={key} className="mt-0.5 text-sm" style={{ color: 'orange' }}>{e.ten}</p>
                                                )
                                            })}
                                        </div>

                                        <p className="text-lg font-bold">{cvnumberArr.length + 1} Thành Viên</p>
                                    </div>

                                    <details className="group relative mt-4">
                                        <summary className="block">
                                            <div>
                                                <div className="prose max-w-none group-open:hidden">
                                                    <p>
                                                        {value.mota}
                                                    </p>
                                                </div>

                                                <span
                                                    className="mt-4 cursor-pointer text-sm font-medium underline group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0"
                                                >
                                                    Xem thêm
                                                </span>
                                            </div>
                                        </summary>

                                        <div className="prose max-w-none pb-6">
                                            <p>
                                                {value.mota}
                                            </p>

                                            <p>
                                                !
                                            </p>
                                        </div>
                                    </details>

                                    <div className="mt-8">
                                        <fieldset>
                                            <legend className="mb-1 text-sm font-medium">Thành Viên</legend>

                                            <div className="flow-root">
                                                <div className="-m-0.5 flex flex-wrap">
                                                    {User.user?.user?.map((e, key) => {
                                                        return (
                                                            <label htmlFor={`${e.id}`} className="cursor-pointer p-0.5">
                                                                <input
                                                                    type="radio"
                                                                    name="color"
                                                                    id={`${e.id}`}
                                                                    className="peer sr-only"
                                                                />

                                                                <span
                                                                    key={key}
                                                                    className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                                                >
                                                                    {e.ten}
                                                                </span>
                                                            </label>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="mt-4">
                                            <legend className="mb-1 text-sm font-medium">Ngày Thành Lập</legend>

                                            <div className="flow-root">
                                                <div className="-m-0.5 flex flex-wrap">
                                                    <label htmlFor="size_xs" className="cursor-pointer p-0.5">
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            id="size_xs"
                                                            className="peer sr-only"
                                                        />

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                                        >
                                                            {moment(value.ngaytao).format(date.MOMENT_DATE_SURE)}
                                                        </span>
                                                    </label>

                                                    <label htmlFor="size_s" className="cursor-pointer p-0.5">
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            id="size_s"
                                                            className="peer sr-only"
                                                        />

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                                        >
                                                            {moment(value.ngaytao).format(date.TIME)}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="mt-4">
                                            <legend className="mb-1 text-sm font-medium">Ngày Cập Nhật Gần Đây Nhất</legend>

                                            <div className="flow-root">
                                                <div className="-m-0.5 flex flex-wrap">
                                                    <label htmlFor="size_xsm" className="cursor-pointer p-0.5">
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            id="size_xsm"
                                                            className="peer sr-only"
                                                        />

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                                        >
                                                            {moment(value.newupdate).format(date.MOMENT_DATE_SURE)}
                                                        </span>
                                                    </label>

                                                    <label htmlFor="size_sm" className="cursor-pointer p-0.5">
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            id="size_sm"
                                                            className="peer sr-only"
                                                        />

                                                        <span
                                                            className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                                        >
                                                            {moment(value.newupdate).format(date.TIME)}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <div className="mt-8 flex">
                                            <button
                                                className="ml-3 block rounded bg-red-600 px-5 py-3 text-xs font-medium text-white hover:bg-red-500"
                                            >
                                                Xoá Nhóm
                                            </button>

                                            <button
                                                className="ml-3 block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500"
                                            >
                                                Cập Nhật Nhóm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    );
}

export default DetailListTypeManageListGrMember;