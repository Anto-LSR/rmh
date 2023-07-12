
// cookieUtils.js
export const handleGetCookie = (cookieName, cookies) => {
    const cookieValue = cookies[cookieName];
    return cookieValue;
};

export const handleSetCookie = (cookieName, cookieValue, setCookie, isArray, replace, cookies) => {
    if (replace){
        setCookie(cookieName, cookieValue, { path: '/' });
        return
    }
    if (!isArray) {
        setCookie(cookieName, cookieValue, { path: '/' });
    } else {
        let cookieData = handleGetCookie(cookieName, cookies);
        // Check if the cookie exists
        if (!cookieData) {
            // If it doesn't exist, initialize it with an empty array
            cookieData = [];
        }
        // Add the new value to the array
        if(!cookieData.includes(cookieValue))
            cookieData.push(cookieValue);
        setCookie(cookieName, cookieData, { path: '/' });
    }
};