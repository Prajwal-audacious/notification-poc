import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMsg = () => {
      return (
            <>
                  <ToastContainer
                        position="top-center"
                        autoClose={500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                  />
            </>
      )
}

export default ToastMsg