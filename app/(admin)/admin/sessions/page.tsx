"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getCookieUser } from '@/utils/cookie.util'
import Sessions from '@/modules/sessions/ui/admin/Sessions'

const SessionsPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <Sessions />
    )
}

export default SessionsPage
