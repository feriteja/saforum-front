import React, {createContext, useContext, useEffect, useState} from 'react'
import {useJwt} from 'react-jwt'
import {useLocation} from 'react-router-dom'
import {AuthTokenType, UserType} from '../constant/type/DataType'
import {useLocalStorage} from 'usehooks-ts'
import {signRefresh} from '../function/handler/auth/auth'
import {useCookies} from 'react-cookie'

export interface userStateContextProps {
	user: UserType | null
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

const UserContext = createContext<Partial<userStateContextProps>>({})

const UserProvider: React.FC<any> = ({children}) => {
	const [user, setUser] = useState<UserType | null>(null)
	const [cookies, setCookie, removeCookie] = useCookies(['auth-cookie'])
	const [token, setToken] = useLocalStorage<AuthTokenType | null>(
		'authToken',
		null
	)
	const {decodedToken, isExpired} = useJwt(token?.access_token || '')

	useEffect(() => {
		if (!isExpired && cookies['auth-cookie']) {
			setUser(decodedToken as UserType)
		} else if (isExpired && cookies['auth-cookie']) {
			signRefresh()
				.then((res) => setToken(res.data))
				.catch(() => setUser(null))
		} else {
			console.log('disini null')
			setUser(null)
		}
	}, [isExpired, token])

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	)
}

const UserState = () => {
	return useContext(UserContext) as userStateContextProps
}

export {UserProvider, UserState}
