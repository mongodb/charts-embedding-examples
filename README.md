# Deprecated

This repository contains samples for Verified Signature embedding which is now deprecated. For most new scenarios you should use the new Charts Embedding SDK. Examples on using the SDK can be found in this repo, [here](https://github.com/mongodb-js/charts-embed-sdk)

## MongoDB Charts Embedding Examples

[MongoDB Charts](http://mongodb.com/charts) allows you to create visualizations of your MongoDB data using a simple web interface.
You can view the visualizations within the Charts UI, or you can use the Embedding feature to render the charts in an external web
application. When you embed a chart, you can choose whether you want it to be Unauthenticated (meaning anyone who has the embed code
can view the chart), or to use "Verified Signature" authentication (which checks the integrity of a signature in the URL before the chart will render).

For the "Unauthenticated" option, you can copy the provided snippet and include it in any web site; no extra steps are required.

The Verified Signature option requires a few more steps to implement but it is more secure — your app will generate the signature on the server side after
first authenticating and authorizing the user, and the URL will stop working after a specified time period.

This repo contains several versions of a simple sample app showing how to implement "Verified Signature" authentication. Each sample shows a different
server-side language or platform. The languages currently included in this repository are:

- [Node](node)
- [C# (.NET core)](c-sharp)
- [Java](java)
- [Python 3](python)
- [PHP](php)
- [MongoDB Stitch](stitch)

If you are using a server-side platform that we do not currently have a sample for, you will still be able to implement Verified Signature authentication
as long as your language supports hashing of strings using the HMAC algorithm. You can use the included samples to understand the inputs to the hash
function and how to constuct the required IFRAME URL.

For further information on using MongoDB Charts and the Embedding capabilities, please see the [Charts documentation](https://docs.mongodb.com/charts).
