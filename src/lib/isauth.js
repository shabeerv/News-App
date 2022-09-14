export const isAuthenticated = () => {

    const userToken = localStorage.getItem("userToken");

    if(userToken === null || userToken === undefined)
    {
        return false;
    }
    return true;
}