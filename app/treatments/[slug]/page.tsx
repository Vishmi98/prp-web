import React from 'react';
import { notFound } from 'next/navigation';
import { TREATMENT_DETAILS } from '@/constants/data';
import TreatmentHero from '@/modules/treatments/ui/TreatmentHero';
import TreatmentOverview from '@/modules/treatments/ui/TreatmentOverview';

export default async function TreatmentPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = params.slug;

    const treatmentData = TREATMENT_DETAILS[slug];

    if (!treatmentData) {
        notFound();
    }

    return (
        <main>
            {/* <TreatmentHero 
                title={treatmentData.title}
                subtitle={treatmentData.subtitle}
                heroImage={treatmentData.heroImage}
            /> */}
            <TreatmentOverview
                title={treatmentData.title}
                description={treatmentData.description}
                benefits={treatmentData.benefits}
                heroImage={treatmentData.heroImage}
                procedureDetails={treatmentData.procedureDetails}
            />
        </main>
    );
}
