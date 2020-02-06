MongoDB Charts Embedding Example - Verified Signature Auth in PHP
=================================================================

Background
----------
MongoDB Charts allows you to create visualizations of your MongoDB data using a simple web interface.
You can view the visualizations within the Charts UI, or you can use the Embedding feature to render
the charts in an external web application. When you embed a chart, you can choose whether you want
it to be Unauthenticated (meaning anyone who has the embed code can view the chart), or to use
"Verified Signature" authentication (which checks the integrity of a signature in the URL before the
chart will render).

For the "Unauthenticated" option, you can copy the provided snippet and include it in any web site;
no extra steps are required.

The Verified Signature option requires a few more steps to implement but it is
more secure — your app will generate the signature on the server side after first authenticating
and authorizing the user, and the URL will stop working after a specified time period.

This project contains a simple sample app showing how to implement "Verified Signature" authentication
using PHP. Samples for other languages and platforms are provided elsewhere in this
repository.

Preparing your Chart for Embedding
----------------------------------

1. Log onto MongoDB Charts

2. If you haven't done so already, create a chart on any dashboard that you would like to embed.

3. Go to the Data Sources tab, find the data source that you are using on the chart, and choose
   *Embedding Options* from the *...* menu. Make sure that embedding is enabled for this data source,
   using either authentication mode.

4. Find the chart you want to embed, click the *...* menu and select Embed Chart.

5. Select the *Verified Signature* tab and turn on embedding.

6. Copy the IFRAME embed code from this dialog and keep it handy

7. Get the Embedding Signing Key from the Admin Settings page. If you are not a Charts Admin you
   will need to request this info from someone with this role.

Running this Sample
-------------------

1. Tested in PHP 7.x

2. php-mod-hash module is required

3. Open the *index.php* file (server-side code), and replace the
    `~REPLACE~` placeholders with the appropriate values:
    - `~REPLACE~CHARTS_EMBEDDING_BASE_URL` with the base URL of your charts instance, e.g.
       https://charts.mongodb.com/charts-foo-abcde
    - `~REPLACE~EMBEDDING_SIGNING_KEY` with the Embedding Signing key you obtained above
    - `~REPLACE~CHART_ID` with the value of the *id* parameter from the IFRAME snippet you copied from Charts

4. Optionally, set the following variables in the same file:
    - `$filter` if you want to apply an additional filter to the chart (e.g. "`{ foo: { $gt: 10 }}`")
    - `$autoRefreshSeconds` if you want the chart to automatically refresh at a predetermined interval. Note
          that the entire chart must be reloaded with a new token before the validity period expires. 

5. Optionally, set the following variables in *src/MongoDB/Charts.php*:
    - `$expiry` to configure the period of validity for the token (if not set, the token lasts one day)

6. Run index.php from a PHP web service, for example: `php -S localhost:8000 -t ./` ran from this php examples directory
