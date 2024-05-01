import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { EditArticle } from 'src/sections/editarticle';

// ----------------------------------------------------------------------

export default function EditArticlePage() {
  const { slug } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Article </title>
      </Helmet>

      <EditArticle slug={slug} />
    </>
  );
}
