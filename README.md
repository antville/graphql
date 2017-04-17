# The GraphQL Claustra

This is a basic implementation of a JSON API for Antville using GraphQL.

## Installation

Add the `graphql` folder to your claustra directory and enable the claustra in your application’s `app.properties` file:

```bash
# Multiple claustra can be enabled comma-separated
claustra = graphql
```

## Example Request

```
$ curl -if http://localhost:8080/helma/antville/claustra/graphql -d \ 
  "query=query {site(name: 'blog') {stories(max: 1) {title url created creator}}}"

HTTP/1.1 200 OK
Set-Cookie: HopSession=fe80:0:0:0:0:0:0:1l574os0if9s0; Path=/; HttpOnly
ETag: "vLwa7i/9IVurZgCo9HGfhw=="
Content-Length: 191
Content-Type: application/json; charset=UTF-8
Server: Jetty(8.1.22.v20160922)

{"site":{"stories":[{"creator":"p3k","created":"Sat Jan 16 2016 23:35:51 GMT+0100 (CET)","title":"Samstag, 16. Januar 2016","url":"http://localhost:8080/helma/antville/blog/stories/8638/"}]}}
```

## Resources

* [Introduction to GraphQL](http://graphql.org/learn/)
* [So what’s this GraphQL thing I keep hearing about?](https://medium.freecodecamp.com/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf)
* [graphql-java](https://github.com/graphql-java/graphql-java)
* [awesome-graphql](https://github.com/chentsulin/awesome-graphql)
