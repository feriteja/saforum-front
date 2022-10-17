import {useEffect, useState} from 'react'
import {MdClose, MdMenu} from 'react-icons/md'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {AuthTokenType} from '../../constant/type/DataType'
import {systemState} from '../../context/SystemContext'
import {UserState} from '../../context/UserContext'
import {signOutFunc} from '../../function/handler/auth/auth'
import {useLocalStorage} from 'usehooks-ts'
import {ThemeState} from '../../context/ThemeContext'
import {BiSun} from 'react-icons/bi'
import MobileNav from './MobileNav'
import SearchNav from '../search/SearchNav'
import {useCookies} from 'react-cookie'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isDark, setIsDark] = useState(false)
	const [token, setToken] = useLocalStorage<AuthTokenType | null>(
		'authToken',
		null
	)

	const [cookies, setCookie, removeCookie] = useCookies(['auth-cookie'])
	const {showSnackbar, showLoading} = systemState()
	const navigate = useNavigate()

	const {user, setUser} = UserState()
	const {setTheme} = ThemeState()

	const handleNav = () => {
		setIsOpen((prev) => !prev)
	}

	const onLogout = async () => {
		try {
			console.log('first')
			await signOutFunc(token as AuthTokenType)
			removeCookie('auth-cookie', {
				domain: '127.0.0.1',
				path: '/',
			})
			setToken(null)
			setUser(null)

			showSnackbar('SignOut success')
			navigate('/')
		} catch (error) {
			showSnackbar('SignOut failed')
		}
	}

	useEffect(() => {
		setTheme(isDark ? 'dark' : 'light')
	}, [isDark])

	const forceLogout = () => {
		setToken(null)
	}

	return (
		<>
			<nav className=" flex items-center justify-between h-16 bg-primary shadow-xl  z-10 w-full px-2 sm:px-4 md:px-6 ">
				<div className="flex items-baseline  space-x-3 ">
					<NavLink to={'/'}>
						<h1 className="font-bold text-2xl z-40 font-mochi-pop ">SaForum</h1>
					</NavLink>
					{(user?.role === 'admin' || user?.role === 'superadmin') && (
						<>
							<NavLink
								to={'/admin/'}
								className={({isActive}) =>
									isActive ? 'text-accent' : 'text-primary'
								}
							>
								<h1 className="font-bold text-lg z-40">Dashboard</h1>
							</NavLink>
							<NavLink
								to={'admin/app-log/'}
								className={({isActive}) =>
									isActive ? 'text-accent' : 'text-primary'
								}
							>
								<h1 className="font-bold text-lg z-40">AppLog</h1>
							</NavLink>
						</>
					)}
				</div>
				<ul className="hidden sm:flex justify-center font-bold items-center text-center sm:text-sm md:text-base ">
					{/* <li className="mx-2">
            <button onClick={() => console.log(user, token)}>
              Show State user
            </button>
          </li> */}
					<li className="mx-2">
						<NavLink
							className={({isActive}) =>
								isActive ? 'text-accent' : 'text-primary'
							}
							to={'/search'}
						>
							<SearchNav />
						</NavLink>
					</li>
					<li className="mx-2">
						<NavLink
							className={({isActive}) =>
								isActive ? 'text-accent' : 'text-primary'
							}
							to={'/'}
						>
							Homepage
						</NavLink>
					</li>
					<li className="mx-2">
						<NavLink
							className={({isActive}) =>
								isActive ? 'text-accent' : 'text-primary'
							}
							to={'/forum'}
						>
							Forum
						</NavLink>
					</li>

					{!user ? (
						<>
							<li className="mx-2">
								<button onClick={() => setIsDark((prev) => !prev)}>
									<div
										className={`flex ${
											isDark ? 'justify-end ' : 'justify-start '
										} bg-accent w-12 p-1 rounded-full duration-1000 text-black`}
									>
										<BiSun />
									</div>
								</button>
							</li>
							<li className="mx-2">
								<NavLink
									className={({isActive}) =>
										isActive ? 'text-accent' : 'text-primary'
									}
									to={'/signIn'}
								>
									Sign In
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li className="mx-2">
								<NavLink
									className={({isActive}) =>
										isActive ? 'text-accent' : 'text-primary'
									}
									to={`/user/${user.username}`}
								>
									Profile
								</NavLink>
							</li>
							<li className="mx-2">
								<button onClick={() => setIsDark((prev) => !prev)}>
									<div
										className={`flex ${
											isDark ? 'justify-end ' : 'justify-start '
										} bg-accent w-12 p-1 rounded-full duration-1000 text-black`}
									>
										<BiSun />
									</div>
								</button>
							</li>
							<li className="mx-2">
								<button onClick={onLogout}>logout</button>
							</li>
						</>
					)}
				</ul>

				{/* <button className="" onClick={forceLogout}>
					forcelogout
				</button> */}
				<button className="sm:hidden " onClick={handleNav}>
					{isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
				</button>
			</nav>

			{/* Mobile */}
			<MobileNav
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				handleNav={handleNav}
				setIsDark={setIsDark}
				isDark={isDark}
				onLogout={onLogout}
			/>
		</>
	)
}

export default Navbar
