import {useQuery} from '@tanstack/react-query'
import {useMemo, useState} from 'react'
import {BsChat} from 'react-icons/bs'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import avatar from '../../../assets/avatar/avataaars.png'
import {UserState} from '../../../context/UserContext'
import {getUserDetailByUsername} from '../../../function/handler/user/userhandler'
import ProfileActivity from './ProfileActivity'
import ProfileForum from './ProfileForum'

const Profile = () => {
	const {user} = UserState()
	const {username} = useParams()
	const [showForum, setShowForum] = useState(true)

	const {isLoading, error, data} = useQuery(
		['profile', username],
		() => getUserDetailByUsername(username),
		{retry: 1}
	)

	const isOwner = data?.uuid === user?.uuid

	const navigate = useNavigate()

	const chatRoom = useMemo(() => {
		const roomName = [username, user?.username].sort().join('')
		return roomName
	}, [username, user?.username])

	const toChat = () => {
		navigate('/chat', {state: {room: chatRoom, target: username}})
	}

	if (isLoading) {
		return (
			<div>
				<h1> loading</h1>
			</div>
		)
	}

	if (error || !data) {
		return <Navigate to="/notFound" replace />
	}

	return (
		<div className=" min-h-screen py-6 ">
			<div className=" bg-primary  px-4 py-3 rounded ">
				<div className="space-y-3 ">
					<div className="flex items-center justify-between">
						<div className="flex flex-1">
							<img
								src={
									(data.avatar &&
										`${import.meta.env.VITE_APP_BASE_URL}/public/tmp/${
											data.avatar as string
										}`) ||
									avatar
								}
								alt="avatar"
								className="w-24 md:w-28 lg:w-32 mx-2 rounded-full"
							/>
							<div className="ml-4 w-full ">
								<div className="flex space-x-4 items-center justify-between    ">
									<h1 className="font-semibold text-xl">
										{data?.alias || data?.username}
									</h1>
									{!isOwner && (
										<button
											onClick={toChat}
											className="shadow-xl p-2 rounded-md"
										>
											<BsChat size={30} />
										</button>
									)}
								</div>
								<h2 className="text-gray-400 font-bold">@{data?.username}</h2>
								{isOwner && (
									<h2 className="text-gray-400">{data?.uuid?.slice(0, 8)}</h2>
								)}
							</div>
						</div>

						{isOwner && (
							<button
								onClick={() => navigate('/user/edit', {state: data})}
								className="self-start mt-3 border-2 border-primary bg-primary  px-3 py-1 rounded-full shadow "
							>
								Edit
							</button>
						)}
					</div>
					<p className="mt-6">{data.status}</p>
				</div>
				<div className="flex border-b my-4  ">
					<div
						onClick={() => setShowForum(true)}
						className="flex-1  py-2 rounded group hover:bg-secondary cursor-pointer  "
					>
						<h1
							className={` px w-fit px-3 mx-auto ${
								showForum && 'border-b-2'
							}  group-hover:border-b-4 border-accent  `}
						>
							Forum
						</h1>
					</div>
					<div
						onClick={() => setShowForum(false)}
						className="flex-1  py-2 rounded group hover:bg-secondary cursor-pointer "
					>
						<h1
							className={` px w-fit px-3 mx-auto ${
								!showForum && 'border-b-2'
							} group-hover:border-b-4 border-accent `}
						>
							Activity
						</h1>
					</div>
				</div>
				{showForum ? <ProfileForum /> : <ProfileActivity />}
			</div>
		</div>
	)
}

export default Profile
