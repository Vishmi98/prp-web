export const NAV_ITEMS = [
    { label: "About", href: "/about" },

    {
        label: "Treatments",
        href: "",
        dropdown: [
            { label: "PRP Hair Treatment", href: "/treatments/prp-hair" },
            { label: "PRP Facial", href: "/treatments/prp-facial" },
            { label: "Skin Rejuvenation", href: "/treatments/skin-rejuvenation" },
            { label: "Hair Regrowth Therapy", href: "/treatments/hair-regrowth" },
            { label: "Anti Aging Therapy", href: "/treatments/anti-aging" },
        ],
    },

    { label: "Contact", href: "/contact" },
];

export const SERVICES = [
    {
        id: 1,
        title: "Hair Restoration PRP",
        desc: "Stimulates natural hair growth and reduces hair thinning using platelet-rich plasma therapy.",
        image: "/s1.webp",
    },
    {
        id: 2,
        title: "Skin Rejuvenation",
        desc: "Improves skin texture, tone, and elasticity for a youthful glow.",
        image: "/s2.webp",
    },
    {
        id: 3,
        title: "Anti-Aging Therapy",
        desc: "Reduces fine lines and wrinkles using natural growth factors from your own blood.",
        image: "/s3.jpg",
    },
    {
        id: 4,
        title: "Acne Scar Treatment",
        desc: "Smooths out acne scars and uneven skin tone by promoting new collagen production.",
        image: "/s4.jpg",
    },
];

export const TREATMENT_DETAILS: Record<string, any> = {
    "prp-hair": {
        title: "PRP Hair Treatment",
        subtitle: "Restore your hair naturally with Platelet-Rich Plasma.",
        heroImage: "/s1.webp",
        description: "Platelet-Rich Plasma (PRP) therapy for hair loss is a three-step medical treatment in which a person's blood is drawn, processed, and then injected into the scalp. PRP injections trigger natural hair growth and maintain it by increasing blood supply to the hair follicle and increasing the thickness of the hair shaft.",
        benefits: [
            "Stimulates new hair growth naturally",
            "Increases hair thickness and density",
            "Non-surgical with zero downtime",
            "Uses your body's own natural growth factors"
        ],
        procedureDetails: { duration: "45-60 mins", downtime: "None", painLevel: "Mild" },
    },
    "prp-facial": {
        title: "PRP Facial (Vampire Facial)",
        subtitle: "Rejuvenate your skin with your body's own natural healing power.",
        heroImage: "/s3.jpg",
        description: "Also known as the 'Vampire Facial', this treatment combines microneedling with PRP to stimulate collagen production and cellular renewal. It effectively treats acne scars, surgical scars, hyperpigmentation, uneven skin tone, and fine lines.",
        benefits: [
            "Boosts collagen and elastin production",
            "Improves skin tone and texture",
            "Reduces the appearance of fine lines and scars",
            "Safe for all skin types"
        ],
        procedureDetails: { duration: "60 mins", downtime: "1-2 Days", painLevel: "Mild to Moderate" },
    },
    "skin-rejuvenation": {
        title: "Skin Rejuvenation",
        subtitle: "Advanced therapies to restore your skin's youthful glow.",
        heroImage: "/s2.webp",
        description: "Our skin rejuvenation treatments utilize specialized techniques to refresh your complexion, clear imperfections, and deeply hydrate. By combining PRP with targeted skincare protocols, we help you achieve a flawless, radiant look.",
        benefits: [
            "Deeply hydrates and nourishes skin",
            "Fades hyperpigmentation and sun spots",
            "Tightens loose or sagging skin",
            "Delivers a natural, luminous glow"
        ],
        procedureDetails: { duration: "45 mins", downtime: "Minimal", painLevel: "Low" },
    },
    "hair-regrowth": {
        title: "Hair Regrowth Therapy",
        subtitle: "Comprehensive solutions for sustainable hair regrowth.",
        heroImage: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000&auto=format&fit=crop",
        description: "A multi-faceted approach to combat thinning hair. This therapy pairs PRP with advanced laser treatments and targeted nutritional support to awaken dormant follicles and prolong the active growth phase of your hair cycle.",
        benefits: [
            "Comprehensive, multi-modality approach",
            "Addresses root causes of hair thinning",
            "Strengthens existing hair follicles",
            "Customized treatment plans based on condition"
        ],
        procedureDetails: { duration: "60 mins", downtime: "None", painLevel: "Mild" },
    },
    "anti-aging": {
        title: "Anti-Aging Therapy",
        subtitle: "Turn back the clock with cutting-edge regenerative medicine.",
        heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
        description: "Our anti-aging PRP therapy focuses on the deep cellular repair of aging skin. By delivering concentrated growth factors directly into the dermis, we actively reverse signs of aging, restoring volume and elasticity.",
        benefits: [
            "Reduces deep wrinkles and fine lines",
            "Restores facial volume naturally",
            "Long-lasting cellular repair",
            "Excellent alternative to synthetic fillers"
        ],
        procedureDetails: { duration: "45 mins", downtime: "1 Day", painLevel: "Mild" },
    }
};

export const RESULTS_DATA = [
    {
        title: "Hair Restoration Result",
        before: "/r1.webp",
        after: "/r2.webp",
    },
    {
        title: "Skin Rejuvenation Result",
        before: "/r7.jpg",
        after: "/r8.jpg",
    },
    {
        title: "Acne Scar Treatment Result",
        before: "/r5.webp",
        after: "/r6.webp",
    },
];

export const FAQ_DATA = [
    {
        question: "How many PRP sessions will I need?",
        answer:
            "Most clients achieve optimal results after 3 to 6 sessions depending on their treatment goals, hair condition, and skin type. Our specialists will create a personalized treatment plan during your consultation.",
    },
    {
        question: "Is PRP treatment painful?",
        answer:
            "PRP treatments involve minimal discomfort. A numbing cream is usually applied before the procedure to ensure a comfortable experience throughout the session.",
    },
    {
        question: "How long does recovery take?",
        answer:
            "Recovery time is usually minimal. Most clients return to daily activities within 24 hours, with mild redness or swelling disappearing quickly.",
    },
    {
        question: "When will I see results?",
        answer:
            "Visible improvements can often be seen within a few weeks, with full results gradually developing over several months as collagen and tissue regeneration occur naturally.",
    },
];