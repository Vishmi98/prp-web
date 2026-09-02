"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getCookieUser } from '@/utils/cookie.util'
import SessionRequests from '@/modules/sessions/ui/admin/SessionRequests'


const SessionRequestsPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <SessionRequests />
    )
}

export default SessionRequestsPage
