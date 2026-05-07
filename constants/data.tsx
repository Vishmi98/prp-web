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
        heroImage: "/s1.webp",
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
        heroImage: "/s3.jpg",
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

export const STORIES = [
    {
        name: "Sarah Jenkins",
        treatment: "Skin Rejuvenation",
        text: "After just three sessions of PRP, my skin feels completely renewed. The acne scars have faded significantly, and I have a natural glow that I haven't seen in years. The team was incredibly professional and made the whole experience luxurious.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "Michael Chen",
        treatment: "Hair Restoration",
        text: "I was skeptical at first, but the results speak for themselves. My hairline has visibly thickened, and the shedding has completely stopped. This is the most confident I've felt in a decade. Highly recommend their targeted PRP therapy.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "Elena Rodriguez",
        treatment: "Under-Eye Treatment",
        text: "The dark circles and hollowness under my eyes made me look constantly exhausted. PRP therapy was a game-changer. It's subtle, natural, and I finally look as rested as I feel. A truly premium service from start to finish.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "David Thompson",
        treatment: "Hair Restoration",
        text: "The thinning at my crown was really starting to affect my confidence. After 4 sessions of PRP, my barber was the first to notice the new growth. It's thick, healthy, and most importantly, it's my own hair.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "Aisha Patel",
        treatment: "Skin Rejuvenation",
        text: "I wanted a non-surgical option to improve my skin texture and fine lines. The 'Vampire Facial' here exceeded my expectations. My skin is noticeably firmer and the pigmentation has almost disappeared. Truly an investment in myself.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    },
];