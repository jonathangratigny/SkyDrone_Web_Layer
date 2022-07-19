import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notify = () => {

    toast('Undefined Notification');
    
    toast.success("Success Notification !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT
    })

    toast.warn("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT
    })

    toast.info("Info Notification !", {
        position: toast.POSITION.BOTTOM_CENTER
    })
}


// Merci pour le moment c'est good je retate le terrain mais je crois que je vois
// Ce sera a toi de me dire si ça cfonctionne
//ok
// j'y retourne ->ok
// https://fkhadra.github.io/react-toastify/introduction/