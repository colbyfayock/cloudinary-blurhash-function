# Cloudinary Blurhash Function

Use [BlurHash](https://blurha.sh/) to create beautiful placeholders for your images right in the [Cloudinary](https://cloudinary.com/) pipeline.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/colbyfayock/cloudinary-blurhash-function)

## 🚀 Getting Started

1. [Deploy this repository to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/colbyfayock/cloudinary-blurhash-function)
1. [Generate a signed image URL that references this remote function](#creating-a-signed-url)

## 🧰 How to do X

#### Creating a Signed URL

Some Cloudinary transformations and features require signatures in order to be considered authenticated. You can do this with a variety of the Cloudinary SDKs.

https://cloudinary.com/documentation/control_access_to_media#signed_url_authentication

In node for example, this could look like the following:

```
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '<Your Cloudinary Cloud Name>',
  api_key: '<Your Cloudinary API Key>',
  api_secret: '<Your Cloudinary API Secret>'
});

const image = cloudinary.url('<Your Cloudinary Image Public ID>', {
  sign_url: true,
  secure: true,
  custom_function:{
    function_type: 'remote',
    source: '<Your Netlify Function Endpoint>'
  }
});
```

*Psst. check out scripts/signed-image-blurhash.js for an easy way to generate this locally!*

Read more about [Secure Image Transformations With Signed URLs on the Fly](https://cloudinary.com/blog/on_the_fly_image_manipulations_secured_with_signed_urls).


## 🤔 Caveats

### Netlify Function Timeouts

Netlify Functions by default have a time limit of 10 seconds, so for large media, it may take longer for the processing to occur, leading to timeouts
