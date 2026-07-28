import React from 'react';
import { notFound } from 'next/navigation';

import TreatmentOverview from '@/modules/treatments/ui/TreatmentOverview';
import { fetchTreatment } from '@/lib/fetchData';


export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) {
        console.log("Product is missing from slug params");
        return notFound();
    }

    const treatmentData = await fetchTreatment(slug);

    console.log("Treatment data", treatmentData);

    if (!treatmentData) {
        return notFound();
    }

    return (
        <main>
            {/* <TreatmentHero 
                title={treatmentData.title}
                subtitle={treatmentData.subtitle}
                heroImage={treatmentData.heroImage}
            /> */}
            <TreatmentOverview treatment={treatmentData} />
        </main>
    );
}
