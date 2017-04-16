Root.__defineGetter__('graphql', function() {
  var graphql = Packages.graphql;

  var newArgument = graphql.schema.GraphQLArgument.newArgument;
  var newEnum = graphql.schema.GraphQLEnumType.newEnum;
  var newFieldDefinition = graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
  var newObject = graphql.schema.GraphQLObjectType.newObject;

  var list = graphql.schema.GraphQLList.list;
  var nonNull = graphql.schema.GraphQLNonNull.nonNull;

  var GraphQLFloat = graphql.Scalars.GraphQLFloat;
  var GraphQLID = graphql.Scalars.GraphQLID;
  var GraphQLInt = graphql.Scalars.GraphQLInt;
  var GraphQLString = graphql.Scalars.GraphQLString;
  var GraphQLTypeReference = graphql.schema.GraphQLTypeReference;

  return {
    queryType: newObject()
      .name('Root')
      .description('The Antville root site')
      .field(
        newFieldDefinition()
          .name('site')
          .type(Site.graphql.queryType)
          .argument(
            newArgument()
              .name('name')
              .description('The name of the site')
              .type(nonNull(GraphQLID))
          )
          .dataFetcher(Site.graphql.dataFetcher)
      )
      .build()
  };
});
