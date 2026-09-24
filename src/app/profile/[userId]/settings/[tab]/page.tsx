import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { SettingsPage } from '@/src/widgets/settingsPage/SettingaPage'

export default function SettingsTabPage({ params }: { params: { tab: string; userId: string } }) {
  return (
    <RequireAuth>
      <SettingsPage userId={params.userId} />
    </RequireAuth>
  )
}
