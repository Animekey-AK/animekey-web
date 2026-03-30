// Locale wrapper — will be enhanced with next-intl in Sprint 7 (ANI-133)
export default function LocaleLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return <>{children}</>;
}
