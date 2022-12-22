export const Success_mennu_nav = (state, action) => {
    switch (action.type) {
        case "1":
            return {
                ...state,
                job: "/",
                SelectedKeys :action.payload.keyPath,
            }
        case "2":
            return {
                ...state,
                job: "/danh-sach-nhan-vien",
                SelectedKeys :action.payload.keyPath,
            }
        default:
            return {
                ...state,
                job: "/*",
            }
    }
}