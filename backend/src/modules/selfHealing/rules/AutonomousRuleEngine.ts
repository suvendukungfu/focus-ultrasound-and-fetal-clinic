import { anomalyPredictor } from '../predictors/AnomalyPredictor';
import { recoveryEngine } from '../recovery/RecoveryEngine';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { Logger } from '../../../core/Logger';

export class AutonomousRuleEngine {
  private lastActionTime: Record<string, number> = {};
  private cooldownMs = 60000; // 1 minute cooldown per action type

  async evaluateQueueRule(currentLoad: number) {
    const prediction = await anomalyPredictor.evaluateRisk('queueLoad', currentLoad);

    if (prediction.riskLevel === 'HIGH_RISK') {
      
      // Prevent loop execution
      if (this.isOnCooldown('scaleWorkers')) {
        Logger.info(`[RuleEngine] scaleWorkers is on cooldown. Skipping.`);
        return;
      }

      Logger.warn(`[RuleEngine] HIGH RISK queue pattern detected. Triggering auto-recovery.`);
      
      await prisma.systemAlert.create({
        data: {
          severity: 'CRITICAL',
          triggerSource: 'AutonomousRuleEngine',
          message: `Queue load spike detected. AI deploying scaleWorkers protocol. Reason: ${prediction.reason}`
        }
      });

      // Trigger actual recovery workflow
      await recoveryEngine.scaleWorkers();
      this.setCooldown('scaleWorkers');
    }
  }

  private isOnCooldown(action: string): boolean {
    const lastTime = this.lastActionTime[action] || 0;
    return (Date.now() - lastTime) < this.cooldownMs;
  }

  private setCooldown(action: string) {
    this.lastActionTime[action] = Date.now();
  }
}

export const ruleEngine = new AutonomousRuleEngine();
