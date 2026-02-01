

import authApi from '@/lib/auth/api'
import { useNavigate } from '@/lib/hook'
import { useLocalStorage } from "@uidotdev/usehooks"
import { useEffect, useState } from 'react'

export const useOTP = () => {

    const [autoSend, setAutoSend] = useLocalStorage("autoSend", false)

    const [loading, setLoading] = useState(true)
    const [countdown, setCountdown] = useState(0)
    const { setLocation } = useNavigate()


    // 自動倒數邏輯
    useEffect(() => {
        if (countdown <= 0) return

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [countdown, setCountdown])


    //發送 OTP 的動作
    const sendOTP = async (email: string) => {
        try {
            if (countdown > 0) return
            setLoading(true)

            await authApi.emailOtp.sendVerificationOtp({
                email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: async () => {
                        setCountdown(60)
                    }
                },
            })
        } finally {
            setAutoSend(false)
            setLoading(false)
        }
    }

    const navigateToOTP = (email: string) => {
        setAutoSend(true)
        setLocation(`/otp?email=${email}`)
    }

    return {
        countdown,
        setCountdown,
        loading,
        setLoading,
        sendOTP,
        navigateToOTP,
        autoSend,
        setAutoSend
    }
}