import { Helmet } from 'react-helmet-async';

import { NewArticle } from 'src/sections/article';

// ----------------------------------------------------------------------

export default function NewArticlePage() {
  return (
    <>
      <Helmet>
        <title> New Article </title>
      </Helmet>

      <NewArticle />
    </>
  );
}
