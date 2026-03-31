// Locale wrapper — will be enhanced with next-intl in Sprint 7 (ANI-133)
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <>{children}</>;
}
