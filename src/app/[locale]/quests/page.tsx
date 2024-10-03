'use client';

import { useTokenStore } from '@/states/token-store';

export default function DashboardPage() {
  const accessToken = useTokenStore((state) => state.accessToken);

  return <div>{accessToken}</div>;
}
