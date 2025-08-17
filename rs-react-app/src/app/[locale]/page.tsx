import {getTranslations} from 'next-intl/server';

import ContentBlock from '../../components/contentBlock/contentBlock';

const t = await getTranslations('HomePage')

export default function HomePage() {
  return (
    <ContentBlock></ContentBlock>
  )
}