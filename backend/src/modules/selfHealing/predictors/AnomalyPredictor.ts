import { prisma } from '../../../shared/infra/database/prismaClient';
import { Logger } from '../../../core/Logger';

export class AnomalyPredictor {
  // Analyzes historical DB data to output a risk assessment
  async evaluateRisk(metricType: string, currentValue: number): Promise<{ riskLevel: string, reason: string }> {
    const historicalData = await prisma.systemMetric.findMany({
      where: { metricName: metricType },
      orderBy: { recordedAt: 'desc' },
      take: 20
    });

    if (historicalData.length < 5) return { riskLevel: 'SAFE', reason: 'Not enough data' };

    const avgHistorical = historicalData.reduce((acc: number, cur: { value: number }) => acc + cur.value, 0) / historicalData.length;
    
    // Spikes > 500% average are considered CRITICAL
    if (currentValue > avgHistorical * 5) {
      Logger.warn(`[Predictor] CRITICAL Anomaly Detected. Curr: ${currentValue}, Avg: ${avgHistorical}`);
      
      await prisma.predictiveInsight.create({
        data: {
          riskLevel: 'HIGH_RISK',
          reason: `${metricType} surging 500% over historical average`,
          confidence: 0.95
        }
      });

      return { riskLevel: 'HIGH_RISK', reason: 'Surge anomaly detected' };
    }

    return { riskLevel: 'SAFE', reason: 'Within normal operational bounds' };
  }
}

export const anomalyPredictor = new AnomalyPredictor();
