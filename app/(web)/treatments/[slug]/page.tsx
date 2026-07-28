import React from 'react';
import { notFound } from 'next/navigation';

import TreatmentOverview from '@/modules/treatments/ui/TreatmentOverview';
import { fetchTreatment } from '@/lib/fetchData';


export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) {
        console.log("Treatment is missing from slug params");
        return notFound();
    }

    const treatmentData = await fetchTreatment(slug);

    if (!treatmentData) {
        return notFound();
    }

    return (
        <main>
            <TreatmentOverview treatment={treatmentData} />
        </main>
    );
}
