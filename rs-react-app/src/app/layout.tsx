import '../styles/general/App.scss';

import PageWrapper from '../components/pageWrapper/pageWrapper';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{locale: string}> }) {
  
  const {locale} = await params
  
  return (
    <html lang={locale}>
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