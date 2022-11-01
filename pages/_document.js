import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords"
            content="wrappixel, admin dashboard, html css dashboard, web dashboard, bootstrap 5 admin, bootstrap 5, css3 dashboard, bootstrap 5 dashboard, admin pro admin bootstrap 5 dashboard, frontend, responsive bootstrap 5 admin template, material design, material dashboard bootstrap 5 dashboard template" />
        <meta name="description" content="Admin Pro is powerful and clean admin dashboard template" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Managebeds</title>
        
        <link rel="canonical" href="https://www.wrappixel.com/templates/adminpro/" />

        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon.png" />
        <link rel="stylesheet" href="/assets/libs/apexcharts/dist/apexcharts.css" />
        <link href="/assets/libs/jvectormap/jquery-jvectormap.css" rel="stylesheet" />


         {/* Data table Plugin */}
         <link href="/assets/extra-libs/datatables.net-bs4/css/dataTables.bootstrap4.css"rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/assets/extra-libs/datatables.net-bs4/css/responsive.dataTables.min.css"/>
        {/* End */}

        {/* bootstrap switch button */}
        <link rel="stylesheet" type="text/css" href="/assets/libs/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css"/>

        <link href="/dist/css/style.min.css" rel="stylesheet" />

        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />

        {/* custom css */}
        <link href="/dist/css/custom.css" rel="stylesheet" />
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />

        </Head>
        <body>
          <Main />
          <NextScript />

        <script src="/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/libs/jquery/dist/jquery.min.js"></script>


        <script src="/dist/js/app.min.js"></script>
        <script src="/dist/js/app.init.js"></script>
        <script src="/dist/js/app-style-switcher.js"></script>

        <script src="/assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js"></script>
        <script src="/assets/extra-libs/sparkline/sparkline.js"></script>

        <script src="/dist/js/waves.js"></script>

        <script src="/dist/js/sidebarmenu.js"></script>

        <script src="/dist/js/feather.min.js"></script>


        <script src="/dist/js/custom.min.js"></script>

        {/* ContactList Page plugin */}
        <script src="/dist/js/pages/contact/contact.js"></script>

        {/* Datatable Plugin */}
        <script src="/assets/extra-libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="/assets/extra-libs/datatables.net-bs4/js/dataTables.responsive.min.js"></script>
        <script src="/dist/js/pages/datatable/datatable-basic.init.js"></script>

        {/* bootstrap switch button */}
        <script src="/assets/libs/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
      

        </body>
      </Html>
    )
  }
}

export default MyDocument
