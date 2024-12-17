import React from "react"

import {Navigate, Outlet} from "react-router-dom"

const useAuth = () => {
	//get item from localstorage

	let user

	const _userbase64 = localStorage.getItem("user")

	if (_userbase64) {
		user = JSON.parse(decodeURIComponent(escape(atob(_userbase64))));
		console.log	}
	if (user) {
		return {
			auth: true,
			dept: user.MaBP | 0
		}
	} else {
		return {
			auth: false,
			dept: null,
		}
	}
}

//protected Route state
const ProtectedRoutes = (props) => {
	const {auth, dept} = useAuth()

	//if the role required is there or not
	if (props.roleRequired) {
		return auth ? (
			props.roleRequired.includes(dept) ? (
				<Outlet />
			) : (
				<Navigate to="/table" />
			)
		) : (
			<Navigate to="/admin/login" />
		)
	} else {
		return auth ? <Outlet /> : <Navigate to="/admin/login" />
	}
}

export default ProtectedRoutes