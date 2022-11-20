export const OnClickMenu = (e) => {
    const payload = e.key
    return {
        type: payload,
        payload : e,
    }
}