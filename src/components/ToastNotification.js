import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notify = (text, color) => {
    switch (color) {
        case 'success':
            toast.success(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break

        case 'error':
            toast.error(text, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break

        case 'warning':
            toast.warn(text, {
                position: toast.POSITION.BOTTOM_LEFT
            })
            break

        case 'info':
            toast.info(text, {
                position: toast.POSITION.BOTTOM_CENTER
            })
            break

        default:
            toast(text)
            break
    }
}

export const ToastRenderer = () => {
    return (
        <ToastContainer />
    )
}
