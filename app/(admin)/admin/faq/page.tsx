"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCookieUser } from "@/utils/cookie.util";
import FAQs from "@/modules/faq/ui/admin/FAQs";

const FAQPage = () => {
    const user = getCookieUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/sign_in");
    }, [user, router]);

    return <FAQs />;
};

export default FAQPage;