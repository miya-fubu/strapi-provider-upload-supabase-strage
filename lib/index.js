const { createClient } = require("@supabase/supabase-js");

module.exports = {
  init(providerOptions) {
    // init your provider if necessary
    const supabaseBucket = providerOptions.bucket || "strapi";
    const supabaseBucketPrefix = providerOptions.bucketPrefix
      ? `${providerOptions.bucketPrefix}/`
      : "";
    const supabaseUrl = providerOptions.url;
    const supabaseKey = providerOptions.apiKey;
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    const fileStreamToBlob = (file) => {
      return new Promise((resolve, reject) => {
        const temp = [];
        file.stream
          .on("data", (i) => temp.push(i))
          .once("end", () => {
            resolve(new Blob(temp, { type: file.mime }));
          })
          .once("error", reject);
      });
    };
    const getFilePublicUrl = (file) => {
      const { data } = supabaseClient.storage
        .from(supabaseBucket)
        .getPublicUrl(`${supabaseBucketPrefix}${file.name}`);
      return data.publicUrl;
    };

    return {
      async upload(file) {
        // upload the file in the provider
        // file content is accessible by `file.buffer`
        const { error } = await supabaseClient.storage
          .from(supabaseBucket)
          .upload(
            `${supabaseBucketPrefix}${file.path}`,
            new Blob([file.buffer], { type: file.mime })
          );
        if (error) throw error;
        file.url = getFilePublicUrl(file);
      },
      async uploadStream(file) {
        // upload the file in the provider
        // file content is accessible by `file.stream`
        const blob = await fileStreamToBlob(file);
        let { error } = await supabaseClient.storage
          .from(supabaseBucket)
          .upload(`${supabaseBucketPrefix}${file.name}`, blob);
        if (error) throw error;
        file.url = getFilePublicUrl(file);
      },
      async delete(file) {
        // delete the file in the provider
        const { error } = await supabaseClient.storage
          .from(supabaseBucket)
          .remove([`${supabaseBucketPrefix}${file.name}`]);
        if (error) throw error;
      },
    };
  },
};
