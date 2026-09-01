import React from 'react'

const GiftCardSkeleton = () => {
    return (
        <div className="flex flex-col justify-between overflow-hidden border border-[#111111]/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] animate-pulse">
            <div>
                <div className="h-56 w-full bg-stone-200" />
                <div className="bg-[#f9f6f1] p-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="h-6 w-24 bg-stone-300 rounded-full" />
                        <div className="h-6 w-12 bg-stone-300 rounded" />
                    </div>
                    <div className="h-4 w-full bg-stone-300 rounded mb-2" />
                    <div className="h-4 w-3/4 bg-stone-300 rounded mb-5" />
                </div>
            </div>
            <div className="bg-[#f9f6f1] px-6 pb-6">
                <div className="h-11 w-full bg-stone-300 rounded-full" />
            </div>
        </div>
    )
}

export default GiftCardSkeleton