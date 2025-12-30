// RB2B tracking script integration
// https://www.rb2b.com/
!(function (key) {
  if (window.reb2b) return;
  window.reb2b = { loaded: true };
  var s = document.createElement("script");
  s.async = true;
  s.src =
    "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
  document
    .getElementsByTagName("script")[0]
    .parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
})("4O7Z0HEZ3XNX");
