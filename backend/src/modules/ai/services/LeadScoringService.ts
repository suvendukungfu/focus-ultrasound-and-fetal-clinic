import { Logger } from '../../../core/Logger';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { EventBus } from '../../../events/EventBus';
import { IKernelService } from '../../../kernel/ServiceRegistry';
import { Lead } from '@prisma/client';

export class LeadScoringService implements IKernelService {
  name = 'LeadScoringService';

  async init() {
    Logger.info(`[${this.name}] Initializing AI Lead Scoring Engine...`);
  }

  async start() {
    Logger.info(`[${this.name}] Listening for lead.created events...`);
    
    EventBus.on('lead.created', async (lead: Lead) => {
      await this.scoreLead(lead);
    });
  }

  async stop() {
    Logger.info(`[${this.name}] Shutting down Lead Scoring Engine...`);
  }

  async health() {
    return { status: 'ONLINE' as const };
  }

  private async scoreLead(lead: Lead) {
    try {
      let score = 0;
      
      // 1. FAST HEURISTIC SCORING (0-40 points)
      if (lead.phone && lead.phone.length > 5) score += 15;
      if (lead.email) score += 10;
      
      const msg = lead.message?.toLowerCase() || '';
      if (msg.length > 20) score += 15;

      // 2. AI INTENT / CLINICAL URGENCY SCORING (0-60 points)
      // Simulating AI Orchestrator evaluation through NLP keywords for speed
      let aiPoints = 0;
      let urgencyReason = 'General Inquiry';

      const criticalKeywords = ['bleeding', 'pain', 'urgent', 'emergency', 'fetal echo', 'anomaly'];
      const highKeywords = ['anomaly scan', '3d', '4d', 'level 2', 'level ii'];
      const mediumKeywords = ['routine', 'checkup', 'dating', 'nt scan', 'early'];

      if (criticalKeywords.some(kw => msg.includes(kw))) {
        aiPoints = 60;
        urgencyReason = 'Critical Medical Keyword Detected';
      } else if (highKeywords.some(kw => msg.includes(kw))) {
        aiPoints = 40;
        urgencyReason = 'High Priority Scan Inquiry';
      } else if (mediumKeywords.some(kw => msg.includes(kw))) {
        aiPoints = 20;
        urgencyReason = 'Standard Scan Inquiry';
      } else if (msg.length > 0) {
        aiPoints = 10;
      }

      score += aiPoints;
      
      // Cap at 100
      score = Math.min(score, 100);

      // 3. PERSIST SCORE
      await prisma.lead.update({
        where: { id: lead.id },
        data: { 
          priorityScore: score,
          adminNotes: `AI Lead Score: ${score}/100\nReason: ${urgencyReason}`
        }
      });

      Logger.info(`[${this.name}] Successfully scored Lead ${lead.id} with score ${score}.`);
      
      // Dispatch analytics event
      EventBus.emit('ai.completed', { 
        jobId: `score-${lead.id}`, 
        provider: 'Heuristic+LocalNLP', 
        status: 'SUCCESS' 
      });

    } catch (err) {
      Logger.error(`[${this.name}] Failed to score Lead ${lead.id}: ${err}`);
      EventBus.emit('ai.failed', { jobId: `score-${lead.id}`, status: 'FAIL' });
    }
  }
}

export const leadScoringService = new LeadScoringService();
