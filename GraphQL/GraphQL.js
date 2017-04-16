GraphQL.prototype.init = function() {
  var graphql = Packages.graphql;
  var newGraphQL = graphql.GraphQL.newGraphQL;
  var newSchema = graphql.schema.GraphQLSchema.newSchema;

  var schema = newSchema()
    .query(Root.graphql.queryType)
    .build();

  return newGraphQL(schema).build();
};

GraphQL.prototype.main_action = function() {
  res.contentType = 'application/json';

  var JSONObject = Packages.org.json.JSONObject;
  var graphQL = this.init();
  var result = null;
  var query = req.data.query;

  if (query) {
    result = graphQL.execute(query).data;
  }

  var json = new JSONObject(result || {});
  res.write(json.toString());
};

GraphQL.prototype.test_action = function () {
  var JSONObject = Packages.org.json.JSONObject;
  var graphQL = this.init();

  var query = 'query {\
    site(name: "blog") {\
      name\
      stories(index: 10 max: 2) {\
        created url\
      }\
    }\
  }'

  var result = graphQL.execute(query).data;
  var json = new JSONObject(result || {});
  res.writeln('\nresult: ' + json);
};
