import { SettingsPage } from '@/src/widgets/settingsPage/SettingaPage'

export default function Settings({ params }: { params: { tab: string; userId: string } }) {
  return <SettingsPage userId={params.userId} />
}
