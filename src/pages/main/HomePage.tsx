import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useLocalStorage} from 'usehooks-ts'
import {ListForum, PostCard, SideBar} from '../../components'
import {AuthTokenType} from '../../constant/type/DataType'
import {UserState} from '../../context/UserContext'

const HomePage = () => {
	const {user} = UserState()
	const [cookies, setCookie, removeCookie] = useCookies(['auth-cookie'])
	const [token, setToken] = useLocalStorage<AuthTokenType | null>(
		'authToken',
		null
	)

	return (
		<div className="grid md:grid-cols-9 gap-3 p-2 ">
			<div className="min-h-screen col-span-6 space-y-4">
				<PostCard />
				<ListForum />
			</div>
			<div className="bg-secondary    min-h-screen col-span-6 md:col-span-3 ">
				<SideBar />
			</div>
		</div>
	)
}

export default HomePage
