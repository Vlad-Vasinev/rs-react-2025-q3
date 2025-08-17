import '../styles/general/App.scss';

import PageWrapper from '../components/pageWrapper/pageWrapper';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        <PageWrapper>
          {children}
        </PageWrapper>
        <Footer></Footer>
      </body>
    </html>
  );
}