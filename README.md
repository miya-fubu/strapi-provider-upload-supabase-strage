# strapi-provider-upload-supabase-strage

strapi to supabase file upload provider

## environment variable

- url: supabase API url
- apiKey: supabase API key
- bucket: supabase public bucket name
- bucketPrefix: directry in supabase bucket

bucket and bucketPrefix are not required. Initial values are provided.

## How to use

```
npm i strapi-provider-upload-supabase-strage
```

create `./config/plugins.ts`

```
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase-strage', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        url: env("SUPABASE_URL"),
        apiKey: env("SUPABASE_KEY"),
        bucket: env("SUPABASE_BUCKET"),
        bucketPrefix: env("SUPABASE_BUCKET_PREFIX")
      },
    },
  },
});
```

Add `.env`

```
SUPABASE_URL=<supabase API URL>
SUPABASE_KEY=<supabase API Key>
```

## LICENSE

[MIT LICENSE](https://github.com/miya-fubu/strapi-provider-upload-supabase-strage/blob/main/LICENSE)
