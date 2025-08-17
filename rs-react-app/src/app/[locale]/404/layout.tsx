import '../../../styles/general/App.scss';

import ErrorPage from './page';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ErrorPage></ErrorPage>
    </>
  );
}