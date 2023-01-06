// import { S3 } from "@aws-sdk/client-s3";
const { S3 } = require('@aws-sdk/client-s3');

const s3Client = new S3({
    forcePathStyle: false, 
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: "DO007F4DQPEBZ36EHX76",
      secretAccessKey: "lVAGQ6ZHJ4Gw0pQy+1yso1OgujDX3CVpRcsoYUEIb/4"
    }
});

// export { s3Client };
module.exports = { s3Client };
// import AWS from 'aws-sdk';

// /**
//  * Digital Ocean Spaces Connection
//  */

// const spacesEndpoint = new AWS.Endpoint('https://sgp1.digitaloceanspaces.com');
// const s3Client = new AWS.S3({
//       endpoint: spacesEndpoint,
//       region: "us-east-1",
//       accessKeyId:"DO007F4DQPEBZ36EHX76",
//       secretAccessKey: "lVAGQ6ZHJ4Gw0pQy+1yso1OgujDX3CVpRcsoYUEIb/4"
//     });
// export default s3Client;
