import { Scan, Stethoscope, Activity, Baby, Heart, LucideIcon, Waves } from 'lucide-react';

export type ServiceCategory =
  | 'abdominal'
  | 'smallParts'
  | 'obstetric'
  | 'advanced';

export interface ServiceItem {
  icon: LucideIcon;
  nameKey: string;
  descKey: string;
  image: string;
  machine: string;
  machineType: 'PRIMARY' | 'SECONDARY';
  category: ServiceCategory;
}

export const categoryMeta: Record<ServiceCategory, { label: string; color: string; order: number }> = {
  abdominal: { label: 'Abdominal & Pelvic Scans', color: '#3B82F6', order: 1 },
  smallParts: { label: 'Small Parts & Breast Scans', color: '#8B5CF6', order: 2 },
  obstetric:  { label: 'Obstetric Scans',           color: '#EC4899', order: 3 },
  advanced:   { label: 'Advanced Scans',             color: '#F59E0B', order: 4 },
};

// Image pool — all verified non-zero local .webp files
const img = {
  abdomen:      '/images/growth-scan.webp',        // General abdominal scan feel
  upperAbdomen: '/images/liver-fibroscan.webp',    // Upper abdomen / liver context
  wholeAbdomen: '/images/anomaly-scan.webp',       // Comprehensive scan feel
  kub:          '/images/doppler-study.webp',      // KUB / pelvic region study
  tvs:          '/images/early-pregnancy.webp',    // Internal gynae scan
  smallParts:   '/images/small-parts-ultrasound.webp', // Thyroid / neck — exact match
  breast:       '/images/prenatal-care.webp',      // Breast / soft tissue
  scrotum:      '/images/ultrasound-machine.webp', // Soft tissue general machine shot
  routineObs:   '/images/pregnancy-hero.webp',     // Standard pregnancy scan
  level1:       '/images/nt-scan.webp',            // NT/NB first-trimester — exact match
  level2:       '/images/anomaly-scan.webp',       // TIFFA Level 2 — exact match
  fetalEcho:    '/images/fetal-echo.webp',         // Fetal echo — exact match
  obsDoppler:   '/images/doppler-study.webp',      // Obstetric Doppler — exact match
  fibroscan:    '/images/liver-fibroscan.webp',    // Fibroscan — exact match
  cervical:     '/images/growth-scan.webp',        // Cervical / uterine doppler
};

export const services: ServiceItem[] = [
  // ─── 1. Abdominal & Pelvic Scans ─────────────────────────────────────────
  {
    icon: Scan,
    nameKey: 'services.usgAbdomen.name',
    descKey: 'services.usgAbdomen.desc',
    image: img.abdomen,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'abdominal',
  },
  {
    icon: Scan,
    nameKey: 'services.upperAbdomen.name',
    descKey: 'services.upperAbdomen.desc',
    image: img.upperAbdomen,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'abdominal',
  },
  {
    icon: Scan,
    nameKey: 'services.wholeAbdomen.name',
    descKey: 'services.wholeAbdomen.desc',
    image: img.wholeAbdomen,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'abdominal',
  },
  {
    icon: Scan,
    nameKey: 'services.kub.name',
    descKey: 'services.kub.desc',
    image: img.kub,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'abdominal',
  },
  {
    icon: Scan,
    nameKey: 'services.tvs.name',
    descKey: 'services.tvs.desc',
    image: img.tvs,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'abdominal',
  },

  // ─── 2. Small Parts & Breast Scans ───────────────────────────────────────
  {
    icon: Stethoscope,
    nameKey: 'services.smallParts.name',
    descKey: 'services.smallParts.desc',
    image: img.smallParts,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'smallParts',
  },
  {
    icon: Activity,
    nameKey: 'services.breast.name',
    descKey: 'services.breast.desc',
    image: img.breast,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'smallParts',
  },
  {
    icon: Waves,
    nameKey: 'services.scrotum.name',
    descKey: 'services.scrotum.desc',
    image: img.scrotum,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'smallParts',
  },

  // ─── 3. Obstetric Scans ───────────────────────────────────────────────────
  {
    icon: Baby,
    nameKey: 'services.routineObs.name',
    descKey: 'services.routineObs.desc',
    image: img.routineObs,
    machine: 'GE Voluson',
    machineType: 'PRIMARY',
    category: 'obstetric',
  },
  {
    icon: Baby,
    nameKey: 'services.level1.name',
    descKey: 'services.level1.desc',
    image: img.level1,
    machine: 'GE Voluson',
    machineType: 'PRIMARY',
    category: 'obstetric',
  },
  {
    icon: Baby,
    nameKey: 'services.level2.name',
    descKey: 'services.level2.desc',
    image: img.level2,
    machine: 'GE Voluson',
    machineType: 'PRIMARY',
    category: 'obstetric',
  },
  {
    icon: Heart,
    nameKey: 'services.fetalEcho.name',
    descKey: 'services.fetalEcho.desc',
    image: img.fetalEcho,
    machine: 'GE Voluson',
    machineType: 'PRIMARY',
    category: 'obstetric',
  },
  {
    icon: Activity,
    nameKey: 'services.obsDoppler.name',
    descKey: 'services.obsDoppler.desc',
    image: img.obsDoppler,
    machine: 'GE Voluson',
    machineType: 'PRIMARY',
    category: 'obstetric',
  },

  // ─── 4. Advanced Scans ────────────────────────────────────────────────────
  {
    icon: Activity,
    nameKey: 'services.fibroscan.name',
    descKey: 'services.fibroscan.desc',
    image: img.fibroscan,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'advanced',
  },
  {
    icon: Activity,
    nameKey: 'services.cervical.name',
    descKey: 'services.cervical.desc',
    image: img.cervical,
    machine: 'GE Voluson',
    machineType: 'PRIMARY',
    category: 'advanced',
  },
];
