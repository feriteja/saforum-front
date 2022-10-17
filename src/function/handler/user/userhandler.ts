import axios from 'axios'
import {
	AuthTokenType,
	ForumType,
	UserType,
} from '../../../constant/type/DataType'

// interface ProfileResponseType {
//   message: string;
//   user: UserType;
// }
interface ProfileForumResponseType {
	message: string
	data: ForumType[]
}

interface profileUserResponseType {
	message: string
	user: UserType
}

const getUserDetailByUsername = async (username?: string) => {
	try {
		const res = await axios.request<profileUserResponseType>({
			method: 'get',
			url: `/user/detail/${username}`,
		})

		return res.data.user
	} catch (error) {
		throw error
	}
}

const updateUser = async (formData: FormData, token: AuthTokenType) => {
	try {
		const res = await axios({
			method: 'put',
			url: `/user`,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token.access_token}`,
				'Content-type': 'multipart/form-data',
			},
			data: formData,
		})
		return true
	} catch (error) {
		throw error
	}
}

const getUserForumByUsername = async (username: string) => {
	try {
		const res = await axios.request<ProfileForumResponseType>({
			method: 'get',
			url: `/user/${username}`,
		})
		return res.data
	} catch (error) {
		throw error
	}
}

export {getUserDetailByUsername, updateUser, getUserForumByUsername}
