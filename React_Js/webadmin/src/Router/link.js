import NotFound from "../containers/pages/NotFound";
import Login from "../containers/Auth/Login";
import Register from "../containers/Auth/Register";
import Home from '../containers/User/HomePage';
import Admin from '../containers/Admin/HomePage/index';
import unAuth from '../containers/Auth/unAuth/index';
import ListAccount from '../containers/Admin/Account/fullListAccount/list_account';
import UpdateProfile from "../containers/Admin/DropdownShow/UpdateProfile";
import ChangePassword from "../containers/Admin/DropdownShow/ChangePassword";
import UserNew from '../containers/Admin/Account/UserNew/userNew';
import ManageAccount from "../containers/Admin/Account/ManageAccount/ManageAccount";
import ListProject from "../containers/Admin/Project/ListProject/listProject";
import FormAddProject from "../containers/Admin/Project/ListProject/AddProjectNew/FormAddProject";
import ManageTypeProject from '../containers/Admin/PageManage/ManageTypeProject/ManageTypeProject';
import ListTypeManageListGrMember from "../containers/Admin/PageManage/ManageGroupMember/ListTypeManageListGrMember";
import AddListTypeManageListGrMember from "../containers/Admin/PageManage/ManageGroupMember/AddListTypeManageListGrMember/AddListTypeManageListGrMember";
import DetailListTypeManageListGrMember from "../containers/Admin/PageManage/ManageGroupMember/DetailListTypeManageListGrMember/DetailListTypeManageListGrMember";
import ManagerTimeKeepings from "../containers/Admin/PageManage/ManagerTimeKeepings/ManagerTimeKeepings";
import DetailTimeKeeping from "../containers/Admin/PageManage/ManagerTimeKeepings/DetailTimeKeeping";
import { NaviLayout } from '../containers/Admin';

import ListPageDiemDanh from '../containers/User/PageDiemDanh/listPageDiemDanh';
import PageCongViec from '../containers/User/PageCongViec/listPageCongViec';
import PageBaoCaoCongViec from '../containers/User/PageBaoCaoCongViec/PageBaoCaoCongViec';
import PageBangThongKe from "../containers/User/PageBangThongKe/PageBangThongke";
import DanhSachDuAn from "../containers/Admin/PagesAll/BangChamCong/DanhSachDuAn";
import DetailListReportUser from "../containers/Admin/Project/DetailListReportUser/DetailListReportUser";
import DetailReportUser from "../containers/Admin/Project/DetailReportUser/DetailReportUser";
import DetailProject from "../containers/Admin/Project/DetailProject/DetailProject";
const publicRouter = [
    {
        path: "/",
        component: Home,
        admins: false,
    },
    {
        path: "/*",
        component: NotFound,
    },
    {
        path: "/dang-nhap",
        component: Login,
    },
    {
        path: "/dang-ky",
        component: Register,
    },
    {
        path: "/Diem-danh",
        component: ListPageDiemDanh,
        // layout : NaviLayout
    },
    {
        path: "/Cong-viec",
        component: PageCongViec,
        // layout : NaviLayout
    },
    {
        path: "/Cong-viec/Bao-cao-cong-viec",
        component: PageBaoCaoCongViec,
        // layout : NaviLayout
    },
    ,
    {
        path: "/Thong-Ke",
        component: PageBangThongKe,
        // layout : NaviLayout
    },
]

const AdminRoute = [
    {
        path: "/",
        component: Admin,
        admins: true,
    },
    {
        path: "/*",
        component: NotFound,
        // layout : NaviLayout,
        layout: null,

    },
    {
        path: "/dang-nhap",
        component: Login,
    },
    {
        path: "/dang-ky",
        component: Register,
    },
    {
        path: "/danh-sach-nhan-vien",
        component: ListAccount,
    },
    {
        path: "/Dang-ky-moi",
        component: UserNew,
    },
    {
        path: "/thong-tin-ca-nhan",
        component: UpdateProfile,
    },
    {
        path: "/doi-mat-khau",
        component: ChangePassword,
    },
    {
        path: "/quan-ly-tai-khoan",
        component: ManageAccount,
    },
    {
        path: "/quan-ly-chi-tiet-bao-cao",
        component: DetailProject,
    },
    {
        path: "/quan-ly-danh-sach-bao-cao-du-an",
        component: DetailListReportUser,
    },
    {
        path: "/quan-ly-bao-cao-nhan-vien",
        component: DetailReportUser,
    },
    {
        path: "/danh-sach-du-an",
        component: ListProject,
    },
    {
        path: "/danh-sach-du-an/them-du-an",
        component: FormAddProject,
    },
    {
        path: "/quan-ly-loai-du-an",
        component: ManageTypeProject,
    },
    {
        path: "/quan-ly-nhom",
        component: ListTypeManageListGrMember,
    },
    {
        path: "/quan-ly-nhom/them-nhom-moi",
        component: AddListTypeManageListGrMember,
    },
    {
        path: "/quan-ly-nhom/:id",
        component: DetailListTypeManageListGrMember,
    },  {
        path: "/quan-ly-cham-cong",
        component: ManagerTimeKeepings,
    },
    {
        path: "/chi-tiet-cham-cong/:id",
        component: DetailTimeKeeping,
    },
]

const AuthRoute = [
    {
        path: "/",
        component: unAuth
    },
    {
        path: "/*",
        component: NotFound
    },
    {
        path: "/dang-nhap",
        component: Login
    },
    {
        path: "/dang-ky",
        component: Register
    },
]

export {
    publicRouter,
    AdminRoute,
    AuthRoute
}
