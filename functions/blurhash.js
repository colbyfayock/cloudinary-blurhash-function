const MultipartParser = require('lambda-multipart-parser');
const { encode, decode } = require('blurhash');
const sharp = require('sharp');

exports.handler = async (event, context, callback) => {
  const formdata = await MultipartParser.parse(event);

  try {
    const { data, info } = await sharp(formdata.files[0].content)
      .ensureAlpha()
      .raw()
      .toBuffer({
        resolveWithObject: true
      });

    const encoded = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
    const decoded = decode(encoded, info.width, info.height);

    const result = await sharp(Buffer.from(decoded), {
      raw: {
        channels: 4,
        width: info.width,
        height: info.height,
      },
    })
      .jpeg({
        overshootDeringing: true,
        quality: 40,
      })
      .toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': result.length
      },
      isBase64Encoded: true,
      body: result.toString('base64')
    }
  } catch (e) {
    console.log(`Failed to manipulate image: ${e}`)
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: `Error manipulating image: ${e}`
      })
    }
  }
};