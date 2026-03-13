import fs from 'fs';
import path from 'path';

export interface Service {
  title: string;
  slug: string;
  order: number;
  summary: string;
}

export function getServices(): Service[] {
  const dir = path.join(process.cwd(), 'content/services');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const services = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(raw) as Service;
  });
  return services.sort((a, b) => a.order - b.order);
}

export function getService(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}
