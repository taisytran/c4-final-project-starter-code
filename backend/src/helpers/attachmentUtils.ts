import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO(done): Implement the fileStogare logic
export async function getPresignedAttachmentUrl(todoId: string): promise<string> {
  const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION, 300);
  const XAWS = AWSXRay.captureAWS(AWS)
  const s3 = new XAWS.S3({ signatureVersion: 'v4' });
  const signedUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  });

  return signedUrl
}
