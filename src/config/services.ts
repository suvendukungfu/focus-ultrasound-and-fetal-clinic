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

// Image pool — premium ultrasound scan assets generated from the reference guide
const img = {
  wholeAbdomen: '/images/scans/whole-abdomen.webp',
  kubMale:      '/images/scans/kub-male-pelvis.webp',
  femalePelvis: '/images/scans/female-pelvis.webp',
  tvs:          '/images/scans/tvs.webp',
  thyroid:      '/images/scans/thyroid.webp',
  breast:       '/images/scans/bilateral-breast.webp',
  scrotum:      '/images/scans/scrotum-soft-tissues.webp',
  routineObs:   '/images/scans/routine-obs.webp',
  level1:       '/images/scans/level-1-nt-nb.webp',
  level2:       '/images/scans/level-2-anomaly.webp',
  fetalEcho:    '/images/scans/fetal-echo.webp',
  obsDoppler:   '/images/scans/obs-doppler-growth-bpp.webp',
  fibroscan:    '/images/scans/fibroscan-elastography.webp',
  cervical:     '/images/scans/cervical-uterine-doppler.webp',
};

export const services: ServiceItem[] = [
  // ─── 1. Abdominal & Pelvic Scans ─────────────────────────────────────────
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
    image: img.kubMale,
    machine: 'Samsung V7',
    machineType: 'SECONDARY',
    category: 'abdominal',
  },
  {
    icon: Scan,
    nameKey: 'services.femalePelvis.name',
    descKey: 'services.femalePelvis.desc',
    image: img.femalePelvis,
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
    image: img.thyroid,
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
