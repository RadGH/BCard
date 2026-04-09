import type { PersonData } from '../types/card';
import { uuid } from './uuid';

// Example QR code shown on demo profiles (has "EXAMPLE" watermark)
export const EXAMPLE_QR_CODE = {
  type: 'image' as const,
  imageDataUrl: '/images/qr-example.png',
  fgColor: '#000000',
  bgColor: '#ffffff',
};

const firstNames = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Jamie', 'Quinn', 'Avery', 'Blake', 'Cameron', 'Dakota', 'Emery', 'Finley', 'Harper', 'Kai', 'Logan', 'Marley', 'Nico', 'Parker', 'Reese', 'Sage', 'Sydney', 'Tatum'];
const lastNames = ['Anderson', 'Brooks', 'Chen', 'Davis', 'Evans', 'Foster', 'Garcia', 'Hayes', 'Ibrahim', 'Jackson', 'Kim', 'Lopez', 'Mitchell', 'Nakamura', 'Owens', 'Patel', 'Quinn', 'Rivera', 'Singh', 'Thompson', 'Upton', 'Vasquez', 'Williams', 'Yang'];
const titles = ['CEO', 'CTO', 'Creative Director', 'Marketing Manager', 'Software Engineer', 'Product Designer', 'Data Scientist', 'Operations Manager', 'Sales Director', 'Consultant', 'Architect', 'Photographer', 'Attorney', 'Financial Advisor', 'Project Manager'];
const companies = ['Apex Dynamics', 'Bright Path Co.', 'Core Systems', 'Delta Group', 'Elevate Studios', 'Fusion Labs', 'Greenleaf Inc.', 'Horizon Works', 'Insight Partners', 'Jetstream Corp.', 'Keystone LLC', 'Luminary Tech', 'Mosaic Media', 'NovaStar', 'Pinnacle Solutions'];
const taglines = ['Innovation starts here', 'Building tomorrow today', 'Your vision, our expertise', 'Excellence in every detail', 'Creating meaningful connections', 'Design with purpose', 'Trusted solutions', 'Where ideas take flight', ''];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randPhone(): string {
  const area = Math.floor(200 + Math.random() * 800);
  const a = Math.floor(100 + Math.random() * 900);
  const b = Math.floor(1000 + Math.random() * 9000);
  return `(${area}) ${a}-${b}`;
}

function generatePlaceholderPhoto(): string {
  const hue = Math.floor(Math.random() * 360);
  const initials = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="hsl(${hue},40%,60%)"/><circle cx="100" cy="75" r="35" fill="hsl(${hue},30%,85%)"/><ellipse cx="100" cy="170" rx="55" ry="50" fill="hsl(${hue},30%,85%)"/><text x="100" y="88" text-anchor="middle" font-size="32" font-family="sans-serif" fill="hsl(${hue},40%,40%)" font-weight="bold">${initials}</text></svg>`)}`;
}

function generatePlaceholderLogo(): string {
  const hue = Math.floor(Math.random() * 360);
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="none"/><rect x="10" y="20" width="60" height="60" rx="12" fill="hsl(${hue},50%,50%)"/><rect x="80" y="30" width="110" height="8" rx="4" fill="hsl(${hue},30%,35%)"/><rect x="80" y="48" width="80" height="6" rx="3" fill="hsl(${hue},20%,60%)"/><rect x="80" y="62" width="95" height="6" rx="3" fill="hsl(${hue},20%,60%)"/></svg>`)}`;
}

export function generateDemoPerson(): PersonData {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const company = pick(companies);

  return {
    id: uuid(),
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    title: pick(titles),
    company,
    credentials: Math.random() > 0.7 ? pick(['MBA', 'CPA', 'PhD', 'PE', 'MD']) : undefined,
    tagline: pick(taglines) || undefined,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    phone: randPhone(),
    website: `www.${company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    social: {
      ...(Math.random() > 0.3 && { linkedin: `${firstName.toLowerCase()}${lastName.toLowerCase()}` }),
      ...(Math.random() > 0.6 && { github: `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}` }),
      ...(Math.random() > 0.5 && { twitter: `${firstName.toLowerCase()}_${lastName.toLowerCase()[0]}` }),
      ...(Math.random() > 0.6 && { instagram: `${firstName.toLowerCase()}.${lastName.toLowerCase()}` }),
    },
    portrait: generatePlaceholderPhoto(),
    logo: generatePlaceholderLogo(),
    qrCode: EXAMPLE_QR_CODE,
  };
}
