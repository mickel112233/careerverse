
import DashboardClient from './client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <DashboardClient />
    </div>
  );
}
