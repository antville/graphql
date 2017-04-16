Site.__defineGetter__('graphql', function() {
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
      .name('Site')
      .description('An Antville site')
      .field(
        newFieldDefinition()
          .name('id')
          .description('The ID of the site')
          .type(nonNull(GraphQLID))
      )
      .field(
        newFieldDefinition()
          .name('name')
          .description('The name of the site')
          .type(nonNull(GraphQLString))
      )
      .field(
        newFieldDefinition()
          .name('created')
          .description('The datetime the site was created')
          .type(nonNull(GraphQLString))
      )
      .field(
        newFieldDefinition()
          .name('modified')
          .description('The datetime the site was last modified')
          .type(nonNull(GraphQLString))
      )
      .field(
        newFieldDefinition()
          .name('stories')
          .description('The site’s stories')
          .type(list(Stories.graphql.queryType))
          .argument(
            newArgument()
              .name('index')
              .description('The index of the first story')
              .type(GraphQLInt)
          )
          .argument(
            newArgument()
              .name('max')
              .description('The maximum amount of stories')
              .type(GraphQLInt)
          )
          .dataFetcher(Stories.graphql.dataFetcher)
      )
      .build(),

    dataFetcher: {
      get: function(env) {
        var name = env.arguments.get('name');
        var site = Site.getByName(name);

        if (!site) return null;

        return {
          id: site._id,
          name: site.name,
          created: site.created.toString(),
          modified: site.modified.toString()
        };
      }
    }
  };
});
