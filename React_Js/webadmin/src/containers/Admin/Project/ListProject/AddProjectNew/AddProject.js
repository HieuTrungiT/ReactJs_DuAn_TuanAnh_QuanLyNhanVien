import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

function AddProJect() {
    return (
        <>
            <Link to="/danh-sach-du-an/them-du-an">
                <Button type="primary" icon={<PlusCircleOutlined />}>
                    Thêm Dự Án
                </Button>;
            </Link>
        </>
    );
}

export default AddProJect;