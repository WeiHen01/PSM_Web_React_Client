import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: 'ae3fc8cd-0f1e-4568-a8cc-7172abe05ae3', allowLocalhostAsSecureOrigin: true});
  OneSignal.Slidedown.promptPush();
}

