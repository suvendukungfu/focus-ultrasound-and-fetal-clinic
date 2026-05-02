import { redisClient } from '../../../../core/cache/RedisClient';
import { Logger } from '../../../../core/Logger';

const TESTIMONIALS_CACHE_KEY = 'testimonials:active';

const MOCK_REVIEWS = [
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

export class GetTestimonialsUseCase {
  async execute() {
    try {
      const cached = await redisClient.get(TESTIMONIALS_CACHE_KEY);
      
      if (cached) {
        return JSON.parse(cached);
      }

      Logger.warn('[GetTestimonialsUseCase] Cache miss for testimonials. Returning mock array.');
      return MOCK_REVIEWS;
    } catch (error) {
      Logger.error(`[GetTestimonialsUseCase] Error fetching testimonials: ${error}`);
      return MOCK_REVIEWS;
    }
  }
}
