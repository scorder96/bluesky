export default async function jsonBuilder(
  postText: string,
  webEmbed: { title: string; description: string },
  imageJson: any
) {
  const splittedPost = postText.split(/\s/);
  const urlRegex =
    /^(https?:\/\/|www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([/?#][^\s]*)?$/i;
  const now = new Date().toISOString().replace(/\+00:00$/, "Z");
  var defaultJson: any = {
    $type: "app.bsky.feed.post",
    text: postText,
    createdAt: now,
  };
  var bytestart = 0;
  var byteend = 0;
  var facets = [];
  var embeds = [];

  for (let i = 0; i < splittedPost.length; i++) {
    if (splittedPost[i][0] == "#") {
      byteend = bytestart + new Blob([splittedPost[i]]).size;
      const facetJson = {
        index: { byteStart: bytestart, byteEnd: byteend },
        features: [
          {
            $type: "app.bsky.richtext.facet#tag",
            tag: splittedPost[i].slice(1),
          },
        ],
      };
      facets.push(facetJson);
    } else if (splittedPost[i][0] == "@") {
      byteend = bytestart + new Blob([splittedPost[i]]).size;
      const endpoint =
        "https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=" +
        splittedPost[i].slice(1);
      const response = await fetch(endpoint);
      var did = "";
      if (response.status == 200) {
        const jsonResponse = await response.json();
        did = jsonResponse.did;
      }
      const facetJson = {
        index: { byteStart: bytestart, byteEnd: byteend },
        features: [
          {
            $type: "app.bsky.richtext.facet#mention",
            did: did,
          },
        ],
      };
      facets.push(facetJson);
    } else if (urlRegex.test(splittedPost[i])) {
      byteend = bytestart + new Blob([splittedPost[i]]).size;
      const facetJson = {
        index: { byteStart: bytestart, byteEnd: byteend },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: splittedPost[i],
          },
        ],
      };
      facets.push(facetJson);
      if (
        webEmbed.title &&
        webEmbed.description &&
        webEmbed.title != "no-embed" &&
        webEmbed.description != "no-embed"
      ) {
        const embedJson = {
          $type: "app.bsky.embed.external",
          external: {
            uri: splittedPost[i],
            title: webEmbed.title,
            description: webEmbed.description,
          },
        };
        defaultJson.embed = embedJson;
      }
    }
    bytestart += new Blob([splittedPost[i]]).size + 1;
  }

  if (imageJson && !imageJson.never) {
    defaultJson.embed = imageJson;
  }
  defaultJson.facets = facets;
  console.log(defaultJson);

  return defaultJson;
}
