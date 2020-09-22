import Axios from 'axios';
export const sendUserData = (userData) => {
    return Axios.post('/api/user', userData);
};
//# sourceMappingURL=UserApi.js.map