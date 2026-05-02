import { useState, useEffect } from 'react';

export interface Testimonial {
  id: string;
  name: string;
  nameHi?: string;
  rating: number;
  comment: string;
  text?: string;
  textHi?: string;
  source?: 'manual' | 'google';
  createdAt?: string;
}

export const STATIC_REVIEWS: Testimonial[] = [
  {
    id: '1',
    name: 'Priyanka Mehta', nameHi: 'प्रियंका मेहता', rating: 5,
    comment: 'Excellent experience! The doctors explained everything clearly during my pregnancy ultrasound. The staff is very caring and professional. Highly recommend!',
    textHi: 'उत्कृष्ट अनुभव! डॉक्टरों ने मेरे प्रेगनेंसी अल्ट्रासाउंड के दौरान सब कुछ स्पष्ट रूप से समझाया। स्टाफ बहुत देखभाल करने वाला और पेशेवर है।',
    source: 'google'
  },
  {
    id: '2',
    name: 'Anjali Sharma', nameHi: 'अंजलि शर्मा', rating: 5,
    comment: 'The 3D scan of my baby was amazing. Clean clinic and very short wait time.',
    textHi: 'मेरे बच्चे का 3डी स्कैन अद्भुत था। साफ-सुथरा क्लिनिक और बहुत कम प्रतीक्षा समय।',
    source: 'google'
  },
  {
    id: '3',
    name: 'Ritu Singh', nameHi: 'रितु सिंह', rating: 5,
    comment: 'Best fetal medicine clinic in Noida Extension. Very thorough anomaly scan.',
    textHi: 'नोएडा एक्सटेंशन में सबसे अच्छा फीटल मेडिसिन क्लिनिक। बहुत विस्तृत एनोमली स्कैन।',
    source: 'google'
  }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews/testimonials`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};
