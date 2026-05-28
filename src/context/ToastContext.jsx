import {
  createContext,
  useContext,
  useState
} from "react"

import { motion, AnimatePresence }
from "framer-motion"

const ToastContext =
createContext()

export function ToastProvider({
  children
}) {

  const [toast, setToast] =
  useState(null)

  function showToast(
    message,
    type = "success"
  ) {

    setToast({
      message,
      type
    })

    setTimeout(() => {

      setToast(null)

    }, 2500)

  }

  return (

    <ToastContext.Provider
      value={{
        showToast
      }}
    >

      {children}

      <AnimatePresence>

        {toast && (

          <motion.div

            initial={{
              opacity: 0,
              y: -40,
              scale: 0.95
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: -20
            }}

            transition={{
              duration: 0.25
            }}

            className="
            fixed
            top-6
            left-1/2
            -translate-x-1/2
            z-[9999]
            bg-black
            text-white
            px-8
            py-5
            rounded-2xl
            shadow-2xl
            border border-zinc-800
            backdrop-blur-xl
            "
          >

            <div className="
            flex items-center gap-3
            ">

              <span className="text-xl">

                {toast.type === "success"
                  ? "✅"
                  : "⚠️"}

              </span>

              <p className="
              font-medium
              tracking-tight
              ">

                {toast.message}

              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </ToastContext.Provider>

  )

}

export function useToast() {

  return useContext(
    ToastContext
  )

}