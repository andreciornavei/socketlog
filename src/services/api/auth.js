export default {
    login: async (api, { username, password, onSuccess, onError }) => {
        try {
            const response = await api.post('/auth/local', {
                identifier: username,
                password: password
            })
            if (response.data.jwt) token = response.data.jwt
            onSuccess(response.data)
        } catch (error) {
            onError(error)
        }
    }
}