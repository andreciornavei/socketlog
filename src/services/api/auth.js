import _ from "lodash"
import { 
    SERVER_URL,
    SERVER_PORT,
    API_AUTH_ENDPOINT, 
    API_AUTH_USER_FIELD, 
    API_AUTH_PASS_FIELD, 
    API_RESPONSE_JWT_FIELD
} from '@env'

export default {
    login: async (api, { username, password, onSuccess, onError, dispachMessage }) => {
        try {
            dispachMessage(`Trying to execute a POST to ${SERVER_URL}:${SERVER_PORT}${API_AUTH_ENDPOINT} passing {"${API_AUTH_USER_FIELD}":"${username}","${API_AUTH_PASS_FIELD}":"${password}" over request body and waiting for "${API_RESPONSE_JWT_FIELD}" field on response.`)
            const response = await api.post(API_AUTH_ENDPOINT, {
                [API_AUTH_USER_FIELD]: username,
                [API_AUTH_PASS_FIELD]: password
            })
            const JWT_FIELD = _.get(response, ["data", API_RESPONSE_JWT_FIELD].join("."))
            if (!JWT_FIELD)
                throw new Error("JWT field not found")
            onSuccess(JWT_FIELD)
        } catch (error) {
            console.log(error)
            onError(error)
        }
    }
}