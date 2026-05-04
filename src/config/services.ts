import { Scan, Stethoscope, Activity, Baby, Heart, LucideIcon } from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  nameKey: string;
  descKey: string;
  image: string;
  machine: string;
  machineType: 'PRIMARY' | 'SECONDARY';
}

export const services: ServiceItem[] = [
  {
    icon: Scan,
    nameKey: 'services.usgAbdomen.name',
    descKey: 'services.usgAbdomen.desc',
    image: 'https://images.unsplash.com/photo-1576091160550-2173bdd99625?auto=format&fit=crop&q=80',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.upperAbdomen.name',
    descKey: 'services.upperAbdomen.desc',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.wholeAbdomen.name',
    descKey: 'services.wholeAbdomen.desc',
    image: 'https://images.unsplash.com/photo-1579154235602-3c2c2abb5b82?auto=format&fit=crop&q=80',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.kub.name',
    descKey: 'services.kub.desc',
    image: '/images/kub-pelvis-scan.png',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.tvs.name',
    descKey: 'services.tvs.desc',
    image: '/images/early-pregnancy.webp',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Stethoscope,
    nameKey: 'services.smallParts.name',
    descKey: 'services.smallParts.desc',
    image: '/images/small-parts-ultrasound.webp',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Activity,
    nameKey: 'services.breast.name',
    descKey: 'services.breast.desc',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Activity,
    nameKey: 'services.fibroscan.name',
    descKey: 'services.fibroscan.desc',
    image: '/images/liver-fibroscan.webp',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Baby,
    nameKey: 'services.routineObs.name',
    descKey: 'services.routineObs.desc',
    image: '/images/early-pregnancy.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Baby,
    nameKey: 'services.level1.name',
    descKey: 'services.level1.desc',
    image: '/images/nt-scan.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Activity,
    nameKey: 'services.cervical.name',
    descKey: 'services.cervical.desc',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Baby,
    nameKey: 'services.level2.name',
    descKey: 'services.level2.desc',
    image: '/images/anomaly-scan.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Heart,
    nameKey: 'services.fetalEcho.name',
    descKey: 'services.fetalEcho.desc',
    image: '/images/fetal-echo.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Activity,
    nameKey: 'services.obsDoppler.name',
    descKey: 'services.obsDoppler.desc',
    image: '/images/doppler-study.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  }
];

