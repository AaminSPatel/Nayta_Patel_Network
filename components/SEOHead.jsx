import Head from 'next/head';
import PropTypes from 'prop-types';

const SEOHead = ({
  title = 'Default Title',
  description = 'Default description for the page',
  keywords = 'default,keywords',
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  schemaMarkup,
  favicon = '/favicon.ico',
  themeColor = '#ffffff',
  viewport = 'width=device-width, initial-scale=1',
  charset = 'utf-8',
  noIndex = false,
  noFollow = false,
  additionalMetaTags = [],
  additionalLinkTags = [],
  brandName = 'Default Brand',
  locale = 'en_US',
  alternateLocales = [],
}) => {
  // Combine default and custom keywords
  const allKeywords = ['default', ...keywords.split(','), brandName.toLowerCase()].join(', ');

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{`${title} | ${brandName}`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="viewport" content={viewport} />
      <meta charSet={charset} />
      <meta name="theme-color" content={themeColor} />
      <meta name="application-name" content={brandName} />
      <meta name="apple-mobile-web-app-title" content={brandName} />
      <meta name="author" content={brandName} />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || '/default-og-image.jpg'} />
      <meta property="og:url" content={ogUrl || canonicalUrl || ''} />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:locale" content={locale} />
      
      {/* Alternate locales */}
      {alternateLocales.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || '/default-twitter-image.jpg'} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Favicon */}
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Additional link tags */}
      {additionalLinkTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}

      {/* Additional meta tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}

      {/* Schema.org markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Head>
  );
};

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterSite: PropTypes.string,
  twitterCreator: PropTypes.string,
  schemaMarkup: PropTypes.object,
  favicon: PropTypes.string,
  themeColor: PropTypes.string,
  viewport: PropTypes.string,
  charset: PropTypes.string,
  noIndex: PropTypes.bool,
  noFollow: PropTypes.bool,
  additionalMetaTags: PropTypes.arrayOf(PropTypes.object),
  additionalLinkTags: PropTypes.arrayOf(PropTypes.object),
  brandName: PropTypes.string,
  locale: PropTypes.string,
  alternateLocales: PropTypes.arrayOf(PropTypes.string),
};

export default SEOHead;