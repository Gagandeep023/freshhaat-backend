// Imports your configured client and any necessary S3 commands.
const { ListBucketsCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../hooks/s3Client');

// Returns a list of Spaces in your region.
const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("Success", data.Buckets);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

run();
module.exports = run;
