import React from "react"

import {Navigate, Outlet} from "react-router-dom"

const useAuth = () => {
	//get item from localstorage

	let user

	const _user = localStorage.getItem("user")

	if (_user) {
		user = JSON.parse(_user)	}
	if (user) {
		return {
			auth: true,
			role: user.role,
		}
	} else {
		return {
			auth: false,
			role: null,
		}
	}
}

//protected Route state
const ProtectedRoutes = (props) => {
	const {auth, role} = useAuth()

	//if the role required is there or not
	if (props.roleRequired) {
		return auth ? (
			props.roleRequired.includes(role) ? (
				<Outlet />
			) : (
				<Navigate to="/table" />
			)
		) : (
			<Navigate to="/admin-login" />
		)
	} else {
		return auth ? <Outlet /> : <Navigate to="/admin-login" />
	}
}

export default ProtectedRoutes