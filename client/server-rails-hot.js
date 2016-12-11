/* eslint no-var: 0, no-console: 0 */

// This file is used by the npm script:
// "hot-assets": "babel-node server-rails-hot.js"
//
// This is what creates the hot assets so that you can edit assets, JavaScript and Sass,
// referenced in your webpack config, and the page updated without you needing to reload
// the page.
//
// Steps
// 1. Update your application.html.erb or equivalent to use the env_javascript_include_tag
//    and env_stylesheet_link_tag helpers.
// 2. Make sure you have a hot-assets target in your client/package.json
// 3. Start up `forman start -f Procfile.hot` to start both Rails and the hot reload server.

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.client.rails.hot.config';

const hotRailsPort = process.env.HOT_RAILS_PORT || 3500;

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
    contentBase: `localhost:${hotRailsPort}`,
    publicPath: webpackConfig.output.publicPath,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
        colors: true,
        hash: false,
        version: false,
        chunks: false,
        children: false,
    }, watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
});

devServer.listen(hotRailsPort, '0.0.0.0', err => {
    if (err) console.error(err);
    console.log(
        `=> ?  Webpack development server is running on port ${hotRailsPort}`
    );
});