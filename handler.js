const aws = require("aws-sdk")
const backup = require("./backup")

require("dotenv").config()

module.exports.runBackup = (event, context, callback) => {

  const secrets = new aws.SecretsManager()
  secrets.getSecretValue({
    SecretId: 'github'
  }, (err, data) => {
    const secret = JSON.parse(data.SecretString)
    const githubAccessToken = secret['personal-access-token']

    const options = {
      githubAccessToken: githubAccessToken,
      s3BucketName: 'cardspal-github-backup',
      s3StorageClass: 'STANDARD',
      mode: 'organisation',
      organisation: 'cardspal'
    }
  
    backup(options).then(() => {
      callback(null, {
        response: "all repos was succesfully backed up"
      })
    }, callback)
  
  })

}
